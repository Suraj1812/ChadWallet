import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "static.jup.ag",
      },
      {
        protocol: "https",
        hostname: "cryptologos.cc",
      },
      {
        protocol: "https",
        hostname: "arweave.net",
      },
      {
        protocol: "https",
        hostname: "*.arweave.net",
      },
      {
        protocol: "https",
        hostname: "image-cdn.solana.fm",
      },
    ],
  },
};

export default nextConfig;
