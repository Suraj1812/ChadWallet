import Image from "next/image";
import { siteConfig } from "@/config/site";

type StoreBadgeProps = {
  compact?: boolean;
  store: "apple" | "google";
};

const badges = {
  apple: {
    alt: "Download on the App Store",
    height: 40,
    src: "/badges/app-store.svg",
    width: 120,
  },
  google: {
    alt: "Get it on Google Play",
    height: 45,
    src: "/badges/google-play.png",
    width: 151,
  },
};

export function StoreBadge({ compact = false, store }: StoreBadgeProps) {
  const isApple = store === "apple";
  const href = isApple ? siteConfig.links.iphone : siteConfig.links.android;
  const badge = badges[store];

  return (
    <a
      aria-label={isApple ? "Download ChadWallet on the App Store" : "Get ChadWallet on Google Play"}
      className="group inline-flex items-center justify-center transition duration-200 hover:-translate-y-px hover:brightness-110"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <Image
        alt={badge.alt}
        className={compact ? "h-auto max-h-9 w-auto object-contain" : "h-auto max-h-[54px] w-auto object-contain"}
        height={badge.height}
        src={badge.src}
        width={badge.width}
      />
    </a>
  );
}
