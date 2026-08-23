"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { site } from "@/content/site";
import { MailLink } from "./MailLink";

const links = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#stack", label: "Stack" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-colors duration-500 ${
          scrolled ? "border-b border-line/80 bg-ink/70 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between gap-6">
          <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="animate-pulse-ring absolute h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-display text-sm font-semibold tracking-tight">
              {site.name}
              <span className="text-accent">.</span>
              <span className="text-fg-muted transition-colors group-hover:text-fg">dev</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-[13px] text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <MailLink
              subject="Project enquiry"
              className="hidden rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-[13px] font-medium text-accent transition-colors hover:bg-accent/20 sm:inline-flex"
            >
              Let&apos;s talk
            </MailLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle navigation"
              className="glass grid h-9 w-9 place-items-center rounded-lg md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-[1.5px] w-4 bg-fg transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-4 bg-fg transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3"
      />

      {/* Mobile sheet */}
      <div
        className={`overflow-hidden border-b border-line bg-ink/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-page flex flex-col py-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line/60 py-3.5 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {l.label}
                <span className="font-mono text-[11px] text-accent/60">→</span>
              </a>
            </li>
          ))}
          <li>
            <MailLink
              subject="Project enquiry"
              className="mt-4 block rounded-lg bg-accent/15 py-3 text-center text-sm font-medium text-accent"
            >
              Start a project
            </MailLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
