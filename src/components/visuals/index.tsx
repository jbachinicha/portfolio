import type { Pillar } from "@/content/site";

const frame =
  "relative h-40 overflow-hidden rounded-xl border border-line bg-ink-2/60";

/** Task queue draining on its own — the shape of a scheduled job. */
function AutomationVisual() {
  const rows = ["fetch orders", "validate rows", "post to CRM", "notify team"];
  return (
    <div className={frame}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative flex h-full flex-col justify-center gap-2.5 px-4">
        {rows.map((r, i) => (
          <div
            key={r}
            className="animate-queue flex items-center gap-2.5"
            style={{ animationDelay: `${i * 0.55}s` }}
          >
            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-accent/50 bg-accent/15 text-[9px] text-accent">
              ✓
            </span>
            <span className="font-mono text-[11px] text-fg-muted">{r}</span>
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-[10px] text-accent/70">ok</span>
          </div>
        ))}
      </div>
      <div className="absolute right-3 bottom-2.5 font-mono text-[9px] tracking-[0.18em] text-fg-muted uppercase">
        every 15 min
      </div>
    </div>
  );
}

/** Scattered exports collapsing into one chart. */
function ReportsVisual() {
  const bars = [0.45, 0.7, 0.35, 0.9, 0.6, 0.8, 0.5];
  return (
    <div className={frame}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative flex h-full items-end gap-2 px-4 pt-9 pb-8">
        {bars.map((h, i) => (
          <div
            key={i}
            className="animate-grow flex-1 origin-bottom rounded-t-[3px] bg-gradient-to-t from-accent/25 to-accent"
            style={{ height: `${h * 100}%`, animationDelay: `${i * 0.13}s` }}
          />
        ))}
      </div>
      <div className="absolute inset-x-4 bottom-6 h-px bg-line" />
      <div className="absolute top-3 left-4 flex items-center gap-2">
        <span className="font-mono text-[9px] text-fg-muted line-through">12 tabs</span>
        <span className="text-[9px] text-accent">→</span>
        <span className="font-mono text-[9px] text-fg">1 dashboard</span>
      </div>
      <div className="absolute right-3 bottom-2 font-mono text-[9px] text-accent/70">
        refreshed 04:00
      </div>
    </div>
  );
}

/** Ticket in, grounded answer out, escalation kept honest. */
function SupportVisual() {
  return (
    <div className={frame}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative flex h-full flex-col justify-center gap-2 px-4">
        <div className="max-w-[76%] self-start rounded-lg rounded-bl-sm border border-line bg-panel px-2.5 py-1.5 text-[11px] text-fg-muted">
          Where is my order #4821?
        </div>
        <div className="max-w-[82%] self-end rounded-lg rounded-br-sm border border-accent/30 bg-accent/10 px-2.5 py-1.5 text-[11px] text-fg">
          Shipped Tuesday, tracking sent to your email.
        </div>
        <div className="flex items-center gap-1.5 self-end pr-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="animate-typing h-1.5 w-1.5 rounded-full bg-accent-2"
              style={{ animationDelay: `${i * 0.16}s` }}
            />
          ))}
        </div>
      </div>
      <div className="absolute top-3 left-4 flex items-center gap-2 font-mono text-[9px] text-fg-muted">
        <span className="rounded-sm bg-accent-3/20 px-1.5 py-0.5 text-accent-3">intent: shipping</span>
        <span>confidence 0.94</span>
      </div>
      <div className="absolute right-3 bottom-2.5 font-mono text-[9px] text-accent/70">resolved · 0 human touches</div>
    </div>
  );
}

/** Hub and spokes: one place where the tools finally meet. */
function IntegrationsVisual() {
  const nodes = ["CRM", "Store", "Mail", "Books", "Chat", "DB"];
  return (
    <div className={frame}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-32 w-32">
          <div className="animate-orbit absolute inset-0">
            {nodes.map((n, i) => {
              const angle = (i / nodes.length) * Math.PI * 2;
              const x = 50 + 50 * Math.cos(angle);
              const y = 50 + 50 * Math.sin(angle);
              return (
                <span
                  key={n}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md border border-line bg-panel px-1.5 py-0.5 font-mono text-[9px] text-fg-muted"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {n}
                </span>
              );
            })}
          </div>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <circle cx="50" cy="50" r="50" fill="none" stroke="var(--color-line)" strokeDasharray="2 4" />
            {nodes.map((n, i) => {
              const angle = (i / nodes.length) * Math.PI * 2;
              return (
                <line
                  key={n}
                  x1="50"
                  y1="50"
                  x2={50 + 50 * Math.cos(angle)}
                  y2={50 + 50 * Math.sin(angle)}
                  stroke="var(--color-accent)"
                  strokeOpacity="0.28"
                  strokeWidth="0.7"
                  strokeDasharray="3 6"
                  className="animate-flow"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              );
            })}
          </svg>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-accent/40 bg-ink px-2 py-1 font-mono text-[9px] text-accent">
            sync
          </span>
        </div>
      </div>
      <div className="absolute right-3 bottom-2.5 font-mono text-[9px] text-fg-muted">
        idempotent · replayable
      </div>
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
