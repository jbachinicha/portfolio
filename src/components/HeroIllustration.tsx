import { heroLanguages } from "@/content/site";
import { arc, box, COS, extrude, mix, proj, SIN, sweep, sweepConvex, type Pt, type Tones } from "@/lib/iso";
import { brandGlyph } from "./BrandIcon";
import { HeroParallax } from "./HeroParallax";

/**
 * The hero artwork: the initials "JB" as big extruded letters on a stage, with
 * one block per language laid around them, each carrying its mark on the top
 * face. Drawn as plain SVG from the maths in `lib/iso`, so it renders on the
 * server with no client JS and scales with its column.
 */

// Stage and letters, in floor units.
const STAGE = { w: 336, d: 212, h: 12 };
const LETTER_HEIGHT = 52;
const LETTER_SCALE = 1.3;
const LETTER_AT = { x: 24, y: 22 };
/** How far the stage's shadow reaches across the field. */
const FIELD_SHADOW = { x: 64, y: 20 };

const COLOR = {
  stageTop: "#0d8a62",
  stageLeft: "#086a4a",
  stageRight: "#065740",
  stageLine: "#ffffff",
  fieldShadow: "#075a3d",
  stageShadow: "#076c4b",
  letter: { top: "#ffffff", left: "#e3ece6", right: "#b4c7bc" } satisfies Tones,
  ink: "#0c1a14",
} as const;

const place = (rings: Pt[][], dx: number, dy: number): Pt[][] =>
  rings.map((ring) => ring.map(([x, y]) => [LETTER_AT.x + dx + x * LETTER_SCALE, LETTER_AT.y + dy + y * LETTER_SCALE]));

/** "J": a slab serif on the stem, a hook along the bottom. Letter space is 60 × 100, y down. */
const J: Pt[][] = [
  [
    [22, 0],
    [60, 0],
    [60, 70],
    ...arc(30, 70, 30, 0, 180),
    [22, 70],
    ...arc(30, 70, 8, 180, 0),
    [38, 70],
    [38, 18],
    [22, 18],
  ],
];

/** "B": stem and two bowls, with a pinched waist. Letter space is 91 × 100, y down. */
const B: Pt[][] = [
  [
    [0, 0],
    [66, 0],
    ...arc(66, 23.5, 23.5, -90, 90),
    [64, 47],
    ...arc(64, 73.5, 26.5, -90, 90),
    [0, 100],
  ],
  [[26, 18], [62, 18], ...arc(62, 28, 10, -90, 90, 8), [26, 38]],
  [[26, 56], [60, 56], ...arc(60, 69, 13, -90, 90, 10), [26, 82]],
];

const jRings = place(J, 0, 0);
const bRings = place(B, (60 + 14) * LETTER_SCALE, 0);

const TILE = 40;

/** Where each language block stands, front row first, then up the right edge. */
const slots = [
  { x: 24, y: 166, h: 16 },
  { x: 78, y: 166, h: 32 },
  { x: 132, y: 166, h: 20 },
  { x: 186, y: 166, h: 36 },
  { x: 240, y: 166, h: 18 },
  { x: 290, y: 24, h: 34 },
  { x: 290, y: 80, h: 22 },
  { x: 290, y: 136, h: 12 },
] as const;

function Blocks() {
  const tiles = heroLanguages.slice(0, slots.length).map((lang, i) => {
    const slot = slots[i];
    const { path, hex } = brandGlyph(lang.slug);
    // Yellow needs dark ink on it; every other brand colour takes white.
    const onYellow = lang.slug === "javascript";
    const base = `#${hex}`;
    const tones: Tones = { top: base, left: mix(base, "#000000", 0.2), right: mix(base, "#000000", 0.36) };
    const size = TILE * 0.68;
    const k = size / 24;
    const [tx, ty] = proj(slot.x + (TILE - size) / 2, slot.y + (TILE - size) / 2, STAGE.h + slot.h);
    const [cx, cy] = proj(slot.x + TILE / 2, slot.y + TILE / 2, STAGE.h + slot.h);
    return { lang, slot, path, tones, k, tx, ty, cx, cy, ink: onYellow ? COLOR.ink : "#ffffff", index: i };
  });

  // Nearer blocks are painted later.
  const ordered = [...tiles].sort((a, b) => a.slot.x + a.slot.y - (b.slot.x + b.slot.y));

  return (
    <>
      {ordered.map(({ lang, slot, path, tones, k, tx, ty, cx, cy, ink, index }) => {
        const pill = lang.name.length * 6.8 + 20;
        return (
          <g key={lang.slug} className="animate-drop" style={{ animationDelay: `${0.25 + index * 0.1}s` }}>
            <g className="animate-bob" style={{ animationDelay: `${index * -0.7}s` }}>
              {/* Lifts under the pointer (or a tap) and names its language. */}
              <g className="hero-tile">
                {box(slot.x, slot.y, STAGE.h, TILE, TILE, slot.h, tones).map((f, n) => (
                  <polygon key={n} points={f.points} fill={f.fill} stroke={f.fill} strokeWidth="1.4" strokeLinejoin="round" />
                ))}
                <path
                  d={path}
                  fill={ink}
                  transform={`matrix(${COS * k} ${SIN * k} ${-COS * k} ${SIN * k} ${tx} ${ty})`}
                />
                <g className="hero-label">
                  <rect x={cx - pill / 2} y={cy - 52} width={pill} height={24} rx={12} fill="#ffffff" />
                  <text
                    x={cx}
                    y={cy - 36}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={COLOR.ink}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {lang.name}
                  </text>
                </g>
              </g>
            </g>
          </g>
        );
      })}
    </>
  );
}

function Letters() {
  return (
    <>
      {[jRings, bRings].map((rings, i) => {
        const solid = extrude(rings, STAGE.h, LETTER_HEIGHT, COLOR.letter);
        return (
          <g key={i}>
            {solid.walls.map((f, n) => (
              <polygon key={n} points={f.points} fill={f.fill} stroke={f.fill} strokeWidth="0.7" strokeLinejoin="round" />
            ))}
            <path d={solid.top} fill={COLOR.letter.top} fillRule="evenodd" />
          </g>
        );
      })}
    </>
  );
}

const stageRing: Pt[] = [
  [0, 0],
  [STAGE.w, 0],
  [STAGE.w, STAGE.d],
  [0, STAGE.d],
];

/** Faint ledger ruling across the stage, echoing the paper-report idea used elsewhere. */
const ruling = (() => {
  const lines: string[] = [];
  for (let x = 34; x < STAGE.w; x += 34) lines.push(`M${proj(x, 0, STAGE.h).join(" ")}L${proj(x, STAGE.d, STAGE.h).join(" ")}`);
  for (let y = 34; y < STAGE.d; y += 34) lines.push(`M${proj(0, y, STAGE.h).join(" ")}L${proj(STAGE.w, y, STAGE.h).join(" ")}`);
  return lines.join("");
})();

/** Tight bounds around the stage, its shadow and the tallest letter. */
const view = (() => {
  const left = proj(0, STAGE.d)[0];
  const right = proj(STAGE.w + FIELD_SHADOW.x, FIELD_SHADOW.y)[0];
  const top = proj(LETTER_AT.x, LETTER_AT.y, STAGE.h + LETTER_HEIGHT)[1];
  const bottom = proj(STAGE.w + FIELD_SHADOW.x, STAGE.d + FIELD_SHADOW.y)[1];
  return { x: left - 6, y: top - 12, w: right - left + 12, h: bottom - top + 18 };
})();

export function HeroIllustration({ className }: { className?: string }) {
  const names = heroLanguages.map((l) => l.name);
  const label = `Isometric illustration of the initials JB standing on a stage, surrounded by blocks marked ${names
    .slice(0, -1)
    .join(", ")} and ${names.at(-1)}`;

  const tileShadows = slots.slice(0, heroLanguages.length).map((s, i) => (
    <polygon
      key={`t${i}`}
      points={sweepConvex(
        [
          [s.x, s.y],
          [s.x + TILE, s.y],
          [s.x + TILE, s.y + TILE],
          [s.x, s.y + TILE],
        ],
        STAGE.h,
        s.h * 0.62,
        s.h * 0.2,
      )}
      fill={COLOR.stageShadow}
    />
  ));

  return (
    <HeroParallax>
      <svg
        viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
        className={className}
        overflow="visible"
        role="img"
        aria-label={label}
      >
        {/* Three depth layers, each shifting a little more with the cursor: the stage and its
            shadows, the letters, then the language blocks nearest the viewer. */}
        <g className="hero-layer" style={{ ["--k" as string]: 3 }} aria-hidden>
          <polygon points={sweepConvex(stageRing, 0, FIELD_SHADOW.x, FIELD_SHADOW.y)} fill={COLOR.fieldShadow} />
          {box(0, 0, 0, STAGE.w, STAGE.d, STAGE.h, {
            top: COLOR.stageTop,
            left: COLOR.stageLeft,
            right: COLOR.stageRight,
          }).map((f, n) => (
            <polygon key={n} points={f.points} fill={f.fill} stroke={f.fill} strokeWidth="1" strokeLinejoin="round" />
          ))}
          <path d={ruling} stroke={COLOR.stageLine} strokeOpacity="0.14" strokeWidth="1" fill="none" />
          {[jRings, bRings]
            .flatMap((rings) => sweep(rings[0], STAGE.h, LETTER_HEIGHT * 0.62, LETTER_HEIGHT * 0.2, 14))
            .map((points, i) => (
              <polygon key={`l${i}`} points={points} fill={COLOR.stageShadow} />
            ))}
          {tileShadows}
        </g>

        <g className="hero-layer" style={{ ["--k" as string]: 7 }} aria-hidden>
          <Letters />
        </g>

        <g className="hero-layer" style={{ ["--k" as string]: 11 }}>
          <Blocks />
        </g>
      </svg>
    </HeroParallax>
  );
}
