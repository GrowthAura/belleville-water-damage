import { SITE, SERVICES } from "@/lib/content";
import { TAB_PAGES } from "@/lib/tab-pages";

// Next 16 static export: metadata routes need explicit force-static.
export const dynamic = "force-static";

// llms.txt — generated from SITE/SERVICES/TAB_PAGES so its URLs always
// carry the real deploy base (the old static public/llms.txt hardcoded
// localhost). Page titles are each tab's verbatim H1.
export async function GET() {
  const lines = [
    `# ${SITE.brand}`,
    "",
    `> 24/7 emergency water damage restoration in Belleville, IL 62220. Crew dispatched immediately, day or night. Call ${SITE.phoneDisplay} now.`,
    "",
    "## About",
    "",
    `Water Damage Restoration Belleville, IL provides 24/7 emergency water damage restoration in Belleville, Illinois, ZIP codes 62220, 62221, 62223 and 62226, in St. Clair County in the Metro East. The crew is dispatched immediately, day or night, to pump, extract, clean and dry from the first visit. Work covers sewer backups, flooded basements and cellars, burst pipes, failed sump pumps and storm water in homes, rentals and storefronts. Call ${SITE.phoneDisplay}.`,
    "",
    "## Pages",
    "",
    `- [24/7 Emergency Water Damage Restoration in Belleville, IL](${SITE.base}/)`,
    `- [${TAB_PAGES["services"].h1}](${SITE.base}/services)`,
    ...SERVICES.map(
      (s) => `- [${TAB_PAGES[s.slug].h1}](${SITE.base}/services/${s.slug})`,
    ),
    `- [${TAB_PAGES["about"].h1}](${SITE.base}/about)`,
    `- [${TAB_PAGES["contact"].h1}](${SITE.base}/contact)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
