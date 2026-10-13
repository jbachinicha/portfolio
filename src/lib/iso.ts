/**
 * Minimal isometric projection for the hero illustration.
 *
 * Floor coordinates: x runs down-right on screen, y runs down-left, z is up.
 * The viewer sits at (+x, +y, +z), so a point nearer the viewer has a larger
 * x + y, and the faces a viewer can see are the ones facing +x, +y and up.
 */

export type Pt = readonly [number, number];

export const COS = Math.cos(Math.PI / 6);
export const SIN = 0.5;

const round = (n: number) => Math.round(n * 100) / 100;

export function proj(x: number, y: number, z = 0): Pt {
  return [(x - y) * COS, (x + y) * SIN - z];
}

/** `points` attribute for a polygon. */
export function poly(points: Pt[]): string {
  return points.map(([x, y]) => `${round(x)},${round(y)}`).join(" ");
}

/** Path data for rings, to be filled with `fill-rule="evenodd"` so holes stay open. */
export function ringsPath(rings: Pt[][]): string {
  return rings
    .map((ring) => "M" + ring.map(([x, y]) => `${round(x)} ${round(y)}`).join("L") + "Z")
    .join("");
}

function channels(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Blend `hex` toward `toward` by `amount` (0..1). */
export function mix(hex: string, toward: string, amount: number): string {
  const a = channels(hex);
  const b = channels(toward);
  const out = a.map((v, i) => Math.round(v + (b[i] - v) * amount));
  return "#" + out.map((v) => v.toString(16).padStart(2, "0")).join("");
}

/** Points along an arc, angles in degrees with y pointing down (90° = +y). */
export function arc(cx: number, cy: number, r: number, from: number, to: number, steps = 14): Pt[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const a = ((from + ((to - from) * i) / steps) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  });
}

export type Face = { points: string; fill: string };

export type Tones = { top: string; left: string; right: string };

/**
 * The three faces of a box as projected polygons, far to near is not needed:
 * top, +y face ("left" on screen) and +x face ("right" on screen) never overlap.
 */
export function box(
  x: number,
  y: number,
  z: number,
  w: number,
  d: number,
  h: number,
  tones: Tones,
): Face[] {
  const top = [proj(x, y, z + h), proj(x + w, y, z + h), proj(x + w, y + d, z + h), proj(x, y + d, z + h)];
  const left = [proj(x, y + d, z + h), proj(x + w, y + d, z + h), proj(x + w, y + d, z), proj(x, y + d, z)];
  const right = [proj(x + w, y, z + h), proj(x + w, y + d, z + h), proj(x + w, y + d, z), proj(x + w, y, z)];
  return [
    { points: poly(left), fill: tones.left },
    { points: poly(right), fill: tones.right },
    { points: poly(top), fill: tones.top },
  ];
}

function area(ring: Pt[]): number {
  let sum = 0;
  for (let i = 0; i < ring.length; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % ring.length];
    sum += x1 * y2 - x2 * y1;
  }
  return sum / 2;
}

/**
 * Extrude flat rings (the first is the outline, the rest are holes) into a
 * solid `h` tall standing at height `z`. Only walls facing the viewer are kept,
 * shaded between the two side tones by the direction they face, so curves
 * grade smoothly. Walls come back far to near, then the top face.
 */
export function extrude(
  rings: Pt[][],
  z: number,
  h: number,
  tones: Tones,
): { walls: Face[]; top: string } {
  const walls: { face: Face; depth: number }[] = [];

  rings.forEach((ring, index) => {
    const isHole = index > 0;
    const sign = (area(ring) > 0 ? 1 : -1) * (isHole ? -1 : 1);

    for (let i = 0; i < ring.length; i++) {
      const [x1, y1] = ring[i];
      const [x2, y2] = ring[(i + 1) % ring.length];
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy);
      if (len < 1e-6) continue;

      // Outward normal of the wall, then keep it only if it faces the viewer.
      const nx = (sign * dy) / len;
      const ny = (-sign * dx) / len;
      if (nx + ny <= 0.02) continue;

      const p = 0.5 + (ny - nx) / 2;
      walls.push({
        depth: (x1 + x2 + y1 + y2) / 2,
        face: {
          points: poly([proj(x1, y1, z + h), proj(x2, y2, z + h), proj(x2, y2, z), proj(x1, y1, z)]),
          fill: mix(tones.right, tones.left, p),
        },
      });
    }
  });

  walls.sort((a, b) => a.depth - b.depth);

  return {
    walls: walls.map((w) => w.face),
    top: ringsPath(rings.map((ring) => ring.map(([x, y]) => proj(x, y, z + h)))),
  };
}

/**
 * The exact shadow of a convex footprint (a stage, a block): the hull of the
 * footprint and the same footprint shifted by (dx, dy), as one polygon.
 */
export function sweepConvex(ring: Pt[], z: number, dx: number, dy: number): string {
  const pts = [...ring, ...ring.map(([x, y]) => [x + dx, y + dy] as const)].map(([x, y]) => proj(x, y, z));
  const sorted = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: Pt, a: Pt, b: Pt) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const half = (list: Pt[]) => {
    const out: Pt[] = [];
    for (const p of list) {
      while (out.length >= 2 && cross(out[out.length - 2], out[out.length - 1], p) <= 0) out.pop();
      out.push(p);
    }
    out.pop();
    return out;
  };
  return poly([...half(sorted), ...half([...sorted].reverse())]);
}

/**
 * A shadow swept from a non-convex footprint toward the light's far side, as stacked
 * copies so the gap between the base and the offset outline stays filled.
 */
export function sweep(ring: Pt[], z: number, dx: number, dy: number, steps = 6): string[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    return poly(ring.map(([x, y]) => proj(x + dx * t, y + dy * t, z)));
  });
}
