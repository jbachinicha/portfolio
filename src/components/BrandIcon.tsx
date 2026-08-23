import {
  siClaude,
  siDocker,
  siGraphql,
  siLaravel,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siStripe,
  siTypescript,
} from "simple-icons";
import type { ToolSlug } from "@/content/site";

type Glyph = { path: string; hex: string; viewBox?: string };

/**
 * Brand marks come from `simple-icons` (bundled at build time — no CDN, so
 * the site stays fully static). Two tools have no Simple Icons entry, so
 * they get a hand-drawn glyph in the same 24×24 grid.
 */
const custom: Record<"webhooks" | "playwright", Glyph> = {
  // Three-pronged webhook glyph.
  webhooks: {
    hex: "9CA3AF",
    path: "M12 2.5a4.2 4.2 0 0 0-2.1 7.83l-2.6 4.5a1.5 1.5 0 1 1-1.3 2.7 4.5 4.5 0 1 0 2.6-8.4 1.8 1.8 0 1 1 1.8-1.83 1.8 1.8 0 0 1-.24.9l3.9 6.75a1.5 1.5 0 1 1 1.3 2.25H8.4a4.5 4.5 0 1 0 0 3h9.3a4.5 4.5 0 1 0-3.9-6.75l-2.6-4.5A4.2 4.2 0 0 0 12 2.5Z",
  },
  // Browser window with a play control.
  playwright: {
    hex: "9CA3AF",
    path: "M3.2 4.2h17.6a.9.9 0 0 1 .9.9v13.8a.9.9 0 0 1-.9.9H3.2a.9.9 0 0 1-.9-.9V5.1a.9.9 0 0 1 .9-.9Zm0 3.6h17.6M5.6 6v-.1m2.4.1v-.1m2.4.1v-.1M10 11.4l4.8 2.8L10 17Z",
  },
};

const brands = {
  typescript: siTypescript,
  nodejs: siNodedotjs,
  python: siPython,
  nextjs: siNextdotjs,
  react: siReact,
  laravel: siLaravel,
  postgresql: siPostgresql,
  redis: siRedis,
  claude: siClaude,
  n8n: siN8n,
  graphql: siGraphql,
  stripe: siStripe,
  docker: siDocker,
} as const;

// Next.js ships a pure-black mark, which disappears on a dark background.
const tintOverrides: Partial<Record<ToolSlug, string>> = {
  nextjs: "#FFFFFF",
};

export function brandColor(slug: ToolSlug): string {
  const override = tintOverrides[slug];
  if (override) return override;
  const icon = slug in brands ? brands[slug as keyof typeof brands] : custom[slug as keyof typeof custom];
  return `#${icon.hex}`;
}

export function BrandIcon({ slug, className }: { slug: ToolSlug; className?: string }) {
  const icon =
    slug in brands ? brands[slug as keyof typeof brands] : custom[slug as keyof typeof custom];
  const isCustom = !(slug in brands);

  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-3.5 w-3.5 shrink-0"}
      fill={isCustom ? "none" : "currentColor"}
      stroke={isCustom ? "currentColor" : undefined}
      strokeWidth={isCustom ? 1.6 : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={icon.path} />
    </svg>
  );
}
