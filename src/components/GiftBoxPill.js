"use client";

import { useState } from "react";
import Link from "next/link";
import { actions, useStore } from "@/lib/store";
import { BULK_QUOTE_THRESHOLD, DISPATCH_TEXT, linesForQuote, summarise } from "@/lib/giftBox";
import { rupees } from "@/lib/format";
import QtyStepper from "./QtyStepper";
import { HoldTimer } from "./HoldWatcher";
import { ArrowRight, CloseIcon, TruckIcon } from "./Icons";

// Floating "Gift Box" pill on the catalogue with the quick-edit popover.
export default function GiftBoxPill() {
  const state = useStore();
  const [open, setOpen] = useState(false);
  const summary = summarise(state);
  if (summary.lines.length === 0) return null;

  const corporate = state.mode === "corporate";
  const requestQuote = () => {
    setOpen(false);
    actions.openQuote({
      source: corporate ? "corporate" : "gifting",
      boxItems: linesForQuote(summary.lines),
      team: corporate ? state.team : null,
    });
  };

  return (
    <div className="fixed inset-x-0 bottom-5 z-30 flex flex-col items-center px-4">
      {open && (
        <div className="mb-3 w-full max-w-sm rounded-xl bg-maroon p-5 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold">Your Gift Box</h2>
            <button type="button" aria-label="Close gift box" onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
              <CloseIcon />
            </button>
          </div>

          <ul className="mt-3 max-h-60 space-y-3 overflow-y-auto pr-1">
            {summary.lines.map((line) => (
              <li key={line.id}>
                <div className="flex justify-between gap-3 text-sm">
                  <span>{line.name}</span>
                  <span className="font-semibold">{rupees(line.price * line.qty)}</span>
                </div>
                <div className="mt-1.5 flex items-center justify-between">
                  <QtyStepper variant="onDark" value={line.qty} max={line.stock} onChange={(q) => actions.setQty(line.id, q)} label={line.name} />
                  <button type="button" onClick={() => actions.remove(line.id)} className="text-xs underline underline-offset-2 text-white/80 hover:text-white">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between border-t border-white/25 pt-4">
            <span className="font-serif text-lg font-semibold">Estimated value</span>
            <span className="font-serif text-lg font-semibold">{rupees(summary.items)}</span>
          </div>
          <div className="mt-2 space-y-1">
            <p className="flex items-center gap-1.5 text-xs text-white/80">
              <TruckIcon /> In stock · {DISPATCH_TEXT}
            </p>
            <HoldTimer tone="dark" />
          </div>

          {summary.bulk && (
            <p className="mt-3 rounded-md bg-white/10 p-3 text-xs leading-relaxed">
              {summary.pieces} pieces: pieces aren&apos;t reserved until payment. For {BULK_QUOTE_THRESHOLD}+ pieces,
              request a quote and we&apos;ll hold them for you. You can still check out directly.
            </p>
          )}

          <div className={`mt-4 flex gap-3 ${summary.bulk ? "flex-col-reverse" : "flex-col"}`}>
            <Link href="/gift-box" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-md border border-white/80 py-3 hover:bg-white/10">
              Continue Building Gift <ArrowRight />
            </Link>
            <button
              type="button"
              onClick={requestQuote}
              className={`flex items-center justify-center gap-2 rounded-md py-3 ${summary.bulk ? "bg-white text-maroon hover:bg-cream" : "border border-white/80 hover:bg-white/10"}`}
            >
              Request a quote <ArrowRight />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border-2 border-white bg-maroon px-6 py-3 text-white shadow-lg ring-1 ring-maroon"
      >
        <span className="text-lg">Gift Box</span>
        {corporate ? (
          <>
            <Badge>
              Women {summary.gender.women}/{state.team.female}
            </Badge>
            <Badge>
              Men {summary.gender.men}/{state.team.male}
            </Badge>
          </>
        ) : (
          <Badge>{summary.lines.length}</Badge>
        )}
      </button>
    </div>
  );
}

function Badge({ children }) {
  return <span className="rounded-full bg-white px-2 py-0.5 text-sm font-semibold text-maroon">{children}</span>;
}
