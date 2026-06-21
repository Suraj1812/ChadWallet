import { ImageResponse } from "next/og";

export const alt = "ChadWallet social Solana trading preview";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "radial-gradient(circle at 50% 35%, rgba(75,85,217,0.55), transparent 34%), radial-gradient(circle at 76% 18%, rgba(215,255,56,0.28), transparent 22%), linear-gradient(180deg, #070918 0%, #03040b 100%)",
          color: "#eef0ff",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "2px dashed rgba(255,255,255,0.13)",
            borderRadius: "999px",
            height: 720,
            left: 240,
            position: "absolute",
            top: -45,
            width: 720,
          }}
        />
        <div
          style={{
            border: "2px dashed rgba(255,255,255,0.10)",
            borderRadius: "999px",
            height: 440,
            left: 380,
            position: "absolute",
            top: 95,
            width: 440,
          }}
        />
        <div style={{ color: "#d7ff38", display: "flex", fontSize: 28, fontWeight: 800, letterSpacing: 6, marginBottom: 28 }}>
          CHADWALLET
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: -8,
            lineHeight: 0.92,
            maxWidth: 900,
            textAlign: "center",
          }}
        >
          where wallet signal becomes alpha.
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.62)",
            display: "flex",
            fontSize: 30,
            fontWeight: 600,
            marginTop: 32,
            textAlign: "center",
          }}
        >
          Solana token discovery · Privy login · Mobile-first trading
        </div>
      </div>
    ),
    size,
  );
}
