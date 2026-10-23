"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ARTISANS } from "@/data/artisans";
import { ArrowRight, CloseIcon } from "../Icons";
import useDragScroll from "../useDragScroll";
import useStartGifting from "./useStartGifting";

// "Meet our artisans": a centred, snapping carousel. When scrolling settles,
// the card in the middle lifts. Clicking a card opens that artisan's profile.
export default function MeetArtisans() {
  const track = useRef(null);
  const [active, setActive] = useState(0);
  const [moving, setMoving] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const dragHandlers = useDragScroll(track);

  const center = useCallback((index) => {
    const el = track.current;
    const card = el.children[index];
    if (!card) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: card.offsetLeft + card.offsetWidth / 2 - el.clientWidth / 2, behavior: smooth ? "smooth" : "auto" });
  }, []);

  useEffect(() => {
    const el = track.current;
    let timer;
    const settle = () => {
      const middle = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDistance = Infinity;
      [...el.children].forEach((card, i) => {
        const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - middle);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      setActive(best);
      setMoving(false);
    };
    const onScroll = () => {
      setMoving(true);
      clearTimeout(timer);
      timer = setTimeout(settle, 140);
    };
    const observer = new ResizeObserver(settle);
    observer.observe(el);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = (index) => center(Math.max(0, Math.min(ARTISANS.length - 1, index)));

  const openProfile = (index) => {
    center(index);
    setOpenIndex(index);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      go(active + (e.key === "ArrowRight" ? 1 : -1));
    }
  };

  const arrowClass =
    "grid h-11 w-11 place-items-center rounded-full border border-maroon/40 text-maroon transition hover:bg-maroon hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-maroon";

  return (
    <section id="artisans" className="scroll-mt-20 overflow-hidden bg-gradient-to-b from-white via-cream to-white py-16">
      <div className="container-atk flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="eyebrow text-maroon">Meet our artisans</p>
          <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Every thread has a name</h2>
          <p className="mt-3 text-muted">
            The people and craft communities behind the pieces in your gift box. Scroll through, and tap a card to read
            their story.
          </p>
        </div>
        <div className="flex gap-3">
          <button type="button" aria-label="Previous artisan" className={arrowClass} disabled={active === 0} onClick={() => go(active - 1)}>
            <ArrowRight className="rotate-180" />
          </button>
          <button type="button" aria-label="Next artisan" className={arrowClass} disabled={active === ARTISANS.length - 1} onClick={() => go(active + 1)}>
            <ArrowRight />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        role="list"
        aria-label="Artisans"
        tabIndex={0}
        onKeyDown={onKeyDown}
        {...dragHandlers}
        className="artisan-track relative mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-10 pt-8 outline-none"
      >
        {ARTISANS.map((artisan, i) => (
          <li key={artisan.id} className="artisan-slot shrink-0 snap-center">
            <ArtisanCard artisan={artisan} lifted={!moving && i === active} onOpen={() => openProfile(i)} />
          </li>
        ))}
      </ul>

      <div className="container-atk flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Choose an artisan">
        {ARTISANS.map((artisan, i) => (
          <button
            key={artisan.id}
            type="button"
            aria-label={artisan.name}
            aria-current={i === active}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-maroon" : "w-2 bg-maroon/25 hover:bg-maroon/50"}`}
          />
        ))}
      </div>

      {openIndex !== null && (
        <ArtisanProfile
          key={ARTISANS[openIndex].id}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={(i) => {
            setOpenIndex(i);
            center(i);
          }}
        />
      )}
    </section>
  );
}

function ArtisanCard({ artisan, lifted, onOpen }) {
  const person = artisan.kind === "person";
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View profile: ${artisan.name}`}
      className={`artisan-card group block w-full select-none text-left transition-[transform,box-shadow] duration-500 ease-out ${
        lifted ? "-translate-y-5 scale-[1.03]" : "translate-y-0 scale-[0.97]"
      }`}
    >
      <span
        className={`artisan-card-inner block overflow-hidden rounded-2xl border bg-white transition-shadow duration-500 ${
          lifted ? "border-maroon/30 shadow-[0_24px_48px_-18px_rgb(94_7_22/0.45)]" : "border-line shadow-sm"
        }`}
      >
        <span className="relative block aspect-[332/304] overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#ecd4a8,#d9b47f)]">
          <Image
            src={artisan.image}
            alt=""
            width={person ? 332 : 304}
            height={person ? 304 : 222}
            draggable={false}
            className={
              person
                ? "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                : "h-full w-full object-contain p-6 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
            }
          />
          {!person && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.7rem] font-semibold text-maroon">
              Artisan community
            </span>
          )}
        </span>
        <span className="block px-5 pb-5 pt-4">
          <span className="block min-h-[3.75rem] font-serif text-2xl font-semibold leading-tight text-ink">{artisan.name}</span>
          <span className="mt-1 block min-h-10 text-sm leading-snug text-muted">{artisan.crafts.join(", ")}</span>
          <span className="mt-3 block h-px bg-gradient-to-r from-maroon/60 via-maroon/20 to-transparent" />
          <span className="mt-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-maroon">
            View profile <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </span>
        </span>
      </span>
    </button>
  );
}

function ArtisanProfile({ index, onClose, onNavigate }) {
  const artisan = ARTISANS[index];
  const person = artisan.kind === "person";
  const prev = ARTISANS[index - 1];
  const next = ARTISANS[index + 1];
  const closeButton = useRef(null);
  const startGifting = useStartGifting();

  useEffect(() => {
    closeButton.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && next) onNavigate(index + 1);
      if (e.key === "ArrowLeft" && prev) onNavigate(index - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, next, prev, onClose, onNavigate]);

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/45 sm:items-center sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="artisan-name"
        onClick={(e) => e.stopPropagation()}
        className="artisan-profile max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
      >
        <div className="grid md:grid-cols-[17rem_1fr]">
          {/* Image keeps its own proportions; the parchment ground fills the rest of the column */}
          <div className="bg-[linear-gradient(180deg,#ecd4a8,#d9b47f)]">
            <Image
              src={artisan.image}
              alt={person ? `Portrait of ${artisan.name}` : ""}
              width={person ? 332 : 304}
              height={person ? 304 : 222}
              className={person ? "aspect-[332/304] w-full object-cover" : "h-56 w-full object-contain p-8 mix-blend-multiply md:h-80"}
            />
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-maroon">{person ? "Artisan" : "Artisan community"}</p>
                <h2 id="artisan-name" className="mt-1 font-serif text-3xl text-ink">
                  {artisan.name}
                </h2>
                {artisan.place && <p className="mt-1 text-sm text-muted">{artisan.place}</p>}
              </div>
              <button ref={closeButton} type="button" aria-label="Close profile" onClick={onClose} className="text-muted hover:text-ink">
                <CloseIcon />
              </button>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {artisan.crafts.map((craft) => (
                <li key={craft} className="rounded-full bg-cream px-3 py-1 text-sm text-maroon">
                  {craft}
                </li>
              ))}
            </ul>

            {person ? (
              <dl className="mt-6 space-y-4">
                {artisan.notes.map((note) => (
                  <div key={note.craft} className="border-l-2 border-maroon/25 pl-4">
                    <dt className="font-serif text-lg text-maroon">{note.craft}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted">{note.text}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="mt-6 space-y-4 text-sm leading-relaxed">
                <div>
                  <p className="font-serif text-lg text-maroon">How it&apos;s made</p>
                  <p className="mt-1 text-muted">{artisan.process}</p>
                </div>
                <div className="rounded-lg bg-blush p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-maroon">Did you know?</p>
                  <p className="mt-1 text-ink">{artisan.fact}</p>
                </div>
              </div>
            )}

            <p className="mt-6 text-sm text-ink">
              <span className="font-semibold">In ATK gift boxes:</span> {artisan.giftIdeas}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  startGifting();
                }}
                className="btn-primary px-5"
              >
                Gift their work <ArrowRight />
              </button>
              <Link href="/made-to-order" onClick={onClose} className="btn-outline px-5">
                Made to Order
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-4 text-sm">
              <button type="button" disabled={!prev} onClick={() => onNavigate(index - 1)} className="flex items-center gap-1 text-maroon disabled:invisible">
                <ArrowRight className="rotate-180" /> {prev?.name}
              </button>
              <span className="text-muted">
                {index + 1} of {ARTISANS.length}
              </span>
              <button type="button" disabled={!next} onClick={() => onNavigate(index + 1)} className="flex items-center gap-1 text-right text-maroon disabled:invisible">
                {next?.name} <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
