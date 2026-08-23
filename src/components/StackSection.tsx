import { stackLayers } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function StackSection() {
  return (
    <section id="stack" className="scroll-mt-24 border-y border-line/70 bg-ink-2/30 py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Full-stack"
              title={
                <>
                  Automation is only useful if someone can <span className="text-gradient">actually use it</span>
                </>
              }
              lead="So I build the whole thing: the interface people log into, the API behind it, the database underneath, and the deployment that keeps it running. One person, no hand-off gaps."
            />

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Web apps", "Internal tools", "Client portals", "Dashboards", "APIs", "Mobile"].map(
                  (t) => (
                    <span
                      key={t}
                      className="glass rounded-full px-3 py-1.5 text-[12.5px] text-fg-muted"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </Reveal>
          </div>

          <div className="space-y-3">
            {stackLayers.map((layer, i) => (
              <Reveal key={layer.label} delay={i * 0.07}>
                <div className="group glass relative overflow-hidden rounded-xl p-5 transition-colors duration-500 hover:border-accent/25">
                  <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-[15px] font-semibold tracking-tight">
                      {layer.label}
                    </h3>
                    <span className="font-mono text-[10px] tracking-[0.16em] text-fg-muted uppercase">
                      {`0${i + 1}`}
                    </span>
                  </div>
                  <p className="mt-1 text-[12.5px] text-fg-muted">{layer.hint}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-line bg-ink/60 px-2 py-1 font-mono text-[10.5px] text-fg-muted transition-colors group-hover:border-line group-hover:text-fg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
