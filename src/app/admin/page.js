"use client";

import { useState } from "react";
import { actions, useStore } from "@/lib/store";
import { bandLabel, quoteOnlyLabel, sortedBands } from "@/lib/leadTime";
import { formatDate, rupees } from "@/lib/format";

const STATUSES = [
  ["new", "New"],
  ["called", "Called"],
  ["link-sent", "Payment link sent"],
  ["closed", "Closed"],
];

const SOURCE_LABEL = { gifting: "Gifting", corporate: "Corporate", "made-to-order": "Made to Order" };

export default function AdminPage() {
  const { leadTimes, quotes, orders } = useStore((s) => ({ leadTimes: s.leadTimes, quotes: s.quotes, orders: s.orders }));

  return (
    <section className="container-atk space-y-12 py-10">
      <div>
        <p className="eyebrow">ATK admin</p>
        <h1 className="mt-1 font-serif text-3xl text-maroon">Gifting settings</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          There is no login or backend yet: these settings and requests are saved in this browser only.
        </p>
      </div>

      {/* Remount when the stored table changes so the draft starts from it. */}
      <LeadTimeEditor key={JSON.stringify(leadTimes)} leadTimes={leadTimes} />

      <div>
        <h2 className="font-serif text-2xl">Quote requests</h2>
        <p className="mt-1 text-sm text-muted">Call the customer, agree the order and advance, then send a payment link.</p>
        {quotes.length === 0 ? (
          <p className="mt-4 rounded-lg border border-dashed border-line p-6 text-center text-sm text-muted">No quote requests yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[56rem] text-left text-sm">
              <thead className="bg-cream text-xs uppercase text-muted">
                <tr>
                  {["Ref", "Received", "Source", "Customer", "Request", "Qty", "Required by", "Est. delivery", "Status"].map((h) => (
                    <th key={h} className="px-3 py-2 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line align-top">
                {quotes.map((q) => (
                  <tr key={q.ref}>
                    <td className="px-3 py-3 font-semibold text-maroon">{q.ref}</td>
                    <td className="px-3 py-3">{formatDate(q.createdAt)}</td>
                    <td className="px-3 py-3">{SOURCE_LABEL[q.source] ?? q.source}</td>
                    <td className="px-3 py-3">
                      {q.name}
                      {q.company && <span className="block text-muted">{q.company}</span>}
                      <span className="block text-muted">{q.phone}</span>
                      <span className="block text-muted">{q.email}</span>
                    </td>
                    <td className="px-3 py-3">
                      {q.product && (
                        <span className="block">
                          {q.product.name} <span className="text-muted">({rupees(q.product.unitPrice)}/unit)</span>
                        </span>
                      )}
                      {q.boxItems?.map((item) => (
                        <span key={item.id} className="block">
                          {item.name} × {item.qty}
                        </span>
                      ))}
                      {q.team && (
                        <span className="block text-muted">
                          {q.team.festival}: {q.team.female} women, {q.team.male} men
                        </span>
                      )}
                      {q.notes && <span className="mt-1 block italic text-muted">“{q.notes}”</span>}
                      {!q.product && !q.boxItems?.length && !q.notes && <span className="text-muted">—</span>}
                    </td>
                    <td className="px-3 py-3">{q.quantity}</td>
                    <td className="px-3 py-3">{formatDate(q.requiredBy)}</td>
                    <td className="px-3 py-3">{q.deliveryEstimate ?? "—"}</td>
                    <td className="px-3 py-3">
                      <select
                        value={q.status}
                        onChange={(e) => actions.setQuoteStatus(q.ref, e.target.value)}
                        className="rounded border border-line bg-white px-2 py-1"
                        aria-label={`Status of ${q.ref}`}
                      >
                        {STATUSES.map(([id, label]) => (
                          <option key={id} value={id}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <h2 className="font-serif text-2xl">Direct orders</h2>
        {orders.length === 0 ? (
          <p className="mt-4 rounded-lg border border-dashed border-line p-6 text-center text-sm text-muted">No orders yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line rounded-lg border border-line text-sm">
            {orders.map((o) => (
              <li key={o.ref} className="flex flex-wrap justify-between gap-3 px-4 py-3">
                <span className="font-semibold text-maroon">{o.ref}</span>
                <span>{formatDate(o.createdAt)}</span>
                <span>{o.customer.name}</span>
                <span>{plural(o.items.reduce((n, i) => n + i.qty, 0), "piece")} · {plural(o.boxes, "box", "boxes")}</span>
                <span className="font-semibold">{rupees(o.total)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

function LeadTimeEditor({ leadTimes }) {
  const [bands, setBands] = useState(() => sortedBands(leadTimes).map((b) => ({ ...b })));
  const [finishingDays, setFinishingDays] = useState(leadTimes.finishingDays);
  const [error, setError] = useState("");

  const updateBand = (i, key, value) =>
    setBands((list) => list.map((b, j) => (j === i ? { ...b, [key]: Number.parseInt(value, 10) || 0 } : b)));

  const addBand = () =>
    setBands((list) => {
      const last = list[list.length - 1] ?? { upTo: 0, productionDays: 0 };
      return [...list, { upTo: last.upTo + 50, productionDays: last.productionDays + 30 }];
    });

  function save() {
    const invalid = bands.some((b, i) => b.upTo < 1 || b.productionDays < 1 || (i > 0 && b.upTo <= bands[i - 1].upTo));
    if (invalid) {
      setError("Each band needs a quantity above the previous band and production days above zero.");
      return;
    }
    if (finishingDays < 0) {
      setError("Finishing days can't be negative.");
      return;
    }
    setError("");
    actions.saveLeadTimes({ bands, finishingDays });
    actions.toast("Lead times saved — Made to Order now shows the new delivery times.");
  }

  return (
    <div>
      <h2 className="font-serif text-2xl">Made to Order lead times</h2>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        Lead time depends on quantity, not product type. Customers only see the delivery time: production plus the
        finishing days for QC, packaging, card printing and dispatch.
      </p>

      <div className="mt-4 overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="bg-cream text-xs uppercase text-muted">
            <tr>
              <th className="px-3 py-2">Quantity band</th>
              <th className="px-3 py-2">Up to (units)</th>
              <th className="px-3 py-2">Production days</th>
              <th className="px-3 py-2">Customer sees</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {bands.map((band, i) => (
              <tr key={i}>
                <td className="px-3 py-2">{bandLabel(bands, i)}</td>
                <td className="px-3 py-2">
                  <input type="number" min={1} className="field w-24 py-1.5" value={band.upTo} onChange={(e) => updateBand(i, "upTo", e.target.value)} aria-label={`Upper quantity for band ${i + 1}`} />
                </td>
                <td className="px-3 py-2">
                  <input type="number" min={1} className="field w-24 py-1.5" value={band.productionDays} onChange={(e) => updateBand(i, "productionDays", e.target.value)} aria-label={`Production days for band ${i + 1}`} />
                </td>
                <td className="px-3 py-2 font-semibold text-maroon">About {band.productionDays + finishingDays} days</td>
                <td className="px-3 py-2 text-right">
                  {bands.length > 1 && (
                    <button type="button" onClick={() => setBands((list) => list.filter((_, j) => j !== i))} className="text-xs text-muted underline hover:text-maroon">
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
            <tr className="bg-blush/60">
              <td className="px-3 py-2">{quoteOnlyLabel(bands)}</td>
              <td className="px-3 py-2 text-muted" colSpan={2}>
                Quote only
              </td>
              <td className="px-3 py-2 text-muted">No date shown</td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-4">
        <label>
          <span className="label">QC, packaging, card printing &amp; dispatch (days)</span>
          <input type="number" min={0} className="field w-28" value={finishingDays} onChange={(e) => setFinishingDays(Number.parseInt(e.target.value, 10) || 0)} />
        </label>
        <button type="button" onClick={addBand} className="btn-outline">
          Add band
        </button>
        <button type="button" onClick={save} className="btn-primary">
          Save lead times
        </button>
        <button type="button" onClick={actions.resetLeadTimes} className="text-sm text-muted underline">
          Reset to defaults
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-maroon">{error}</p>}
    </div>
  );
}
