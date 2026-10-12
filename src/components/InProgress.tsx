import { inProgress, scenes, type Build } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { ShotTabs, VideoPlayer } from "./WorkMedia";

function BuildRow({ build }: { build: Build }) {
  // Only a tall video gets the narrow media column; a wide one sits beside the text like screenshots.
  const portrait = build.media.type === "video" && build.media.height > build.media.width;

  return (
    <article className="grid gap-8 border-b py-12 lg:grid-cols-12 lg:gap-14 lg:py-14">
      <div className={portrait ? "lg:order-2 lg:col-span-8" : "lg:col-span-5"}>
        <p className="text-[15px] text-muted">{build.kind}</p>
        <h3 className="mt-2 text-[clamp(1.75rem,2.7vw,2.25rem)] leading-[1.05] font-bold tracking-[-0.03em]">
          {build.title}
        </h3>
        <p className="mt-5 max-w-[36rem] text-[1.0625rem] leading-[1.65] text-ink-soft text-pretty">
          {build.summary}
        </p>

        {/* Highlighter marks what already works. */}
        <ul className="mt-6 space-y-2.5">
          {build.working.map((item) => (
            <li key={item} className="text-[1.0625rem] leading-[1.7] font-medium">
              <span className="mark">{item}</span>
            </li>
          ))}
        </ul>

        {build.next ? (
          <p className="mt-5 max-w-[36rem] text-[15.5px] leading-snug text-ink-soft">{build.next}</p>
        ) : null}

        <p className="mt-5 text-[15px] leading-snug text-muted">
          <span className="font-semibold text-ink">Built with:</span> {build.stack.join(", ")}
        </p>
      </div>

      <div className={portrait ? "lg:order-1 lg:col-span-4" : "lg:col-span-7"}>
        {build.media.type === "shots" ? (
          <ShotTabs shots={build.media.shots} />
        ) : (
          <VideoPlayer {...build.media} className={portrait ? "mx-auto max-w-[20rem] lg:mx-0" : ""} />
        )}
        <p className={`mt-3 text-[14px] text-muted ${portrait ? "mx-auto max-w-[20rem] lg:mx-0" : ""}`}>
          {build.note}
        </p>
      </div>
    </article>
  );
}

export function InProgress() {
  return (
    <section id="in-progress" className="scroll-mt-16 bg-sheet py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          title="Software you can see working"
          lead="Everything here runs. Click through the screens and press play to see how each one behaves. If one is close to what you need, tell me and I will show you how it would work for you."
        />

        <div className="mt-16 border-t-[3px] border-ink">
          {inProgress.map((build) => (
            <BuildRow key={build.id} build={build} />
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-[clamp(1.75rem,2.7vw,2.25rem)] leading-[1.05] font-bold tracking-[-0.03em]">
            Interactive 3D scenes
          </h3>
          <p className="mt-4 max-w-[36rem] text-[1.0625rem] leading-[1.65] text-ink-soft text-pretty">
            A growing collection of small three.js scenes, each one a single page.
          </p>

          <div
            className={`mt-10 grid gap-12 md:gap-8 ${scenes.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
          >
            {scenes.map((scene) => (
              <article key={scene.id}>
                <VideoPlayer {...scene.video} />
                <h4 className="mt-5 text-[1.35rem] leading-tight font-bold tracking-[-0.02em]">
                  {scene.title}
                </h4>
                <p className="mt-2 text-[1.0625rem] leading-[1.6] text-ink-soft text-pretty">
                  {scene.summary}
                </p>
                <p className="mt-3 text-[15px] leading-snug text-muted">
                  <span className="font-semibold text-ink">Built with:</span> {scene.stack.join(", ")}
                </p>
                {scene.note ? <p className="mt-1 text-[14px] text-muted">{scene.note}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
