"use client";

import { useEffect, useRef } from "react";
import { createFluid, type Rgb } from "@/lib/fluid";

/** Soft pastel colour at a random hue; the dye's intensity becomes its opacity. */
function pastel(strength = 0.2): Rgb {
  const h = Math.random() * 6;
  const s = 0.55;
  const f = h - Math.floor(h);
  const p = 1 - s;
  const q = 1 - s * f;
  const t = 1 - s * (1 - f);
  const rgb: Rgb[] = [
    [1, t, p],
    [q, 1, p],
    [p, 1, t],
    [p, q, 1],
    [t, p, 1],
    [1, p, q],
  ];
  const [r, g, b] = rgb[Math.floor(h) % 6];
  return [r * strength, g * strength, b * strength];
}

/**
 * Pastel smoke that follows the mouse and bursts where you tap. Purely
 * decorative: it sits above the page without catching pointer events, does not
 * run for visitors who ask for reduced motion, and stops drawing when idle.
 */
export function FluidCursor() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fluid = createFluid(canvas);
    if (!fluid) return;

    let color = pastel();
    let colorTimer = 0;
    let previous: { x: number; y: number; t: number } | null = null;

    // Hover: a trail behind the mouse. Touch has no hover, so it only reacts to taps.
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const now = performance.now();
      if (previous) {
        if (now - colorTimer > 140) {
          color = pastel();
          colorTimer = now;
        }
        const dx = e.clientX - previous.x;
        const dy = e.clientY - previous.y;
        fluid.splat(e.clientX, e.clientY, dx, dy, color);
        // Scatter: a few small splats thrown off to the sides, each with its own heading.
        for (let i = 0; i < 3; i++) {
          const angle = Math.random() * Math.PI * 2;
          const reach = 14 + Math.random() * 38;
          const push = 10 + Math.random() * 26;
          fluid.splat(
            e.clientX + Math.cos(angle) * reach,
            e.clientY + Math.sin(angle) * reach,
            Math.cos(angle) * push + dx * 0.4,
            Math.sin(angle) * push + dy * 0.4,
            pastel(0.14),
            0.12,
          );
        }
      }
      previous = { x: e.clientX, y: e.clientY, t: now };
    };

    const onLeave = () => {
      previous = null;
    };

    // Tap or click: a burst that throws dye outwards in every direction.
    const onDown = (e: PointerEvent) => {
      const spokes = 9;
      const offset = Math.random() * Math.PI;
      for (let i = 0; i < spokes; i++) {
        const angle = offset + (i / spokes) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const push = 70 + Math.random() * 70;
        fluid.splat(
          e.clientX + Math.cos(angle) * 10,
          e.clientY + Math.sin(angle) * 10,
          Math.cos(angle) * push,
          Math.sin(angle) * push,
          pastel(0.3),
          0.22,
        );
      }
    };

    const onResize = () => fluid.resize();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      fluid.destroy();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[45] h-full w-full" />;
}
