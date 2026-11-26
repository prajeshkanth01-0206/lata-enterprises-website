import Image from "next/image";
import Link from "next/link";
import { ADDRESS, EMAIL, EMAIL_MAILTO, FACEBOOK, INSTAGRAM, PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function Footer() {
  return (
    <footer id="footer" className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-8">
        <Reveal direction="left">
          <div className="flex items-center gap-3">
            <span className="relative block h-14 w-14">
              <Image
                src="/assets/logo-white.png"
                alt="Lata Enterprises logo"
                fill
                sizes="56px"
                className="object-contain"
                loading="lazy"
              />
            </span>
            <span className="font-display text-lg font-semibold tracking-[0.14em]">
              LATA ENTERPRISES
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Thoughtfully crafted bags for celebrations, businesses and
            meaningful moments. Thirty years of craftsmanship from Erode,
            Tamil Nadu.
          </p>
        </Reveal>
        <Reveal direction="bottom" delay={0.1}>
          <h3 className="text-xs font-semibold tracking-[0.24em] text-gold uppercase">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/#collections" className="hover:text-gold">
                Collections
              </Link>
            </li>
            <li>
              <Link href="/#catalogue" className="hover:text-gold">
                Our Bag Catalogue
              </Link>
            </li>
            <li>
              <Link href="/gifting" className="hover:text-gold">
                Gifting Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gold">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/founder" className="hover:text-gold">
                Founder — Latha C.
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-gold">
                Contact
              </Link>
            </li>
          </ul>
        </Reveal>
        <Reveal direction="right" delay={0.2}>
          <h3 className="text-xs font-semibold tracking-[0.24em] text-gold uppercase">
            Reach Us
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            <a href={PHONE_TEL} className="font-semibold text-white hover:text-gold">
              {PHONE_DISPLAY}
            </a>
            <br />
            <a href={EMAIL_MAILTO} className="text-white hover:text-gold">
              {EMAIL}
            </a>
            <br />
            {ADDRESS}
          </p>
          <p className="mt-4 space-x-4 text-sm">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline-offset-4 hover:text-gold hover:underline"
            >
              Instagram
            </a>
            <a
              href={FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline-offset-4 hover:text-gold hover:underline"
            >
              Facebook
            </a>
            <a href={SITE_URL} className="text-white underline-offset-4 hover:text-gold hover:underline">
              www.thelata.com
            </a>
          </p>
        </Reveal>
      </div>
      <div className="border-t border-white/15 py-5 text-center text-xs tracking-wide text-white/60">
        © 2026 Lata Enterprises. All rights reserved.
      </div>
    </footer>
  );
}
