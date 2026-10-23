"use client";

import { useStore } from "@/lib/store";
import { bandLabel, quoteOnlyLabel, sortedBands } from "@/lib/leadTime";

// Customer-facing lead-time table: delivery time per quantity band.
// Production time is never shown on its own.
export default function LeadTimeBands() {
  const leadTimes = useStore((s) => s.leadTimes);
  const bands = sortedBands(leadTimes);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        {bands.map((band, i) => (
          <div key={band.upTo} className="rounded-lg border border-line bg-white p-4">
            <p className="text-sm text-muted">{bandLabel(bands, i)}</p>
            <p className="mt-1 font-serif text-xl text-maroon">About {band.productionDays + leadTimes.finishingDays} days</p>
            <p className="text-xs text-muted">to delivery</p>
          </div>
        ))}
        <div className="rounded-lg border border-line bg-white p-4">
          <p className="text-sm text-muted">{quoteOnlyLabel(bands)}</p>
          <p className="mt-1 font-serif text-xl text-maroon">Quote only</p>
          <p className="text-xs text-muted">we confirm the date with you</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">
        Delivery times include quality checks, packaging, card printing and dispatch. Lead time depends on quantity, not on the piece.
      </p>
    </div>
  );
}
