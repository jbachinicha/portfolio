/**
 * Absolute public URL of the deployed site, needed for canonical links,
 * Open Graph tags and the sitemap. The deploy workflow sets this from the
 * GitHub Pages URL; locally it falls back to the dev origin.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");
