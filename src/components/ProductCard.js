"use client";

import { actions, useStore } from "@/lib/store";
import { rupees } from "@/lib/format";
import ProductArt from "./ProductArt";
import { CheckIcon } from "./Icons";

export default function ProductCard({ product }) {
  const inBox = useStore((s) => s.box.some((item) => item.id === product.id));
  const lowStock = product.stock < 10;

  return (
    <article className="panel flex flex-col overflow-hidden">
      <ProductArt name={product.name} category={product.category} className="aspect-square w-full" />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="min-h-12 text-[0.95rem] leading-snug text-ink">{product.name}</h3>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="font-serif text-lg font-semibold">{rupees(product.price)}</span>
          {product.mrp && <s className="text-sm text-muted">{rupees(product.mrp)}</s>}
        </p>
        <p className={`mt-1 text-xs ${lowStock ? "text-maroon" : "text-muted"}`}>
          {lowStock ? `Only ${product.stock} left` : "In stock"}
        </p>
        <button
          type="button"
          onClick={() => actions.toggleInBox(product.id)}
          aria-pressed={inBox}
          className={`mt-3 ${inBox ? "btn-primary" : "btn-outline"} w-full py-2.5`}
        >
          {inBox ? (
            <>
              <CheckIcon /> Added to Gift Box
            </>
          ) : (
            "Select for Gift"
          )}
        </button>
      </div>
    </article>
  );
}
