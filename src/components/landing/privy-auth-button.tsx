"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { shortAddress } from "@/utils/format";

const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

type PrivyAuthButtonProps = {
  className?: string;
  compact?: boolean;
};

function ConfigMissingButton({ className, compact }: PrivyAuthButtonProps) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="relative">
      <button
        className={cn(
          "rounded-full bg-chad px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(215,255,56,0.25)]",
          compact && "px-4 py-2 text-[11px]",
          className,
        )}
        onClick={() => setShowHint((value) => !value)}
        type="button"
      >
        Sign in
      </button>
      {showHint ? (
        <p className="absolute right-0 top-12 z-20 w-64 rounded-2xl border border-chad/30 bg-black p-3 text-xs normal-case tracking-normal text-white/75 shadow-2xl">
          Add <span className="font-mono text-chad">NEXT_PUBLIC_PRIVY_APP_ID</span> to enable
          Apple and Google login through Privy.
        </p>
      ) : null}
    </div>
  );
}

function ConnectedPrivyButton({ className, compact }: PrivyAuthButtonProps) {
  const { authenticated, login, logout, ready, user } = usePrivy();
  const [error, setError] = useState<string | null>(null);

  function handleLogin() {
    setError(null);
    Promise.resolve(login({ loginMethods: ["google", "apple"] })).catch(() => {
      setError("Sign-in failed. Please retry Apple or Google.");
    });
  }

  if (!ready) {
    return (
      <button
        className={cn(
          "rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/50",
          compact && "px-4 py-2 text-[11px]",
          className,
        )}
        disabled
        type="button"
      >
        Loading
      </button>
    );
  }

  if (authenticated) {
    return (
      <button
        className={cn(
          "rounded-full border border-emerald-300/40 bg-emerald-300/10 px-5 py-3 text-sm font-bold text-emerald-100 transition hover:border-emerald-200",
          compact && "px-4 py-2 text-[11px]",
          className,
        )}
        onClick={logout}
        type="button"
      >
        {shortAddress(user?.wallet?.address ?? user?.id ?? "Connected")}
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        className={cn(
          "rounded-full bg-chad px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(215,255,56,0.25)]",
          compact && "px-4 py-2 text-[11px]",
          className,
        )}
        onClick={handleLogin}
        type="button"
      >
        Sign in
      </button>
      {error ? (
        <p className="absolute right-0 top-12 z-20 w-56 rounded-2xl border border-red-300/30 bg-black p-3 text-xs normal-case tracking-normal text-red-100 shadow-2xl">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function PrivyAuthButton(props: PrivyAuthButtonProps) {
  if (!privyAppId) {
    return <ConfigMissingButton {...props} />;
  }

  return <ConnectedPrivyButton {...props} />;
}
