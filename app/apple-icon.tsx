import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "radial-gradient(circle at 30% 20%, #d7ff38 0, #8eff4f 28%, #11152f 70%, #050611 100%)",
          color: "#050505",
          display: "flex",
          fontSize: 96,
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
