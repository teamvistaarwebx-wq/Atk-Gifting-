"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CARD_DESIGNS, PACKAGING, PRODUCTS } from "@/data/products";
import { actions, useStore } from "@/lib/store";
import { BULK_QUOTE_THRESHOLD, DISPATCH_TEXT, PROOF_APPROVAL_TEXT, linesForQuote, summarise } from "@/lib/giftBox";
import { rupees } from "@/lib/format";
import TalkBanner from "@/components/TalkBanner";
import ProductArt from "@/components/ProductArt";
import QtyStepper from "@/components/QtyStepper";
import BulkHelp from "@/components/BulkHelp";
import { HoldTimer } from "@/components/HoldWatcher";
import { ArrowRight, CheckIcon, TruckIcon } from "@/components/Icons";

const MESSAGE_LIMIT = 250;

export default function GiftBoxPage() {
  const router = useRouter();
  const state = useStore();
  const summary = summarise(state);
  const corporate = state.mode === "corporate";

  if (summary.lines.length === 0) {
    return (
      <>
        <TalkBanner />
        <section className="container-atk py-20 text-center">
          <h1 className="font-serif text-3xl">Your Gift Box is empty</h1>
          <p className="mt-2 text-muted">Pick a few pieces and they&apos;ll show up here.</p>
          <Link href="/gifting" className="btn-primary mt-6">
            Browse the collection <ArrowRight />
          </Link>
        </section>
      </>
    );
  }

  const needsMessage = state.message.trim().length === 0;
  const canCheckout = !needsMessage && summary.stockProblems.length === 0;
  const boxSuffix = summary.boxes > 1 ? ` × ${summary.boxes}` : "";

  const requestQuote = () =>
    actions.openQuote({
      source: corporate ? "corporate" : "gifting",
      boxItems: linesForQuote(summary.lines),
      team: corporate ? state.team : null,
    });

  const inBox = new Set(state.box.map((i) => i.id));
  const preferred = summary.gender.men > summary.gender.women ? "men" : "women";
  const recommended = PRODUCTS.filter((p) => !inBox.has(p.id))
    .sort((a, b) => (b.gender === preferred) - (a.gender === preferred))
    .slice(0, 4);

  const checkoutButton = (
    <button
      type="button"
      disabled={!canCheckout}
      onClick={() => router.push("/checkout")}
      className={summary.bulk ? "btn-outline w-full" : "btn-primary w-full"}
    >
      Proceed to Checkout
    </button>
  );
  const quoteButton = (
    <button type="button" onClick={requestQuote} className={summary.bulk ? "btn-primary w-full" : "btn-outline w-full"}>
      Request a quote <ArrowRight />
    </button>
  );

  return (
    <>
      <TalkBanner />
      <section className="container-atk grid gap-8 pb-20 pt-10 lg:grid-cols-[1fr_22rem]">
        <div>
          <h1 className="font-serif text-3xl text-ink">Your Gift Box</h1>
          <p className="mt-2 text-muted">
            {corporate
              ? `Gifting ${state.team.female + state.team.male} team members for ${state.team.festival}. One box and card per piece.`
              : "Edit quantities and add recommended pieces before checkout."}
          </p>

          <div className="panel mt-6 p-5">
            <h2 className="text-sm font-semibold">Selected items</h2>
            <ul className="mt-2 divide-y divide-line">
              {summary.lines.map((line) => (
                <li key={line.id} className="flex items-center gap-4 py-4">
                  <ProductArt name={line.name} category={line.category} className="h-16 w-16 shrink-0 rounded-md" />
                  <div className="flex-1">
                    <p className="text-ink">{line.name}</p>
                    <p className="font-semibold">{rupees(line.price)}</p>
                    {line.qty >= line.stock && <p className="text-xs text-maroon">Only {line.stock} in stock</p>}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <QtyStepper value={line.qty} max={line.stock} onChange={(q) => actions.setQty(line.id, q)} label={line.name} />
                    <button type="button" onClick={() => actions.remove(line.id)} className="text-xs text-muted underline underline-offset-2 hover:text-maroon">
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <h2 className="mt-10 font-serif text-2xl">Packaging &amp; Card</h2>
          <p className="mt-1 text-muted">
            Every box is packed by hand and carries a printed card. Your personalized message is included at no extra cost.
          </p>

          <p className="eyebrow mt-6 text-ink">Packaging</p>
          <OptionGrid
            options={PACKAGING}
            selected={state.packagingId}
            onSelect={actions.setPackaging}
            needed={summary.boxes}
            unit="boxes"
            className="grid-cols-2 sm:grid-cols-4"
          />

          <label className="mt-8 block">
            <span className="eyebrow text-ink">
              Personalized message card <span className="text-maroon">*</span>
            </span>
            <textarea
              rows={3}
              maxLength={MESSAGE_LIMIT}
              value={state.message}
              onChange={(e) => actions.setMessage(e.target.value)}
              placeholder="Write a few words for the person receiving this box"
              className="field mt-2 resize-y bg-white"
            />
            <span className="mt-1 flex justify-between text-xs text-muted">
              <span>Printed on the card in every box.</span>
              <span>{MESSAGE_LIMIT - state.message.length} left</span>
            </span>
          </label>

          <p className="eyebrow mt-6 text-ink">Card design</p>
          <OptionGrid
            options={CARD_DESIGNS}
            selected={state.cardId}
            onSelect={actions.setCard}
            needed={summary.boxes}
            unit="cards"
            className="grid-cols-3"
          />

          <BulkHelp source={corporate ? "corporate" : "gifting"} className="mt-10" />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="panel p-5">
            <Row label={`Items (${String(summary.pieces).padStart(2, "0")})`} value={rupees(summary.items)} />
            <Row label={`Packaging — ${summary.packaging.name}${boxSuffix}`} value={rupees(summary.packagingTotal)} />
            <Row label={`Card — ${summary.card.name}${boxSuffix}`} value={rupees(summary.cardTotal)} />
            <div className="mt-3 flex items-center justify-between border-t border-line pt-4">
              <span className="font-semibold text-maroon">Estimated value</span>
              <span className="font-serif text-2xl font-bold text-maroon">{rupees(summary.total)}</span>
            </div>
          </div>

          <div className="space-y-2 rounded-lg bg-cream p-4 text-sm">
            <p className="flex items-center gap-2 font-medium text-ink">
              <TruckIcon /> In stock · {DISPATCH_TEXT}
            </p>
            <p className="text-muted">{PROOF_APPROVAL_TEXT}</p>
            <HoldTimer />
          </div>

          {summary.bulk && (
            <div className="rounded-lg border border-maroon/30 p-4 text-sm">
              <p className="font-semibold text-maroon">Ordering {summary.pieces} pieces?</p>
              <p className="mt-1 text-muted">
                Pieces aren&apos;t reserved until payment. For {BULK_QUOTE_THRESHOLD}+ pieces, request a quote and
                we&apos;ll hold them for you while we confirm. Prefer to pay now? Direct checkout still works.
              </p>
            </div>
          )}

          {summary.bulk ? (
            <>
              {quoteButton}
              {checkoutButton}
            </>
          ) : (
            <>
              {checkoutButton}
              {quoteButton}
            </>
          )}

          {needsMessage && <p className="text-xs text-maroon">Add a personalized message to continue.</p>}
          {summary.stockProblems.map((p) => (
            <p key={p} className="text-xs text-maroon">
              {p} Choose another option or request a quote.
            </p>
          ))}

          <Link href="/gifting" className="block text-center text-sm text-maroon underline underline-offset-2">
            Continue Shopping
          </Link>

          <div className="pt-4">
            <h2 className="font-serif text-xl">Recommended for Your Gift Box</h2>
            <p className="mt-1 text-xs text-muted">Based on what&apos;s already in your box.</p>
            <ul className="mt-3 space-y-3">
              {recommended.map((p) => (
                <li key={p.id} className="panel flex items-center gap-3 p-3">
                  <ProductArt name={p.name} category={p.category} className="h-14 w-14 shrink-0 rounded-md" />
                  <div className="flex-1 text-sm">
                    <p className="font-serif leading-snug">{p.name}</p>
                    <p className="font-semibold">
                      {rupees(p.price)} {p.mrp && <s className="text-xs font-normal text-muted">{rupees(p.mrp)}</s>}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Add ${p.name}`}
                    onClick={() => actions.addToBox(p.id)}
                    className="grid h-10 w-10 place-items-center rounded-md border border-maroon text-xl text-maroon hover:bg-blush"
                  >
                    +
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-1 text-sm text-muted">
      <span>{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}

// Packaging / card tiles. An option without enough stock for the order's
// boxes can't be chosen (Lane A: boxes and cards must be in stock).
function OptionGrid({ options, selected, onSelect, needed, unit, className }) {
  return (
    <div className={`mt-2 grid gap-3 ${className}`}>
      {options.map((o) => {
        const short = o.stock < needed;
        const active = o.id === selected;
        return (
          <button
            key={o.id}
            type="button"
            disabled={short && !active}
            onClick={() => onSelect(o.id)}
            aria-pressed={active}
            className={`relative rounded-lg border p-2 text-left transition ${active ? "border-maroon ring-1 ring-maroon" : "border-line hover:border-maroon/40"} ${short ? "opacity-60" : ""}`}
          >
            <span className="block aspect-[4/3] rounded bg-[#d9d9d9]" />
            {active && (
              <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-maroon text-white">
                <CheckIcon width={12} height={12} />
              </span>
            )}
            <span className="mt-2 block text-sm text-ink">{o.name}</span>
            <span className="block text-xs text-muted">{rupees(o.price)}</span>
            <span className={`block text-xs ${short ? "text-maroon" : "text-muted"}`}>
              {short ? `Only ${o.stock} — not enough for ${needed} ${unit}` : `${o.stock} in stock`}
            </span>
          </button>
        );
      })}
    </div>
  );
}
