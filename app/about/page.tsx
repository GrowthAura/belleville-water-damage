import type { Metadata } from "next";
import { TAB_PAGES } from "@/lib/tab-pages";
import { TabPageView, tabMetadata } from "@/components/tab-page";

// About — Tab 19, full content verbatim. No photo: the tab gives none, so
// the hero is the solid dark variant — no photo is reused from another page.
const page = TAB_PAGES["about"];

export function generateMetadata(): Metadata {
  return tabMetadata(page);
}

export default function AboutPage() {
  return (
    <TabPageView
      page={page}
      kind="about"
      image={null}
      breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
    />
  );
}
