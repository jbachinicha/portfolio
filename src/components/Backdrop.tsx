"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed atmospheric layer: engineering grid, drifting colour fields,
 * a film-grain overlay and a cursor spotlight on fine-pointer devices.
 */
export function Backdrop() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.setProperty("--x", `${e.clientX}px`);
        el.style.setProperty("--y", `${e.clientY}px`);
        el.style.opacity = "1";
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Colour fields */}
      <div className="animate-drift absolute -top-40 left-[-10%] h-[38rem] w-[38rem] rounded-full bg-accent/12 blur-[120px]" />
      <div
        className="animate-drift absolute top-[35%] right-[-12%] h-[34rem] w-[34rem] rounded-full bg-accent-3/14 blur-[130px]"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="animate-drift absolute bottom-[-10%] left-[25%] h-[30rem] w-[30rem] rounded-full bg-accent-2/8 blur-[140px]"
        style={{ animationDelay: "-15s" }}
      />

      {/* Vignette keeps text legible over the fields */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0%,var(--color-ink)_78%)]" />

      {/* Cursor spotlight */}
      <div
        ref={spotRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(340px circle at var(--x, 50%) var(--y, 0px), color-mix(in oklab, var(--color-accent) 9%, transparent), transparent 65%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
