import type { MetadataRoute } from "next";
import { SITE, ALL_ROUTES } from "@/lib/content";

// Next 16 static export: metadata routes need explicit force-static.
export const dynamic = "force-static";

// Date-only lastmod (YYYY-MM-DD), real build date — never a time, never invented.
const LASTMOD = "2026-11-11";

export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_ROUTES.map((route) => ({
    url: `${SITE.base}${route === "/" ? "/" : route}`,
    lastModified: LASTMOD,
  }));
}
