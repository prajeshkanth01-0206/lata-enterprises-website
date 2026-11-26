"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PHONE_TEL } from "@/lib/site";

const LINKS = [
  { label: "Home", href: "/#top" },
  { label: "Collections", href: "/#collections" },
  { label: "Catalogue", href: "/#catalogue" },
  { label: "Gifting Services", href: "/gifting" },
  { label: "About Us", href: "/about" },
  { label: "Founder", href: "/founder" },
  { label: "Contact", href: "/#contact" },
];

/**
 * Minimal sticky navigation.
 * In-page links are plain anchors so a click JUMPS DIRECTLY to the
 * section with no smooth-scroll animation (scroll-behavior is auto).
 * Page links use Next Link for client-side routing.
 */
export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/30 bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/#top" className="flex items-center gap-3" aria-label="Lata Enterprises — home">
          <span className="relative block h-11 w-11">
            <Image
              src="/assets/logo-lata-enterprises.jpg"
              alt="Lata Enterprises logo"
              fill
              sizes="44px"
              className="object-contain"
              priority
            />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-semibold tracking-[0.14em] text-navy">
              LATA ENTERPRISES
            </span>
            <span className="mt-1 block text-[10px] tracking-[0.3em] text-gold uppercase">
              Estd 1998 · Erode
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {LINKS.map((l) =>
            l.href.startsWith("/#") ? (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium tracking-[0.12em] text-navy/80 uppercase transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm font-medium tracking-[0.12em] text-navy/80 uppercase transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            )
          )}
          <a
            href={PHONE_TEL}
            className="rounded-sm bg-navy px-5 py-2.5 text-xs font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-gold"
          >
            Call Now
          </a>
        </nav>

        {/* Three-dot menu on small screens */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span className="h-[5px] w-[5px] rounded-full bg-navy" />
          <span className="h-[5px] w-[5px] rounded-full bg-navy" />
          <span className="h-[5px] w-[5px] rounded-full bg-navy" />
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-gold/30 bg-ivory px-4 pt-2 pb-6 lg:hidden"
          aria-label="Mobile navigation"
        >
          {LINKS.map((l) =>
            l.href.startsWith("/#") ? (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-navy/10 py-3 font-display text-lg text-navy"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-navy/10 py-3 font-display text-lg text-navy"
              >
                {l.label}
              </Link>
            )
          )}
          <a
            href={PHONE_TEL}
            className="mt-4 block rounded-sm bg-navy px-5 py-3 text-center text-sm font-semibold tracking-[0.16em] text-white uppercase"
          >
            Call Now
          </a>
        </nav>
      )}
    </header>
  );
}
