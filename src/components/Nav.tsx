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

/** Small ticked checkbox: the site's mark for "done". */
function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <rect x="1.5" y="1.5" width="17" height="17" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5.6 10.4l3 3 5.8-6.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Nav() {
  // True while the primary-colour hero sits behind the bar.
  const [overHero, setOverHero] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const onScroll = () => {
      setOverHero(hero.getBoundingClientRect().bottom > 64);
      setScrolled(window.scrollY > 8);
    };
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

  const light = overHero && !open;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${light ? "on-primary" : ""}`}>
      <div
        className={`transition-colors duration-300 ${
          light
            ? `text-white ${scrolled ? "bg-primary" : "bg-transparent"}`
            : "border-b bg-paper/90 text-ink backdrop-blur-md"
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between gap-6" aria-label="Main">
          <a href="#top" className="flex items-center gap-2.5" aria-label={`${site.fullName}, back to top`}>
            <Mark className={`h-5 w-5 ${light ? "text-mark" : "text-primary"}`} />
            <span className="font-display text-[1.05rem] font-bold tracking-[-0.02em]">{site.fullName}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`rounded-md px-3.5 py-2 text-[15px] font-medium transition-colors ${
                    light ? "text-white/85 hover:text-white" : "text-ink-soft hover:text-primary"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <MailLink
              subject="Project enquiry"
              className={`btn hidden !px-4 !py-2.5 !text-[14px] sm:inline-flex ${
                light ? "btn-mark" : "btn-ink"
              }`}
            >
              Let&apos;s talk
            </MailLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle navigation"
              className={`grid h-10 w-10 place-items-center rounded-md border md:hidden ${
                light ? "border-white/40" : "border-rule bg-sheet"
              }`}
            >
              <span className="relative block h-3 w-4.5">
                <span
                  className={`absolute left-0 h-[2px] w-[18px] bg-current transition-all duration-300 ${
                    open ? "top-[5px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[2px] w-[18px] bg-current transition-all duration-300 ${
                    open ? "top-[5px] -rotate-45" : "top-[10px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className={`h-[3px] origin-left ${light ? "bg-mark" : "bg-primary"}`}
      />

      {/* Mobile sheet */}
      <div
        className={`overflow-hidden border-b bg-paper transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-page flex flex-col py-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b py-4 text-lg font-medium text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <MailLink subject="Project enquiry" className="btn btn-ink mt-5 mb-3 w-full">
              Start a project
            </MailLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
