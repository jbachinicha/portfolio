/**
 * Single source of truth for everything personal on the site.
 * Edit this file — the components read from it.
 */

export const site = {
  name: "Jay",
  fullName: "Jay B.",
  role: "Full-Stack Developer & Automation Engineer",
  tagline: "I turn manual work into working software.",
  intro:
    "Full-stack web developer who specialises in automation, AI-assisted support and making disconnected tools behave like one product. I take the repetitive parts of a business (reports, tickets, hand-offs, data entry) and turn them into software that just runs.",
  location: "Philippines · Remote worldwide",
  availability: "Open to new projects",
  // Contact address lives in src/lib/email.ts, stored reversed so scrapers
  // cannot lift it out of the exported HTML.
  socials: [
    { label: "GitHub", href: "https://github.com/FDC-Jay" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
} as const;

export const metrics = [
  { value: 40, suffix: "h+", label: "Manual hours removed per month", sub: "across client workflows" },
  { value: 25, suffix: "+", label: "Integrations shipped", sub: "APIs, webhooks, internal tools" },
  { value: 90, suffix: "%", label: "Routine tickets auto-resolved", sub: "with human hand-off intact" },
  { value: 6, suffix: "x", label: "Faster reporting cycles", sub: "from days to minutes" },
] as const;

export type Pillar = {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  bullets: string[];
  stack: string[];
  visual: "automation" | "reports" | "support" | "integrations";
};

export const pillars: Pillar[] = [
  {
    id: "automation",
    eyebrow: "01",
    title: "Process Automation",
    blurb:
      "The work nobody should be doing by hand. I map the process, find the seams, and replace the clicking with a job that runs on a schedule, or the moment something happens.",
    bullets: [
      "Event- and schedule-driven pipelines with retries and alerting",
      "Document, form and spreadsheet processing end to end",
      "Approval flows and hand-offs that keep a human in the loop",
      "Scrapers and sync jobs that survive real-world APIs",
    ],
    stack: ["Node.js", "Python", "n8n", "Make", "Cron / Queues", "Playwright"],
    visual: "automation",
  },
  {
    id: "reports",
    eyebrow: "02",
    title: "Reports & Data Streamlining",
    blurb:
      "Twelve spreadsheets, three exports and a Monday morning of copy-paste, collapsed into one dashboard that is already correct when you open it.",
    bullets: [
      "One pipeline from source systems to a single source of truth",
      "Scheduled PDF / Sheets / email digests, delivered automatically",
      "Live dashboards with the metrics leadership actually asks for",
      "Validation so bad data gets flagged, not silently averaged",
    ],
    stack: ["PostgreSQL", "SQL", "Google Sheets API", "Recharts", "ETL"],
    visual: "reports",
  },
  {
    id: "support",
    eyebrow: "03",
    title: "AI Customer Support Systems",
    blurb:
      "Support that answers instantly from your real documentation, resolves what it can, and escalates the rest with the full context already attached.",
    bullets: [
      "RAG assistants grounded in your docs, policies and product data",
      "Intent routing, tagging and priority triage on every ticket",
      "Seamless human hand-off with conversation summary and history",
      "Guardrails, fallbacks and transcripts you can audit",
    ],
    stack: ["Claude API", "OpenAI", "Vector search", "Webhooks", "Zendesk / Intercom"],
    visual: "support",
  },
  {
    id: "integrations",
    eyebrow: "04",
    title: "Tool Connection & Integrations",
    blurb:
      "Your CRM, your store, your inbox, your accounting and your internal tools, all talking to each other reliably, so data is entered once and lands everywhere.",
    bullets: [
      "REST / GraphQL / webhook integrations with idempotent syncs",
      "Middleware and internal APIs when off-the-shelf glue runs out",
      "Auth, rate limits, backoff and replay handled properly",
      "Observability: logs, health checks and failure notifications",
    ],
    stack: ["REST / GraphQL", "OAuth 2.0", "Webhooks", "Redis", "Docker"],
    visual: "integrations",
  },
];

export const stackLayers = [
  {
    label: "Frontend",
    hint: "Interfaces people actually enjoy using",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue", "React Native"],
  },
  {
    label: "Backend",
    hint: "APIs, jobs and business logic",
    items: ["Node.js", "Laravel / PHP", "Python", "Express", "REST", "GraphQL"],
  },
  {
    label: "Data",
    hint: "Storage, queries and pipelines",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "SQL"],
  },
  {
    label: "Platform",
    hint: "Shipping it and keeping it up",
    items: ["Docker", "GitHub Actions", "Vercel", "Linux / VPS", "Cloudflare", "Git"],
  },
] as const;

export const process = [
  {
    step: "01",
    title: "Map the process",
    body: "I sit with the actual workflow: every export, every copy-paste, every 'and then I message Ana'. You cannot automate what nobody has written down yet.",
  },
  {
    step: "02",
    title: "Find the expensive parts",
    body: "Not everything is worth automating. I rank steps by hours burned and error risk, and we start where the payback is obvious.",
  },
  {
    step: "03",
    title: "Ship a thin slice",
    body: "One real workflow, running in production, in days rather than quarters. Feedback beats a specification document every time.",
  },
  {
    step: "04",
    title: "Harden and hand over",
    body: "Retries, alerting, docs and a dashboard so you can see it working. You own it: no black boxes, no vendor lock to me.",
  },
] as const;

export const projects = [
  {
    title: "Ops reporting pipeline",
    kind: "Reports streamlining",
    summary:
      "Replaced a two-day manual reporting cycle with a nightly pipeline that consolidates several source systems into one validated dashboard and emails a signed-off PDF before the team logs in.",
    outcomes: ["~30h/month recovered", "Single source of truth", "Errors surfaced, not hidden"],
    stack: ["Node.js", "PostgreSQL", "Sheets API", "Next.js"],
  },
  {
    title: "AI first-line support desk",
    kind: "AI customer support",
    summary:
      "A retrieval-grounded assistant that answers from live product documentation, tags and routes each conversation, and escalates to a human with a written summary of what was already tried.",
    outcomes: ["Instant first response", "Majority of routine tickets closed", "Full audit trail"],
    stack: ["Claude API", "Vector search", "Webhooks", "React"],
  },
  {
    title: "Cross-tool sync layer",
    kind: "Integrations",
    summary:
      "Middleware sitting between a storefront, a CRM and accounting, with idempotent syncs, replayable events and health checks, so an order entered once appears correctly everywhere.",
    outcomes: ["No double entry", "Replayable on failure", "Alerts before customers notice"],
    stack: ["TypeScript", "Redis", "OAuth 2.0", "Docker"],
  },
] as const;

/** Slugs map to brand marks in `BrandIcon`. */
export type ToolSlug =
  | "typescript"
  | "nodejs"
  | "python"
  | "nextjs"
  | "react"
  | "laravel"
  | "postgresql"
  | "redis"
  | "claude"
  | "n8n"
  | "playwright"
  | "graphql"
  | "webhooks"
  | "stripe"
  | "docker";

export const toolbelt: { name: string; slug: ToolSlug }[] = [
  { name: "TypeScript", slug: "typescript" },
  { name: "Node.js", slug: "nodejs" },
  { name: "Python", slug: "python" },
  { name: "Next.js", slug: "nextjs" },
  { name: "React", slug: "react" },
  { name: "Laravel", slug: "laravel" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Redis", slug: "redis" },
  { name: "Claude API", slug: "claude" },
  { name: "n8n", slug: "n8n" },
  { name: "Playwright", slug: "playwright" },
  { name: "GraphQL", slug: "graphql" },
  { name: "Webhooks", slug: "webhooks" },
  { name: "Stripe", slug: "stripe" },
  { name: "Docker", slug: "docker" },
];
