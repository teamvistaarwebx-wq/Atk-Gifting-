"use client";

import { useState } from "react";
import { actions, useStore } from "@/lib/store";
import { deliveryText } from "@/lib/leadTime";
import { rupees } from "@/lib/format";
import ProductArt from "./ProductArt";
import { ArrowRight, ClockIcon } from "./Icons";

const DEFAULT_QTY = 10;

// Made to Order piece: indicative unit price and a quantity, no stock and no
// buy button. "Request a quote" opens the shared form pre-filled.
export default function MadeToOrderCard({ product }) {
  const leadTimes = useStore((s) => s.leadTimes);
  const [qty, setQty] = useState(DEFAULT_QTY);
  const setClamped = (n) => setQty(Math.max(1, Number.isFinite(n) ? n : 1));

  return (
    <article className="panel flex flex-col overflow-hidden">
      <div className="relative">
        <ProductArt name={product.name} category={product.category} className="aspect-square w-full" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[0.7rem] font-semibold text-maroon">
          Made to Order
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[0.95rem] leading-snug text-ink">{product.name}</h3>
        <p className="mt-1 min-h-10 text-xs text-muted">{product.details}</p>
        <p className="mt-2">
          <span className="font-serif text-lg font-semibold">{rupees(product.unitPrice)}</span>
          <span className="text-sm text-muted"> / unit · indicative</span>
        </p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-sm text-muted">Quantity</span>
          <div className="inline-flex items-center rounded-md border border-line">
            <button type="button" aria-label={`Decrease quantity of ${product.name}`} disabled={qty <= 1} onClick={() => setClamped(qty - 1)} className="px-3 py-1.5 text-maroon disabled:opacity-40">
              −
            </button>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              aria-label={`Quantity of ${product.name}`}
              value={qty}
              onChange={(e) => setClamped(Number.parseInt(e.target.value, 10))}
              className="w-14 bg-transparent text-center font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button type="button" aria-label={`Increase quantity of ${product.name}`} onClick={() => setClamped(qty + 1)} className="px-3 py-1.5 text-maroon">
              +
            </button>
          </div>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-ink">
          <ClockIcon /> {deliveryText(qty, leadTimes)}
        </p>

        <button
          type="button"
          onClick={() =>
            actions.openQuote({
              source: "made-to-order",
              product: { id: product.id, name: product.name, unitPrice: product.unitPrice },
              quantity: qty,
            })
          }
          className="btn-primary mt-4 w-full py-2.5"
        >
          Request a quote <ArrowRight />
        </button>
      </div>
    </article>
  );
}
