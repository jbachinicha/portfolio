# Portfolio

Personal site for a full-stack developer specialising in automation, report
streamlining, AI customer support systems and tool integrations.

Built with **Next.js 16** (App Router, static export), **TypeScript**,
**Tailwind CSS v4** and **Motion**. Deployed to **Cloudflare Pages**.

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

## Deploying to Cloudflare Pages (free, works with a private repo)

1. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**,
   then pick this repo and authorise the GitHub app.
2. Build settings:
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `out`
3. Environment variable (Production): `NEXT_PUBLIC_SITE_URL` set to the site's
   public URL, for example `https://your-project.pages.dev`. Leave
   `NEXT_PUBLIC_BASE_PATH` unset; the site is served from the root.
4. Save and deploy. Every push to `main` redeploys.

`NEXT_PUBLIC_SITE_URL` feeds the canonical tag, the social card and
`sitemap.xml`. A build on a hosted server without it fails on purpose, because
a canonical pointing at localhost stops Google indexing the page. If you add a
custom domain later, change the variable to the new URL and redeploy.

### Getting indexed

1. Open [Google Search Console](https://search.google.com/search-console) and add
   the site as a **URL prefix** property (use the exact public URL).
2. Verify ownership (the DNS or HTML-tag method), then **Sitemaps → add
   `sitemap.xml`** and use **URL Inspection → Request indexing** for the home page.
3. Optional: do the same in [Bing Webmaster Tools](https://www.bing.com/webmasters).

Indexing is not instant; first appearance usually takes days to a few weeks.

### GitHub Pages (optional)

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) is
manual-only (`workflow_dispatch`). GitHub Pages cannot serve a private repo on a
free plan, so it only works if the repo is public: enable **Settings → Pages →
Source: GitHub Actions**, then run it from the Actions tab. It sets
`NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_BASE_PATH` itself. To preview a
sub-path build locally:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

## Notes

- `public/.nojekyll` only matters for the optional GitHub Pages route.
- The site is a single light theme built around a "printed run sheet" idea.
  Every colour is a token at the top of `src/app/globals.css`. To re-colour the
  whole site change the four `--color-primary*` values (and the matching hex
  values in `src/app/og.png/route.tsx` and `src/app/icon.svg`).
- Fonts: Bricolage Grotesque (headlines), Instrument Sans (body) and IBM Plex
  Mono (only inside the hero run sheet), all self-hosted by `next/font`.
- `prefers-reduced-motion` disables all animation via `src/app/globals.css`;
  the hero run sheet then renders in its finished state.
- `/og.png` is generated at build time from `src/app/og.png/route.tsx`. It sits
  at a `.png` path on purpose, so static hosts serve it as an image rather than
  as `application/octet-stream`.
