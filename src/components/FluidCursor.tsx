"use client";

import { useEffect, useRef } from "react";
import { createFluid, type Rgb } from "@/lib/fluid";

/** Soft pastel colour at a position (0..6) round the hue wheel; the dye's intensity becomes its opacity. */
function pastel(strength: number, h: number): Rgb {
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
 * Luminous tones for dark backgrounds. Kept to neighbouring hues: a full rainbow
 * mixes to grey-white over green, which these do not.
 */
const GLOW: readonly Rgb[] = [
  [0.97, 0.92, 0.29], // the site's highlighter yellow
  [0.78, 0.97, 0.5], // lime
  [0.55, 0.96, 0.74], // aqua mint
  [1, 0.78, 0.35], // amber
  [1, 0.96, 0.72], // cream
];

function glow(strength: number, t: number): Rgb {
  const pos = t * GLOW.length;
  const i = Math.floor(pos);
  const f = pos - i;
  const from = GLOW[i % GLOW.length];
  const to = GLOW[(i + 1) % GLOW.length];
  const k = strength * 1.6;
  return [
    (from[0] + (to[0] - from[0]) * f) * k,
    (from[1] + (to[1] - from[1]) * f) * k,
    (from[2] + (to[2] - from[2]) * f) * k,
  ];
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
    // The colour is a position on a loop, moved by distance travelled (not by how many
    // events arrived), so it drifts steadily however fast the mouse reports. The palette
    // follows whatever is underneath.
    let phase = Math.random();
    const TRAVEL_PER_CYCLE = 1200;
    const colour = (strength: number, offset = 0) => {
      const p = (((phase + offset) % 1) + 1) % 1;
      return dark ? glow(strength, p) : pastel(strength, p * 6);
    };
    const track = (x: number, y: number, now: number) => {
      if (now - darkCheckedAt < 100) return;
      darkCheckedAt = now;
      dark = backdropIsDark(x, y);
    };

    // Hover: a trail behind the mouse. Mice, and some browsers, report several moves per
    // frame, so they are gathered and applied once per frame: one splat, plus a thin
    // scatter of small ones in the same hue. Touch has no hover, so it only reacts to taps.
    let latest: { x: number; y: number } | null = null;
    let anchor: { x: number; y: number } | null = null;
    let scatterAt = 0;
    let raf = 0;

    const flush = (now: number) => {
      raf = 0;
      if (!latest || !anchor) return;
      const dx = latest.x - anchor.x;
      const dy = latest.y - anchor.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 0.5) return;
      track(latest.x, latest.y, now);
      phase = (phase + dist / TRAVEL_PER_CYCLE) % 1;
      fluid.splat(latest.x, latest.y, dx, dy, colour(0.2));
      if (now - scatterAt > 50) {
        scatterAt = now;
        for (let i = 0; i < 2; i++) {
          const angle = Math.random() * Math.PI * 2;
          const reach = 14 + Math.random() * 30;
          const push = 10 + Math.random() * 22;
          fluid.splat(
            latest.x + Math.cos(angle) * reach,
            latest.y + Math.sin(angle) * reach,
            Math.cos(angle) * push + dx * 0.4,
            Math.sin(angle) * push + dy * 0.4,
            colour(0.13, (Math.random() - 0.5) * 0.04),
            0.12,
          );
        }
      }
      anchor = latest;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      latest = { x: e.clientX, y: e.clientY };
      anchor ??= latest;
      if (!raf) raf = requestAnimationFrame(flush);
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      latest = null;
      anchor = null;
    };

    // Tap or click: a burst that throws dye outwards in every direction, one hue per spoke.
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
          colour(0.3, i / spokes),
          0.22,
        );
      }
      phase = (phase + 0.3) % 1;
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
      cancelAnimationFrame(raf);
      fluid.destroy();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[45] h-full w-full" />;
}
