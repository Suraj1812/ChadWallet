import type { Metadata } from "next";
import { TokenBanner } from "@/components/landing/token-banner";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { HoldersList } from "@/components/trading/holders-list";
import { LiveTrades } from "@/components/trading/live-trades";
import { TokenInfo } from "@/components/trading/token-info";
import { TradingPanel } from "@/components/trading/trading-panel";
import { TrendingList } from "@/components/trading/trending-list";
import { getSolanaRuntimeStatus } from "@/services/solana.service";
import { findTokenByAddress, getTokenDetails, getTrendingTokens } from "@/services/token.service";

type TradePageProps = {
  params: Promise<{
    address: string;
  }>;
};

export const revalidate = 45;

export async function generateMetadata({
  params,
}: TradePageProps): Promise<Metadata> {
  const { address } = await params;
  const tokens = await getTrendingTokens(12);
  const token = findTokenByAddress(tokens, address) ?? (await getTokenDetails(address, tokens));
  const title = token.symbol + " live Solana trading";
  const description =
    "Trade " +
    token.name +
    " on ChadWallet with Solana token stats, holders, live trades, and a buy/sell preview.";

  return {
    title,
    description,
    alternates: {
      canonical: "/trade/" + address,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: "/trade/" + address,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function TradePage({ params }: TradePageProps) {
  const { address } = await params;
  const tokens = await getTrendingTokens(14);
  const token = await getTokenDetails(address, tokens);
  const rpcStatus = getSolanaRuntimeStatus();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TokenBanner tokens={tokens} label="Live Solana watchlist" />
      <Navbar featuredTokenAddress={token.address} />

      <main className="mx-auto grid w-full max-w-[1500px] gap-4 px-4 py-5 lg:grid-cols-[310px_minmax(0,1fr)_360px] lg:px-6">
        <TrendingList activeAddress={token.address} tokens={tokens} />

        <section className="space-y-4">
          <TokenInfo token={token} />
          <div className="grid gap-4 xl:grid-cols-2">
            <HoldersList holders={token.holders} />
            <LiveTrades trades={token.trades} tokenSymbol={token.symbol} />
          </div>
        </section>

        <TradingPanel rpcStatus={rpcStatus} token={token} />
      </main>

      <Footer />
    </div>
  );
}
