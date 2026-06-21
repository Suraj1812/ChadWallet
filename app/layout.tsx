import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/privy-provider";
import { siteConfig } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chadwallet.xyz"),
  applicationName: "ChadWallet",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ChadWallet",
  },
  authors: [{ name: "ChadWallet" }],
  category: "finance",
  creator: "ChadWallet",
  keywords: [
    "ChadWallet",
    "Solana",
    "memecoin trading",
    "crypto wallet",
    "social trading",
    "BirdEye",
    "Privy",
  ],
  title: {
    default: "ChadWallet — Social Solana Trading",
    template: "%s | ChadWallet",
  },
  description: siteConfig.description,
  openGraph: {
    title: "ChadWallet — Social Solana Trading",
    description: siteConfig.description,
    siteName: "ChadWallet",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChadWallet — Social Solana Trading",
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#070918",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable + " " + geistMono.variable + " h-full"}>
      <body className="min-h-full bg-background text-foreground antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
