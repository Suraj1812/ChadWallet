import { enrichToken, fallbackTokens } from "@/data/tokens";
import type { Holder, LiveTrade, Token } from "@/types/token";

type BirdEyeToken = {
  address?: string;
  symbol?: string;
  name?: string;
  price?: number;
  priceUsd?: number;
  priceChange24hPercent?: number;
  priceChange24h?: number;
  v24hUSD?: number;
  volume24hUSD?: number;
  mc?: number;
  marketCap?: number;
  market_cap?: number;
  liquidity?: number;
  logoURI?: string;
  logoUri?: string;
  logo?: string;
  icon?: string;
  holder?: number;
  holders?: number;
  holderCount?: number;
  price_change_24h_percent?: number;
  volume_24h_usd?: number;
  market_cap_usd?: number;
};

function toNumber(value: unknown, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function getBirdEyeApiKey() {
  return process.env.BIRDEYE_API_KEY ?? process.env.NEXT_PUBLIC_BIRDEYE_API_KEY;
}

function createBirdEyeUrl(path: string, params: Record<string, string | number>) {
  const url = new URL("https://public-api.birdeye.so" + path);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url;
}

async function fetchBirdEye<T>(
  path: string,
  params: Record<string, string | number>,
): Promise<T | null> {
  const apiKey = getBirdEyeApiKey();

  if (!apiKey) {
    return null;
  }

  const response = await fetch(createBirdEyeUrl(path, params), {
    headers: {
      "X-API-KEY": apiKey,
      "x-chain": "solana",
      accept: "application/json",
    },
    next: { revalidate: 45 },
  });

  if (!response.ok) {
    throw new Error("BirdEye request failed: " + response.status);
  }

  return (await response.json()) as T;
}

type BirdEyePayload<T> = {
  data?: T | T[] | { items?: T[]; tokens?: T[]; list?: T[]; txs?: T[] };
};

function readItems<T>(payload: BirdEyePayload<T> | null): T[] {
  const data = payload?.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (data && typeof data === "object") {
    const list = data as { items?: T[]; tokens?: T[]; list?: T[]; txs?: T[] };
    return list.items ?? list.tokens ?? list.list ?? list.txs ?? [];
  }

  return [];
}

function readRecord<T>(payload: BirdEyePayload<T> | null): T | null {
  const data = payload?.data;

  if (!data || Array.isArray(data) || typeof data !== "object") {
    return null;
  }

  return data as T;
}

function mapBirdEyeToken(item: BirdEyeToken, index: number): Token {
  return enrichToken(
    {
      address: item.address,
      symbol: item.symbol,
      name: item.name,
      price: toNumber(item.price ?? item.priceUsd),
      priceChange24h: toNumber(
        item.priceChange24hPercent ?? item.priceChange24h ?? item.price_change_24h_percent,
      ),
      volume24h: toNumber(item.v24hUSD ?? item.volume24hUSD ?? item.volume_24h_usd),
      marketCap: toNumber(item.mc ?? item.marketCap ?? item.market_cap ?? item.market_cap_usd),
      liquidity: toNumber(item.liquidity),
      logoUrl: item.logoURI ?? item.logoUri ?? item.logo ?? item.icon,
      holdersCount: toNumber(item.holder ?? item.holders ?? item.holderCount),
      source: "BirdEye",
    },
    index,
  );
}

export async function getBirdEyeTrendingTokens(limit = 12): Promise<Token[]> {
  if (!getBirdEyeApiKey()) {
    return fallbackTokens.slice(0, limit);
  }

  try {
    const payload = await fetchBirdEye<BirdEyePayload<BirdEyeToken>>("/defi/tokenlist", {
      sort_by: "v24hUSD",
      sort_type: "desc",
      offset: 0,
      limit,
      min_liquidity: 10000,
    });
    const items = readItems(payload);
    const mapped = items
      .filter((item) => item.address && item.symbol)
      .slice(0, limit)
      .map(mapBirdEyeToken);

    return mapped.length ? mapped : fallbackTokens.slice(0, limit);
  } catch {
    return fallbackTokens.slice(0, limit);
  }
}

type BirdEyeHolder = {
  address?: string;
  owner?: string;
  wallet?: string;
  uiAmount?: number;
  amount?: number;
  valueUsd?: number;
  value_usd?: number;
  percentage?: number;
  percent?: number;
  percentageSupply?: number;
};

function mapHolder(item: BirdEyeHolder, index: number, fallback: Holder): Holder {
  const percent =
    toNumber(item.percentage ?? item.percent ?? item.percentageSupply, fallback.percent) *
    (toNumber(item.percentage ?? item.percent ?? item.percentageSupply, 0) > 1 ? 1 : 100);
  const valueUsd = toNumber(item.valueUsd ?? item.value_usd, fallback.valueUsd);

  return {
    address: item.owner ?? item.wallet ?? item.address ?? fallback.address,
    tag: index === 0 ? "Largest holder" : fallback.tag,
    percent: Number.isFinite(percent) ? percent : fallback.percent,
    valueUsd,
  };
}

type BirdEyeTrade = {
  txHash?: string;
  tx_hash?: string;
  side?: string;
  txType?: string;
  owner?: string;
  wallet?: string;
  address?: string;
  volumeUSD?: number;
  valueUsd?: number;
  value_usd?: number;
  amount?: number;
  base?: { uiAmount?: number; symbol?: string };
  quote?: { uiAmount?: number };
  blockUnixTime?: number;
  block_unix_time?: number;
};

function mapTrade(item: BirdEyeTrade, index: number, fallback: LiveTrade): LiveTrade {
  const side = item.side?.toLowerCase() === "sell" || item.txType?.toLowerCase() === "sell" ? "sell" : "buy";
  const timestamp = toNumber(item.blockUnixTime ?? item.block_unix_time);
  const secondsAgo = timestamp ? Math.max(0, Math.round(Date.now() / 1000 - timestamp)) : 0;

  return {
    id: item.txHash ?? item.tx_hash ?? fallback.id,
    side,
    wallet: item.owner ?? item.wallet ?? item.address ?? fallback.wallet,
    amount: toNumber(item.amount ?? item.base?.uiAmount ?? item.quote?.uiAmount, fallback.amount),
    valueUsd: toNumber(item.volumeUSD ?? item.valueUsd ?? item.value_usd, fallback.valueUsd),
    time: secondsAgo ? Math.min(secondsAgo, 999) + "s" : index === 0 ? "now" : fallback.time,
  };
}

type BirdEyeCandle = {
  c?: number;
  close?: number;
  unixTime?: number;
};

function mapSparkline(items: BirdEyeCandle[], fallback: number[]) {
  const values = items
    .map((item) => toNumber(item.c ?? item.close))
    .filter((value) => value > 0)
    .slice(-36);

  return values.length > 4 ? values : fallback;
}

export async function getBirdEyeTokenDetails(token: Token): Promise<Token> {
  if (!getBirdEyeApiKey()) {
    return token;
  }

  try {
    const now = Math.floor(Date.now() / 1000);
    const [overviewPayload, holdersPayload, tradesPayload, ohlcvPayload] = await Promise.all([
      fetchBirdEye<BirdEyePayload<BirdEyeToken>>("/defi/token_overview", {
        address: token.address,
        frames: "24h",
      }),
      fetchBirdEye<BirdEyePayload<BirdEyeHolder>>("/defi/v3/token/holder", {
        address: token.address,
        offset: 0,
        limit: 5,
      }),
      fetchBirdEye<BirdEyePayload<BirdEyeTrade>>("/defi/txs/token", {
        address: token.address,
        offset: 0,
        limit: 8,
        tx_type: "swap",
        sort_type: "desc",
      }),
      fetchBirdEye<BirdEyePayload<BirdEyeCandle>>("/defi/ohlcv", {
        address: token.address,
        type: "1H",
        currency: "usd",
        time_from: now - 60 * 60 * 36,
        time_to: now,
      }),
    ]);

    const overview = readRecord(overviewPayload);
    const holders = readItems(holdersPayload).map((holder, index) =>
      mapHolder(holder, index, token.holders[index] ?? token.holders[0]),
    );
    const trades = readItems(tradesPayload).map((trade, index) =>
      mapTrade(trade, index, token.trades[index] ?? token.trades[0]),
    );
    const sparkline = mapSparkline(readItems(ohlcvPayload), token.sparkline);

    const overviewToken = overview
      ? mapBirdEyeToken({ ...overview, address: token.address }, token.rank - 1)
      : token;

    return {
      ...overviewToken,
      source: "BirdEye",
      holders: holders.length ? holders : token.holders,
      trades: trades.length ? trades : token.trades,
      sparkline,
    };
  } catch {
    return token;
  }
}
