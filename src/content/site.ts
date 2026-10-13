/**
 * Single source of truth for everything personal on the site.
 * Edit this file — the components read from it.
 */

export const site = {
  name: "Jay",
  /** Shown in search results, link previews, the footer and the share image. */
  fullName: "Jay Bachinicha",
  /** The compact form used by the nav logo. */
  short: "Jay B.",
  role: "Full-Stack Developer & Automation Engineer",
  tagline: "I turn manual work into working software.",
  /** Portfolio (home) intro, from the resume summary. */
  summary:
    "Full-stack web developer with 7+ years of experience maintaining, modernising and extending web applications across legacy and modern stacks: WordPress, CakePHP, AngularJS, Vue.js, Laravel and Next.js. I fix what is broken, ship new features, and build my own tools on the side.",
  /** Client page (/hire/) intro. */
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

/** From the resume. Keep to what it says. */
export const about = {
  heading: "Seven years of keeping web apps working, and building new ones",
  body: [
    "I work across legacy and modern stacks, diagnosing defects, delivering features and keeping production platforms stable, secure and user-friendly.",
    "Outside work I build my own tools and games: a website builder, a point of sale, a job-search tool and a fishing game.",
  ],
} as const;

export const experience = [
  {
    org: "Forty Degrees Celsius Inc.",
    period: "March 2023 – Present",
    roles: ["Web Developer (May 2024 – Present)", "Frontend Developer (March 2023 – October 2024)"],
    points: [
      "Maintain and enhance production web applications with CakePHP, Vue.js, AngularJS, HTML and CSS.",
      "Contribute to Nativecamp, an online English-conversation platform, migrating legacy CakePHP pages to Laravel (Blade) and React while preserving existing behaviour and visual fidelity.",
      "Deliver multilingual page content across 49 locales and verify migrated pages against their legacy versions at desktop and mobile breakpoints.",
      "Code reviews, GitHub Actions workflows and scheduled cron jobs.",
    ],
  },
  {
    org: "Proweaver, Cebu",
    period: "April 2019 – March 2023",
    roles: ["Web Programmer (May 2022 – March 2023)", "Web Developer III (April 2019 – May 2022)"],
    points: [
      "Maintained and enhanced the company's web application systems, and recommended technologies and frameworks to suit requirements.",
      "Maintained and customised client WordPress websites, strengthened their security and removed malicious files from compromised sites.",
    ],
  },
] as const;

export const education = {
  school: "Cebu Technological University",
  degree: "Bachelor of Science in Information and Communications Technology",
  period: "2014 – 2018",
} as const;

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
    items: [
      "React",
      "Next.js",
      "Vue.js",
      "AngularJS",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "React Native",
    ],
  },
  {
    label: "Backend",
    hint: "Business logic, new builds and legacy upkeep",
    items: ["Node.js", "Express", "PHP", "Laravel", "CakePHP", "Python", "WordPress"],
  },
  {
    label: "Data",
    hint: "Storage, queries and pipelines",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "SQL"],
  },
  {
    label: "Integrations",
    hint: "Making separate systems behave as one",
    items: ["REST", "GraphQL", "Webhooks", "OAuth 2.0", "Stripe", "Claude API"],
  },
  {
    label: "Platform",
    hint: "Automating it, shipping it and keeping it up",
    items: [
      "n8n",
      "Playwright",
      "Docker",
      "GitHub Actions",
      "Vercel",
      "Linux / VPS",
      "Cloudflare",
      "Git",
      "Jira",
    ],
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
  /** Optional caption under the media, for example "Screenshots use demo data." */
  note?: string;
  /** Keeps the entry in this file but off the site. Remove the line to show it again. */
  hidden?: boolean;
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
    hidden: true,
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
    media: { type: "video", src: "work/deeptime.mp4", poster: "work/deeptime.jpg", width: 1280, height: 536, label: "Deep Time: the home screen, then sailing at dawn, noon, in fog, in a storm, at dusk and by moonlight" },
  },
];

/** The builds that appear on the site. */
export const shownBuilds = inProgress.filter((b) => !b.hidden);

/**
 * Builds featured on the client page. Derived from the real builds above so
 * the two pages never disagree; each one links to its row in the portfolio.
 */
export const projects = shownBuilds
  .filter((b) => ["jobhunt", "pointofsale"].includes(b.id))
  .map((b) => ({
    id: b.id,
    title: b.title,
    kind: b.kind,
    summary: b.summary,
    outcomes: b.working.slice(0, 3),
    stack: b.stack,
  }));

/** Counted from the resume and the builds shown above, so they cannot drift. */
export const metrics = [
  { value: 7, suffix: "+", label: "Years building web applications", sub: "legacy and modern stacks" },
  { value: 49, suffix: "", label: "Locales of page content delivered", sub: "on a platform migration, checked against the originals" },
  { value: shownBuilds.length, suffix: "", label: "Products built and running", sub: "see the portfolio for each one" },
  { value: 8, suffix: "", label: "Sources merged into one feed", sub: "in my own job-search tool" },
];

/** Slugs map to brand marks in `BrandIcon`. */
export type ToolSlug =
  | "typescript"
  | "javascript"
  | "html"
  | "css"
  | "vue"
  | "tailwind"
  | "express"
  | "cakephp"
  | "wordpress"
  | "mysql"
  | "mongodb"
  | "prisma"
  | "githubactions"
  | "vercel"
  | "cloudflare"
  | "git"
  | "jira"
  | "nodejs"
  | "python"
  | "php"
  | "godot"
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

/**
 * The languages built into the hero illustration, one block each. Edit, reorder
 * or swap entries here; `HeroIllustration` lays out whatever is listed (up to
 * eight). SQL has no brand mark of its own, so it borrows PostgreSQL's, and
 * GDScript borrows Godot's.
 */
export const heroLanguages: { name: string; slug: ToolSlug }[] = [
  { name: "TypeScript", slug: "typescript" },
  { name: "JavaScript", slug: "javascript" },
  { name: "HTML", slug: "html" },
  { name: "CSS", slug: "css" },
  { name: "Python", slug: "python" },
  { name: "PHP", slug: "php" },
  { name: "SQL", slug: "postgresql" },
  { name: "GDScript", slug: "godot" },
];

export const toolbelt: { name: string; slug: ToolSlug }[] = [
  { name: "TypeScript", slug: "typescript" },
  { name: "JavaScript", slug: "javascript" },
  { name: "Node.js", slug: "nodejs" },
  { name: "Express", slug: "express" },
  { name: "Python", slug: "python" },
  { name: "Laravel", slug: "laravel" },
  { name: "CakePHP", slug: "cakephp" },
  { name: "WordPress", slug: "wordpress" },
  { name: "Next.js", slug: "nextjs" },
  { name: "React", slug: "react" },
  { name: "Vue.js", slug: "vue" },
  { name: "Tailwind CSS", slug: "tailwind" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "MySQL", slug: "mysql" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Redis", slug: "redis" },
  { name: "Prisma", slug: "prisma" },
  { name: "Claude API", slug: "claude" },
  { name: "n8n", slug: "n8n" },
  { name: "Playwright", slug: "playwright" },
  { name: "GraphQL", slug: "graphql" },
  { name: "Webhooks", slug: "webhooks" },
  { name: "Stripe", slug: "stripe" },
  { name: "Docker", slug: "docker" },
  { name: "GitHub Actions", slug: "githubactions" },
  { name: "Vercel", slug: "vercel" },
  { name: "Cloudflare", slug: "cloudflare" },
  { name: "Git", slug: "git" },
  { name: "Jira", slug: "jira" },
];
