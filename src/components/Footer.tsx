import { site } from "@/content/site";
import { MailLink } from "./MailLink";

export function Footer() {
  return (
    <footer className="border-t border-line/70 py-10">
      <div className="container-page flex flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-display text-[13px] font-semibold tracking-tight">
            {site.fullName}
          </span>
          <span className="text-[13px] text-fg-muted">/ {site.role}</span>
        </div>

        <div className="flex items-center gap-5">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[12.5px] text-fg-muted transition-colors hover:text-accent"
            >
              {s.label}
            </a>
          ))}
          <MailLink className="text-[12.5px] text-fg-muted transition-colors hover:text-accent">
            Email
          </MailLink>
        </div>

        <p className="font-mono text-[11px] text-fg-muted">
          Built with Next.js
        </p>
      </div>
    </footer>
  );
}
