export type TokenDataSource = "BirdEye" | "Demo";

export type Holder = {
  address: string;
  tag: string;
  percent: number;
  valueUsd: number;
};

export type LiveTrade = {
  id: string;
  side: "buy" | "sell";
  wallet: string;
  amount: number;
  valueUsd: number;
  time: string;
};

export type Token = {
  address: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  logoUrl?: string;
  holdersCount: number;
  rank: number;
  accent: string;
  source: TokenDataSource;
  sparkline: number[];
  holders: Holder[];
  trades: LiveTrade[];
};
