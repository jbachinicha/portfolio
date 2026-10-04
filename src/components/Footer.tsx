import { site } from "@/content/site";
import { MailLink } from "./MailLink";

export function Footer() {
  return (
    <footer className="on-primary border-t border-white/25 bg-primary py-9 text-white/85">
      <div className="container-page flex flex-col gap-5 text-[15px] sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-display font-bold text-white">{site.fullName}</span>
          <span className="ml-3">{site.role}</span>
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-mark"
            >
              {s.label}
            </a>
          ))}
          <MailLink className="transition-colors hover:text-mark">Email</MailLink>
          <span className="text-white/70">Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
