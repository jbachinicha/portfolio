/**
 * Absolute public URL of the deployed site, needed for canonical links,
 * Open Graph tags and the sitemap. Set `NEXT_PUBLIC_SITE_URL` in the host's
 * build settings (or let the GitHub Pages workflow set it); locally it falls
 * back to the dev origin.
 *
 * A hosted build that falls back to localhost would publish a canonical tag
 * pointing at localhost, which stops Google indexing the page, so that case
 * fails the build instead.
 */
const configured = process.env.NEXT_PUBLIC_SITE_URL;
const onBuildServer = Boolean(process.env.CI || process.env.CF_PAGES);

if (!configured && onBuildServer && process.env.NODE_ENV === "production") {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL is not set. Set it to the site's public URL (for example https://your-name.pages.dev) before building, or canonical links and the sitemap will point at localhost.",
  );
}

export const siteUrl = (configured ?? "http://localhost:3000").replace(/\/$/, "");
