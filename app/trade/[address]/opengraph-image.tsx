import { ImageResponse } from "next/og";
import { fallbackTokens } from "@/data/tokens";
import { findTokenByAddress } from "@/services/token.service";
import { formatCurrency, formatPercent } from "@/utils/format";

type ImageProps = {
  params: Promise<{
    address: string;
  }>;
};

export const alt = "ChadWallet token trading preview";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function TokenOpenGraphImage({ params }: ImageProps) {
  const { address } = await params;
  const token = findTokenByAddress(fallbackTokens, address) ?? fallbackTokens[0];

  return new ImageResponse(
    (
      <div
        style={{
          background:
            "radial-gradient(circle at 72% 24%, rgba(215,255,56,0.24), transparent 23%), radial-gradient(circle at 50% 45%, rgba(75,85,217,0.46), transparent 36%), linear-gradient(180deg, #070918 0%, #03040b 100%)",
          color: "#eef0ff",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: 72,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <div style={{ color: "#d7ff38", display: "flex", fontSize: 28, fontWeight: 900, letterSpacing: 6 }}>
            CHADWALLET
          </div>
          <div style={{ color: "rgba(255,255,255,0.55)", display: "flex", fontSize: 24, fontWeight: 700 }}>
            SOLANA TRADING
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: token.accent, display: "flex", fontSize: 42, fontWeight: 900 }}>
            {token.name}
          </div>
          <div style={{ display: "flex", fontSize: 132, fontWeight: 900, letterSpacing: -10, lineHeight: 0.9 }}>
            {token.symbol}/SOL
          </div>
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          <div style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 28, display: "flex", flexDirection: "column", padding: "24px 30px" }}>
            <span style={{ color: "rgba(255,255,255,0.48)", fontSize: 22 }}>Price</span>
            <span style={{ fontSize: 38, fontWeight: 900 }}>{formatCurrency(token.price)}</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 28, display: "flex", flexDirection: "column", padding: "24px 30px" }}>
            <span style={{ color: "rgba(255,255,255,0.48)", fontSize: 22 }}>24h</span>
            <span style={{ color: token.priceChange24h >= 0 ? "#86efac" : "#fca5a5", fontSize: 38, fontWeight: 900 }}>
              {formatPercent(token.priceChange24h)}
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
