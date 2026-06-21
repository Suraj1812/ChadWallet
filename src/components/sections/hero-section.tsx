import Image from "next/image";
import Link from "next/link";
import { StoreBadge } from "@/components/landing/store-badge";
import { siteConfig } from "@/config/site";
import type { Token } from "@/types/token";
import { formatCompact, formatCurrency, formatPercent } from "@/utils/format";

type HeroSectionProps = {
  featuredToken: Token;
};

const orbitTokens = [
  { label: "SOL", className: "left-[10%] top-[42%] bg-[#d7ff38] text-black" },
  { label: "JUP", className: "right-[13%] top-[26%] bg-[#7c8cff] text-white" },
  { label: "BONK", className: "bottom-[14%] left-[31%] bg-[#ffd166] text-black" },
  { label: "WIF", className: "bottom-[23%] right-[22%] bg-[#38bdf8] text-black" },
];

export function HeroSection({ featuredToken }: HeroSectionProps) {
  return (
    <section className="premium-hero relative min-h-[calc(100svh-116px)] overflow-hidden border-b border-white/10 px-4 py-16 sm:py-20 lg:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(74,91,255,0.22),transparent_34%),radial-gradient(circle_at_82%_14%,rgba(215,255,56,0.11),transparent_24%),linear-gradient(180deg,#070918_0%,#050511_56%,#020205_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.07] to-transparent" />
      <div className="absolute inset-0 opacity-[0.28] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:34px_34px]" />

      <div className="absolute left-1/2 top-[46%] h-[min(86vw,900px)] w-[min(86vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/12" />
      <div className="absolute left-1/2 top-[46%] h-[min(58vw,600px)] w-[min(58vw,600px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" />
      <div className="absolute left-1/2 top-[46%] h-[min(30vw,330px)] w-[min(30vw,330px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8 bg-white/[0.015] blur-[0.2px]" />

      {orbitTokens.map((item) => (
        <div
          className={"absolute hidden h-16 w-16 place-items-center rounded-full border border-white/25 font-mono text-sm font-black shadow-[0_18px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl md:grid " + item.className}
          key={item.label}
        >
          {item.label}
        </div>
      ))}

      <div className="pointer-events-none absolute bottom-[-110px] left-[-70px] hidden h-[430px] w-[260px] rotate-[-16deg] opacity-45 blur-[1px] md:block">
        <Image
          alt=""
          className="rounded-[2.4rem]"
          height={672}
          src="/app-store/portfolio.png"
          width={310}
        />
      </div>
      <div className="pointer-events-none absolute bottom-[-140px] right-[-42px] hidden h-[470px] w-[280px] rotate-[14deg] opacity-45 blur-[1px] md:block">
        <Image
          alt=""
          className="rounded-[2.4rem]"
          height={672}
          src="/app-store/discover.png"
          width={310}
        />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-260px)] max-w-7xl flex-col items-center justify-center text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.08] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/68 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl">
          <span className="h-2 w-2 rounded-full bg-chad shadow-[0_0_20px_rgba(215,255,56,0.85)]" />
          Solana social trading
        </div>

        <h1 className="max-w-5xl text-balance text-5xl font-black leading-[0.88] tracking-[-0.075em] text-[#eef0ff] sm:text-7xl lg:text-[8.5rem]">
          where wallet signal becomes alpha.
        </h1>
        <p className="mt-7 max-w-3xl text-balance text-lg font-medium leading-8 text-white/58 sm:text-2xl sm:leading-9">
          {siteConfig.name} brings token discovery, Privy login, Solana wallets, and one-tap trade
          pages into a web preview that feels native to the app.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            className="min-w-[190px] rounded-[1.35rem] bg-[#4b55d9] px-7 py-4 text-center text-base font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_24px_80px_rgba(75,85,217,0.35)] transition hover:-translate-y-0.5 hover:bg-[#5963ee]"
            href={"/trade/" + featuredToken.address}
          >
            Start trading
          </Link>
          <a
            className="min-w-[190px] rounded-[1.35rem] border border-white/14 bg-white/[0.12] px-7 py-4 text-center text-base font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/[0.18]"
            href="#download"
          >
            Download app
          </a>
        </div>

        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row xl:hidden">
          <StoreBadge store="apple" />
          <StoreBadge store="google" />
        </div>

        <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["Featured", featuredToken.symbol],
            ["Price", formatCurrency(featuredToken.price)],
            ["24h", formatPercent(featuredToken.priceChange24h)],
          ].map(([label, value]) => (
            <div
              className="rounded-[1.35rem] border border-white/10 bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
              key={label}
            >
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/38">{label}</p>
              <p className="mt-2 font-mono text-lg font-black text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-14 h-[260px] w-full max-w-5xl sm:h-[320px]">
          <div className="absolute left-1/2 top-10 w-56 -translate-x-1/2 rounded-[2.5rem] border border-white/15 bg-black/35 p-2 shadow-[0_40px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:w-64">
            <Image
              alt="ChadWallet token screen"
              className="rounded-[2rem]"
              height={672}
              priority
              src="/app-store/token.png"
              width={310}
            />
          </div>
          <div className="absolute left-[9%] top-20 hidden w-48 -rotate-6 rounded-[2.2rem] border border-white/12 bg-white/[0.07] p-2 opacity-90 shadow-2xl backdrop-blur md:block">
            <Image
              alt="ChadWallet search screen"
              className="rounded-[1.7rem]"
              height={672}
              src="/app-store/search.png"
              width={310}
            />
          </div>
          <div className="absolute right-[9%] top-20 hidden w-48 rotate-6 rounded-[2.2rem] border border-white/12 bg-white/[0.07] p-2 opacity-90 shadow-2xl backdrop-blur md:block">
            <Image
              alt="ChadWallet launch screen"
              className="rounded-[1.7rem]"
              height={672}
              src="/app-store/launch.png"
              width={310}
            />
          </div>

          <div className="absolute bottom-2 left-1/2 w-[min(100%,420px)] -translate-x-1/2 rounded-[1.75rem] border border-white/14 bg-[#080a19]/80 p-5 text-left shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
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
