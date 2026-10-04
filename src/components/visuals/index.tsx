import type { Pillar } from "@/content/site";

/*
 * Small specimens, one per capability. They rest in a finished state and
 * only move while the capability row is hovered (`group` is on the row), so
 * nothing on the page loops unprompted.
 */

const frame = "ruled relative h-44 overflow-hidden rounded-md border bg-sheet";
const caption = "absolute right-3.5 bottom-2.5 text-[12.5px] text-muted";

/** Task queue draining on its own: the shape of a scheduled job. */
function AutomationVisual() {
  const rows = ["Fetch orders", "Validate rows", "Post to CRM", "Notify the team"];
  return (
    <div className={frame}>
      <div className="relative flex h-full flex-col justify-center gap-3 px-5 pb-3">
        {rows.map((r, i) => (
          <div
            key={r}
            className="flex items-center gap-3 group-hover:animate-queue"
            style={{ animationDelay: `${i * 0.55}s` }}
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 shrink-0 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M3 8.5l3.2 3.2L13 4.8" />
            </svg>
            <span className="text-[14px] font-medium text-ink">{r}</span>
            <span className="h-px flex-1 bg-rule" />
          </div>
        ))}
      </div>
      <div className={caption}>Runs every 15 minutes</div>
    </div>
  );
}

/** Scattered exports collapsing into one chart. */
function ReportsVisual() {
  const bars = [0.45, 0.7, 0.35, 0.9, 0.6, 0.8, 0.5];
  return (
    <div className={frame}>
      <div className="relative flex h-full items-end gap-2.5 px-5 pt-12 pb-9">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 origin-bottom rounded-t-[3px] bg-primary group-hover:animate-grow"
            style={{
              height: `${h * 100}%`,
              opacity: 0.35 + h * 0.65,
              animationDelay: `${i * 0.13}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-x-5 bottom-8 h-px bg-ink/70" />
      <div className="absolute top-3.5 left-5 flex items-center gap-2.5 text-[13.5px]">
        <span className="text-muted line-through">12 tabs</span>
        <span className="mark font-semibold">1 dashboard</span>
      </div>
      <div className={caption}>Refreshed at 04:00</div>
    </div>
  );
}

/** Ticket in, grounded answer out, escalation kept honest. */
function SupportVisual() {
  return (
    <div className={frame}>
      <div className="relative flex h-full flex-col justify-center gap-2 px-5 pt-5 pb-5">
        <div className="max-w-[74%] self-start rounded-lg rounded-bl-sm border bg-sheet px-3 py-1.5 text-[13.5px] text-ink-soft">
          Where is my order #4821?
        </div>
        <div className="max-w-[82%] self-end rounded-lg rounded-br-sm bg-primary px-3 py-1.5 text-[13.5px] text-white">
          Shipped Tuesday. Tracking is in your inbox.
        </div>
        <div className="flex items-center gap-1.5 self-end pr-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-primary-mid group-hover:animate-typing"
              style={{ animationDelay: `${i * 0.16}s` }}
            />
          ))}
        </div>
      </div>
      <div className="absolute top-3 left-5 flex items-center gap-2 text-[12.5px] text-muted">
        <span className="rounded-sm bg-primary-wash px-1.5 py-0.5 font-medium text-primary-deep">
          Intent: shipping
        </span>
        <span>Confidence 0.94</span>
      </div>
      <div className={caption}>Resolved without a human</div>
    </div>
  );
}

/** Hub and spokes: one place where the tools finally meet. */
function IntegrationsVisual() {
  const nodes = ["CRM", "Store", "Mail", "Books", "Chat", "DB"];
  return (
    <div className={frame}>
      <div className="absolute inset-0 grid place-items-center pb-3">
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 group-hover:animate-orbit">
            {nodes.map((n, i) => {
              const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + 50 * Math.cos(angle);
              const y = 50 + 50 * Math.sin(angle);
              return (
                <span
                  key={n}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md border bg-sheet px-1.5 py-0.5 text-[12px] font-medium text-ink-soft"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {n}
                </span>
              );
            })}
          </div>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
            <circle cx="50" cy="50" r="50" fill="none" stroke="var(--color-rule)" strokeDasharray="2 4" />
            {nodes.map((n, i) => {
              const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <line
                  key={n}
                  x1="50"
                  y1="50"
                  x2={50 + 50 * Math.cos(angle)}
                  y2={50 + 50 * Math.sin(angle)}
                  stroke="var(--color-primary)"
                  strokeOpacity="0.4"
                  strokeWidth="0.8"
                  strokeDasharray="3 6"
                  className="group-hover:animate-flow"
                />
              );
            })}
          </svg>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-primary px-2.5 py-1 text-[12.5px] font-semibold text-white">
            Sync
          </span>
        </div>
      </div>
      <div className={caption}>Safe to retry, replayable</div>
    </div>
  );
}

const map = {
  automation: AutomationVisual,
  reports: ReportsVisual,
  support: SupportVisual,
  integrations: IntegrationsVisual,
} satisfies Record<Pillar["visual"], () => React.ReactElement>;

export function PillarVisual({ kind }: { kind: Pillar["visual"] }) {
  const Component = map[kind];
  return <Component />;
}
