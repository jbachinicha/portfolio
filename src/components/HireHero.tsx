import Link from "next/link";
import { site } from "@/content/site";
import { MailLink } from "./MailLink";

/** Opening of the client page: the pitch, with no artwork between it and the call to action. */
export function HireHero() {
  return (
    <section id="top" className="on-primary relative bg-primary pt-32 pb-20 text-white sm:pt-40 sm:pb-28">
      <div className="container-page">
        <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[15px] text-white/85">
          <span className="inline-flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-mark" aria-hidden />
            {site.availability}
          </span>
          <span>{site.location}</span>
        </p>

        <h1 className="mt-7 max-w-[16ch] text-[clamp(2.9rem,8.4vw,6.9rem)] leading-[0.93] font-extrabold tracking-[-0.042em]">
          I turn manual work into working software.
        </h1>

        <p className="mt-9 max-w-[38rem] text-[1.1875rem] leading-[1.6] text-white/90 text-pretty">
          {site.intro}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <MailLink subject="Project inquiry" className="btn btn-mark">
            Start a project
          </MailLink>
          <a href="#capabilities" className="btn btn-ghost-light">
            What I automate
          </a>
          <Link href="/" className="btn btn-ghost-light">
            See the portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
