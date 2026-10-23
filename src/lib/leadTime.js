// Made to Order lead times. Lead time depends on quantity, not on the product.
// Admin edits the bands; the customer always sees delivery time
// (production + finishing), never production time alone.

export const DEFAULT_LEAD_TIMES = {
  // Each band covers quantities up to `upTo` (inclusive). Anything above the
  // last band is quote only — no date is shown.
  bands: [
    { upTo: 20, productionDays: 30 },
    { upTo: 50, productionDays: 60 },
  ],
  // QC, packaging, card printing and dispatch (10–15 days; we show the upper end).
  finishingDays: 15,
};

export function sortedBands(settings) {
  return [...settings.bands].sort((a, b) => a.upTo - b.upTo);
}

export function bandLabel(bands, index) {
  const band = bands[index];
  if (index === 0) return `Up to ${band.upTo} units`;
  return `${bands[index - 1].upTo + 1}–${band.upTo} units`;
}

export function quoteOnlyLabel(bands) {
  const last = bands[bands.length - 1];
  return last ? `Above ${last.upTo} units` : "Any quantity";
}

// "about 45 days up to 20 units, about 75 days for 21–50 units"
export function deliverySummary(settings) {
  const bands = sortedBands(settings);
  return bands
    .map((b, i) => {
      const range = i === 0 ? `up to ${b.upTo}` : `for ${bands[i - 1].upTo + 1}–${b.upTo}`;
      return `about ${b.productionDays + settings.finishingDays} days ${range} units`;
    })
    .join(", ");
}

// Returns { quoteOnly: true } or { days, productionDays } for a quantity.
export function deliveryFor(quantity, settings) {
  const bands = sortedBands(settings);
  const band = bands.find((b) => quantity <= b.upTo);
  if (!band) return { quoteOnly: true };
  return {
    quoteOnly: false,
    productionDays: band.productionDays,
    days: band.productionDays + settings.finishingDays,
  };
}

export function deliveryText(quantity, settings) {
  const d = deliveryFor(quantity, settings);
  return d.quoteOnly ? "Quote only — we'll confirm the date" : `Delivery in about ${d.days} days`;
}
