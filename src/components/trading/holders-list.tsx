import type { Holder } from "@/types/token";
import { formatCompact } from "@/utils/format";

type HoldersListProps = {
  holders: Holder[];
};

export function HoldersList({ holders }: HoldersListProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-[#080a12]/78 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-chad">Holders</p>
          <h2 className="text-2xl font-black tracking-[-0.04em]">Top wallets</h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 font-mono text-xs text-white/60">
          {holders.length}
        </span>
      </div>

      <div className="grid gap-3">
        {holders.map((holder) => (
          <div
            className="grid grid-cols-[1fr_auto] gap-3 rounded-md border border-white/10 bg-black/20 p-4 transition hover:bg-white/[0.04]"
            key={holder.address}
          >
            <div>
              <p className="font-mono text-sm font-bold">{holder.address}</p>
              <p className="mt-1 text-xs text-white/45">{holder.tag}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm font-bold">{holder.percent.toFixed(2)}%</p>
              <p className="mt-1 text-xs text-white/45">{"$" + formatCompact(holder.valueUsd)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
