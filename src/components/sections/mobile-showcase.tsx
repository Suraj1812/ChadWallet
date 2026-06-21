"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const screens = [
  { src: "/app-store/search.png", label: "Search" },
  { src: "/app-store/kol.png", label: "KOLs" },
  { src: "/app-store/launch.png", label: "Launches" },
];

export function MobileShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % screens.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="overflow-hidden border-y border-white/10 bg-white/[0.03] px-4 py-20 lg:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-chad">
            Mobile native
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-6xl">
            Never lose a trade between phone and web.
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-8 text-white/60">
            The landing page mirrors the ChadWallet app story: discover on
            mobile, track signal, then jump into a focused web trading panel
            when conviction hits.
          </p>

          <div className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-black">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/flow/portfolio-4.png"
              src="/video/chadwallet.mp4"
              className="aspect-video h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <div className="absolute h-[450px] w-[450px] rounded-full bg-chad/15 blur-[140px]" />
          <div className="absolute h-[250px] w-[250px] rounded-full bg-white/5 blur-[80px]" />

          <div className="relative z-10 w-full max-w-[320px]">
            <Image
              key={screens[active].src}
              alt={`ChadWallet ${screens[active].label} screen`}
              src={screens[active].src}
              width={320}
              height={690}
              className="h-auto w-full rounded-3xl transition-all duration-700"
              priority
            />
          </div>

          <div className="relative z-10 mt-4 flex items-center justify-center gap-2">
            {screens.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${active === index
                    ? "w-6 bg-chad"
                    : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}