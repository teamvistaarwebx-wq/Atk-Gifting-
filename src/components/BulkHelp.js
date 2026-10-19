"use client";

import { actions } from "@/lib/store";
import { PHONE_DISPLAY, PHONE_HREF } from "./TalkBanner";

export default function BulkHelp({ source = "gifting", className = "" }) {
  return (
    <div className={`rounded-md bg-[#e2e0df] px-6 py-5 text-center ${className}`}>
      <p className="font-semibold text-ink">Ordering 10, 30, or 100+ units?</p>
      <p className="mt-1 text-muted">Larger orders are easier to get right over a quick call than a form.</p>
      <p className="text-muted">
        Speak to our team directly:{" "}
        <a href={PHONE_HREF} className="text-maroon underline underline-offset-2">
          {PHONE_DISPLAY}
        </a>{" "}
        or{" "}
        <button type="button" onClick={() => actions.openQuote({ source })} className="text-maroon underline underline-offset-2">
          request a quote
        </button>
        .
      </p>
    </div>
  );
}
