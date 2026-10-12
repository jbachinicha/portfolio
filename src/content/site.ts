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
  location: "Philippines, working remotely worldwide",
  availability: "Open to new projects",
  // Contact address lives in src/lib/email.ts, stored reversed so scrapers
  // cannot lift it out of the exported HTML.
  socials: [
    { label: "GitHub", href: "https://github.com/FDC-Jay" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jay-bachinicha/" },
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
  title: string;
  blurb: string;
  bullets: string[];
  stack: string[];
  visual: "automation" | "reports" | "support" | "integrations";
};

export const pillars: Pillar[] = [
  {
    id: "automation",
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
    step: "1",
    title: "Map the process",
    body: "I sit with the actual workflow: every export, every copy-paste, every 'and then I message Ana'. You cannot automate what nobody has written down yet.",
  },
  {
    step: "2",
    title: "Find the expensive parts",
    body: "Not everything is worth automating. I rank steps by hours burned and error risk, and we start where the payback is obvious.",
  },
  {
    step: "3",
    title: "Ship a thin slice",
    body: "One real workflow, running in production, in days rather than quarters. Feedback beats a specification document every time.",
  },
  {
    step: "4",
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

export type Shot = { src: string; alt: string; width: number; height: number; label: string };

type BuildBase = {
  id: string;
  title: string;
  kind: string;
  summary: string;
  /** What already works. Rendered with the highlighter, like outcomes in Work. */
  working: string[];
  /** Optional: what is still to build. */
  next?: string;
  stack: string[];
  /** Caption under the media, for example "Screenshots use demo data." */
  note: string;
};

export type Build = BuildBase & {
  media:
    | { type: "shots"; shots: Shot[] }
    | { type: "video"; src: string; poster: string; width: number; height: number; label: string };
};

/**
 * Work in progress, shown running. Media is recorded from the running apps,
 * with demo data wherever a screen would otherwise hold personal or client
 * data. Files live in public/work.
 */
export const inProgress: Build[] = [
  {
    id: "webeditor",
    title: "Webeditor",
    kind: "Website and store builder",
    summary:
      "A multi-tenant builder where each customer gets their own site on a subdomain and builds its pages from a library of sections. Nothing in the library assumes an industry: a restaurant, a law firm and a shop compose the same blocks and re-skin them with a theme.",
    working: [
      "Add, reorder, hide and edit sections beside a live preview",
      "Desktop, tablet and phone previews, with page history and publish",
      "One brand colour, a font pairing and a corner style, applied everywhere",
      "A store built in: products, collections, orders and discounts",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Better Auth"],
    note: "Screenshots use demo data.",
    media: {
      type: "shots",
      shots: [
        { src: "work/webeditor-editor.png", alt: "Webeditor page editor: a list of sections on the left, the selected hero section's fields in the middle and a live preview of the page on the right", width: 1440, height: 900, label: "Page editor" },
        { src: "work/webeditor-theme.png", alt: "Webeditor theme screen: colour presets, brand colours and a live preview of the site", width: 1440, height: 900, label: "Theme" },
      ],
    },
  },
  {
    id: "pointofsale",
    title: "Point of Sale",
    kind: "Retail checkout and stock system",
    summary:
      "A web-based till for a small shop: search or scan a product, build a cart, take cash or card and print a receipt. Behind it sit stock levels, suppliers, shifts and the reports a shop owner asks for.",
    working: [
      "Checkout with product search, discounts and cash or card payment",
      "Stock levels with low-stock alerts and purchase orders to suppliers",
      "Shifts, cash drawer movements, refunds and held sales",
      "Revenue by day, product and cashier",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Auth.js"],
    note: "Screenshots use demo data.",
    media: {
      type: "shots",
      shots: [
        { src: "work/pointofsales-checkout.png", alt: "Point of Sale checkout: product tiles on the left and a cart with five items and a charge button on the right", width: 1440, height: 900, label: "Checkout" },
        { src: "work/pointofsales-reports.png", alt: "Point of Sale reports: revenue over the last 14 days as a line chart, with top products and revenue by cashier", width: 1440, height: 900, label: "Reports" },
        { src: "work/pointofsales-inventory.png", alt: "Point of Sale inventory: stock levels per product with low-stock warnings", width: 1440, height: 900, label: "Inventory" },
      ],
    },
  },
  {
    id: "jobhunt",
    title: "Job Hunt",
    kind: "Job and client search tool",
    summary:
      "Pulls listings from eight public sources into one feed, scores each against my keywords, and tracks everything I apply to on a single board. Gemini drafts the first version of each application message.",
    working: [
      "Eight sources merged into one feed",
      "Keyword match strength on every listing",
      "Pipeline board from saved to offer",
      "Separate profiles, each with its own keywords and pipeline",
    ],
    stack: ["Node.js", "PostgreSQL", "Supabase", "Vercel", "Gemini API"],
    note: "Screenshots use demo data.",
    media: {
      type: "shots",
      shots: [
        { src: "work/jobhunt-feed.png", alt: "Job Hunt feed: a list of listings with match strength on the left and the selected listing's details on the right", width: 1440, height: 840, label: "Feed" },
        { src: "work/jobhunt-pipeline.png", alt: "Job Hunt pipeline board with Saved, Applied, Interview, Offer and Rejected columns", width: 1440, height: 840, label: "Pipeline" },
      ],
    },
  },
  {
    id: "parkour",
    title: "Parkour Generator",
    kind: "Text-to-video pipeline",
    summary:
      "Turns a plain-text story into a narrated 3D parkour video: vertical, 60 fps, with a title card and karaoke captions. The course is synced to the narration, then simulated without rendering to prove it can be run before anything is encoded.",
    working: [
      "Narrate, solve, mix and render from one command",
      "11 of 11 test stories solved, none with an unreachable platform in 24,000 generated placements",
      "The same course is playable, rebuilt from a seed code",
    ],
    next: "Still to build: the Blender assets for the theme packs.",
    stack: ["Godot 4", "GDScript", "Python", "ffmpeg"],
    note: "Frames from a render with the current runner.",
    media: {
      type: "shots",
      shots: [
        {
          src: "work/parkour-frames.jpg",
          alt: "Three frames from a Parkour Generator render: the title card, karaoke captions as the hooded runner jumps, and the runner crossing a purple platform",
          width: 1652,
          height: 960,
          label: "Render frames",
        },
      ],
    },
  },
  {
    id: "deeptime",
    title: "Deep Time",
    kind: "Fishing game",
    summary:
      "A third-person fishing game about hauling extinct animals out of the sea. The farther out you sail and the deeper you drop the line, the further back in geological time you fish, so the boat upgrades and the descent through deep time are the same progression.",
    working: [
      "A sea drawn from a live wave simulation, with surf, foam and a boat wake",
      "17 species across 18 islands to sail to",
      "A 412-case automated suite that photographs and checks every system",
    ],
    stack: ["Godot 4", "GDScript", "Blender", "Python"],
    note: "Recorded from the game on the home beach, with the on-screen display switched off.",
    media: { type: "video", src: "work/deeptime.mp4", poster: "work/deeptime.jpg", width: 1280, height: 640, label: "Deep Time: surf rolling onto the home beach" },
  },
];

export type Scene = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  note?: string;
  video: { src: string; poster: string; width: number; height: number; label: string };
};

/** Small interactive three.js scenes, each one page. Recorded from the running scene. */
export const scenes: Scene[] = [
  {
    id: "island",
    title: "Pastel Island",
    summary:
      "A voxel island where a penguin, a rigged chicken, a rubber duck and a Mixamo character wander about, while a flock of birds circles overhead and lands in the trees.",
    stack: ["Three.js", "glTF", "Skinned rigs", "Blender"],
    video: { src: "work/island.mp4", poster: "work/island.jpg", width: 1120, height: 630, label: "Pastel Island scene" },
  },
  {
    id: "timeline",
    title: "Timeline Drive",
    summary:
      "Drive a little car down a winding pastel road lined with photo frames. Pull up to any frame and its date and caption fade in.",
    stack: ["Three.js", "Rapier physics", "Vehicle controller"],
    note: "Recorded with placeholder frames.",
    video: { src: "work/timeline.mp4", poster: "work/timeline.jpg", width: 1120, height: 630, label: "Timeline Drive scene" },
  },
];

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
