"use client";

import { useEffect, useRef } from "react";

/**
 * Publishes the pointer's position across the viewport as `--mx` and `--my`
 * (each -1 to 1) for the hero scene's depth layers to read. The wrapper has no
 * box of its own. Nothing runs for touch, or for visitors who ask for reduced
 * motion, and the page itself stays server-rendered.
 */
export function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let next = { x: 0, y: 0 };
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", next.x.toFixed(3));
      el.style.setProperty("--my", next.y.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      next = { x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 };
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
