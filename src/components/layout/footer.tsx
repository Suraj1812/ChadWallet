import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-10 text-sm text-white/55">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto_auto]">
        <div className="max-w-md">
          <div className="mb-4 flex items-center gap-3 text-white">
            <Image alt="" className="rounded-xl" height={36} src="/logo/dark.png" width={36} />
            <span className="font-black">{siteConfig.name}</span>
          </div>
          <p>{siteConfig.description}</p>
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white">Build</p>
          <div className="grid gap-2">
            <Link href="/#features">Features</Link>
            <Link href="/#download">Download</Link>
            <Link href="/trade/So11111111111111111111111111111111111111112">Trading preview</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white">Apps</p>
          <div className="grid gap-2">
            <a href={siteConfig.links.iphone} rel="noreferrer" target="_blank">
              iPhone
            </a>
            <a href={siteConfig.links.android} rel="noreferrer" target="_blank">
              Android
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
