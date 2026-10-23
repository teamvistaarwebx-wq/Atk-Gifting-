"use client";

import Image from "next/image";
import { CARD_DESIGNS, PACKAGING } from "@/data/products";
import { ArrowRight } from "../Icons";
import useStartGifting from "./useStartGifting";

const listNames = (items) => {
  const names = items.map((i) => i.name);
  return `${names.slice(0, -1).join(", ")} or ${names.at(-1)}`;
};

const PARTS = [
  {
    title: "The pieces you choose",
    body: "Sarees, dupattas, jewellery, footwear and more, from in-stock pieces or woven Made to Order.",
  },
  {
    title: "Handmade packaging",
    body: `${listNames(PACKAGING)}, each packed by hand.`,
  },
  {
    title: "Your message on a printed card",
    body: `On a ${listNames(CARD_DESIGNS)} card. For personalised cards, approve the proof within 24 hours.`,
  },
  {
    title: "Dispatched in 7–10 working days",
    body: "For in-stock boxes. Made to Order pieces follow the delivery time for your quantity.",
  },
];

export default function GiftBoxAnatomy() {
  const start = useStartGifting();

  return (
    <section className="container-atk grid items-center gap-12 py-16 md:grid-cols-2">
      <div className="rounded-3xl bg-petal p-8 sm:p-12">
        <Image src="/artisans/journey-5.png" alt="An open gift box with a folded paisley saree and a card" width={334} height={231} className="mx-auto h-auto w-full max-w-sm" />
      </div>
      <div>
        <p className="eyebrow text-maroon">Inside the box</p>
        <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">What&apos;s in an ATK gift box</h2>
        <dl className="mt-8 space-y-5">
          {PARTS.map((part) => (
            <div key={part.title} className="border-l-2 border-maroon/25 pl-4">
              <dt className="font-serif text-lg text-maroon">{part.title}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">{part.body}</dd>
            </div>
          ))}
        </dl>
        <button type="button" onClick={start} className="btn-primary mt-8 px-6">
          Build a gift <ArrowRight />
        </button>
      </div>
    </section>
  );
}
