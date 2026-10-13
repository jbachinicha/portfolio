/**
 * A shaped seam between two sections: the lower section's colour rises into the upper
 * one along a wave, curve, slant or triangle. Purely decorative.
 *
 * Sections rarely end on a whole pixel, so a seam of background can show as a hairline.
 * The upper colour is drawn a little above the strip and the lower colour a little below
 * it, each overshooting into the section of the same colour, and the strip has no
 * background of its own.
 */

export type Tone = "primary" | "paper" | "sheet";

// Full class names, so Tailwind can see them.
const fill: Record<Tone, string> = {
  primary: "fill-primary",
  paper: "fill-paper",
  sheet: "fill-sheet",
};

type Shape = "wave" | "curve" | "slant" | "triangle";

/** Each shape is the lower section's top edge, in a 1440 x 80 box. */
const paths: Record<Shape, string> = {
  wave: "M0 46 C 200 86, 420 6, 720 40 C 1000 72, 1220 10, 1440 42 L1440 86 L0 86 Z",
  curve: "M0 0 Q 720 110, 1440 0 L1440 86 L0 86 Z",
  slant: "M0 86 L1440 0 L1440 86 Z",
  triangle: "M0 86 L720 4 L1440 86 Z",
};

/** A paler wave behind the main one, for a layered look. */
const backWave = "M0 30 C 260 -6, 480 62, 760 28 C 1040 -6, 1240 52, 1440 22 L1440 86 L0 86 Z";

type Props = {
  from: Tone;
  to: Tone;
  shape: Shape;
  /** Draw a second, translucent wave behind the main one. */
  layered?: boolean;
  /** Mirror the shape left to right. */
  flip?: boolean;
};

export function SectionDivider({ from, to, shape, layered = false, flip = false }: Props) {
  return (
    <div aria-hidden className="leading-[0]">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={`block h-8 w-full overflow-visible sm:h-12 lg:h-[4.5rem] ${flip ? "-scale-x-100" : ""}`}
      >
        <rect y="-6" width="1440" height="92" className={fill[from]} />
        {layered ? <path d={backWave} className={fill[to]} fillOpacity="0.28" /> : null}
        <path d={paths[shape]} className={fill[to]} />
      </svg>
    </div>
  );
}
