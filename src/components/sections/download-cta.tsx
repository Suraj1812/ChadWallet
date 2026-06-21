import Link from "next/link";
import { PrivyAuthButton } from "@/components/landing/privy-auth-button";

type DownloadCtaProps = {
  featuredTokenAddress: string;
};

export function DownloadCta({ featuredTokenAddress }: DownloadCtaProps) {
  return (
    <section className="px-4 pb-20 pt-6 lg:px-6">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 text-center sm:p-14">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-chad">
          Minimum landing + bonus trading UI
        </p>
        <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black tracking-[-0.05em] sm:text-6xl">
          Jump from hype banner to trade page in one tap.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/60">
          The ticker rails at the top and bottom are live links into token-specific trading pages,
          matching the assignment flow end-to-end.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-black uppercase tracking-[0.16em] text-white transition hover:border-chad/70 hover:text-chad"
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
