"use client";

import { useState } from "react";
import { CRAFTS } from "@/data/crafts";
import HScroller from "../HScroller";

const FILTERS = [
  { id: "all", label: "All crafts" },
  { id: "odisha", label: "Odisha" },
  { id: "india", label: "Across India" },
];

// Horizontally scrolling craft clusters. Each card flips to show how the
// craft is made.
export default function ArtisanCrafts() {
  const [filter, setFilter] = useState("all");
  const [flipped, setFlipped] = useState(null);
  const crafts = CRAFTS.filter((c) => filter === "all" || c.region === filter);

  return (
    <section id="artisans" className="scroll-mt-20 py-16">
      <HScroller
        label="Crafts in ATK gift boxes"
        header={
          <>
            <p className="eyebrow text-maroon">The hands behind your gift</p>
            <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Meet the crafts in every box</h2>
            <p className="mt-3 text-muted">
              ATK buys directly from weaving and craft clusters, so more of what you pay reaches the people who made
              it. Tap a card to see how each craft is made.
            </p>
            <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter crafts by region">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => {
                    setFilter(f.id);
                    setFlipped(null);
                  }}
                  className={`rounded-full border px-4 py-1.5 text-sm ${filter === f.id ? "border-maroon bg-maroon text-white" : "border-line hover:border-maroon/40"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </>
        }
      >
        {crafts.map((craft) => (
          <CraftCard
            key={craft.id}
            craft={craft}
            flipped={flipped === craft.id}
            onFlip={() => setFlipped(flipped === craft.id ? null : craft.id)}
          />
        ))}
      </HScroller>
    </section>
  );
}

function CraftCard({ craft, flipped, onFlip }) {
  return (
    <button
      type="button"
      onClick={onFlip}
      data-flipped={flipped}
      aria-pressed={flipped}
      aria-label={`${craft.name}, ${craft.state}. ${flipped ? "Showing how it's made" : "Show how it's made"}`}
      className="flip h-[26rem] w-[17rem] shrink-0 snap-start select-none text-left sm:w-[18rem]"
    >
      <span className="flip-inner block">
        <span className="flip-face flex flex-col overflow-hidden rounded-2xl border border-line bg-white" aria-hidden={flipped}>
          <span className="relative block h-44 shrink-0">
            <CraftPattern craft={craft} />
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-maroon">{craft.state}</span>
          </span>
          <span className="flex flex-1 flex-col p-5">
            <span className="font-serif text-2xl leading-tight text-ink">{craft.name}</span>
            <span className="mt-1 text-sm text-muted">{craft.place}</span>
            <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">In ATK boxes</span>
            <span className="text-sm text-ink">{craft.madeInto}</span>
            <span className="mt-auto flex items-center gap-2 pt-4 text-sm font-semibold text-maroon">
              <TurnIcon /> How it&apos;s made
            </span>
          </span>
        </span>

        <span className="flip-face flip-back flex flex-col rounded-2xl bg-maroon p-6 text-white" aria-hidden={!flipped}>
          <span className="text-xs font-semibold uppercase tracking-wider text-white/70">How it&apos;s made</span>
          <span className="mt-1 font-serif text-2xl leading-tight">{craft.name}</span>
          <span className="mt-4 text-sm leading-relaxed text-white/90">{craft.process}</span>
          <span className="mt-5 border-t border-white/20 pt-4 text-sm leading-relaxed">
            <span className="block text-xs font-semibold uppercase tracking-wider text-[#f3dfb6]">Did you know?</span>
            {craft.fact}
          </span>
          <span className="mt-auto flex items-center gap-2 pt-4 text-sm text-white/80">
            <TurnIcon /> Tap to turn back
          </span>
        </span>
      </span>
    </button>
  );
}

// A woven-looking swatch in each craft's colours: ikat diamonds for the
// tie-dye weaves, buta dots for brocade and print, chevrons for the rest.
function CraftPattern({ craft }) {
  const [ground, thread] = craft.colors;
  const kind = ["khandua", "sambalpuri", "tussar"].includes(craft.id)
    ? "ikat"
    : ["banarasi", "block-print"].includes(craft.id)
      ? "buta"
      : "chevron";
  const id = `pat-${craft.id}`;

  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice" viewBox="0 0 288 176">
      <defs>
        <pattern id={id} width="32" height="32" patternUnits="userSpaceOnUse">
          <rect width="32" height="32" fill={ground} />
          {kind === "ikat" && (
            <>
              <path d="M16 3 L28 16 L16 29 L4 16 Z" fill="none" stroke={thread} strokeWidth="2.4" strokeDasharray="3 1.5" />
              <path d="M16 11 L21 16 L16 21 L11 16 Z" fill={thread} opacity="0.85" />
            </>
          )}
          {kind === "buta" && (
            <>
              <path d="M16 7 q6 5 0 13 q-6 -8 0 -13 Z" fill={thread} opacity="0.9" />
              <circle cx="0" cy="26" r="2" fill={thread} />
              <circle cx="32" cy="26" r="2" fill={thread} />
            </>
          )}
          {kind === "chevron" && (
            <path d="M0 10 L8 4 L16 10 L24 4 L32 10 M0 26 L8 20 L16 26 L24 20 L32 26" fill="none" stroke={thread} strokeWidth="2.2" />
          )}
        </pattern>
      </defs>
      <rect width="288" height="176" fill={`url(#${id})`} />
      <rect y="150" width="288" height="26" fill={thread} opacity="0.9" />
      <rect y="156" width="288" height="3" fill={ground} opacity="0.6" />
    </svg>
  );
}

function TurnIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
      <path d="M18 3v4h-4M6 21v-4h4" />
    </svg>
  );
}
