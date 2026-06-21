const DEFAULT_SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";

export function getSolanaRuntimeStatus() {
  const rpcUrl = process.env.ALCHEMY_RPC_URL ?? process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL;
  const configured = Boolean(rpcUrl);

  return {
    chain: "Solana",
    cluster: "mainnet-beta",
    configured,
    label: configured ? "Alchemy RPC configured" : "Public Solana RPC fallback",
    rpcUrl: rpcUrl ?? DEFAULT_SOLANA_RPC_URL,
  };
}
