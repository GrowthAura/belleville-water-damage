import type { Metadata } from "next";
import { TAB_PAGES } from "@/lib/tab-pages";
import { TabPageView, tabMetadata } from "@/components/tab-page";

// Services hub — Tab 2, full content verbatim (7 H2 groups, 16 H3 entries
// with their link lines). No photo: the tab gives none, so the hero is the
// solid dark variant — no photo is reused from another page.
const page = TAB_PAGES["services"];

export function generateMetadata(): Metadata {
  return tabMetadata(page);
}

export default function ServicesHubPage() {
  return (
    <TabPageView
      page={page}
      kind="hub"
      image={null}
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
    />
  );
}
