"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { CATALOGUE, PHONE_TEL } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

/**
 * Bag catalogue with a lightbox preview.
 * Cards use rise-only reveals (transform only) so the CALL FOR PRICE
 * buttons are always fully visible and tappable.
 */
export function Catalogue() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((cur) =>
        cur === null ? cur : (cur + dir + CATALOGUE.length) % CATALOGUE.length
      ),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const item = open !== null ? CATALOGUE[open] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
        {CATALOGUE.map((bag, i) => (
          <Reveal
            key={bag.id}
            direction="rise"
            riseOnly
            delay={(i % 3) * 0.12}
            className="card-rise"
          >
            <article className="group flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-[0_2px_18px_rgba(20,45,89,0.08)]">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="relative block w-full cursor-pointer overflow-hidden text-left"
                aria-label={`Open a larger preview of ${bag.name}`}
              >
                <span className="relative block aspect-[3/4] w-full">
                  <Image
                    src={bag.image}
                    alt={bag.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </span>
                <span className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/10" />
              </button>
              <div className="flex flex-1 flex-col px-4 py-4 md:px-5 md:py-5">
                <h3 className="font-display text-lg font-semibold tracking-wide text-navy md:text-xl">
                  {bag.name}
                </h3>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-navy/70">
                  {bag.description}
                </p>
                <a
                  href={PHONE_TEL}
                  className="mt-4 inline-block w-full rounded-sm border border-gold px-4 py-2.5 text-center text-xs font-semibold tracking-[0.18em] text-navy uppercase transition-colors hover:bg-gold hover:text-white md:text-sm"
                >
                  Call for Price
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {item && (
        <div
          className="lightbox-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Preview of ${item.name}`}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close preview"
            className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl text-navy"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous bag"
            className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-xl text-navy md:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next bag"
            className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-xl text-navy md:right-6"
          >
            ›
          </button>
          <figure
            className="max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-sm bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="relative block aspect-[3/4] max-h-[68vh] w-full">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="90vw"
                className="object-cover"
                priority
              />
            </span>
            <figcaption className="px-5 py-4 md:px-6">
              <div className="font-display text-xl font-semibold text-navy">
                {item.name}
              </div>
              <p className="mt-1 text-sm text-navy/70">{item.description}</p>
              <a
                href={PHONE_TEL}
                className="mt-4 inline-block rounded-sm bg-gold px-6 py-3 text-xs font-semibold tracking-[0.18em] text-white uppercase transition-colors hover:bg-navy md:text-sm"
              >
                Call for Price
              </a>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
