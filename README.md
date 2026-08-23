# Portfolio

Personal site for a full-stack developer specialising in automation, report
streamlining, AI customer support systems and tool integrations.

Built with **Next.js 16** (App Router, static export), **TypeScript**,
**Tailwind CSS v4** and **Motion**. Deployed to **GitHub Pages**.

## Editing your content

Everything personal lives in one file: [`src/content/site.ts`](src/content/site.ts).

| Export        | What it controls                                        |
| ------------- | ------------------------------------------------------- |
| `site`        | Name, role, intro, email, location, social links        |
| `metrics`     | The four animated counters                              |
| `pillars`     | The four capability cards (copy, bullets, tech chips)   |
| `stackLayers` | Full-stack section: frontend / backend / data / platform |
| `process`     | The four-step "how I work" row                          |
| `projects`    | Selected work cards                                     |
| `toolbelt`    | The "working set" chip row under the hero               |

> [!IMPORTANT]
> The numbers in `metrics` and the three `projects` entries are **placeholders**.
> Replace them with your real figures and real case studies before sharing the
> site; the copy makes concrete claims that you should be able to back up.

### Contact address

The email is **not** in `site.ts`. It lives in
[`src/lib/email.ts`](src/lib/email.ts), stored reversed so scrapers cannot lift
it out of the exported HTML, and is reassembled in the browser by `MailLink`.
To change it:

```bash
node -e "console.log([...'you@example.com'].reverse().join(''))"
```

Paste the result into `REVERSED` in `src/lib/email.ts`.

### Tool icons

Brand marks come from the [`simple-icons`](https://www.npmjs.com/package/simple-icons)
package, bundled at build time and inlined into the static HTML — no CDN, no
icon font, no runtime JS cost. Playwright and Webhooks have no Simple Icons
entry, so they use hand-drawn glyphs in `src/components/BrandIcon.tsx`.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

Static HTML is emitted to `out/`.

## Deploying to GitHub Pages

1. Create a GitHub repo and push this project to `main`.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and
   publishes on every push to `main`.

The workflow sets two environment variables automatically:

- `NEXT_PUBLIC_SITE_URL` — the Pages URL, used for canonical links, the
  generated social card at `/og.png`, and `sitemap.xml`
- `NEXT_PUBLIC_BASE_PATH` — the sub-path assets are served from:

- Project site (`github.com/you/portfolio`) → served at `/portfolio`, base path `/portfolio`
- User site (`github.com/you/you.github.io`) → served at `/`, base path empty

To preview the project-site path locally:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

### Custom domain

Add your domain in **Settings → Pages**, create `public/CNAME` containing the
domain, and set `NEXT_PUBLIC_BASE_PATH` to empty in the workflow.

## Notes

- `public/.nojekyll` stops GitHub Pages from stripping Next.js `_next/` assets.
- The site is intentionally dark-only; `prefers-reduced-motion` disables all
  animation via `src/app/globals.css`.
- `/og.png` is generated at build time from `src/app/og.png/route.tsx`. It sits
  at a `.png` path on purpose, so static hosts serve it as an image rather than
  as `application/octet-stream`.
