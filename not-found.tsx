import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="bg-ivory py-24 text-center md:py-32">
      <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">
        404 — Page Not Found
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-navy md:text-6xl">
        This page does not exist.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-navy/70">
        The page you are looking for may have moved, or the link may be
        incorrect.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-sm bg-navy px-7 py-3.5 text-xs font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-gold"
        >
          Back to Home
        </Link>
        <a
          href={PHONE_TEL}
          className="rounded-sm border border-navy px-7 py-3.5 text-xs font-semibold tracking-[0.16em] text-navy uppercase transition-colors hover:border-gold hover:text-gold"
        >
          Call {PHONE_DISPLAY}
        </a>
      </div>
    </section>
  );
}
