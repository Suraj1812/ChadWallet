import { TokenAvatar } from "@/components/trading/token-avatar";
import type { Token } from "@/types/token";
import { cn } from "@/utils/cn";
import { formatCompact, formatCurrency, formatPercent, shortAddress } from "@/utils/format";

type TokenInfoProps = {
  token: Token;
};

function Sparkline({ token }: TokenInfoProps) {
  const values = token.sparkline;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 82 - 8;
      return x + "," + y;
    })
    .join(" ");

  return (
    <svg className="h-56 w-full overflow-visible sm:h-72" preserveAspectRatio="none" viewBox="0 0 100 100">
      <defs>
        <linearGradient id={"fill-" + token.symbol} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={token.accent} stopOpacity="0.4" />
          <stop offset="100%" stopColor={token.accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        className="chart-glow"
        fill="none"
        points={points}
        stroke={token.accent}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.5"
        vectorEffect="non-scaling-stroke"
      />
      <polygon fill={"url(#fill-" + token.symbol + ")"} points={"0,100 " + points + " 100,100"} />
    </svg>
  );
}

export function TokenInfo({ token }: TokenInfoProps) {
  const stats = [
    ["Market cap", "$" + formatCompact(token.marketCap)],
    ["24h volume", "$" + formatCompact(token.volume24h)],
    ["Liquidity", "$" + formatCompact(token.liquidity)],
    ["Holders", formatCompact(token.holdersCount)],
  ];

  return (
    <article className="overflow-hidden rounded-lg border border-white/10 bg-[#080a12]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="flex flex-col gap-6 border-b border-white/10 bg-white/[0.025] p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <TokenAvatar size="lg" token={token} />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-4xl font-black tracking-[-0.06em] sm:text-5xl">{token.symbol}</h1>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/55">
                Solana
              </span>
            </div>
            <p className="text-white/55">{token.name}</p>
            <p className="mt-2 font-mono text-xs text-white/35">{shortAddress(token.address)}</p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <p className="font-mono text-4xl font-black tracking-[-0.05em]">{formatCurrency(token.price)}</p>
          <p
            className={cn(
              "mt-1 font-mono text-sm",
              token.priceChange24h >= 0 ? "text-emerald-300" : "text-red-300",
            )}
          >
            {formatPercent(token.priceChange24h)} / 24h
          </p>
          <p className="mt-2 text-xs text-white/40">Source: {token.source}</p>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-white/40">
          <span>Price chart</span>
          <span>{token.source === "BirdEye" ? "BirdEye OHLCV" : "Fallback sparkline"}</span>
        </div>
        <div className="rounded-lg border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))] px-3 pt-5">
          <Sparkline token={token} />
        </div>
        <div className="grid gap-3 sm:grid-cols-4">
          {stats.map(([label, value]) => (
            <div className="rounded-md border border-white/10 bg-black/25 p-4" key={label}>
              <p className="text-xs uppercase tracking-[0.16em] text-white/40">{label}</p>
              <p className="mt-2 font-mono text-lg font-bold">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
