import type { Metadata } from "next";
import Image from "next/image";
import { PHONE_TEL } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Gifting Services",
  description:
    "Lata Enterprises, Erode — gifting bags for weddings, temples, corporate occasions and celebrations: saree bags, bottle bags, jute fancy bags and customised return gifts, made to order. Call +91 98944 88870.",
  alternates: { canonical: "https://www.thelata.com/gifting" },
};

/**
 * Gifting Services page.
 * Only Saree Bags, Bottle Bags and Jute Fancy Bags carry product
 * photographs. Every other gifting category is text only — elegant
 * headings and descriptions, no stock images or illustrations.
 * All copy is taken from the existing website; no new product claims.
 */
const PHOTO_CATEGORIES = [
  {
    title: "Saree Bags",
    blurb:
      "Cream cotton saree bags with a zip closure and a mesh window, made to store and carry sarees.",
    image: "/assets/bag-collection-03-saree.jpg",
    alt: "Cream cotton saree bags with a zip closure and a mesh window showing a printed saree inside",
  },
  {
    title: "Bottle Bags",
    blurb:
      "Natural jute bottle bags in four styles — handled, drawstring and die-cut — made to carry a bottle.",
    image: "/assets/bag-collection-04-bottle.jpg",
    alt: "Natural jute bottle bags in four styles with handles and drawstring tops",
  },
  {
    title: "Jute Fancy Bags",
    blurb: "Natural jute, printed with your brand.",
    image: "/assets/bag-collection-01-jute-floral.jpg",
    alt: "Natural jute bag with a floral printed panel in maroon and pink",
  },
];

const TEXT_CATEGORIES = [
  {
    title: "Temple Return Gift Bags – Manjal Pai",
    text: "Traditional temple gifting, thoughtfully wrapped.",
  },
  {
    title: "Corporate Return Gift Bags",
    text: "Branded gifts for teams, clients and events.",
  },
  {
    title: "Wedding Celebration Bags",
    text: "Return gifts for weddings and family celebrations.",
  },
  {
    title: "Customised Return Gift Bags",
    text: "Your design, your colours, your occasion.",
  },
  {
    title: "Educational and Other Bags",
    text: "Bags for academies, institutions and everyday use.",
  },
];

export default function GiftingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <Reveal direction="top">
            <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">
              Gifting Services
            </p>
            <span className="rule-gold mx-auto mt-3 block" />
            <h1 className="mt-4 font-display text-4xl leading-tight font-semibold text-navy md:text-6xl">
              Gifting Services
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-navy/75 md:text-lg">
              From temple gifts to wedding celebrations — every bag is made
              to order, in the colours and print your occasion deserves.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Categories with photographs */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Gifting Categories"
            title="Bags Made to Gift"
            direction="top"
          />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
            {PHOTO_CATEGORIES.map((c, i) => (
              <Reveal
                key={c.title}
                direction="rise"
                riseOnly
                delay={(i % 3) * 0.12}
                className="card-rise"
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-sm bg-ivory shadow-[0_2px_18px_rgba(20,45,89,0.08)]">
                  <span className="relative block aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </span>
                  <div className="flex flex-1 flex-col px-4 py-4 md:px-5 md:py-5">
                    <h3 className="font-display text-base leading-snug font-semibold text-navy md:text-xl">
                      {c.title}
                    </h3>
                    <p className="mt-1 flex-1 text-sm leading-relaxed text-navy/70">
                      {c.blurb}
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
        </div>
      </section>

      {/* Categories in text only */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="More Gifting"
            title="Every Occasion, Thoughtfully Covered"
            direction="top"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {TEXT_CATEGORIES.map((c, i) => (
              <Reveal
                key={c.title}
                direction={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "bottom"}
                delay={(i % 3) * 0.12}
                className="h-full"
              >
                <div className="h-full rounded-sm border-t-2 border-gold bg-white px-6 py-8 shadow-[0_2px_18px_rgba(20,45,89,0.08)]">
                  <h3 className="font-display text-xl font-semibold text-navy md:text-2xl">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy/70 md:text-base">
                    {c.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal direction="bottom" delay={0.1}>
            <p className="mt-8 text-center text-sm tracking-wide text-navy/70 md:text-base">
              Also available:{" "}
              <span className="font-semibold text-navy">Apparel Bags</span>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <Reveal direction="top">
            <p className="font-display text-xl text-navy md:text-2xl">
              Looking for gifting bags for your next occasion?
            </p>
            <a
              href={PHONE_TEL}
              className="mt-6 inline-block rounded-sm bg-gold px-8 py-3.5 text-xs font-semibold tracking-[0.18em] text-white uppercase transition-colors hover:bg-navy md:text-sm"
            >
              Call for Price
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
