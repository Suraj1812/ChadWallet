import type { LiveTrade } from "@/types/token";
import { cn } from "@/utils/cn";
import { formatCompact } from "@/utils/format";

type LiveTradesProps = {
  tokenSymbol: string;
  trades: LiveTrade[];
};

export function LiveTrades({ tokenSymbol, trades }: LiveTradesProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-[#080a12]/78 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-chad">Tape</p>
          <h2 className="text-2xl font-black tracking-[-0.04em]">Live trades</h2>
        </div>
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-300" />
      </div>

      <div className="grid gap-3">
        {trades.map((trade) => (
          <div
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border border-white/10 bg-black/20 p-4 transition hover:bg-white/[0.04]"
            key={trade.id}
          >
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-black uppercase",
                trade.side === "buy"
                  ? "bg-emerald-300/15 text-emerald-200"
                  : "bg-red-300/15 text-red-200",
              )}
            >
              {trade.side}
            </span>
            <div>
              <p className="font-mono text-sm font-bold">{trade.wallet}</p>
              <p className="mt-1 text-xs text-white/45">
                {formatCompact(trade.amount)} {tokenSymbol}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm font-bold">{"$" + formatCompact(trade.valueUsd)}</p>
              <p className="mt-1 text-xs text-white/45">{trade.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
