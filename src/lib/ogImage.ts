/**
 * Path of the social share card, with a version in the query. Slack, Facebook and
 * LinkedIn cache an image by its URL, including a failed fetch, so a card that was
 * once missing or changed keeps its old (or broken) preview until the URL changes.
 * The static host ignores the query, and each deploy gets a new one (the commit
 * in CI, `dev` locally).
 */
export const ogImagePath = `/og.png?v=${process.env.GITHUB_SHA?.slice(0, 7) ?? "dev"}`;
