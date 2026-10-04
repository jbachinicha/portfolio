import { toolbelt } from "@/content/site";
import { BrandIcon, brandColor } from "./BrandIcon";

/**
 * The tools in daily use. Marks sit in muted ink at rest and take their brand
 * colour on hover, so the row stays quiet until you look at it. The right
 * side is left open on wide screens for the hero sheet hanging over the edge.
 */
export function ToolStrip() {
  return (
    <div className="pt-24 pb-6 lg:pt-12">
      <div className="container-page">
        <div className="lg:pr-[34.5rem]">
          <p className="text-[15px] font-medium text-ink">What I work with day to day</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {toolbelt.map((t) => (
              <li
                key={t.slug}
                style={{ ["--brand" as string]: brandColor(t.slug) }}
                className="group flex items-center gap-2 text-[15px] text-ink-soft"
              >
                <span className="text-muted transition-colors duration-200 group-hover:text-(--brand)">
                  <BrandIcon slug={t.slug} className="h-[18px] w-[18px] shrink-0" />
                </span>
                {t.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
