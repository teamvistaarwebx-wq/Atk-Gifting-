"use client";

import { useEffect, useRef, useState } from "react";
import { actions, useStore } from "@/lib/store";
import { deliveryFor } from "@/lib/leadTime";
import { addDays, formatDate, rupees, toDateInput } from "@/lib/format";
import { ArrowRight, CheckIcon, CloseIcon } from "./Icons";

// The single "Request a quote" form. Every entry point opens it via
// actions.openQuote(draft):
//   - gifting pages: blank (gift box contents, if any, are attached for context)
//   - a Made to Order product: product and quantity pre-filled
// Nothing is paid here. ATK calls the customer and sends a payment link.

export default function QuoteForm() {
  const draft = useStore((s) => s.quoteDraft);
  if (!draft) return null;
  return <QuoteDialog key={draft.key} draft={draft} />;
}

const SOURCE_LABEL = {
  gifting: "Gifting",
  corporate: "Corporate gifting",
  "made-to-order": "Made to Order",
};

function QuoteDialog({ draft }) {
  const leadTimes = useStore((s) => s.leadTimes);
  const [product, setProduct] = useState(draft.product ?? null);
  const [form, setForm] = useState({
    quantity: draft.quantity ? String(draft.quantity) : "",
    requiredBy: "",
    name: "",
    company: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [submittedRef, setSubmittedRef] = useState(null);
  const firstField = useRef(null);

  useEffect(() => {
    firstField.current?.focus();
    const onKey = (e) => e.key === "Escape" && actions.closeQuote();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, []);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const qty = Number.parseInt(form.quantity, 10);
  const validQty = Number.isFinite(qty) && qty > 0;
  const delivery = product && validQty ? deliveryFor(qty, leadTimes) : null;
  const earliest = delivery && !delivery.quoteOnly ? addDays(new Date(), delivery.days) : null;
  const tooSoon = earliest && form.requiredBy && new Date(form.requiredBy) < earliest;
  const tomorrow = toDateInput(addDays(new Date(), 1));

  function validate() {
    const e = {};
    if (!validQty) e.quantity = "Enter how many units you need.";
    if (!form.requiredBy) e.requiredBy = "Pick the date you need them by.";
    else if (form.requiredBy < tomorrow) e.requiredBy = "Pick a date from tomorrow onwards.";
    if (!form.name.trim()) e.name = "Enter your name.";
    if (form.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "").length !== 10)
      e.phone = "Enter a 10-digit mobile number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
    return e;
  }

  function submit(e) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    const ref = actions.submitQuote({
      source: product ? "made-to-order" : draft.source,
      product: product && { id: product.id, name: product.name, unitPrice: product.unitPrice },
      boxItems: draft.boxItems ?? [],
      team: draft.team ?? null,
      quantity: qty,
      requiredBy: form.requiredBy,
      deliveryEstimate: delivery ? (delivery.quoteOnly ? "Quote only" : `${delivery.days} days`) : null,
      name: form.name.trim(),
      company: form.company.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      notes: form.notes.trim(),
    });
    setSubmittedRef(ref);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" onClick={actions.closeQuote}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{SOURCE_LABEL[product ? "made-to-order" : draft.source]}</p>
            <h2 id="quote-title" className="mt-1 font-serif text-2xl text-ink">
              {submittedRef ? "Quote requested" : "Request a quote"}
            </h2>
          </div>
          <button type="button" aria-label="Close" onClick={actions.closeQuote} className="text-muted hover:text-ink">
            <CloseIcon />
          </button>
        </div>

        {submittedRef ? (
          <div className="mt-6">
            <div className="flex items-center gap-3 rounded-lg bg-cream p-4">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-maroon text-white">
                <CheckIcon />
              </span>
              <div>
                <p className="text-sm text-muted">Reference</p>
                <p className="font-serif text-lg text-maroon">{submittedRef}</p>
              </div>
            </div>
            <p className="mt-4 text-muted">
              Thank you, {form.name.split(" ")[0]}. Our team will call you on {form.phone} to talk through the
              order, confirm pricing and timelines, and send you a payment link. Nothing has been charged.
            </p>
            <button type="button" className="btn-primary mt-6 w-full" onClick={actions.closeQuote}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-2">
            <p className="text-sm text-muted">
              Tell us what you need. Our team will call you, talk through the order and send a payment link.
              Nothing is paid on the site.
            </p>

            {product && (
              <div className="mt-5 flex items-center justify-between gap-3 rounded-lg border border-line bg-cream px-4 py-3">
                <div>
                  <p className="font-medium text-ink">{product.name}</p>
                  <p className="text-sm text-muted">Made to Order · {rupees(product.unitPrice)} / unit, indicative</p>
                </div>
                <button type="button" onClick={() => setProduct(null)} className="text-xs text-maroon underline underline-offset-2">
                  Remove
                </button>
              </div>
            )}

            {draft.boxItems?.length > 0 && (
              <div className="mt-5 rounded-lg border border-line px-4 py-3">
                <p className="eyebrow">From your gift box</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {draft.boxItems.map((item) => (
                    <li key={item.id} className="flex justify-between gap-3">
                      <span>{item.name}</span>
                      <span className="text-muted">× {item.qty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Quantity (units)" required error={errors.quantity}>
                <input
                  ref={firstField}
                  type="number"
                  inputMode="numeric"
                  min={1}
                  className="field"
                  value={form.quantity}
                  onChange={update("quantity")}
                  placeholder={draft.team ? `e.g. ${draft.team.female + draft.team.male}` : "e.g. 25"}
                />
              </Field>
              <Field label="Required by" required error={errors.requiredBy}>
                <input type="date" min={tomorrow} className="field" value={form.requiredBy} onChange={update("requiredBy")} />
              </Field>
            </div>

            {delivery && (
              <div className={`mt-3 rounded-md px-4 py-3 text-sm ${tooSoon ? "bg-amber-50 text-amber-900" : "bg-blush text-ink"}`}>
                {delivery.quoteOnly ? (
                  <>Above this quantity we quote the delivery date with you on the call.</>
                ) : (
                  <>
                    {qty} units: delivery in about <strong>{delivery.days} days</strong>, around {formatDate(earliest)}.
                    {tooSoon && " Your date is earlier than that — send the request anyway and we'll tell you what's possible."}
                  </>
                )}
                <span className="mt-1 block text-muted">
                  Indicative value {rupees(product.unitPrice)} × {qty} = {rupees(product.unitPrice * qty)}. Final price in your quote.
                </span>
              </div>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required error={errors.name}>
                <input className="field" value={form.name} onChange={update("name")} autoComplete="name" />
              </Field>
              <Field label="Company (optional)">
                <input className="field" value={form.company} onChange={update("company")} autoComplete="organization" />
              </Field>
              <Field label="Phone" required error={errors.phone}>
                <input type="tel" className="field" value={form.phone} onChange={update("phone")} placeholder="+91 98765 43210" autoComplete="tel" />
              </Field>
              <Field label="Email" required error={errors.email}>
                <input type="email" className="field" value={form.email} onChange={update("email")} autoComplete="email" />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Anything we should know">
                <textarea rows={3} className="field resize-y" value={form.notes} onChange={update("notes")} placeholder="Colours, occasion, personalised cards, delivery cities…" />
              </Field>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button type="button" className="btn-outline sm:w-40" onClick={actions.closeQuote}>
                Cancel
              </button>
              <button type="submit" className="btn-primary flex-1">
                Request a quote <ArrowRight />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <label className="block">
      <span className="label">
        {label}
        {required && <span className="text-maroon"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-maroon">{error}</span>}
    </label>
  );
}
