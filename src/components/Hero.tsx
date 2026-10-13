import Link from "next/link";
import { site } from "@/content/site";
import { HeroIllustration } from "./HeroIllustration";

export function Hero() {
  return (
    <section id="top" className="on-primary relative bg-primary pt-20 pb-14 text-white sm:pt-24 lg:pt-36 lg:pb-20">
      <div className="container-page grid items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:gap-6">
        {/* On phones the scene leads and the copy rides up over its front corner. */}
        <div className="relative z-10 -mt-12 sm:-mt-20 lg:mt-0">
          <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[15px] text-white/85">
            <span className="inline-flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-mark" aria-hidden />
              {site.availability}
            </span>
            <span>{site.location}</span>
          </p>

          <h1 className="mt-7 text-[clamp(2.9rem,6.4vw,5.6rem)] leading-[0.93] font-extrabold tracking-[-0.042em]">
            I build and
            <br />
            modernise web apps.
          </h1>

          <p className="mt-8 max-w-[34rem] text-[1.1875rem] leading-[1.6] text-white/90 text-pretty">
            {site.summary}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn btn-mark">
              See my work
            </a>
            <Link href="/hire/" className="btn btn-ghost-light">
              Hire me
            </Link>
          </div>
        </div>

        <HeroIllustration className="order-first mx-auto h-auto w-full max-w-[40rem] lg:order-none lg:max-w-none" />
      </div>
    </section>
  );
}
