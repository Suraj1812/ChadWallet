import Image from "next/image";
import { features } from "@/data/features";

export function FeaturesSection() {
  return (
    <section className="px-4 py-20 lg:px-6" id="features">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-chad">
            Social-first trading
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] sm:text-6xl">
            Built for the moment before consensus.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#080a12]/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:-translate-y-1 hover:border-white/18"
              key={feature.title}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  alt=""
                  className="object-cover opacity-75 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  src={feature.image}
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-chad">
                  {feature.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-black tracking-[-0.03em]">{feature.title}</h3>
                <p className="mt-3 leading-7 text-white/60">{feature.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
