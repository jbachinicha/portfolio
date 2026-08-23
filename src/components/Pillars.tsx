import { pillars } from "@/content/site";
import { PillarVisual } from "./visuals";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Pillars() {
  return (
    <section id="capabilities" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Capabilities"
          title={
            <>
              Four kinds of work, one <span className="text-gradient">underlying idea</span>
            </>
          }
          lead="Find the repetitive, error-prone parts of a business and replace them with software that runs quietly, tells you when something breaks, and hands the interesting decisions back to people."
        />

        <div className="mt-16 space-y-6">
          {pillars.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <article className="group glass relative overflow-hidden rounded-2xl transition-colors duration-500 hover:border-accent/25">
                {/* Sheen on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute inset-x-0 top-0 h-px hairline" />
                  <div className="absolute -inset-x-10 -top-24 h-48 bg-accent/6 blur-3xl" />
                </div>

                <div
                  className={`relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-12 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-accent">{p.eyebrow}</span>
                      <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                        {p.title}
                      </h3>
                    </div>

                    <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-fg-muted text-pretty">
                      {p.blurb}
                    </p>

                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5 text-[13px] leading-snug text-fg-muted">
                          <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-line bg-ink-2/70 px-2 py-1 font-mono text-[10.5px] text-fg-muted"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <PillarVisual kind={p.visual} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
