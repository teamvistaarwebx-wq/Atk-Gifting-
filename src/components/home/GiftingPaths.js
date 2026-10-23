"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LoomIcon } from "../Icons";
import { GiftBoxSketch, TeamSketch } from "../Illustrations";
import useStartGifting from "./useStartGifting";

export default function GiftingPaths() {
  const router = useRouter();
  const start = useStartGifting();

  return (
    <section className="container-atk py-16">
      <p className="eyebrow">Choose your path</p>
      <h2 className="mt-2 font-serif text-3xl text-ink">Who are you gifting?</h2>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <PathCard
          eyebrow="Individual"
          title="Build a gift"
          body="Combine a saree, dupatta, jewellery and sweets into one personal box."
          cta="Start building"
          onClick={start}
          art={<GiftBoxSketch className="h-full w-auto" />}
        />
        <PathCard
          eyebrow="Corporate"
          title="Gift your team"
          body="Tell us your staff count, we'll recommend gifts and quote you."
          cta="Get recommendations"
          onClick={() => router.push("/corporate")}
          art={<TeamSketch className="h-full w-auto" />}
        />
      </div>

      <Link
        href="/made-to-order"
        className="group mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-maroon/40 px-5 py-4 hover:border-maroon"
      >
        <span className="flex items-center gap-3">
          <span className="text-maroon">
            <LoomIcon />
          </span>
          <span>
            <span className="font-semibold text-ink">Need it woven for you?</span>{" "}
            <span className="text-muted">Our artisans weave Made to Order pieces in your colours and quantity.</span>
          </span>
        </span>
        <span className="flex items-center gap-1 font-semibold text-maroon">
          Explore Made to Order <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </section>
  );
}

function PathCard({ eyebrow, title, body, cta, onClick, art }) {
  return (
    <div className="relative flex min-h-60 flex-col overflow-hidden rounded-2xl border border-maroon bg-cream">
      {/* Faint behind the text on phones, full strength beside it from sm up */}
      <span className="pointer-events-none absolute bottom-0 right-0 h-[55%] opacity-25 sm:h-[85%] sm:opacity-100" aria-hidden>
        {art}
      </span>
      <div className="relative flex-1 p-7 sm:max-w-[60%]">
        <p className="text-sm text-maroon">{eyebrow}</p>
        <h3 className="mt-2 font-serif text-3xl text-maroon">{title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-maroon">{body}</p>
      </div>
      <button
        type="button"
        onClick={onClick}
        className="relative inline-flex w-fit items-center gap-2 rounded-tr-3xl bg-maroon px-6 py-3.5 font-semibold text-white hover:bg-maroon-dark"
      >
        {cta} <ArrowRight />
      </button>
    </div>
  );
}
