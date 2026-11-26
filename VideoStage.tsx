"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Video that only loads when it is needed.
 * - eager: loads and plays immediately (hero).
 * - lazy: the source is attached when the video comes within ~500px of the
 *   viewport, then it plays. The poster shows until then, so a failed or
 *   slow video never leaves a blank box.
 */
export function VideoStage({
  src,
  poster,
  eager = false,
  className = "",
  label,
}: {
  src: string;
  poster: string;
  eager?: boolean;
  className?: string;
  label: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(eager);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (eager) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoaded(true);
          io.disconnect();
        }
      },
      { rootMargin: "500px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  useEffect(() => {
    if (!loaded || failed) return;
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p) p.catch(() => undefined);
  }, [loaded, failed]);

  return (
    <div
      ref={wrapRef}
      className={`video-frame ${className}`}
      role="img"
      aria-label={label}
      style={{ backgroundImage: `url(${poster})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {loaded && !failed && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload={eager ? "auto" : "metadata"}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
