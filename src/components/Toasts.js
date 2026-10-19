"use client";

import { actions, useStore } from "@/lib/store";
import { CloseIcon } from "./Icons";

export default function Toasts() {
  const toasts = useStore((s) => s.toasts);
  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-50 flex flex-col items-center gap-2 px-4" role="status">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-4 rounded-md border border-line bg-white px-4 py-2.5 text-sm text-ink shadow-md"
        >
          {t.text}
          <button type="button" aria-label="Dismiss" onClick={() => actions.dismissToast(t.id)} className="text-muted hover:text-ink">
            <CloseIcon width={14} height={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
