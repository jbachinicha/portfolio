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
| `pillars`     | The four capability rows (copy, bullets, tools)         |
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

The repo is public and Pages is set to **Source: GitHub Actions**.
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and
publishes on every push to `main`. It can also be run by hand from the Actions
tab. Live at https://jbachinicha.github.io/portfolio/.

The workflow sets two environment variables automatically:

- `NEXT_PUBLIC_SITE_URL`: the Pages URL, used for canonical links, the
  generated social card at `/og.png`, and `sitemap.xml`
- `NEXT_PUBLIC_BASE_PATH`: the sub-path assets are served from. A project site
  (`github.com/you/portfolio`) is served at `/portfolio`; a user site
  (`github.com/you/you.github.io`) is served at `/` with an empty base path.

A build on a hosted server without `NEXT_PUBLIC_SITE_URL` fails on purpose,
because a canonical tag pointing at localhost stops Google indexing the page.

To preview the project-site path locally:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

### Getting indexed

1. Open [Google Search Console](https://search.google.com/search-console) and add
   the site as a **URL prefix** property for the exact public URL. DNS
   verification is not possible on `github.io`, so use the **HTML tag** or
   **HTML file** method.
2. **Sitemaps → add `sitemap.xml`**, then **URL Inspection → Request indexing**
   for the home page. Crawlers only read `robots.txt` at the domain root, which a
   project site does not control, so the sitemap must be submitted directly.
3. Optional: do the same in [Bing Webmaster Tools](https://www.bing.com/webmasters).

Indexing is not instant; first appearance usually takes days to a few weeks.

### A stronger address

A sub-path on `github.io` is the weakest possible URL. Renaming the repo to
`<username>.github.io` serves the site from the root (the workflow detects this
and clears the base path), and a custom domain is better still: add it in
**Settings → Pages**, create `public/CNAME` containing the domain, and the
workflow will serve from `/`.

### Cloudflare Pages (alternative)

The site is a plain static export, so any static host works. On Cloudflare
Pages use build command `npm run build`, output directory `out`, and set
`NEXT_PUBLIC_SITE_URL` to the site's public URL, leaving
`NEXT_PUBLIC_BASE_PATH` unset.

## Notes

- `public/.nojekyll` stops GitHub Pages from stripping Next.js `_next/` assets.
- The site is a single light theme built around a "printed run sheet" idea.
  Every colour is a token at the top of `src/app/globals.css`. To re-colour the
  whole site change the four `--color-primary*` values (and the matching hex
  values in `src/app/og.png/route.tsx` and `src/app/icon.svg`).
- Fonts: Bricolage Grotesque (headlines), Instrument Sans (body) and IBM Plex
  Mono (only inside the hero run sheet), all self-hosted by `next/font`.
- Google Analytics (GA4) lives in `src/components/Consent.tsx`. It loads only after a
  visitor clicks Accept on the consent banner (choice kept in localStorage under
  `analytics-consent`; the footer's Cookie settings button reopens it) and only in
  production builds. Change the Measurement ID there.
- `prefers-reduced-motion` disables all animation via `src/app/globals.css`;
  the hero run sheet then renders in its finished state.
- `/og.png` is generated at build time from `src/app/og.png/route.tsx`. It sits
  at a `.png` path on purpose, so static hosts serve it as an image rather than
  as `application/octet-stream`.
