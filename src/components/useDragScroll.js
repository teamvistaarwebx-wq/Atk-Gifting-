"use client";

import { useRef } from "react";

// Mouse drag-to-scroll for a horizontal track (touch and trackpads scroll
// natively). Swallows the click that ends a drag so cards don't open by accident.
export default function useDragScroll(track) {
  const drag = useRef(null);

  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    if (d.moved) {
      // Snapping fights a manual drag; it comes back on release.
      track.current.classList.add("is-dragging");
      track.current.scrollTo({ left: d.left - dx });
    }
  };

  const endDrag = () => {
    const d = drag.current;
    drag.current = null;
    track.current?.classList.remove("is-dragging");
    if (d?.moved) {
      const swallow = (ev) => ev.stopPropagation();
      window.addEventListener("click", swallow, { capture: true, once: true });
      setTimeout(() => window.removeEventListener("click", swallow, { capture: true }), 0);
    }
  };

  return { onPointerDown, onPointerMove, onPointerUp: endDrag, onPointerLeave: endDrag };
}
