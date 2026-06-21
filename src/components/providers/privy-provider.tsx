"use client";

import { PrivyProvider, type PrivyClientConfig } from "@privy-io/react-auth";
import type { ReactNode } from "react";

const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

const privyConfig = {
  appearance: {
    theme: "dark",
    accentColor: "#d7ff38",
    logo: "/logo/dark.png",
    landingHeader: "Enter ChadWallet",
    loginMessage: "Sign in with Apple or Google and bring a Solana wallet.",
    showWalletLoginFirst: false,
    walletChainType: "solana-only",
  },
  loginMethods: ["google", "apple", "wallet"],
  embeddedWallets: {
    solana: {
      createOnLogin: "users-without-wallets",
    },
  },
} satisfies PrivyClientConfig;

export function AppProviders({ children }: { children: ReactNode }) {
  if (!privyAppId) {
    return <>{children}</>;
  }

  return (
    <PrivyProvider appId={privyAppId} config={privyConfig}>
      {children}
    </PrivyProvider>
  );
}
