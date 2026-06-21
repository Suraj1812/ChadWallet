import Image from "next/image";
import type { Token } from "@/types/token";
import { cn } from "@/utils/cn";

type TokenAvatarProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  token: Pick<Token, "accent" | "logoUrl" | "name" | "symbol">;
};

const sizeClasses = {
  sm: "h-6 w-6 rounded-full",
  md: "h-10 w-10 rounded-xl",
  lg: "h-14 w-14 rounded-2xl sm:h-16 sm:w-16",
};

const imageSizes = {
  sm: 24,
  md: 40,
  lg: 64,
};

export function TokenAvatar({ className, size = "md", token }: TokenAvatarProps) {
  const dimension = imageSizes[size];

  if (token.logoUrl) {
    return (
      <span
        className={cn(
          "relative shrink-0 overflow-hidden bg-white/[0.04] ring-1 ring-white/10",
          sizeClasses[size],
          className,
        )}
      >
        <Image
          alt={token.name + " logo"}
          className="object-cover"
          fill
          sizes={dimension + "px"}
          src={token.logoUrl}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center font-mono font-black text-black",
        sizeClasses[size],
        className,
      )}
      style={{ background: token.accent }}
    >
      {token.symbol.slice(0, 2)}
    </span>
  );
}
