"use client";

import { useId, useState } from "react";
import type { Shot } from "@/content/site";
import { asset } from "@/lib/asset";

const frame = "overflow-hidden rounded-md border bg-sheet";

/**
 * Screenshots with a switch between them. Only the picked one is shown;
 * the others stay out of the way, so a phone does not scroll past three.
 */
export function ShotTabs({ shots }: { shots: Shot[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : shots.length - 1)) % shots.length;
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  }

  return (
    <div>
      {shots.length > 1 ? (
        <div role="tablist" aria-label="Screens" className="mb-3 flex gap-2">
          {shots.map((s, i) => (
            <button
              key={s.src}
              id={`${baseId}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`rounded-md border px-3.5 py-1.5 text-[15px] font-medium transition-colors ${
                i === active
                  ? "border-ink bg-ink text-white"
                  : "text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      ) : null}

      {shots.map((s, i) => (
        <div
          key={s.src}
          id={`${baseId}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== active}
          className={frame}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, media lives in public/work */}
          <img
            src={asset(s.src)}
            alt={s.alt}
            width={s.width}
            height={s.height}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
      ))}
    </div>
  );
}

type VideoProps = {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
  className?: string;
};

/** Click-to-play video. Nothing downloads or plays until the visitor asks. */
export function VideoPlayer({ src, poster, width, height, label, className = "" }: VideoProps) {
  return (
    <div className={`${frame} bg-ink ${className}`}>
      <video
        controls
        playsInline
        preload="none"
        poster={asset(poster)}
        width={width}
        height={height}
        aria-label={label}
        className="block h-auto w-full"
      >
        <source src={asset(src)} type="video/mp4" />
        Your browser can&apos;t play this video.
      </video>
    </div>
  );
}
