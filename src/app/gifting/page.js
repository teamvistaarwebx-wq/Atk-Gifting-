"use client";

import Link from "next/link";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { useStore } from "@/lib/store";
import TalkBanner from "@/components/TalkBanner";
import CatalogueFilters, { useCatalogue } from "@/components/CatalogueFilters";
import ProductCard from "@/components/ProductCard";
import GiftBoxPill from "@/components/GiftBoxPill";
import MadeToOrderLink from "@/components/MadeToOrderLink";
import BulkHelp from "@/components/BulkHelp";

const priceOf = (p) => p.price;

export default function GiftingPage() {
  const { mode, team } = useStore((s) => ({ mode: s.mode, team: s.team }));
  const catalogue = useCatalogue(PRODUCTS, priceOf);
  const corporate = mode === "corporate";

  return (
    <>
      <TalkBanner />
      <section className="container-atk pb-32 pt-10">
        {corporate && (
          <p className="mb-6 text-sm text-muted">
            Corporate gifting · {team.festival} · {team.female + team.male} team members ({team.female} women,{" "}
            {team.male} men) ·{" "}
            <Link href="/corporate" className="text-maroon underline underline-offset-2">
              Edit
            </Link>
          </p>
        )}

        <CatalogueFilters catalogue={catalogue} categories={CATEGORIES} />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted">{catalogue.visible.length} products</p>
          <MadeToOrderLink />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {catalogue.visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {catalogue.visible.length === 0 && <p className="py-16 text-center text-muted">No pieces match these filters.</p>}

        <BulkHelp source={corporate ? "corporate" : "gifting"} className="mt-14" />
      </section>
      <GiftBoxPill />
    </>
  );
}
