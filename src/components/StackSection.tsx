import { stackLayers } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

const builds = ["Web apps", "Internal tools", "Client portals", "Dashboards", "APIs", "Mobile apps"];

/**
 * The stack drawn as a cross-section: interface on top, platform underneath,
 * each layer a deeper shade than the one it rests on.
 */
const tones = [
  { box: "bg-sheet text-ink", hint: "text-ink-soft", chip: "border-ink/20 bg-paper" },
  { box: "bg-primary-wash text-ink", hint: "text-ink-soft", chip: "border-ink/15 bg-white/70" },
  { box: "bg-primary-mid text-ink", hint: "text-ink-soft", chip: "border-ink/15 bg-white/55" },
  { box: "bg-primary text-white", hint: "text-white/85", chip: "border-white/35 bg-white/10" },
] as const;

export function StackSection() {
  return (
    <section id="stack" className="scroll-mt-16 py-24 sm:py-28">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <SectionHeading
              title="Automation is only useful if someone can actually use it"
              lead="So I build the whole thing: the interface people log into, the API behind it, the database underneath, and the deployment that keeps it running. One person, no hand-off gaps."
            />

            <ul className="mt-10 grid max-w-[32rem] grid-cols-2 gap-x-8">
              {builds.map((b) => (
                <li key={b} className="border-t py-3 text-[1.0625rem] font-medium text-ink">
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="self-start overflow-hidden rounded-lg border">
            {stackLayers.map((layer, i) => (
              <div key={layer.label} className={`${tones[i].box} px-6 py-6 sm:px-7`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                  <h3 className="text-[1.35rem] font-bold tracking-[-0.02em]">{layer.label}</h3>
                  <p className={`text-[15px] ${tones[i].hint}`}>{layer.hint}</p>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2 text-[15px] font-medium">
                  {layer.items.map((item) => (
                    <li key={item} className={`rounded-md border px-2.5 py-1 ${tones[i].chip}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
