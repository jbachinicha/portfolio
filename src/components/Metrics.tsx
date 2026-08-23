"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { metrics } from "@/content/site";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;

    const duration = 1400;
    let start: number | null = null;
    let raf = 0;

    const tick = (now: number) => {
      start ??= now;
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      setProgress(t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const value = reduced ? to : Math.round(to * progress);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

export function Metrics() {
  return (
    <section className="py-14 sm:py-16">
      <div className="container-page">
        <div className="glass grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="relative p-6 sm:p-7">
              <div className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                <span className="text-gradient">
                  <Counter to={m.value} suffix={m.suffix} />
                </span>
              </div>
              <p className="mt-2.5 text-[13px] leading-snug font-medium text-fg">{m.label}</p>
              <p className="mt-1 text-[12px] text-fg-muted">{m.sub}</p>
              <div className="absolute inset-y-6 right-0 w-px bg-line/70 last:hidden max-lg:hidden" />
            </div>
          ))}
        </div>
        <p className="mt-3 text-center font-mono text-[10.5px] tracking-wide text-fg-muted">
          indicative figures from client workflows, happy to walk through specifics
        </p>
      </div>
    </section>
  );
}
