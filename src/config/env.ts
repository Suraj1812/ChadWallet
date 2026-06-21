export const env = {
  privyAppId: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
  birdeyeApiKey: process.env.BIRDEYE_API_KEY ?? process.env.NEXT_PUBLIC_BIRDEYE_API_KEY,
  alchemyRpcUrl: process.env.ALCHEMY_RPC_URL ?? process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL,
};
