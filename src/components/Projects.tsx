import { projects } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="work" className="scroll-mt-24 border-t border-line/70 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Systems currently doing the boring work <span className="text-gradient">for someone</span>
            </>
          }
          lead="Client details stay private, so these are described by shape and outcome. Ask me and I will walk you through the architecture."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="group glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                  {p.kind}
                </span>
                <h3 className="font-display mt-3 text-lg leading-snug font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-fg-muted text-pretty">
                  {p.summary}
                </p>

                <ul className="mt-5 space-y-2 border-t border-line/70 pt-4">
                  {p.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2 text-[12.5px] text-fg">
                      <span className="font-mono text-[10px] text-accent-2">↗</span>
                      {o}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-line bg-ink-2/70 px-2 py-1 font-mono text-[10px] text-fg-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
