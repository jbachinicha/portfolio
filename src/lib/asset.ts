/**
 * Prefixes a file in `public/` with the site's base path. Plain `<img>` and
 * `<video>` tags are not rewritten by Next, so on a project site served from
 * `/portfolio` they would otherwise point at the wrong place.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${base}/${path.replace(/^\//, "")}`;
