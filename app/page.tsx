import type { Metadata } from "next";
import { DownloadSection } from "@/components/landing/download-section";
import { TokenBanner } from "@/components/landing/token-banner";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { DownloadCta } from "@/components/sections/download-cta";
import { FeaturesSection } from "@/components/sections/features-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MobileShowcase } from "@/components/sections/mobile-showcase";
import { getTrendingTokens } from "@/services/token.service";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  title: "ChadWallet — Trade Solana before it trends",
  description:
    "A premium Solana trading preview with Privy login, live token rails, mobile app links, and token-specific trading pages.",
};

export default async function Home() {
  const tokens = await getTrendingTokens(12);
  const featuredToken = tokens[0];

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <Navbar featuredTokenAddress={featuredToken.address} />
      <main>
        <HeroSection featuredToken={featuredToken} />
        <MobileShowcase />
        <FeaturesSection />
        <DownloadSection />
        <DownloadCta featuredTokenAddress={featuredToken.address} />
      </main>
      <TokenBanner tokens={tokens} label="Tap any ticker to trade" reverse />
      <Footer />
    </div>
  );
}
