import { site } from "@/content/site";
import { MailAddress, MailLink } from "./MailLink";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 grid-bg opacity-50" />
              <div className="absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/12 blur-[100px]" />
            </div>

            <div className="relative">
              <span className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
                Next step
              </span>
              <h2 className="font-display mx-auto mt-5 max-w-2xl text-3xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl">
                Tell me the task nobody wants to do
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-fg-muted text-pretty">
                Send me the workflow: the spreadsheet, the inbox, the report, the ticket queue.
                I will tell you honestly whether it is worth automating, and what it would take.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <MailLink
                  subject="Project enquiry"
                  className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 text-[14px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
                >
                  Email me
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </MailLink>
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="glass inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-[14px] font-medium transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {s.label}
                  </a>
                ))}
              </div>

              <p className="mt-8 flex min-h-4 flex-wrap items-center justify-center gap-x-2 font-mono text-[11px] tracking-wide text-fg-muted">
                <MailAddress className="text-accent" />
                <span>·</span>
                <span>{site.location}</span>
                <span>·</span>
                <span>replies within a working day</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
