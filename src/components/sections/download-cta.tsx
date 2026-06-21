import Link from "next/link";
import { PrivyAuthButton } from "@/components/landing/privy-auth-button";

type DownloadCtaProps = {
  featuredTokenAddress: string;
};

export function DownloadCta({ featuredTokenAddress }: DownloadCtaProps) {
  return (
    <section className="px-4 pb-20 pt-6 lg:px-6">
      <div className="mx-auto max-w-7xl rounded-[2.35rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] p-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-14">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-chad">
          From signal to position
        </p>
        <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black tracking-[-0.05em] sm:text-6xl">
          Tap a ticker. Open the market. Decide fast.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/60">
          The token rails are not decoration — every chip is a route into a focused Solana trading
          surface with price, holders, trades, and position context.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            className="rounded-[1.1rem] bg-white px-6 py-3 text-center text-sm font-black uppercase tracking-[0.16em] text-black transition hover:-translate-y-0.5 hover:bg-chad"
            href={"/trade/" + featuredTokenAddress}
          >
            Open trading UI
          </Link>
          <PrivyAuthButton />
        </div>
      </div>
    </section>
  );
}
