import type { NextConfig } from "next";

/**
 * GitHub Pages serves project sites from /<repo>, so every asset needs a prefix.
 * The deploy workflow sets NEXT_PUBLIC_BASE_PATH; locally it stays empty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
