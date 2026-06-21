import Link from "next/link";
import type { Token } from "@/types/token";
import { cn } from "@/utils/cn";
import { formatCurrency, formatPercent } from "@/utils/format";

type TokenBannerProps = {
  tokens: Token[];
  label: string;
  reverse?: boolean;
  className?: string;
};

export function TokenBanner({
  tokens,
  label,
  reverse = false,
  className,
}: TokenBannerProps) {
  const marqueeTokens = [...tokens, ...tokens];

  return (
    <section
      className={cn(
        "border-y border-white/10 bg-black/85 py-2 text-xs uppercase tracking-[0.18em] text-white/70 backdrop-blur",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <div className="hidden shrink-0 pl-4 font-mono text-[10px] font-semibold text-chad sm:block">
          {label}
        </div>
        <div className="marquee-viewport flex-1">
          <div className="marquee-track gap-3" data-direction={reverse ? "right" : "left"}>
            {marqueeTokens.map((token, index) => (
              <Link
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 transition hover:border-chad/70 hover:bg-chad/10"
                href={"/trade/" + token.address}
                key={token.address + "-" + index}
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ background: token.accent }}
                />
                <span className="font-mono font-semibold text-white">{token.symbol}</span>
                <span className="text-white/50">{formatCurrency(token.price)}</span>
                <span
                  className={cn(
                    "font-mono",
                    token.priceChange24h >= 0 ? "text-emerald-300" : "text-red-300",
                  )}
                >
                  {formatPercent(token.priceChange24h)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
