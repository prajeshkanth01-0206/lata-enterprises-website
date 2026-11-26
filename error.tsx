"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Error is logged to the console for the site owner; no user data is sent anywhere.
    console.error(error);
  }, [error]);

  return (
    <section className="bg-ivory py-24 text-center md:py-32">
      <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">
        Something went wrong
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-navy md:text-5xl">
        This page could not be loaded.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-navy/70">
        Please try again, or call us directly — we are happy to help.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-sm bg-navy px-7 py-3.5 text-xs font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-gold"
        >
          Try Again
        </button>
        <a
          href="tel:+919894488870"
          className="rounded-sm border border-navy px-7 py-3.5 text-xs font-semibold tracking-[0.16em] text-navy uppercase transition-colors hover:border-gold hover:text-gold"
        >
          Call +91 98944 88870
        </a>
      </div>
    </section>
  );
}
