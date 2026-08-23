import { process } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="How I work"
          title={
            <>
              Small slices, shipped early, <span className="text-gradient">measured honestly</span>
            </>
          }
          lead="No six-week discovery phase before anything works. We find the most expensive manual step and remove it first."
          align="center"
        />

        <ol className="relative mt-16 grid gap-8 md:grid-cols-4 md:gap-6">
          {/* Connector rail */}
          <div className="pointer-events-none absolute top-4 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent md:block" />

          {process.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08}>
              <li className="relative">
                <div className="flex items-center gap-3 md:block">
                  <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent/40 bg-ink font-mono text-[11px] text-accent">
                    {s.step}
                  </span>
                  <h3 className="font-display text-[15px] font-semibold tracking-tight md:mt-5">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-fg-muted text-pretty">
                  {s.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
