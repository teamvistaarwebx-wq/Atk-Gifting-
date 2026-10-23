"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { actions, useStore } from "@/lib/store";
import { DISPATCH_TEXT, PROOF_APPROVAL_TEXT, summarise } from "@/lib/giftBox";
import { rupees } from "@/lib/format";
import TalkBanner from "@/components/TalkBanner";
import ProductArt from "@/components/ProductArt";
import { TruckIcon } from "@/components/Icons";

const STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const EMPTY = { name: "", email: "", phone: "", address: "", city: "", pin: "", state: "" };

export default function CheckoutPage() {
  const router = useRouter();
  const state = useStore();
  const summary = summarise(state);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  if (summary.lines.length === 0) {
    return (
      <section className="container-atk py-20 text-center">
        <h1 className="font-serif text-3xl">Nothing to check out</h1>
        <Link href="/gifting" className="btn-primary mt-6">
          Browse the collection
        </Link>
      </section>
    );
  }

  const blocked = state.message.trim() === "" || summary.stockProblems.length > 0;
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function placeOrder(e) {
    e.preventDefault();
    const found = {};
    if (!form.name.trim()) found.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = "Enter a valid email.";
    if (form.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "").length !== 10) found.phone = "Enter a 10-digit mobile number.";
    if (!form.address.trim()) found.address = "Enter the delivery address.";
    if (!form.city.trim()) found.city = "Enter the city.";
    if (!/^\d{6}$/.test(form.pin)) found.pin = "Enter a 6-digit pin code.";
    if (!form.state) found.state = "Select a state.";
    setErrors(found);
    if (Object.keys(found).length || blocked) return;

    // Payment gateway hooks in here. Pieces are reserved only once payment succeeds.
    actions.placeOrder({
      mode: state.mode,
      items: summary.lines.map((l) => ({ id: l.id, name: l.name, qty: l.qty, price: l.price })),
      packaging: summary.packaging.name,
      card: summary.card.name,
      message: state.message,
      boxes: summary.boxes,
      total: summary.total,
      customer: form,
    });
    router.push("/order-placed");
  }

  return (
    <>
      <TalkBanner />
      <form onSubmit={placeOrder} noValidate className="container-atk grid gap-8 pb-20 pt-10 lg:grid-cols-[1fr_30rem]">
        <div>
          <h1 className="font-serif text-3xl text-maroon">Checkout</h1>
          <div className="panel mt-6 space-y-4 p-5">
            <h2 className="font-serif text-sm font-semibold uppercase">Contact details</h2>
            <Input label="Full name" value={form.name} onChange={update("name")} error={errors.name} autoComplete="name" />
            <Input label="Email" type="email" value={form.email} onChange={update("email")} error={errors.email} autoComplete="email" />
            <Input label="Phone" type="tel" value={form.phone} onChange={update("phone")} error={errors.phone} placeholder="+91 98765 43210" autoComplete="tel" hint="We'll send an OTP on WhatsApp to confirm this number." />

            <h2 className="pt-2 font-serif text-sm font-semibold uppercase">Delivery address</h2>
            <label className="block">
              <span className="label">Address (house no., street, area)</span>
              <textarea rows={2} className="field" value={form.address} onChange={update("address")} autoComplete="street-address" />
              {errors.address && <span className="mt-1 block text-xs text-maroon">{errors.address}</span>}
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="City" value={form.city} onChange={update("city")} error={errors.city} autoComplete="address-level2" />
              <Input label="Pin Code" inputMode="numeric" maxLength={6} value={form.pin} onChange={update("pin")} error={errors.pin} autoComplete="postal-code" />
            </div>
            <label className="block">
              <span className="label">State</span>
              <select className="field" value={form.state} onChange={update("state")}>
                <option value="">Select a state</option>
                {STATES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              {errors.state && <span className="mt-1 block text-xs text-maroon">{errors.state}</span>}
            </label>
          </div>
        </div>

        <aside className="lg:pt-14">
          <div className="panel p-5">
            <h2 className="font-serif text-sm font-semibold uppercase">Order summary</h2>
            <ul className="mt-3 divide-y divide-line">
              {summary.lines.map((l) => (
                <li key={l.id} className="flex items-center gap-3 py-3">
                  <ProductArt name={l.name} category={l.category} className="h-12 w-12 shrink-0 rounded" />
                  <div className="flex-1 text-sm">
                    <p>{l.name}</p>
                    <p className="text-xs text-muted">Qty {l.qty}</p>
                  </div>
                  <span className="font-semibold text-maroon">{rupees(l.price * l.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="space-y-1 border-y border-line py-3 text-sm">
              <Pair label="Packaging" value={summary.packaging.name} />
              <Pair label="Card Design" value={summary.card.name} />
              <Pair label="Card message" value={state.message || "—"} />
            </dl>
            <dl className="space-y-1 py-3 text-sm text-muted">
              <Pair plain label={`Items (${String(summary.pieces).padStart(2, "0")})`} value={rupees(summary.items)} />
              <Pair plain label="Packaging" value={rupees(summary.packagingTotal)} />
              <Pair plain label="Card" value={rupees(summary.cardTotal)} />
            </dl>
            <div className="flex items-center justify-between border-t border-line pt-4">
              <span className="font-serif text-lg font-semibold">Total Payable</span>
              <span className="font-serif text-2xl font-bold text-maroon">{rupees(summary.total)}</span>
            </div>

            <div className="mt-4 space-y-1.5 rounded-md bg-cream p-3 text-xs text-muted">
              <p className="flex items-center gap-2 font-medium text-ink">
                <TruckIcon /> {DISPATCH_TEXT}
              </p>
              <p>{PROOF_APPROVAL_TEXT}</p>
              <p>Pieces are reserved for you once payment completes.</p>
            </div>

            {blocked && (
              <p className="mt-3 text-xs text-maroon">
                Your gift box needs attention before you can pay.{" "}
                <Link href="/gift-box" className="underline">
                  Back to gift box
                </Link>
              </p>
            )}

            <div className="mt-5 grid grid-cols-[1fr_2fr] gap-3">
              <button type="button" className="btn-outline" onClick={() => router.push("/gift-box")}>
                Back
              </button>
              <button type="submit" className="btn-primary" disabled={blocked}>
                Place Order
              </button>
            </div>
          </div>
        </aside>
      </form>
    </>
  );
}

function Input({ label, error, hint, ...props }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <input className="field" {...props} />
      {hint && !error && <span className="mt-1 block text-xs text-muted">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-maroon">{error}</span>}
    </label>
  );
}

function Pair({ label, value, plain }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className={plain ? "" : "text-maroon"}>{label}{plain ? "" : ":"}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
