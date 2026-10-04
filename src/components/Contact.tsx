import { site } from "@/content/site";
import { MailAddress, MailLink } from "./MailLink";

export function Contact() {
  return (
    <section id="contact" className="on-primary scroll-mt-16 bg-primary py-24 text-white sm:py-36">
      <div className="container-page">
        <h2 className="max-w-[14ch] text-[clamp(2.9rem,8.4vw,6.9rem)] leading-[0.93] font-extrabold tracking-[-0.042em]">
          Tell me the task nobody wants to do
        </h2>
        <p className="mt-9 max-w-[36rem] text-[1.1875rem] leading-[1.6] text-white/90 text-pretty">
          Send me the workflow: the spreadsheet, the inbox, the report, the ticket queue. I will tell
          you honestly whether it is worth automating, and what it would take.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <MailLink subject="Project enquiry" className="btn btn-mark">
            Email me
          </MailLink>
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-ghost-light"
            >
              {s.label}
            </a>
          ))}
        </div>

        <p className="mt-9 flex min-h-7 flex-wrap items-center gap-x-6 gap-y-1 text-[16px] text-white/85">
          <MailAddress className="font-semibold text-mark" />
          <span>{site.location}</span>
          <span>Replies within a working day</span>
        </p>
      </div>
    </section>
  );
}
