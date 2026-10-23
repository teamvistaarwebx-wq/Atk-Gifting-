"use client";

import { ArrowRight } from "../Icons";
import useStartGifting from "./useStartGifting";

// Occasion ideas. Per the 16 Oct MOM the Diwali block sits lower on the page
// and is not clickable, so these are information only, with one CTA below.
const OCCASIONS = [
  { name: "Diwali", when: "Oct – Nov", idea: "Silk sarees, stoles and a festive card for family and teams." },
  { name: "Rakhi", when: "Aug", idea: "Dupattas, potli bags and silk ties to send with the rakhi." },
  { name: "Weddings", when: "Through the year", idea: "Banarasi and Khandua silk with temple or kundan jewellery." },
  { name: "New Year", when: "Dec – Jan", idea: "Pashmina mufflers, khadi stoles and pocket squares for the team." },
  { name: "Work anniversaries", when: "Any time", idea: "One box per person, your message printed on every card." },
  { name: "Thank you", when: "Any time", idea: "A single handloom piece, packed by hand and sent with a note." },
];

export default function Occasions() {
  const start = useStartGifting();

  return (
    <section className="container-atk py-16">
      <p className="eyebrow text-maroon">Occasions</p>
      <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">A handmade gift for every occasion</h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OCCASIONS.map((o) => (
          <li key={o.name} className="rounded-xl border border-line p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-serif text-xl text-maroon">{o.name}</h3>
              <span className="text-xs text-muted">{o.when}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{o.idea}</p>
          </li>
        ))}
      </ul>
      <button type="button" onClick={start} className="btn-outline mt-8 px-6">
        Start building your gift <ArrowRight />
      </button>
    </section>
  );
}
