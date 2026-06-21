import { siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

type StoreBadgeProps = {
  compact?: boolean;
  store: "apple" | "google";
};

function AppleIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
      <path
        d="M17.05 12.52c-.03-2.72 2.23-4.05 2.33-4.11-1.28-1.86-3.25-2.12-3.94-2.15-1.66-.17-3.27.99-4.12.99-.86 0-2.16-.97-3.56-.94-1.8.03-3.49 1.07-4.42 2.7-1.91 3.31-.49 8.17 1.35 10.84.92 1.31 1.99 2.78 3.38 2.73 1.36-.06 1.87-.87 3.51-.87 1.63 0 2.1.87 3.53.84 1.46-.03 2.38-1.32 3.26-2.64 1.06-1.51 1.48-3 1.5-3.07-.03-.01-2.79-1.07-2.82-4.32ZM14.36 4.5c.74-.93 1.24-2.19 1.1-3.48-1.07.05-2.4.74-3.17 1.65-.68.8-1.29 2.11-1.13 3.35 1.2.09 2.43-.61 3.2-1.52Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 28 28">
      <path d="M4.15 2.7c-.33.32-.52.82-.52 1.47v19.66c0 .65.19 1.15.53 1.47l.08.07 11.02-11.23v-.27L4.23 2.63l-.08.07Z" fill="#39d98a" />
      <path d="m18.92 17.89-3.66-3.75v-.27l3.66-3.75.08.05 4.33 2.46c1.24.7 1.24 1.84 0 2.55L19 17.84l-.08.05Z" fill="#ffd166" />
      <path d="m19 17.84-3.74-3.83L4.15 25.3c.52.49 1.37.55 2.33 0L19 17.84Z" fill="#ff5c7c" />
      <path d="M19 10.16 6.48 2.7c-.96-.55-1.81-.49-2.33 0l11.11 11.31L19 10.16Z" fill="#5aa7ff" />
    </svg>
  );
}

export function StoreBadge({ compact = false, store }: StoreBadgeProps) {
  const isApple = store === "apple";
  const href = isApple ? siteConfig.links.iphone : siteConfig.links.android;

  return (
    <a
      aria-label={isApple ? "Download ChadWallet on the App Store" : "Get ChadWallet on Google Play"}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-[1.05rem] border border-white/18 bg-white/[0.13] px-4 py-2.5 text-left text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.2] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_24px_70px_rgba(74,91,255,0.22)]",
        compact ? "h-11 px-3 py-2" : "h-[58px] min-w-[176px]",
      )}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-black/45 text-white ring-1 ring-white/10 transition group-hover:bg-black/60">
        {isApple ? <AppleIcon /> : <GooglePlayIcon />}
      </span>
      <span className="leading-none">
        <span className={cn("block text-[10px] font-semibold uppercase tracking-[0.1em] text-white/65", compact && "hidden")}>
          {isApple ? "Download on the" : "Get it on"}
        </span>
        <span className={cn("block text-[19px] font-black tracking-[-0.04em]", compact && "text-sm")}>
          {isApple ? "App Store" : "Google Play"}
        </span>
      </span>
    </a>
  );
}
