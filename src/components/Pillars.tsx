import { pillars } from "@/content/site";
import { PillarVisual } from "./visuals";
import { SectionHeading } from "./SectionHeading";

function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="mt-[5px] h-4 w-4 shrink-0 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8.5l3.2 3.2L13 4.8" />
    </svg>
  );
}

export function Pillars() {
  return (
    <section id="capabilities" className="scroll-mt-16 bg-sheet py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          title="Four kinds of work, one underlying idea"
          lead="Find the repetitive, error-prone parts of a business and replace them with software that runs quietly, tells you when something breaks, and hands the interesting decisions back to people."
        />

        {/* One heavy rule opens the ledger; each capability is a row beneath it. */}
        <div className="mt-16 border-t-[3px] border-ink">
          {pillars.map((p) => (
            <article
              key={p.id}
              className="group grid gap-8 border-b py-12 lg:grid-cols-12 lg:gap-14 lg:py-14"
            >
              <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
                <h3 className="text-[clamp(1.85rem,3vw,2.5rem)] leading-[1.05] font-bold tracking-[-0.03em]">
                  {p.title}
                </h3>
                <p className="mt-5 max-w-[34rem] text-[1.0625rem] leading-[1.65] text-ink-soft text-pretty">
                  {p.blurb}
                </p>
              </div>

              <div className="lg:col-span-7">
                <PillarVisual kind={p.visual} />

                <ul className="mt-7 grid gap-x-10 sm:grid-cols-2">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-3 border-t py-3 text-[15.5px] leading-snug text-ink-soft">
                      <Check />
                      {b}
                    </li>
                  ))}
                </ul>

                <p className="mt-3 border-t pt-4 text-[15px] leading-snug text-muted">
                  <span className="font-semibold text-ink">Tools:</span> {p.stack.join(", ")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
