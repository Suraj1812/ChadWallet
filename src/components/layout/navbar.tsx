import Image from "next/image";
import Link from "next/link";
import { PrivyAuthButton } from "@/components/landing/privy-auth-button";
import { siteConfig } from "@/config/site";

type NavbarProps = {
  featuredTokenAddress: string;
};

export function Navbar({ featuredTokenAddress }: NavbarProps) {
  return (
    <header className="absolute inset-x-0 top-14 z-50">
      <nav className="mx-auto flex h-[64px] max-w-[1500px] items-center justify-between px-6">
        <Link className="flex items-center gap-3" href="/">
          <Image
            alt="ChadWallet logo"
            className="rounded-md"
            height={42}
            priority
            src="/logo/dark.png"
            width={42}
          />

          <div>
            <p className="text-base font-black tracking-tight text-white">
              {siteConfig.name}
            </p>

            <p className="hidden text-[9px] uppercase tracking-[0.24em] text-white/50 sm:block">
              Social Solana Wallet
            </p>
          </div>
        </Link>

        <PrivyAuthButton compact />
      </nav>
    </header>
  );
}