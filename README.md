# ChadWallet assignment MVP

Polished Next.js MVP for the ChadWallet founding engineer screen: fomo.family-inspired landing page, Privy Apple/Google auth, Solana-first trading preview, rotating token banners, and `/trade/[address]` token pages.

## Routes

- `/` — ChadWallet landing page with hero, app store links, feature sections, and top/bottom token marquees.
- `/trade/[address]` — trading UI with searchable trending tokens, token stats, fallback chart, holders, live trades, buy/sell preview, position, and portfolio/RPC status.

## Environment variables

Required for full live integrations:

```bash
NEXT_PUBLIC_PRIVY_APP_ID=
BIRDEYE_API_KEY=
ALCHEMY_RPC_URL=
```

Optional legacy/public fallbacks supported by the code while developing:

```bash
NEXT_PUBLIC_BIRDEYE_API_KEY=
NEXT_PUBLIC_ALCHEMY_RPC_URL=
```

If `BIRDEYE_API_KEY` is missing, the app automatically falls back to realistic Solana mock data so every route still renders. If `ALCHEMY_RPC_URL` is missing, the UI shows a public Solana RPC fallback status. If `NEXT_PUBLIC_PRIVY_APP_ID` is missing, the sign-in button remains visible and explains what env var to add.

## Getting Started

Install dependencies if needed, then run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Validation

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Notes

- Root `app/` is the active App Router structure. Shared implementation lives in `src/`.
- BirdEye live data is read server-side and never blocks rendering; failed or missing API keys fall back to demo data.
- TradingView's private charting library is not bundled, so the trading page uses a clean responsive SVG price chart backed by BirdEye OHLCV when available.

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
