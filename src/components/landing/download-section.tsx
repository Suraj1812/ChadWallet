import Image from "next/image";
import { StoreBadge } from "@/components/landing/store-badge";

export function DownloadSection() {
  return (
    <section className="px-4 py-10 lg:px-6" id="download">
      <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-xl border border-white/12 bg-[#0b0d22] text-white shadow-[0_40px_140px_rgba(0,0,0,0.42)] lg:grid-cols-[1fr_0.9fr]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(215,255,56,0.18),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(75,85,217,0.3),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_36%)]" />

        <div className="relative p-8 sm:p-12 lg:p-16">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-chad">
            Download ChadWallet
          </p>

          <h2 className="mt-4 max-w-2xl text-4xl font-black leading-none tracking-[-0.06em] sm:text-6xl">
            The mobile app for traders who move first.
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-8 text-white/60">
            Install the app, sign in, and carry the same Solana discovery flow
            from pocket to desktop preview.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <StoreBadge store="apple" />
            <StoreBadge store="google" />
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden">
          <Image
            alt="ChadWallet splash screen"
            src="/app-store/splash.png"
            width={310}
            height={672}
            className="absolute left-10 top-10 w-56 rotate-[-8deg] rounded-lg shadow-2xl sm:w-72"
          />

          <Image
            alt="ChadWallet deposit screen"
            src="/app-store/deposit.png"
            width={310}
            height={672}
            className="absolute bottom-0 right-8 w-56 rotate-[7deg] rounded-lg shadow-2xl sm:w-72"
          />
        </div>
      </div>
    </section>
  );
}