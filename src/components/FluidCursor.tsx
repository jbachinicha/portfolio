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

/** Warm, luminous tones that stay vivid on green. Kept to neighbouring hues so they do not blend to grey. */
const GLOW: readonly Rgb[] = [
  [0.97, 0.92, 0.29], // the site's highlighter yellow
  [0.78, 0.97, 0.5], // lime
  [0.55, 0.96, 0.74], // aqua mint
  [1, 0.78, 0.35], // amber
  [1, 0.96, 0.72], // cream
];

function glow(strength: number): Rgb {
  const [r, g, b] = GLOW[Math.floor(Math.random() * GLOW.length)];
  const k = strength * 1.6;
  return [r * k, g * k, b * k];
}

/** Whether the visible background at a point is dark, found from the nearest painted ancestor. */
function backdropIsDark(x: number, y: number): boolean {
  let el = document.elementFromPoint(x, y);
  while (el) {
    const channels = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
    if (channels && (channels.length < 4 || parseFloat(channels[3]) > 0.6)) {
      const [r, g, b] = channels.map(Number);
      return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5;
    }
    el = el.parentElement;
  }
  return false;
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

    let dark = false;
    let darkCheckedAt = 0;
    // Hue changes every so often, and the palette follows whatever is underneath.
    const pick = (strength = 0.2) => (dark ? glow(strength) : pastel(strength));
    const track = (x: number, y: number, now: number) => {
      if (now - darkCheckedAt < 100) return;
      darkCheckedAt = now;
      dark = backdropIsDark(x, y);
    };

    let color = pick();
    let colorTimer = 0;
    let previous: { x: number; y: number; t: number } | null = null;

    // Hover: a trail behind the mouse. Touch has no hover, so it only reacts to taps.
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const now = performance.now();
      track(e.clientX, e.clientY, now);
      if (previous) {
        if (now - colorTimer > 140) {
          color = pick();
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
            pick(0.14),
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
      track(e.clientX, e.clientY, performance.now() + 1000);
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
          pick(0.3),
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
