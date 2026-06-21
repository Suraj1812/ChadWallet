import Image from "next/image";
import Link from "next/link";
import { PrivyAuthButton } from "@/components/landing/privy-auth-button";
import { StoreBadge } from "@/components/landing/store-badge";
import { siteConfig } from "@/config/site";

type NavbarProps = {
  featuredTokenAddress: string;
};

export function Navbar({ featuredTokenAddress }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#050612]/65 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-4 lg:px-6">
        <Link className="flex items-center gap-3" href="/">
          <Image
            alt="ChadWallet logo"
            className="rounded-2xl shadow-[0_0_40px_rgba(215,255,56,0.16)]"
            height={42}
            priority
            src="/logo/dark.png"
            width={42}
          />
          <div>
            <p className="text-lg font-black tracking-tight">{siteConfig.name}</p>
            <p className="hidden text-[10px] uppercase tracking-[0.24em] text-white/45 sm:block">
              Social Solana wallet
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-semibold text-white/58 lg:flex">
          <Link className="transition hover:text-white" href="/#features">
            Features
          </Link>
          <Link className="transition hover:text-white" href="/#download">
            App
          </Link>
          <Link className="transition hover:text-white" href={"/trade/" + featuredTokenAddress}>
            Trading
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 xl:flex">
            <StoreBadge compact store="apple" />
            <StoreBadge compact store="google" />
          </div>
          <Link
            className="hidden rounded-2xl border border-white/12 bg-white/[0.07] px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:border-white/25 hover:bg-white/[0.12] md:block"
            href={"/trade/" + featuredTokenAddress}
          >
            Trade
          </Link>
          <PrivyAuthButton compact />
        </div>
      </nav>
    </header>
  );
}
