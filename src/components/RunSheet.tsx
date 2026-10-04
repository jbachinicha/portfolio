const jobs = [
  { time: "04:00", task: "Pull orders from the storefront", result: "212 rows" },
  { time: "04:01", task: "Check every row against the rules", result: "3 flagged" },
  { time: "04:02", task: "Update CRM and accounting", result: "209 synced" },
  { time: "04:04", task: "Build the Monday report", result: "PDF emailed" },
  { time: "04:05", task: "Answer the support queue", result: "38 of 41 resolved" },
  { time: "04:05", task: "Hand 3 tickets to a person", result: "summary attached" },
];

/** Seconds before the first job is ticked off, and the gap between jobs. */
const START = 1.15;
const STEP = 0.62;

const feedHoles =
  "radial-gradient(circle at 50% 50%, var(--color-paper) 0 4px, var(--color-rule) 4px 5px, transparent 5px) 0 0 / 100% 28px repeat-y";

/**
 * A continuous-form printout of one night's work: the artefact an operations
 * person actually receives once the manual steps have been automated. It
 * prints in, then each job is ticked off and its result highlighted. Pure CSS,
 * so it renders complete without JS and settles instantly under
 * `prefers-reduced-motion`.
 */
export function RunSheet() {
  const finish = START + jobs.length * STEP;

  return (
    <figure
      className="animate-print relative z-10 w-full max-w-[32rem] bg-sheet text-ink shadow-[0_34px_70px_-26px_rgb(2_36_24/0.65)] lg:justify-self-end"
      aria-label="Sample run sheet: six overnight jobs, all completed"
    >
      {/* Tractor-feed margins */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-7 border-r border-dashed"
        style={{ background: feedHoles }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-7 border-l border-dashed"
        style={{ background: feedHoles }}
      />

      <div className="px-10 pt-7 pb-6">
        <figcaption className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-3.5">
          <span className="font-display text-[1.5rem] leading-none font-bold tracking-[-0.02em] whitespace-nowrap">
            Overnight run
          </span>
          <span className="text-[13px] whitespace-nowrap text-muted">Sample run</span>
        </figcaption>

        <ol className="mt-1 font-mono text-[13px] leading-[1.55]">
          {jobs.map((job, i) => {
            const delay = `${START + i * STEP}s`;
            return (
              <li
                key={job.task}
                className="-mx-2 grid grid-cols-[2.7rem_1fr_1.1rem] items-start gap-x-2 px-2 py-3.5 odd:bg-primary-wash/60"
              >
                <span className="animate-ink-in text-muted" style={{ animationDelay: delay }}>
                  {job.time}
                </span>
                <span>
                  <span className="animate-ink-in" style={{ animationDelay: delay }}>
                    {job.task}
                  </span>{" "}
                  <span
                    className="mark animate-sweep whitespace-nowrap"
                    style={{ animationDelay: `${START + i * STEP + 0.12}s` }}
                  >
                    {job.result}
                  </span>
                </span>
                <svg
                  viewBox="0 0 16 16"
                  className="animate-tick mt-[3px] h-3.5 w-3.5 text-primary"
                  style={{ animationDelay: delay }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M3 8.5l3.2 3.2L13 4.8" />
                </svg>
              </li>
            );
          })}
        </ol>

        <div
          className="animate-ink-in mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t-2 border-ink pt-4 text-[14px]"
          style={{ animationDelay: `${finish}s` }}
        >
          <span className="font-semibold">6 jobs run, 0 failed</span>
          <span className="text-muted">Next run tomorrow at 04:00</span>
        </div>
      </div>
    </figure>
  );
}
