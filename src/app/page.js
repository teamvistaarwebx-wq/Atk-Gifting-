"use client";

import { useRouter } from "next/navigation";
import { actions } from "@/lib/store";
import { ArrowRight } from "@/components/Icons";
import { GiftBoxSketch, GiftPhoto, TeamSketch } from "@/components/Illustrations";

const FEATURES = ["Premium fabrics", "Traditional weaves", "For every occasion", "Timeless beauty"];

const STEPS = [
  {
    title: "Choose your gifting path",
    body: "Building a personal gift, or gifting your whole team — pick the journey that fits, and we tailor everything after this to it.",
  },
  {
    title: "Pick pieces or get recommendations",
    body: "Browse sarees, dupattas, and jewellery yourself, or let us recommend a set based on your team's headcount and split.",
  },
  {
    title: "Add packaging & a personal card",
    body: "Every order includes your choice of packaging and a complimentary card — full custom box design unlocks at 50+ units.",
  },
  {
    title: "Checkout or request a quote",
    body: "In-stock boxes check out right away and ship in 7–10 working days. Made to Order and larger orders get a quote and a call from our team.",
  },
];

export default function Home() {
  const router = useRouter();

  const startIndividual = () => {
    if (actions.setMode("individual")) actions.toast("Gift box cleared — you've left corporate gifting.");
    router.push("/gifting");
  };

  return (
    <>
      <section className="bg-gradient-to-r from-[#efe3d3] via-[#f8f1ea] to-[#efe3d3]">
        <div className="container-atk flex flex-col items-center py-16 text-center sm:py-20">
          <p className="font-serif tracking-[0.4em] text-maroon/80">TIMELESS</p>
          <p className="font-logo text-7xl italic leading-none text-maroon sm:text-8xl">Sarees</p>
          <p className="mt-2 font-serif tracking-[0.35em] text-maroon/80">FOR EVERY STORY</p>
          <ul className="mt-8 flex flex-wrap justify-center gap-6 text-[0.65rem] font-semibold uppercase tracking-wider text-maroon/80 sm:gap-10">
            {FEATURES.map((f) => (
              <li key={f} className="flex w-20 flex-col items-center gap-2">
                <span className="h-7 w-7 rotate-45 rounded-sm border border-maroon/50" />
                {f}
              </li>
            ))}
          </ul>
          <button type="button" onClick={startIndividual} className="btn-primary mt-8 px-6 py-2.5 text-xs uppercase tracking-widest">
            Explore collection <ArrowRight />
          </button>
        </div>
      </section>

      <section className="container-atk py-16">
        <h1 className="font-serif text-3xl text-maroon sm:text-4xl">A gift, woven from the heart of Artisans</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink">
          Handpicked sarees, handicraft and sweets, packed into one box with a message from you.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <PathCard
            eyebrow="Individual"
            title="Build a gift"
            body="Combine a saree, dupatta, jewellery and sweets into one personal box."
            cta="Start building"
            onClick={startIndividual}
            art={<GiftBoxSketch className="absolute bottom-0 right-0 h-[85%] w-auto" />}
          />
          <PathCard
            eyebrow="Corporate"
            title="Gift your team"
            body="Tell us your staff count, we'll recommend gifts and quote you."
            cta="Get recommendations"
            onClick={() => router.push("/corporate")}
            art={<TeamSketch className="absolute bottom-0 right-0 h-[90%] w-auto" />}
          />
        </div>
      </section>

      <section className="bg-maroon py-16 text-white">
        <div className="container-atk">
          <p className="text-center text-sm">How it works</p>
          <h2 className="mt-1 text-center font-serif text-2xl text-[#f3dfb6]">From selection to your doorstep, in four steps</h2>
          <ol className="mt-12 space-y-16">
            {STEPS.map((step, i) => (
              <li key={step.title} className={`flex flex-col items-center gap-8 md:flex-row ${i % 2 ? "md:flex-row-reverse" : ""}`}>
                <div className={`w-64 shrink-0 rounded-md bg-white p-2 shadow-xl ${i % 2 ? "rotate-[-6deg]" : "rotate-[-8deg]"}`}>
                  <GiftPhoto variant={i} className="block w-full rounded-sm" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl sm:text-3xl">{step.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-white/85">{step.body}</p>
                </div>
                <span className="font-serif text-6xl font-bold text-white/60 sm:text-7xl">{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

function PathCard({ eyebrow, title, body, cta, onClick, art }) {
  return (
    <div className="relative flex min-h-60 flex-col overflow-hidden rounded-2xl border border-maroon bg-cream">
      {art}
      <div className="relative max-w-[60%] flex-1 p-7">
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
