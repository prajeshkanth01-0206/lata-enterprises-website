"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts 0 -> `target` in about `durationMs` once scrolled into view.
 * Reduced-motion users see the final number immediately.
 */
export function Counter({
  target,
  durationMs = 1000,
  className = "",
}: {
  target: number;
  durationMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Defer the state update to a callback so the effect body itself
      // never calls setState synchronously (react-hooks/set-state-in-effect).
      const id = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / durationMs);
            setValue(Math.round(target * p));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, durationMs]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
