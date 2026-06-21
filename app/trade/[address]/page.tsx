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
import Image from "next/image";
import Link from "next/link";
import { PrivyAuthButton } from "@/components/landing/privy-auth-button";

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
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,rgba(75,85,217,0.14),transparent_32%),#050505] text-foreground">
      <TokenBanner tokens={tokens} label="Live Solana watchlist" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo/dark.png"
              alt="ChadWallet"
              width={36}
              height={36}
              className="rounded-xl"
            />

            <div>
              <p className="font-black text-white">ChadWallet</p>
              <p className="text-[10px] uppercase tracking-wider text-white/50">
                Solana Trading
              </p>
            </div>
          </Link>

          <PrivyAuthButton compact />
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-[1500px] gap-4 px-4 py-5 lg:grid-cols-[300px_minmax(0,1fr)_350px] lg:px-6">
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
