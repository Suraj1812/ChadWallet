import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "radial-gradient(circle at 35% 25%, #d7ff38 0, #8fff4c 30%, #090b18 72%)",
          borderRadius: "20px",
          color: "#050505",
          display: "flex",
          fontSize: 34,
          fontWeight: 900,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "-0.08em",
          width: "100%",
        }}
      >
        C
      </div>
    ),
    size,
  );
}
