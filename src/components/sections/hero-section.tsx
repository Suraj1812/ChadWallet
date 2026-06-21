import Image from "next/image";
import Link from "next/link";
import { StoreBadge } from "@/components/landing/store-badge";
import type { Token } from "@/types/token";
import { formatCompact, formatPercent } from "@/utils/format";

type HeroSectionProps = {
  featuredToken: Token;
};

export function HeroSection({ featuredToken }: HeroSectionProps) {
  return (
    <section className="premium-hero relative min-h-[calc(100svh-108px)] overflow-hidden px-4 py-12 sm:py-16 lg:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(74,91,255,0.18),transparent_31%),radial-gradient(circle_at_82%_16%,rgba(215,255,56,0.08),transparent_20%),linear-gradient(180deg,#080a19_0%,#050611_58%,#020205_100%)]" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/[0.05] to-transparent" />
      <div className="absolute inset-0 opacity-[0.13] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.58)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="absolute left-1/2 top-[50%] h-[min(76vw,760px)] w-[min(76vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />

      <div className="pointer-events-none absolute bottom-[-138px] left-[-80px] hidden h-[420px] w-[250px] rotate-[-16deg] opacity-32 blur-[1px] md:block">
        <Image
          alt=""
          className="rounded-[2.4rem]"
          height={672}
          src="/app-store/portfolio.png"
          width={310}
        />
      </div>
      <div className="pointer-events-none absolute bottom-[-150px] right-[-50px] hidden h-[450px] w-[270px] rotate-[14deg] opacity-32 blur-[1px] md:block">
        <Image
          alt=""
          className="rounded-[2.4rem]"
          height={672}
          src="/app-store/discover.png"
          width={310}
        />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-220px)] max-w-7xl flex-col items-center justify-center text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/62 backdrop-blur-xl">
          <span className="h-2 w-2 rounded-full bg-chad shadow-[0_0_20px_rgba(215,255,56,0.85)]" />
          ChadWallet web preview
        </div>

        <h1 className="max-w-5xl text-balance text-[3.65rem] font-black leading-[0.88] tracking-[-0.075em] text-[#eef0ff] sm:text-7xl md:text-8xl lg:text-[6.9rem] xl:text-[7.7rem]">
          trade Solana before it trends.
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-base font-medium leading-7 text-white/54 sm:text-xl sm:leading-8">
          Discover the tokens heating up on Solana, sign in with Privy, and jump from signal to a
          focused trade page in one tap.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            className="min-w-[186px] rounded-[1.15rem] bg-[#4b55d9] px-7 py-4 text-center text-base font-black text-white transition hover:-translate-y-px hover:bg-[#5963ee]"
            href={"/trade/" + featuredToken.address}
          >
            Start trading
          </Link>
          <a
            className="min-w-[186px] rounded-[1.15rem] bg-white/[0.12] px-7 py-4 text-center text-base font-black text-white backdrop-blur-xl transition hover:-translate-y-px hover:bg-white/[0.18]"
            href="#download"
          >
            Download app
          </a>
        </div>

        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row 2xl:hidden">
          <StoreBadge store="apple" />
          <StoreBadge store="google" />
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-white/48">
          <span>{featuredToken.symbol}/SOL</span>
          <span className="h-1 w-1 rounded-full bg-white/22" />
          <span className={featuredToken.priceChange24h >= 0 ? "text-emerald-300" : "text-red-300"}>
            {formatPercent(featuredToken.priceChange24h)} 24h
          </span>
          <span className="h-1 w-1 rounded-full bg-white/22" />
          <span>BirdEye data with fallback mode</span>
        </div>

        <div className="relative mt-10 h-[230px] w-full max-w-5xl sm:h-[300px]">
          <div className="absolute left-1/2 top-7 w-48 -translate-x-1/2 rounded-[2.2rem] bg-black/35 p-2 backdrop-blur-xl sm:w-60">
            <Image
              alt="ChadWallet token screen"
              className="rounded-[2rem]"
              height={672}
              priority
              src="/app-store/token.png"
              width={310}
            />
          </div>
          <div className="absolute left-[9%] top-16 hidden w-44 -rotate-6 rounded-[2rem] bg-white/[0.055] p-2 opacity-75 backdrop-blur md:block">
            <Image
              alt="ChadWallet search screen"
              className="rounded-[1.7rem]"
              height={672}
              src="/app-store/search.png"
              width={310}
            />
          </div>
          <div className="absolute right-[9%] top-16 hidden w-44 rotate-6 rounded-[2rem] bg-white/[0.055] p-2 opacity-75 backdrop-blur md:block">
            <Image
              alt="ChadWallet launch screen"
              className="rounded-[1.7rem]"
              height={672}
              src="/app-store/launch.png"
              width={310}
            />
          </div>

          <div className="absolute bottom-2 left-1/2 w-[min(100%,360px)] -translate-x-1/2 rounded-[1.35rem] bg-[#080a19]/88 p-4 text-left backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Hot pair</p>
                <p className="mt-1 text-2xl font-black">{featuredToken.symbol}/SOL</p>
              </div>
              <span className="rounded-full bg-emerald-300/15 px-3 py-1 font-mono text-sm text-emerald-200">
                {formatPercent(featuredToken.priceChange24h)}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white/[0.05] p-3">
                <p className="text-white/45">Volume</p>
                <p className="font-mono font-bold">
                  {"$" + formatCompact(featuredToken.volume24h)}
                </p>
              </div>
              <div className="rounded-2xl bg-white/[0.05] p-3">
                <p className="text-white/45">Liquidity</p>
                <p className="font-mono font-bold">
                  {"$" + formatCompact(featuredToken.liquidity)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
