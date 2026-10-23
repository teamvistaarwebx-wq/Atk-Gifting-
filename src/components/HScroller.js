"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "./Icons";

// Horizontally scrolling row: swipe, trackpad, keyboard, drag with the mouse,
// or the arrow buttons. The thread under the row shows how far along you are.
export default function HScroller({ header, label, children, tone = "light", trackClassName = "" }) {
  const track = useRef(null);
  const drag = useRef(null);
  const [state, setState] = useState({ progress: 0, atStart: true, atEnd: false });

  useEffect(() => {
    const el = track.current;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setState({
        progress: max > 0 ? el.scrollLeft / max : 1,
        atStart: el.scrollLeft <= 2,
        atEnd: el.scrollLeft >= max - 2,
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);

  const scrollByPage = (dir) => {
    const el = track.current;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: smooth ? "smooth" : "auto" });
  };

  // Mouse drag-to-scroll; touch and trackpads scroll natively.
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    if (d.moved) track.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const d = drag.current;
    drag.current = null;
    if (d?.moved) {
      // Swallow the click that ends a drag so cards don't flip by accident.
      const swallow = (ev) => ev.stopPropagation();
      window.addEventListener("click", swallow, { capture: true, once: true });
      setTimeout(() => window.removeEventListener("click", swallow, { capture: true }), 0);
    }
  };

  const dark = tone === "dark";
  const buttonClass = `grid h-11 w-11 place-items-center rounded-full border transition disabled:opacity-30 ${
    dark ? "border-white/60 text-white hover:bg-white/10" : "border-maroon/40 text-maroon hover:bg-maroon hover:text-white"
  }`;

  return (
    <div>
      <div className="container-atk flex flex-wrap items-end justify-between gap-6">
        <div className="min-w-0 max-w-2xl">{header}</div>
        <div className="flex gap-3">
          <button type="button" aria-label="Scroll back" className={buttonClass} disabled={state.atStart} onClick={() => scrollByPage(-1)}>
            <ArrowRight className="rotate-180" />
          </button>
          <button type="button" aria-label="Scroll forward" className={buttonClass} disabled={state.atEnd} onClick={() => scrollByPage(1)}>
            <ArrowRight />
          </button>
        </div>
      </div>

      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className={`hscroll mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 outline-none ${trackClassName}`}
      >
        {children}
      </div>

      <div className="container-atk mt-4">
        <div className={`relative h-px ${dark ? "bg-white/25" : "bg-maroon/20"}`} aria-hidden>
          <div className={`absolute inset-y-0 left-0 ${dark ? "bg-white" : "bg-maroon"}`} style={{ width: `${Math.max(6, state.progress * 100)}%` }} />
          <span
            className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${dark ? "bg-white" : "bg-maroon"}`}
            style={{ left: `${Math.max(6, state.progress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
