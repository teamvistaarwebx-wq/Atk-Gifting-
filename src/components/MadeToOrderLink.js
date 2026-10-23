import Link from "next/link";
import { ArrowRight, LoomIcon } from "./Icons";

// Entry point to the Made to Order section, on the right of the listing.
export default function MadeToOrderLink() {
  return (
    <Link
      href="/made-to-order"
      className="group flex items-center gap-3 rounded-lg border border-maroon/30 bg-cream px-4 py-2.5 hover:border-maroon"
    >
      <span className="text-maroon">
        <LoomIcon />
      </span>
      <span className="leading-tight">
        <span className="block text-xs text-muted">Need it woven for you in bulk?</span>
        <span className="flex items-center gap-1 font-semibold text-maroon">
          Made to Order <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </span>
    </Link>
  );
}
