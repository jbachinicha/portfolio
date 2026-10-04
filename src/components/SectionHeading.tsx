type Props = {
  title: string;
  lead?: string;
  className?: string;
};

/** Plain heading and lead. The type does the work; nothing sits above it. */
export function SectionHeading({ title, lead, className = "" }: Props) {
  return (
    <div className={`max-w-[44rem] ${className}`}>
      <h2 className="text-[clamp(2.1rem,4.6vw,3.5rem)] leading-[1.02] font-bold tracking-[-0.035em]">
        {title}
      </h2>
      {lead ? (
        <p className="mt-5 max-w-[38rem] text-[1.125rem] leading-[1.65] text-ink-soft text-pretty">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
