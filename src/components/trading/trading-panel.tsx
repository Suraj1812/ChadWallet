"use client";

import { useMemo, useState } from "react";
import { PrivyAuthButton } from "@/components/landing/privy-auth-button";
import type { Token } from "@/types/token";
import { cn } from "@/utils/cn";
import { formatCurrency, formatPercent } from "@/utils/format";

type TradingPanelProps = {
  rpcStatus: {
    chain: string;
    cluster: string;
    configured: boolean;
    label: string;
  };
  token: Token;
};

export function TradingPanel({ rpcStatus, token }: TradingPanelProps) {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [solAmount, setSolAmount] = useState("1.0");

  const estimate = useMemo(() => {
    const sol = Number(solAmount);

    if (!Number.isFinite(sol) || sol <= 0) {
      return 0;
    }

    const notionalUsd = sol * 143.62;
    return notionalUsd / token.price;
  }, [solAmount, token.price]);

  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
      <section className="hidden lg:block rounded-xl border border-white/10 bg-[#080a12]/82 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-chad">Trade</p>
            <h2 className="text-2xl font-black tracking-[-0.05em]">Buy & sell</h2>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/55">
            Solana
          </span>
        </div>

        <div className="grid grid-cols-2 rounded-lg bg-black/40 p-1">
          {(["buy", "sell"] as const).map((option) => (
            <button
              className={cn(
                "rounded-md px-4 py-3 text-sm font-black uppercase tracking-[0.16em] transition",
                side === option
                  ? option === "buy"
                    ? "bg-emerald-300 text-black shadow-[0_12px_35px_rgba(110,231,183,0.2)]"
                    : "bg-red-300 text-black shadow-[0_12px_35px_rgba(252,165,165,0.18)]"
                  : "text-white/50 hover:text-white",
              )}
              key={option}
              onClick={() => setSide(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>

        <label className="mt-5 block rounded-lg border border-white/10 bg-black/30 p-4 focus-within:border-white/25">
          <span className="text-xs uppercase tracking-[0.18em] text-white/45">You pay</span>
          <div className="mt-3 flex items-end gap-3">
            <input
              className="min-w-0 flex-1 bg-transparent font-mono text-4xl font-black text-white outline-none"
              inputMode="decimal"
              onChange={(event) => setSolAmount(event.target.value)}
              value={solAmount}
            />
            <span className="pb-2 font-mono text-white/60">SOL</span>
          </div>
        </label>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {["0.25", "0.5", "1.0", "5.0"].map((amount) => (
            <button
              className="rounded-xl border border-white/10 bg-white/[0.035] py-2 text-xs font-bold text-white/55 transition hover:border-white/20 hover:text-white"
              key={amount}
              onClick={() => setSolAmount(amount)}
              type="button"
            >
              {amount}
            </button>
          ))}
        </div>

        <div className="mt-3 rounded-lg border border-white/10 bg-black/30 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-white/45">Estimated receive</p>
          <p className="mt-3 font-mono text-3xl font-black">
            {estimate ? estimate.toLocaleString("en", { maximumFractionDigits: 2 }) : "0"}{" "}
            {token.symbol}
          </p>
          <p className="mt-2 text-xs text-white/40">Preview quote. Connect execution later.</p>
        </div>

        <button
          className={cn(
            "mt-5 w-full rounded-lg px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:-translate-y-0.5",
            side === "buy" ? "bg-emerald-300" : "bg-red-300",
          )}
          type="button"
        >
          Preview {side}
        </button>
      </section>

      <section className="hidden md:block rounded-xl border border-white/10 bg-[#080a12]/82 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-chad">
          Your position
        </p>

        <div className="mt-4 rounded-lg border border-white/10 bg-black/25 p-4">
          <div className="flex items-center justify-between">
            <span className="text-white/50">Balance</span>
            <span className="font-mono font-bold">
              0.00 {token.symbol}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-white/50">Entry</span>
            <span className="font-mono font-bold">
              {formatCurrency(token.price)}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-white/50">24h PnL</span>

            <span
              className={cn(
                "font-mono font-bold",
                token.priceChange24h >= 0
                  ? "text-emerald-300"
                  : "text-red-300",
              )}
            >
              {formatPercent(token.priceChange24h)}
            </span>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <PrivyAuthButton className="w-full" />
        </div>
      </section>

      <section className="hidden md:block rounded-xl border border-white/10 bg-[#080a12]/82 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-chad">
          Portfolio
        </p>

        <div className="mt-4 grid gap-3">
          <div className="rounded-lg border border-white/10 bg-black/25 p-4">
            <div className="flex items-center justify-between">
              <span className="text-white/50">Total value</span>

              <span className="font-mono text-xl font-black">
                $0.00
              </span>
            </div>

            <p className="mt-2 text-xs text-white/40">
              Connect with Privy to attach a Solana wallet and hydrate balances.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/25 p-4">
            <div className="flex items-center justify-between">
              <span className="text-white/50">Execution rail</span>

              <span
                className={cn(
                  "font-mono text-xs",
                  rpcStatus.configured
                    ? "text-chad"
                    : "text-white/45",
                )}
              >
                {rpcStatus.configured ? "Ready" : "Fallback"}
              </span>
            </div>

            <p className="mt-2 text-xs text-white/40">
              {rpcStatus.label} · {rpcStatus.cluster}
            </p>
          </div>
        </div>
      </section>
    </aside>
  );
}
