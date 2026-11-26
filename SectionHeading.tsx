import { Reveal, type RevealDirection } from "@/components/Reveal";

/**
 * Eyebrow + title + optional intro line for a section.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  titleClassName = "",
  direction = "top",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  titleClassName?: string;
  direction?: RevealDirection;
}) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col ${alignCls}`}>
      <Reveal direction={direction}>
        <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">
          {eyebrow}
        </p>
        <span className="rule-gold mt-3 block" />
        <h2
          className={`mt-4 font-display text-3xl leading-tight font-semibold text-navy md:text-5xl ${titleClassName}`}
        >
          {title}
        </h2>
        {intro ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy/70 md:text-lg">
            {intro}
          </p>
        ) : null}
      </Reveal>
    </div>
  );
}
