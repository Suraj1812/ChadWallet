import { ImageResponse } from "next/og";
import { fallbackTokens } from "@/data/tokens";
import { findTokenByAddress } from "@/services/token.service";

type IconProps = {
  params: Promise<{
    address: string;
  }>;
};

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default async function TokenIcon({ params }: IconProps) {
  const { address } = await params;
  const token = findTokenByAddress(fallbackTokens, address);
  const label = token?.symbol.slice(0, 2) ?? address.slice(0, 2).toUpperCase();
  const accent = token?.accent ?? "#d7ff38";

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "radial-gradient(circle at 32% 24%, " + accent + " 0, #11152f 72%)",
          borderRadius: "20px",
          color: "#050505",
          display: "flex",
          fontSize: 25,
          fontWeight: 900,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "-0.07em",
          width: "100%",
        }}
      >
        {label}
      </div>
    ),
    size,
  );
}
