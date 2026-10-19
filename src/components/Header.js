"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { BagIcon, HeartIcon, UserIcon } from "./Icons";

export function Logo() {
  return (
    <Link href="/" className="flex flex-col leading-none text-maroon" aria-label="Atulya Karigari home">
      <span className="font-logo text-[2rem] italic tracking-tight">Atulya Karigari</span>
      <span className="mt-0.5 whitespace-nowrap text-[0.42rem] font-semibold tracking-[0.08em] text-maroon/80 sm:text-[0.5rem] sm:tracking-[0.18em]">
        A CSR INITIATIVE OF ANNAPURNA FINANCE PVT LTD
      </span>
    </Link>
  );
}

export default function Header() {
  const count = useStore((s) => s.box.length);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur">
      <div className="container-atk flex h-20 items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-5 text-ink">
          <button type="button" aria-label="Wishlist" className="hover:text-maroon">
            <HeartIcon />
          </button>
          <button type="button" aria-label="Account" className="hover:text-maroon">
            <UserIcon />
          </button>
          <Link href="/gift-box" aria-label={`Gift box, ${count} items`} className="relative hover:text-maroon">
            <BagIcon />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-maroon px-1 text-[0.65rem] font-semibold text-white">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
