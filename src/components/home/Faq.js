"use client";

import { useStore } from "@/lib/store";
import { deliverySummary, quoteOnlyLabel, sortedBands } from "@/lib/leadTime";
import { PHONE_DISPLAY } from "../TalkBanner";

const faqs = (leadTimes) => [
  {
    q: "Who makes the pieces in my gift box?",
    a: "Weavers and craftspeople from the clusters ATK works with, many of them in Odisha. ATK buys from them directly, so more of the price reaches the maker.",
  },
  {
    q: "How long does delivery take?",
    a: `In-stock gift boxes are dispatched in 7–10 working days, including orders of up to 50 pieces. Made to Order pieces depend on quantity: ${deliverySummary(leadTimes)}. ${quoteOnlyLabel(sortedBands(leadTimes))}, we quote the date with you.`,
  },
  {
    q: "Can I order 30 or 50 boxes and pay online?",
    a: "Yes, as long as the pieces, boxes and cards are in stock for that quantity. Pieces are only reserved once you pay, so for 30 or more we suggest requesting a quote and we hold them for you while we confirm.",
  },
  {
    q: "Do I pay anything when I request a quote?",
    a: "No. Our team calls you to talk through the order, then sends a payment link for the advance. Nothing is charged on the website.",
  },
  {
    q: "How does the personalised card work?",
    a: "Your message is printed on the card in every box. For personalised cards we send you a proof, and approving it within 24 hours keeps your order on the 7–10 working day dispatch.",
  },
  {
    q: "Can I talk to someone instead?",
    a: `Of course. Larger orders are easier over a quick call. Reach our team on ${PHONE_DISPLAY}.`,
  },
];

export default function Faq() {
  const leadTimes = useStore((s) => s.leadTimes);
  return (
    <section className="container-atk grid gap-10 py-16 lg:grid-cols-[1fr_2fr]">
      <div>
        <p className="eyebrow text-maroon">Questions</p>
        <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Before you gift</h2>
      </div>
      <div className="divide-y divide-line border-y border-line">
        {faqs(leadTimes).map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-ink marker:hidden">
              {f.q}
              <span className="text-2xl leading-none text-maroon transition-transform group-open:rotate-45" aria-hidden>
                +
              </span>
            </summary>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
