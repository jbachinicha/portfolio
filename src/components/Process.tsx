import { process } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

/**
 * The only numbered section, because it is the only real sequence. Each
 * step's rule fills a little further, so progress is readable without the
 * numerals.
 */
export function Process() {
  return (
    <section id="process" className="scroll-mt-16 bg-sheet py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          title="Small slices, shipped early, measured honestly"
          lead="No six-week discovery phase before anything works. We find the most expensive manual step and remove it first."
        />

        <ol className="mt-16 grid gap-12 md:grid-cols-4 md:gap-8">
          {process.map((s, i) => (
            <li key={s.step}>
              <div className="h-[6px] w-full bg-rule" aria-hidden>
                <div className="h-full bg-primary" style={{ width: `${((i + 1) / process.length) * 100}%` }} />
              </div>
              <p className="font-display mt-6 text-[4.5rem] leading-none font-extrabold tracking-[-0.06em] text-primary">
                {s.step}
              </p>
              <h3 className="mt-4 text-[1.4rem] leading-tight font-bold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-3 text-[1.0625rem] leading-[1.6] text-ink-soft text-pretty">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
