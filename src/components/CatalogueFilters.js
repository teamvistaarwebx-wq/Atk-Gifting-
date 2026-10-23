"use client";

import { useMemo, useState } from "react";
import { ChevronDown, SlidersIcon } from "./Icons";

const GENDERS = [
  { id: "all", label: "All" },
  { id: "women", label: "Women" },
  { id: "men", label: "Men" },
];

const PRICE_RANGES = [
  { id: "any", label: "Any price", test: () => true },
  { id: "u2", label: "Under ₹2,000", test: (p) => p < 2000 },
  { id: "2-5", label: "₹2,000 – ₹5,000", test: (p) => p >= 2000 && p <= 5000 },
  { id: "5-15", label: "₹5,000 – ₹15,000", test: (p) => p > 5000 && p <= 15000 },
  { id: "15+", label: "Above ₹15,000", test: (p) => p > 15000 },
];

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
];

// Shared All / Women / Men + category + price + sort controls, used by both the
// in-stock catalogue and Made to Order so the two look the same.
export function useCatalogue(items, priceOf) {
  const [gender, setGender] = useState("all");
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState("any");
  const [sort, setSort] = useState("featured");

  const visible = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.id === price);
    const list = items.filter(
      (p) =>
        (gender === "all" || p.gender === gender) &&
        (!category || p.category === category) &&
        range.test(priceOf(p)),
    );
    if (sort === "price-asc") list.sort((a, b) => priceOf(a) - priceOf(b));
    if (sort === "price-desc") list.sort((a, b) => priceOf(b) - priceOf(a));
    return list;
  }, [items, priceOf, gender, category, price, sort]);

  return { visible, gender, setGender, category, setCategory, price, setPrice, sort, setSort };
}

export default function CatalogueFilters({ catalogue, categories }) {
  const { gender, setGender, category, setCategory, price, setPrice, sort, setSort } = catalogue;
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div>
      <div role="tablist" className="flex gap-6 font-serif text-lg">
        {GENDERS.map((g) => (
          <button
            key={g.id}
            role="tab"
            aria-selected={gender === g.id}
            onClick={() => setGender(g.id)}
            className={`pb-1 ${gender === g.id ? "border-b-2 border-maroon text-maroon" : "text-muted hover:text-ink"}`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
          className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 ${showFilters || price !== "any" ? "bg-maroon text-white" : "bg-[#e9e6e5] text-ink"}`}
        >
          <SlidersIcon /> Filters
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(category === c ? null : c)}
            className={`rounded-md border px-4 py-2 ${category === c ? "border-maroon bg-maroon text-white" : "border-line bg-white hover:border-maroon/40"}`}
          >
            {c}
          </button>
        ))}
        <label className="relative ml-auto inline-flex items-center rounded-md bg-[#f6f4f3] px-4 py-2.5">
          <span className="sr-only">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none bg-transparent pr-6 outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                Sort: {s.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4" />
        </label>
      </div>

      {showFilters && (
        <div className="mt-4 flex flex-wrap gap-2 rounded-md border border-line p-4">
          <span className="eyebrow mr-2 self-center">Price</span>
          {PRICE_RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setPrice(r.id)}
              className={`rounded-full border px-3 py-1 text-sm ${price === r.id ? "border-maroon bg-maroon text-white" : "border-line hover:border-maroon/40"}`}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
