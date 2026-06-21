import Image from "next/image";
import Link from "next/link";
import { PrivyAuthButton } from "@/components/landing/privy-auth-button";

type DownloadCtaProps = {
  featuredTokenAddress: string;
};

export function DownloadCta({ featuredTokenAddress }: DownloadCtaProps) {
  return (
    <section className="px-10 py-20 lg:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-xl border border-white/10 bg-[#050816]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,255,0,0.12),transparent_35%),radial-gradient(circle_at_top_right,rgba(88,101,242,0.18),transparent_40%),radial-gradient(circle_at_bottom_center,rgba(255,255,255,0.03),transparent_50%)]" />

        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative grid items-center gap-12 p-8 sm:p-10 lg:grid-cols-[1fr_560px] lg:p-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-chad">
              ChadWallet
            </p>

            <h2 className="mt-6 max-w-4xl text-5xl font-black leading-none tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl">
              Trade Solana
              <br />
              before it trends.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
              Monitor trending tokens, track holders, watch live trades, and
              move from discovery to execution in one focused trading interface.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Live Trades",
                "Holder Tracking",
                "Trending Tokens",
                "Wallet Signals",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/trade/${featuredTokenAddress}`}
                className="flex h-14 items-center justify-center rounded-md bg-white px-8 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-chad"
              >
                Start Trading
              </Link>

              <PrivyAuthButton />
            </div>
          </div>

          <div className="relative hidden h-[620px] lg:flex items-center justify-center">
            <Image
              src="/app-store/portfolio.png"
              alt="Portfolio"
              width={220}
              height={460}
              className="absolute left-0 top-24 rotate-[-16deg] rounded-xl border border-white/10 shadow-2xl opacity-60"
            />

            <Image
              src="/app-store/discover.png"
              alt="Discover"
              width={250}
              height={520}
              className="absolute left-20 top-10 rotate-[-8deg] rounded-xl border border-white/10 shadow-2xl opacity-80"
            />

            <Image
              src="/app-store/token.png"
              alt="Token"
              width={280}
              height={560}
              className="relative z-20 rounded-xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
            />

            <Image
              src="/app-store/x.png"
              alt="Social"
              width={250}
              height={520}
              className="absolute right-0 top-16 rotate-[12deg] rounded-xl border border-white/10 shadow-2xl opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
