"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import { site } from "@/content/site";
import { MailLink } from "./MailLink";

type Variant = "portfolio" | "hire";

/**
 * Same-page anchors are plain links; anything that leaves the page goes
 * through `next/link` so the deploy's base path is applied.
 */
const config = {
  portfolio: {
    home: "#top",
    links: [
      { href: "#work", label: "Work" },
      { href: "#stack", label: "Stack" },
      { href: "#about", label: "About" },
      { href: "#contact", label: "Contact" },
    ],
  },
  hire: {
    home: "/",
    links: [
      { href: "/", label: "Portfolio" },
      { href: "#capabilities", label: "Capabilities" },
      { href: "#process", label: "Process" },
      { href: "#work", label: "Work" },
      { href: "#contact", label: "Contact" },
    ],
  },
} as const;

function NavLink({ href, ...props }: React.ComponentProps<"a">) {
  const target = String(href);
  return target.startsWith("#") ? <a href={target} {...props} /> : <Link href={target} {...props} />;
}

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

export function Nav({ variant }: { variant: Variant }) {
  const { home, links } = config[variant];
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
          <NavLink
            href={home}
            className="flex items-center gap-2.5"
            aria-label={variant === "hire" ? `${site.fullName}, portfolio home` : `${site.fullName}, back to top`}
          >
            <Mark className={`h-5 w-5 ${light ? "text-mark" : "text-primary"}`} />
            <span className="font-display text-[1.05rem] font-bold tracking-[-0.02em]">{site.short}</span>
          </NavLink>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <NavLink
                  href={l.href}
                  className={`rounded-md px-3.5 py-2 text-[15px] font-medium transition-colors ${
                    light ? "text-white/85 hover:text-white" : "text-ink-soft hover:text-primary"
                  }`}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {variant === "portfolio" ? (
              <Link
                href="/hire/"
                className={`btn hidden !px-4 !py-2.5 !text-[14px] sm:inline-flex ${
                  light ? "btn-mark" : "btn-ink"
                }`}
              >
                Hire me
              </Link>
            ) : (
              <MailLink
                subject="Project inquiry"
                className={`btn hidden !px-4 !py-2.5 !text-[14px] sm:inline-flex ${
                  light ? "btn-mark" : "btn-ink"
                }`}
              >
                Start a project
              </MailLink>
            )}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle navigation"
              className={`grid h-10 w-10 place-items-center rounded-md border lg:hidden ${
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
        className={`overflow-hidden border-b bg-paper transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-page flex flex-col py-2">
          {links.map((l) => (
            <li key={l.href}>
              <NavLink
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b py-4 text-lg font-medium text-ink"
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            {variant === "portfolio" ? (
              <Link href="/hire/" onClick={() => setOpen(false)} className="btn btn-ink mt-5 mb-3 w-full">
                Hire me
              </Link>
            ) : (
              <MailLink subject="Project inquiry" className="btn btn-ink mt-5 mb-3 w-full">
                Start a project
              </MailLink>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
