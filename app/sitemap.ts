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
// POLISH 2026-11-17 (his order 2026-11-17 ~00:03 PKT): lastmod 2026-11-17
// goes ONLY on the routes this round actually changed — decided per route
// by diffing the built HTML against the design-round build in
// qa/polish-baseline-out/ (see qa/FIX-polish-2026-11-16.md). Unchanged
// routes keep their old dates; stamping an unchanged route would be the
// mass-content signal the stagger exists to avoid. The shared template
// (header/footer/CSS/widths) changed every page's rendered output, so
// the set below is expected to be all 20 — verified by the diff, not
// assumed.
const LASTMOD_POLISH = "2026-11-17";
const POLISH_CHANGED: ReadonlySet<string> = new Set<string>([
  "/",
  "/services",
  "/about",
  "/contact",
  "/services/emergency-water-removal",
  "/services/basement-flood-cleanup",
  "/services/sewer-backup-cleanup",
  "/services/sump-pump-failure-cleanup",
  "/services/burst-pipe-water-damage",
  "/services/mold-remediation",
  "/services/flood-damage-restoration",
  "/services/ceiling-water-damage-repair",
  "/services/drywall-plaster-water-damage-repair",
  "/services/crawl-space-water-removal",
  "/services/water-heater-appliance-leak-cleanup",
  "/services/hardwood-floor-water-damage",
  "/services/commercial-water-damage-restoration",
  "/services/apartment-rental-water-damage",
  "/services/toilet-overflow-cleanup",
  "/services/water-damage-insurance-claims",
]);

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
      lastModified: POLISH_CHANGED.has(route)
        ? LASTMOD_POLISH
        : route === "/"
          ? LASTMOD_HOME
          : LASTMOD_FILL,
    };
    const images = imagesForRoute(route);
    if (images) entry.images = images;
    return entry;
  });
}
