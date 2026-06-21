import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ChadWallet",
    short_name: "ChadWallet",
    description:
      "A Solana-first wallet and trading preview for token discovery, Privy login, and mobile app flows.",
    start_url: "/",
    display: "standalone",
    background_color: "#050611",
    theme_color: "#070918",
    icons: [
      {
        src: "/logo/dark.png",
        sizes: "1024x1024",
        type: "image/png",
      },
      {
        src: "/logo/dark.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}
