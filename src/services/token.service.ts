import { fallbackTokens } from "@/data/tokens";
import { getBirdEyeTokenDetails, getBirdEyeTrendingTokens } from "@/services/birdeye.service";
import type { Token } from "@/types/token";

export async function getTrendingTokens(limit = 12): Promise<Token[]> {
  const tokens = await getBirdEyeTrendingTokens(limit);
  return tokens.length ? tokens : fallbackTokens.slice(0, limit);
}

export function findTokenByAddress(tokens: Token[], address: string) {
  const normalized = address.toLowerCase();

  return tokens.find((token) => token.address.toLowerCase() === normalized);
}

export async function getTokenDetails(address: string, tokens?: Token[]) {
  const tokenList = tokens ?? (await getTrendingTokens(14));
  const token = findTokenByAddress(tokenList, address) ?? fallbackTokens[0];

  return getBirdEyeTokenDetails(token.address.toLowerCase() === address.toLowerCase() ? token : {
    ...token,
    address,
  });
}

export { fallbackTokens };
