# SEO plan

Status of this document: audit + phased plan. Nothing here is implemented yet
except what is marked **done** in the audit table below.

Audited against the built output in `out/` on 2026-08-24.

---

## 1. Where the site stands today

| Signal | State | Notes |
| --- | --- | --- |
| `<title>` | done | `Jay B. \| Full-Stack Developer & Automation Engineer` |
| Meta description | done | 118 chars, reads well |
| `metadataBase` + canonical | done | resolves from `NEXT_PUBLIC_SITE_URL`; **verify after first deploy** — a local build emits `http://localhost:3000/` |
| `robots.txt` | done | `src/app/robots.ts` |
| `sitemap.xml` | done | `src/app/sitemap.ts`, currently one URL |
| Social card | done | `/og.png`, 1200×630, real `image/png` content type |
| Favicon | done | `src/app/icon.svg` |
| `lang` + viewport | done | `lang="en"` |
| Self-hosted fonts | done | 16 woff2 files via `next/font`, no third-party requests |
| Static + fast host | done | pure static export, no render-blocking third parties |
| **Indexable pages** | **1** | only `/` — the core structural limit |
| **H1 keyword relevance** | **none** | H1 is *"I turn manual work into working software"* |
| **H2 keyword relevance** | **weak** | *"Four kinds of work, one underlying idea"*, *"Small slices, shipped early"* |
| **Structured data (JSON-LD)** | **missing** | no `Person`, no `ProfessionalService` |
| `og:site_name`, `og:locale` | missing | minor but free |
| Search Console / Bing | not set up | no verification, no query data |
| Outbound entity links | done | LinkedIn now points at the real profile |
| HTML weight | 188 KB | inlined SVG + all copy on one page |
| JS weight | 816 KB | Next runtime + `motion` |

---

## 2. The honest ceiling

Two structural facts set the realistic upside, and no amount of on-page tuning
changes them:

1. **One page can only rank for one tight cluster of terms.** Google indexes
   URLs, not anchor sections. `#capabilities` will never rank separately from
   `/`. Four services on one page means competing with yourself for all four.
2. **`username.github.io/portfolio` is the weakest possible address.** It is a
   subdirectory on a shared, generic host. You inherit none of the domain's
   authority and cannot build your own on it.

So the plan is ordered accordingly: **domain first, then pages, then content.**
On-page polish is real but it is the smallest of the three levers.

Expect branded search (*"Jay B automation developer"*) to work quickly, and
competitive head terms (*"automation developer"*) not to work at all without
phases 2–3 plus time.

---

## 3. Phase 0 — Foundations

Cheap, do before anything else.

### 0.1 Decide the domain — highest-impact single choice

| Option | SEO ceiling | Cost |
| --- | --- | --- |
| `you.github.io/portfolio` | lowest — subdirectory, no owned authority | free |
| `you.github.io` (user site, repo named `you.github.io`) | low-medium — root of a subdomain you own | free |
| **Custom domain** (`jaybachinicha.dev`) | **highest — the only option that accumulates authority** | ~$12/yr |

Recommendation: buy the custom domain. It is the difference between building
equity and renting a shelf. GitHub Pages supports custom domains with free
HTTPS.

To switch: add the domain in **Settings → Pages**, create `public/CNAME`
containing the bare domain, and set `NEXT_PUBLIC_SITE_URL` in
`.github/workflows/deploy.yml` to the domain with `NEXT_PUBLIC_BASE_PATH` empty.

> **Do this before you have any backlinks.** GitHub Pages cannot issue
> server-side 301 redirects (`.nojekyll` disables the Jekyll redirect plugin),
> so a later migration loses whatever link equity you have accumulated.

### 0.2 Verify the canonical URL after the first deploy

```bash
curl -s https://YOUR-DOMAIN/ | grep -o '<link rel="canonical"[^>]*'
curl -s https://YOUR-DOMAIN/sitemap.xml
```

Both must show the live origin, not `localhost:3000`. If they show localhost,
`NEXT_PUBLIC_SITE_URL` did not reach the build step.

### 0.3 Register with Search Console and Bing Webmaster Tools

Without this you are optimising blind — no impressions, no queries, no CTR, no
index-coverage errors. Submit `sitemap.xml` in both. Give it 2–4 weeks before
judging anything.

### 0.4 Fix the entity signals

- Replace the broken LinkedIn URL in `src/content/site.ts` with your real
  profile. Search engines use matching `sameAs` links to resolve "which Jay is
  this" — a dead link is a wasted signal, on top of looking careless.
- Use **exactly one** spelling of your name across the site, GitHub, LinkedIn
  and any freelance profile. Entity resolution rewards consistency.

### 0.5 Add the free metadata that is currently missing

In `src/app/layout.tsx`:

```ts
openGraph: {
  siteName: site.fullName,
  locale: "en_US",
  // ...existing
},
```

---

## 4. Phase 1 — On-page work on the home page

The design intentionally uses voice-led headings. That is good for conversion
and bad for search. Resolve it by **adding** keyword-bearing copy rather than
replacing the lines that give the page its character.

### 1.1 Give the H1 a searchable subject

Current H1 carries no term anyone searches for. Two options:

- **Preferred:** keep the H1 as-is and add a keyword-bearing `<h2>` immediately
  after the hero paragraph, e.g. *"Workflow automation, reporting pipelines and
  AI support systems for small teams."* Real, visible, non-spammy copy.
- **Alternative:** rewrite the H1 to *"I turn manual work into working
  software"* → *"Automation developer who turns manual work into working
  software"*. Stronger for search, slightly weaker as a line.

Do **not** add a visually hidden keyword H1. That is cloaking-adjacent, and
it is exactly the pattern spam filters look for.

### 1.2 Add terms to the section H2s without gutting them

| Now | Proposed |
| --- | --- |
| Four kinds of work, one underlying idea | Automation services: four kinds of work, one underlying idea |
| Automation is only useful if someone can actually use it | Full-stack development: automation is only useful if someone can use it |
| Small slices, shipped early, measured honestly | How I work: small slices, shipped early, measured honestly |
| Systems currently doing the boring work for someone | Selected automation and integration projects |

The pillar H3s (*Process Automation*, *Reports & Data Streamlining*, *AI
Customer Support Systems*, *Tool Connection & Integrations*) are already good —
they are literally the service names. Leave them.

### 1.3 Add `Person` structured data

The single highest-value on-page addition. Enables a knowledge-panel-style
entity and clarifies what you do. Add to `src/app/layout.tsx`:

```tsx
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  jobTitle: site.role,
  url: siteUrl,
  image: `${siteUrl}/og.png`,
  address: { "@type": "PostalAddress", addressCountry: "PH" },
  knowsAbout: [
    "Workflow automation",
    "Business process automation",
    "API integration",
    "Reporting pipelines",
    "AI customer support",
    "Full-stack web development",
  ],
  sameAs: site.socials.map((s) => s.href),
};

// in the body, before {children}:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
/>
```

Validate at <https://validator.schema.org/> after deploy.

### 1.4 Alt text audit

There are no `<img>` elements — every graphic is inline SVG. The hero diagram
already has `role="img"` + `aria-label`. The four capability visuals in
`src/components/visuals/index.tsx` are decorative and correctly unlabelled.
Nothing to fix; re-check when you add real project screenshots (phase 3), which
**will** need descriptive alt text.

---

## 5. Phase 2 — Split into service pages

This is the biggest structural lever after the domain, and it is the phase most
portfolios skip.

Turn each capability into its own route, each with its own title, description,
H1 and canonical:

```
/                          → positioning, links to all four
/services/automation/      → H1: Workflow & process automation
/services/reporting/       → H1: Automated reporting and dashboards
/services/ai-support/      → H1: AI customer support systems
/services/integrations/    → H1: API and tool integrations
```

Why it works: four URLs can each target a distinct intent cluster instead of
four sections cannibalising one URL. It also gives you somewhere to put depth —
600–1200 words of specifics per service, which is what actually ranks for
service queries.

Implementation notes for this codebase:

- Content already lives in `pillars` in `src/content/site.ts`. Add a `slug`,
  `seoTitle`, `seoDescription` and long-form `body` per pillar, then generate
  the routes with `generateStaticParams` — the existing static export handles
  this with no config change.
- Extend `src/app/sitemap.ts` to map over the pillars so new pages are
  discovered automatically.
- Keep `trailingSlash: true` consistent in every internal link and in the
  sitemap, or you create duplicate-URL pairs.
- Cross-link: home → each service, and each service → the two most related
  siblings. Internal links are how ranking signal moves between your pages.

Keep the home page's capability section as a summary that links out. Do not
duplicate the long copy in both places.

---

## 6. Phase 3 — Content engine

Service pages capture people already looking to hire. Writing captures the much
larger group with the *problem* but not yet the intent to hire — and it is the
only durable way to earn links in this niche.

Add `/notes/` (or `/writing/`) as MDX, statically generated.

Post shapes that work for automation consultants:

1. **Problem → build → result walkthroughs.** *"Replacing a two-day manual
   reporting cycle with a nightly pipeline."* Doubles as the case-study proof
   the portfolio currently lacks.
2. **Specific how-tos.** *"Idempotent Shopify → CRM syncs that survive
   duplicate webhooks."* Long-tail, low competition, high intent.
3. **Honest teardowns.** *"When not to automate a process."* Earns links and
   trust; contrarian angles get shared.

Cadence beats volume: one solid post a month for a year outranks eight posts in
one week and then silence. Each post should link to the relevant service page.

Also worth adding once posts exist: `Article` structured data, and an RSS feed
at `/rss.xml` (generated the same way as the sitemap).

---

## 7. Phase 4 — Performance and technical

The site is already static and fast, so this is polish rather than rescue.
Still worth measuring, because Core Web Vitals is a real (if small) ranking
input and a large conversion input.

- **Measure first.** Run PageSpeed Insights against the deployed URL and record
  LCP / INP / CLS. Do not optimise on guesses.
- **816 KB of JS is the main slack.** `motion` is imported by `Hero`, `Nav`,
  `Reveal`, `Metrics` and `SystemCanvas`. `Reveal` wraps most sections and does
  a fade-and-rise that a CSS scroll-driven animation or `IntersectionObserver`
  could do in a fraction of the bytes. Highest-leverage cut if LCP is poor.
- **Three font families is heavy** (Inter + Sora + JetBrains Mono). If font
  loading shows up in the waterfall, drop Sora and set display headings in Inter
  at a heavier weight.
- **188 KB HTML.** Splitting into service pages (phase 2) reduces this
  naturally, since each page ships only its own copy.
- Confirm the `Cache-Control` behaviour GitHub Pages gives `_next/static/`
  assets; they are content-hashed and safe to cache aggressively.

---

## 8. Phase 5 — Off-page

Nothing on this list is a trick; they are all just "be findable in the places
that already rank".

- **GitHub profile README** linking to the site. Your GitHub already ranks for
  your name; use it to pass a signal.
- **LinkedIn featured link** to the site, with the same role wording.
- **Real project links.** Every live client site you can link from is both proof
  and, if they will add a credit, a backlink.
- **Freelance profiles** (Upwork/Contra) with consistent naming.
- **Write where the audience already is** — a dev.to or Hashnode cross-post with
  a canonical link back to your `/notes/` original. Canonical tag matters here,
  otherwise you compete with your own copy.

Do not buy links, do not do directory blasts. For a site this small they are
pure downside.

---

## 9. Keyword targets

Volumes deliberately omitted — pull real numbers from Search Console once it has
data rather than trusting a third-party estimate for a market this narrow.

| Intent | Example queries | Lands on |
| --- | --- | --- |
| Branded | `jay bachinicha`, `jay b automation developer` | `/` |
| Service + hire | `workflow automation developer for hire`, `hire n8n developer` | `/services/automation/` |
| Service + location | `automation developer philippines`, `remote automation engineer` | `/` and service pages |
| Tool-specific | `n8n developer`, `make.com consultant`, `claude api integration developer` | matching service page |
| Problem-aware | `automate weekly reports google sheets`, `sync shopify orders to crm` | `/notes/` posts |
| Full-stack | `next.js developer philippines`, `laravel developer remote` | `/services/` + home |

Tool-specific and problem-aware are where a small site can genuinely win. Head
terms like `automation developer` are not realistic targets in year one; treat
them as a by-product of the long tail, not a goal.

---

## 10. What to skip

- **The `keywords` meta tag.** Currently in `layout.tsx`. Google has ignored it
  for well over a decade. Harmless, but it is not doing anything — do not add to
  it thinking it helps.
- **Keyword-stuffing the headings.** The proposed H2 changes in 1.2 are the
  ceiling. Past that you damage the writing for no gain.
- **A hidden keyword H1.** Cloaking-adjacent, actively risky.
- **Chasing head terms with thin pages.** Four thin service pages are worse than
  one strong home page. Only ship phase 2 with real depth per page.
- **AI-generated bulk posts.** In a niche this specific, generic content signals
  low quality to both readers and rankers.

---

## 11. Order of work

| # | Task | Effort | Impact |
| --- | --- | --- | --- |
| 1 | Decide domain; buy + wire custom domain | 1 h | very high |
| 2 | Search Console + Bing, submit sitemap | 30 m | high (visibility into everything else) |
| 3 | Fix LinkedIn URL, name consistency | 5 m | medium |
| 4 | `Person` JSON-LD | 30 m | medium-high |
| 5 | `og:site_name` / `og:locale` | 5 m | low |
| 6 | Keyword-bearing H2 after hero + section H2 edits | 1 h | medium |
| 7 | Verify canonical + sitemap on live URL | 10 m | high (catches a silent break) |
| 8 | Split into four service pages | 1–2 days | very high |
| 9 | Measure CWV, trim `motion`/fonts if needed | 3 h | low-medium |
| 10 | Launch `/notes/`, first three posts | ongoing | very high, slow |
| 11 | GitHub README + LinkedIn featured link | 20 m | medium |

Items 1–7 are a single afternoon and should be done together. Item 8 is the next
real project. Item 10 is the one that compounds.

---

## 12. Measurement

Review monthly, not weekly — SEO feedback loops are 4–12 weeks long.

- **Search Console:** impressions, average position, and CTR per query. Rising
  impressions with flat clicks means the title/description needs work, not the
  content.
- **Index coverage:** every page you intend to rank should be *Indexed*. Anything
  in *Discovered – currently not indexed* usually means thin content.
- **Core Web Vitals** report, once there is enough traffic for field data.
- **The number that actually matters:** enquiries received. A portfolio ranking
  #1 for a term nobody hires on is a vanity result.
