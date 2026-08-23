import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, lead, align = "left" }: Props) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <div
          className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          <span className="h-px w-8 bg-accent/60" />
          <span className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="font-display mt-4 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.12}>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted text-pretty sm:text-base">
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
