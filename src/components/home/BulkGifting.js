"use client";

import Link from "next/link";
import { actions, useStore } from "@/lib/store";
import { deliverySummary, quoteOnlyLabel, sortedBands } from "@/lib/leadTime";
import { ArrowRight } from "../Icons";

export default function BulkGifting() {
  const leadTimes = useStore((s) => s.leadTimes);

  const lanes = [
    { title: "In stock", body: "Pay online and we dispatch in 7–10 working days, up to 50 pieces." },
    { title: "Made to Order", body: `Woven for you: ${deliverySummary(leadTimes)}.` },
    { title: quoteOnlyLabel(sortedBands(leadTimes)), body: "Quote only. We plan materials, looms and dates with you on a call." },
  ];

  return (
    <section className="bg-blush py-16">
      <div className="container-atk grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div>
          <p className="eyebrow text-maroon">For teams and bulk orders</p>
          <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Gifting 10 people, or 500?</h2>
          <p className="mt-3 text-muted">
            Tell us your team size and occasion. We&apos;ll recommend pieces, hold stock for larger orders and send a
            quote. Nothing is paid on the site for quotes.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/corporate" className="btn-primary px-6">
              Get recommendations <ArrowRight />
            </Link>
            <button type="button" onClick={() => actions.openQuote({ source: "corporate" })} className="btn-outline px-6">
              Request a quote
            </button>
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {lanes.map((lane) => (
            <li key={lane.title} className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="font-serif text-lg text-maroon">{lane.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{lane.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
