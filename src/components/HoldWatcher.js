"use client";

import { useEffect, useState } from "react";
import { HOLD_MINUTES, actions, useStore } from "@/lib/store";
import { pad2 } from "@/lib/format";
import { ClockIcon } from "./Icons";

// Ticks once a second while a hold is running.
function useNow(active) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [active]);
  return now;
}

// Releases the 15-minute cart hold when it runs out, wherever the buyer is.
export default function HoldWatcher() {
  const holdUntil = useStore((s) => s.holdUntil);

  useEffect(() => {
    if (!holdUntil) return;
    const expire = () => {
      actions.expireHold();
      actions.toast(`Your ${HOLD_MINUTES}-minute hold has ended — the pieces are back in inventory.`);
    };
    const remaining = holdUntil - Date.now();
    if (remaining <= 0) {
      expire();
      return;
    }
    const timer = setTimeout(expire, remaining);
    return () => clearTimeout(timer);
  }, [holdUntil]);

  return null;
}

export function HoldTimer({ tone = "light" }) {
  const { holdUntil, holdExpired, hasItems } = useStore((s) => ({
    holdUntil: s.holdUntil,
    holdExpired: s.holdExpired,
    hasItems: s.box.length > 0,
  }));
  const now = useNow(Boolean(holdUntil));
  if (!hasItems) return null;

  const muted = tone === "dark" ? "text-white/80" : "text-muted";

  if (holdExpired || !holdUntil) {
    return (
      <p className={`flex flex-wrap items-center gap-1.5 text-xs ${muted}`}>
        <ClockIcon />
        Hold ended — pieces are back in inventory.
        <button type="button" onClick={actions.renewHold} className="underline underline-offset-2">
          Hold again for {HOLD_MINUTES} min
        </button>
      </p>
    );
  }

  const left = Math.max(0, Math.floor((holdUntil - now) / 1000));
  return (
    <p className={`flex items-center gap-1.5 text-xs ${muted}`}>
      <ClockIcon />
      Pieces held for {pad2(Math.floor(left / 60))}:{pad2(left % 60)}
    </p>
  );
}
