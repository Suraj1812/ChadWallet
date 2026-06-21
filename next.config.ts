import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "developer.apple.com",
        pathname: "/assets/elements/badges/**",
      },
      {
        protocol: "https",
        hostname: "play.google.com",
        pathname: "/intl/**/badges/**",
      },
    ],
  },
};

export default nextConfig;
