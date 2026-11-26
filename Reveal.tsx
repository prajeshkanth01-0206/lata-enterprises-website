"use client";

import { useEffect } from "react";

export type RevealDirection = "left" | "right" | "top" | "bottom" | "rise";

/**
 * Directional scroll reveal wrapper.
 * The element itself is always fully visible in the HTML (opacity is only
 * animated by GSAP at runtime, and only when motion is allowed). Cards use
 * riseOnly so their buttons can never sit at opacity 0.
 */
export function Reveal({
  direction = "rise",
  delay = 0,
  riseOnly = false,
  className = "",
  children,
}: {
  direction?: RevealDirection;
  delay?: number;
  riseOnly?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-reveal={direction}
      data-delay={String(delay)}
      data-rise-only={riseOnly ? "true" : "false"}
      className={className}
    >
      {children}
    </div>
  );
}

/**
 * One-time GSAP + ScrollTrigger setup for every [data-reveal] element.
 * GSAP is dynamically imported so it never blocks the first paint.
 * If GSAP fails to load, or the user prefers reduced motion, everything
 * simply stays visible — content is never hidden by CSS.
 */
export function RevealInit() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
            const dir = (el.dataset.reveal || "rise") as RevealDirection;
            const delay = parseFloat(el.dataset.delay || "0");
            const riseOnly = el.dataset.riseOnly === "true";
            const vars: Record<string, number | string | object> = {
              duration: 1.05,
              ease: "power3.out",
              delay,
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
              },
            };
            if (dir === "left") vars.x = -60;
            if (dir === "right") vars.x = 60;
            if (dir === "top") vars.y = -50;
            if (dir === "bottom" || dir === "rise") vars.y = 60;
            if (!riseOnly) vars.opacity = 0;
            gsap.from(el, vars);
          });
        });
        cleanup = () => ctx.revert();
        // Safety: refresh triggers once fonts/images settle.
        setTimeout(() => ScrollTrigger.refresh(), 600);
      } catch {
        // GSAP unavailable — content stays visible, no animation.
      }
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
