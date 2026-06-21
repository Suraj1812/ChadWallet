import Image from "next/image";

const screens = [
  { src: "/app-store/search.png", label: "Search" },
  { src: "/app-store/kol.png", label: "KOLs" },
  { src: "/app-store/launch.png", label: "Launches" },
];

export function MobileShowcase() {
  return (
    <section className="border-y border-white/10 bg-white/[0.03] px-4 py-20 lg:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-chad">Mobile native</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-6xl">
            Never lose a trade between phone and web.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/60">
            The landing page mirrors the ChadWallet app story: discover on mobile, track signal,
            then jump into a focused web trading panel when conviction hits.
          </p>
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-black">
            <video
              autoPlay
              className="aspect-video h-full w-full object-cover"
              loop
              muted
              playsInline
              poster="/flow/portfolio-4.png"
              src="/video/chadwallet.mp4"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 items-end gap-3 sm:gap-5">
          {screens.map((screen, index) => (
            <div
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-2 shadow-2xl"
              key={screen.src}
              style={{ transform: "translateY(" + (index === 1 ? "-28px" : "18px") + ")" }}
            >
              <Image
                alt={"ChadWallet " + screen.label + " screen"}
                className="rounded-[1.55rem]"
                height={672}
                src={screen.src}
                width={310}
              />
              <p className="px-2 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-white/55">
                {screen.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
