"use client";

import Link from "next/link";
import { CATEGORIES } from "@/data/products";
import { MADE_TO_ORDER } from "@/data/madeToOrder";
import { actions } from "@/lib/store";
import TalkBanner from "@/components/TalkBanner";
import CatalogueFilters, { useCatalogue } from "@/components/CatalogueFilters";
import MadeToOrderCard from "@/components/MadeToOrderCard";
import LeadTimeBands from "@/components/LeadTimeBands";
import { ArrowRight } from "@/components/Icons";

const priceOf = (p) => p.unitPrice;
const categories = CATEGORIES.filter((c) => MADE_TO_ORDER.some((p) => p.category === c));

export default function MadeToOrderPage() {
  const catalogue = useCatalogue(MADE_TO_ORDER, priceOf);

  return (
    <>
      <TalkBanner />
      <section className="container-atk pb-24 pt-10">
        <Link href="/gifting" className="text-sm text-maroon underline underline-offset-2">
          ← In-stock gifts (ship in 7–10 working days)
        </Link>
        <div className="mt-4 max-w-3xl">
          <h1 className="font-serif text-3xl text-maroon sm:text-4xl">Made to Order</h1>
          <p className="mt-2 text-muted">
            Pieces our artisans weave for you once you commit to a quantity. Pick a piece and how many you need,
            then request a quote. Nothing is paid on the site. Our team calls you, confirms the details and sends a
            payment link.
          </p>
        </div>

        <div className="mt-6">
          <LeadTimeBands />
        </div>

        <div className="mt-10">
          <CatalogueFilters catalogue={catalogue} categories={categories} />
        </div>

        <p className="mt-8 text-sm text-muted">{catalogue.visible.length} products</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {catalogue.visible.map((p) => (
            <MadeToOrderCard key={p.id} product={p} />
          ))}
        </div>
        {catalogue.visible.length === 0 && <p className="py-16 text-center text-muted">No pieces match these filters.</p>}

        <div className="mt-14 flex flex-col items-center gap-3 rounded-lg bg-cream px-6 py-8 text-center">
          <p className="font-serif text-xl">Looking for something not listed?</p>
          <p className="max-w-xl text-muted">Tell us the piece, quantity and date. We&apos;ll come back with what our weavers can do.</p>
          <button type="button" className="btn-primary mt-2" onClick={() => actions.openQuote({ source: "made-to-order" })}>
            Request a quote <ArrowRight />
          </button>
        </div>
      </section>
    </>
  );
}
