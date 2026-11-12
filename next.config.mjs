/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: false,
  // GitHub Pages project-site subpath — REQUIRED. Without basePath +
  // assetPrefix the live site white-screens (Midvale failure mode:
  // ChunkLoadError on every inner page, 2026-11-10). Root-relative
  // asset URLs would point at growthaura.github.io/_next/... instead
  // of growthaura.github.io/belleville-water-damage/_next/...
  basePath: "/belleville-water-damage",
  assetPrefix: "/belleville-water-damage",
  images: { unoptimized: true },
};
export default nextConfig;
