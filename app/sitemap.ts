import type { MetadataRoute } from "next";
import {
  SITE,
  ALL_ROUTES,
  SERVICES,
  HERO_IMAGE,
  CARD_IMAGE,
  absoluteAsset,
} from "@/lib/content";
import { BODY_IMAGES_BY_PAGE } from "@/lib/body-images";

// Next 16 static export: metadata routes need explicit force-static.
export const dynamic = "force-static";

// Date-only lastmod (YYYY-MM-DD), real build date — never a time, never invented.
// Homepage unchanged since 2026-11-11; the 19 tab pages were filled with
// their full Doc content on 2026-11-12.
const LASTMOD_HOME = "2026-11-11";
const LASTMOD_FILL = "2026-11-12";

// Per-route image sets — EXACTLY the images rendered on that page, no
// invented URLs (SEO audit 1, P2-2 fix, 2026-11-13):
//   homepage: hero + the 15 service cards shown on it (16 images);
//   each service page: its hero + its wired body images
//     (lib/body-images.ts — 50 wired entries);
//   hub / about / contact: render no images by design, so no entry.
// Every src comes from lib/content.ts (HERO_IMAGE / CARD_IMAGE) or
// lib/body-images.ts and resolves to a real file under site/public/images/;
// absoluteAsset makes each URL absolute under SITE.base exactly once.
function imagesForRoute(route: string): string[] | undefined {
  if (route === "/") {
    return [
      HERO_IMAGE.home.src,
      // Cycle 1 fix: mold card honestly empty — skip unwired cards.
      ...SERVICES.map((s) => CARD_IMAGE[s.slug]?.src).filter(
        (src): src is string => !!src
      ),
    ].map(absoluteAsset);
  }
  if (route.startsWith("/services/")) {
    const slug = route.slice("/services/".length);
    const hero = HERO_IMAGE[slug];
    if (!hero) return undefined;
    return [
      hero.src,
      ...(BODY_IMAGES_BY_PAGE[slug] ?? []).map((b) => b.file),
    ].map(absoluteAsset);
  }
  return undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_ROUTES.map((route) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: `${SITE.base}${route === "/" ? "/" : route}`,
      lastModified: route === "/" ? LASTMOD_HOME : LASTMOD_FILL,
    };
    const images = imagesForRoute(route);
    if (images) entry.images = images;
    return entry;
  });
}
