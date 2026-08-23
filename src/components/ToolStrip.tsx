import { toolbelt } from "@/content/site";
import { BrandIcon, brandColor } from "./BrandIcon";

/**
 * Static working-set band. Icons sit muted at rest and pick up their brand
 * colour on hover, so the row stays calm until you look at it.
 */
export function ToolStrip() {
  return (
    <div className="border-y border-line/70 bg-ink-2/40">
      <div className="container-page flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-8">
        <div className="flex shrink-0 items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[10.5px] tracking-[0.2em] text-fg-muted uppercase">
            Working set
          </span>
        </div>

        <span className="hidden h-8 w-px bg-line sm:block" />

        <ul className="flex flex-wrap gap-2">
          {toolbelt.map((t) => (
            <li
              key={t.slug}
              style={{ ["--brand" as string]: brandColor(t.slug) }}
              className="group flex items-center gap-1.5 rounded-full border border-line bg-ink/60 py-1 pr-2.5 pl-2 font-mono text-[11px] text-fg-muted transition-colors hover:border-accent/35 hover:text-fg"
            >
              <span className="text-fg-muted/60 transition-colors duration-300 group-hover:text-[var(--brand)]">
                <BrandIcon slug={t.slug} />
              </span>
              {t.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
