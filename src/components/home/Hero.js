"use client";

import Image from "next/image";
import { ArrowRight } from "../Icons";
import useStartGifting from "./useStartGifting";

const PROOF = [
  ["8,000+", "artisans supported"],
  ["Direct", "from the craft clusters"],
  ["7–10 days", "dispatch for in-stock boxes"],
];

export default function Hero() {
  const start = useStartGifting();
  const meetArtisans = () => document.getElementById("artisans")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="overflow-hidden bg-gradient-to-b from-white to-blush">
      <div className="container-atk grid items-center gap-10 py-12 md:grid-cols-[1.1fr_1fr] md:py-16">
        <div className="min-w-0">
          <p className="eyebrow text-maroon">A CSR initiative of Annapurna Finance</p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.1] text-maroon sm:text-5xl lg:text-6xl">
            A gift, woven from the heart of Artisans
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink">
            Handpicked sarees, handicraft and sweets, packed into one box with a message from you. Every piece comes
            straight from the weavers and craftspeople who made it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={start} className="btn-primary px-6">
              Build a gift <ArrowRight />
            </button>
            <button type="button" onClick={meetArtisans} className="btn-outline px-6">
              Meet the artisans
            </button>
          </div>
          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-maroon/15 pt-6">
            {PROOF.map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-serif text-xl text-maroon sm:text-2xl">{value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Temple-arch frame around the weaver at the loom */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="relative rounded-t-full border border-maroon/25 bg-petal px-8 pb-10 pt-24">
            <Image src="/artisans/journey-3.png" alt="A weaver at a handloom" width={304} height={222} priority className="mx-auto h-auto w-full" />
          </div>
          <p className="absolute -left-2 top-1/3 rounded-full bg-white px-4 py-2 font-serif text-sm text-maroon shadow-md sm:-left-6">
            Woven by hand
          </p>
          <p className="absolute -right-2 bottom-16 rounded-full bg-maroon px-4 py-2 text-sm text-white shadow-md sm:-right-6">
            Handloom from Odisha
          </p>
        </div>
      </div>
    </section>
  );
}
