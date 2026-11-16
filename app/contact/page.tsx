import type { Metadata } from "next";
import { TAB_PAGES } from "@/lib/tab-pages";
import { TabPageView, tabMetadata } from "@/components/tab-page";

// Contact — Tab 20, full content verbatim. No photo: the tab gives none, so
// the hero is the solid dark variant — no photo is reused from another page.
// The tab describes a form ("Form fields: ...") but the static site has no
// backend and no form exists in the template: the field list renders as the
// tab's verbatim text. No form is invented; a working form is his call.
const page = TAB_PAGES["contact"];

export function generateMetadata(): Metadata {
  return tabMetadata(page);
}

export default function ContactPage() {
  return (
    <TabPageView
      page={page}
      kind="contact"
      image={null}
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
    />
  );
}
