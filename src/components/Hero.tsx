import { site } from "@/content/site";
import { RunSheet } from "./RunSheet";

export function Hero() {
  return (
    <section id="top" className="on-primary relative bg-primary pt-28 text-white sm:pt-36">
      <div className="container-page">
        <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[15px] text-white/85">
          <span className="inline-flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-mark" aria-hidden />
            {site.availability}
          </span>
          <span>{site.location}</span>
        </p>

        <h1 className="mt-7 text-[clamp(2.9rem,8.4vw,6.9rem)] leading-[0.93] font-extrabold tracking-[-0.042em]">
          I turn manual work
          <br />
          into working software.
        </h1>

        <div className="mt-12 grid items-start gap-14 lg:grid-cols-[1fr_32rem] lg:gap-16">
          <div>
            <p className="max-w-[34rem] text-[1.1875rem] leading-[1.6] text-white/90 text-pretty">
              {site.intro}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn btn-mark">
                Start a project
              </a>
              <a href="#capabilities" className="btn btn-ghost-light">
                What I automate
              </a>
            </div>
          </div>

          <div className="-mb-20 lg:-mb-28">
            <RunSheet />
          </div>
        </div>
      </div>
    </section>
  );
}
