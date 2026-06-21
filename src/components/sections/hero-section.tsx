"use client";

import Link from "next/link";
import type { Token } from "@/types/token";
import { useRef, useEffect } from "react";

type HeroSectionProps = {
  featuredToken: Token;
};

export function HeroSection({ featuredToken }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const handleLoadedMetadata = () => {
      video.pause();
      video.currentTime = 0;
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!video || !section) return;

          const sectionTop = section.getBoundingClientRect().top;
          const viewportHeight = window.innerHeight;

          let progress = -sectionTop / viewportHeight;
          progress = Math.max(0, Math.min(1, progress));

          if (progress <= 0 || progress >= 1) {
            video.pause();
          }

          if (video.duration) {
            video.currentTime = progress * video.duration;
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(88,101,242,0.12),transparent_45%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-5xl text-center">
            <h1 className="text-balance font-extrabold leading-[0.88] tracking-[-0.09em] text-[#eef0ff] text-[4rem] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem]">
              Trade Solana
              <br />
              before it trends.
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-balance text-lg leading-8 text-[#c7cad9] sm:text-xl">
              Discover high-signal tokens on Solana and move from discovery to
              execution in seconds.
            </p>

            <div className="mt-10">
              <Link
                href={`/trade/${featuredToken.address}`}
                className="inline-flex items-center justify-center rounded-2xl bg-[#5865F2] px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6974ff]"
              >
                Start Trading
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}