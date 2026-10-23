"use client";

import Link from "next/link";
import { actions } from "@/lib/store";
import { PHONE_DISPLAY, PHONE_HREF } from "./TalkBanner";

export default function Footer() {
  return (
    <footer className="bg-maroon-dark text-white/85">
      <div className="festoon h-6 opacity-30 brightness-0 invert" aria-hidden />
      <div className="container-atk grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-logo text-3xl italic text-white">Atulya Karigari</p>
          <p className="mt-1 text-[0.6rem] font-semibold tracking-[0.18em] text-white/70">A CSR INITIATIVE OF ANNAPURNA FINANCE PVT LTD</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Handloom and handicraft from India&apos;s artisans, packed into gifts with a message from you.
          </p>
        </div>
        <nav aria-label="Gifting">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Gifting</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/gifting" className="hover:text-white">In-stock gifts</Link>
            </li>
            <li>
              <Link href="/corporate" className="hover:text-white">Gift your team</Link>
            </li>
            <li>
              <Link href="/made-to-order" className="hover:text-white">Made to Order</Link>
            </li>
            <li>
              <button type="button" onClick={() => actions.openQuote({ source: "gifting" })} className="hover:text-white">
                Request a quote
              </button>
            </li>
          </ul>
        </nav>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Talk to us</p>
          <a href={PHONE_HREF} className="mt-3 block font-serif text-xl text-white">
            {PHONE_DISPLAY}
          </a>
          <p className="mt-1 text-sm">For orders of 10, 30 or 100+ units.</p>
          <a href="https://www.atulyakarigari.com" target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm underline underline-offset-2 hover:text-white">
            atulyakarigari.com
          </a>
        </div>
      </div>
      <p className="container-atk border-t border-white/10 py-5 text-xs text-white/50">© {new Date().getFullYear()} Atulya Karigari</p>
    </footer>
  );
}
