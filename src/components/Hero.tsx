"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { SystemCanvas } from "./SystemCanvas";

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  const reduced = useReducedMotion();
  const anim = (i: number) =>
    reduced
      ? {}
      : { variants: rise, custom: i, initial: "hidden" as const, animate: "show" as const };

  return (
    <section id="top" className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <motion.div {...anim(0)} className="flex flex-wrap items-center gap-3">
              <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] text-fg-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-pulse-ring absolute h-1.5 w-1.5 rounded-full bg-accent-2" />
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
                </span>
                {site.availability}
              </span>
              <span className="font-mono text-[11px] tracking-[0.18em] text-fg-muted uppercase">
                {site.location}
              </span>
            </motion.div>

            <motion.h1
              {...anim(1)}
              className="font-display mt-7 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.1rem]"
            >
              I turn manual work
              <br />
              into <span className="text-gradient">working software</span>
              <span className="animate-blink ml-1 inline-block h-[0.9em] w-[3px] translate-y-[1px] bg-accent align-middle" />
            </motion.h1>

            <motion.p {...anim(2)} className="mt-6 max-w-xl text-[15px] leading-relaxed text-fg-muted text-pretty sm:text-[17px]">
              {site.intro}
            </motion.p>

            <motion.div {...anim(3)} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-fg px-5 py-3 text-[14px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                Start a project
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#capabilities"
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-medium text-fg transition-colors hover:border-accent/40 hover:text-accent"
              >
                What I automate
              </a>
            </motion.div>

            <motion.dl {...anim(4)} className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-7 sm:grid-cols-3">
              {[
                ["Full-stack", "web apps, end to end"],
                ["Automation", "workflows & pipelines"],
                ["AI systems", "support & assistants"],
              ].map(([term, desc]) => (
                <div key={term}>
                  <dt className="text-[13px] font-semibold text-fg">{term}</dt>
                  <dd className="mt-0.5 text-[12px] text-fg-muted">{desc}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="animate-float"
          >
            <SystemCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
