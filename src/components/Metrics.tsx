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
      <span className="text-primary">{suffix}</span>
    </span>
  );
}

export function Metrics() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-page">
        {/* The double rule is the accountant's mark for a total. */}
        <div className="grid border-t-[6px] border-double border-ink sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
          {metrics.map((m) => (
            <div key={m.label} className="py-8 lg:px-7 lg:first:pl-0 lg:last:pr-0">
              <div className="font-display text-[clamp(3.2rem,6vw,4.75rem)] leading-none font-extrabold tracking-[-0.045em]">
                <Counter to={m.value} suffix={m.suffix} />
              </div>
              <p className="mt-4 text-[1.0625rem] leading-snug font-semibold text-ink">{m.label}</p>
              <p className="mt-1 text-[15px] text-muted">{m.sub}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[14px] text-muted">
          Indicative figures from client workflows. Happy to walk through the specifics.
        </p>
      </div>
    </section>
  );
}
