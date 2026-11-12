import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

// Next 16 static export: metadata routes need explicit force-static.
export const dynamic = "force-static";

// Allow:/ — NO Host: line (Googlebot ignores Host; it is Yandex-only).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.base}/sitemap.xml`,
  };
}
