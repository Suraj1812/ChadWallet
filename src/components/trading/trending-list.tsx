"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Token } from "@/types/token";
import { cn } from "@/utils/cn";
import { formatCompact, formatCurrency, formatPercent } from "@/utils/format";

type TrendingListProps = {
  activeAddress: string;
  tokens: Token[];
};

export function TrendingList({ activeAddress, tokens }: TrendingListProps) {
  const [query, setQuery] = useState("");
  const filteredTokens = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return tokens;
    }

    return tokens.filter((token) =>
      [token.symbol, token.name, token.address].some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    );
  }, [query, tokens]);

  return (
    <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-chad">Trending</p>
          <h1 className="text-2xl font-black tracking-[-0.04em]">Solana tokens</h1>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white/60">
          {tokens[0]?.source ?? "Demo"}
        </span>
      </div>

      <label className="mb-3 block rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
          Search ticker
        </span>
        <input
          className="mt-1 w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/25"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="SOL, BONK, mint..."
          value={query}
        />
      </label>

      <div className="grid gap-2">
        {filteredTokens.map((token) => {
          const active = token.address === activeAddress;

          return (
            <Link
              className={cn(
                "rounded-3xl border border-white/10 bg-black/20 p-4 transition hover:border-chad/40 hover:bg-chad/10",
                active && "border-chad/60 bg-chad/10",
              )}
              href={"/trade/" + token.address}
              key={token.address}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm font-black text-black"
                    style={{ background: token.accent }}
                  >
                    {token.symbol.slice(0, 2)}
                  </span>
                  <div>
                    <p className="font-black">{token.symbol}</p>
                    <p className="text-xs text-white/45">{token.name}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    "font-mono text-sm",
                    token.priceChange24h >= 0 ? "text-emerald-300" : "text-red-300",
                  )}
                >
                  {formatPercent(token.priceChange24h)}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-white/45">
                <span>{formatCurrency(token.price)}</span>
                <span>{"$" + formatCompact(token.volume24h)} vol</span>
              </div>
            </Link>
          );
        })}
        {filteredTokens.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-black/20 p-4 text-sm text-white/45">
            No token found. Try a symbol or mint address.
          </div>
        ) : null}
      </div>
    </aside>
  );
}
