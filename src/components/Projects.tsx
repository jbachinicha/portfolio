import { projects } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="work" className="scroll-mt-16 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          title="Systems currently doing the boring work for someone"
          lead="Client details stay private, so these are described by shape and outcome. Ask me and I will walk you through the architecture."
        />

        <div className="mt-16 border-t-[3px] border-ink">
          {projects.map((p) => (
            <article key={p.title} className="grid gap-7 border-b py-12 lg:grid-cols-12 lg:gap-14 lg:py-14">
              <div className="lg:col-span-4">
                <p className="text-[15px] text-muted">{p.kind}</p>
                <h3 className="mt-2 text-[clamp(1.75rem,2.7vw,2.25rem)] leading-[1.05] font-bold tracking-[-0.03em]">
                  {p.title}
                </h3>
              </div>

              <div className="lg:col-span-5">
                <p className="text-[1.0625rem] leading-[1.65] text-ink-soft text-pretty">{p.summary}</p>
                <p className="mt-5 text-[15px] leading-snug text-muted">
                  <span className="font-semibold text-ink">Built with:</span> {p.stack.join(", ")}
                </p>
              </div>

              {/* Highlighter marks what the client got. */}
              <ul className="space-y-3 lg:col-span-3">
                {p.outcomes.map((o) => (
                  <li key={o} className="text-[1.0625rem] leading-[1.7] font-medium">
                    <span className="mark">{o}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
