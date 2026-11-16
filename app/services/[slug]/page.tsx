import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, serviceBySlug, HERO_IMAGE } from "@/lib/content";
import { TAB_PAGES } from "@/lib/tab-pages";
import { TabPageView, tabMetadata } from "@/components/tab-page";

// Flat routes under /services/<slug>. No trailing slash (trailingSlash: false).
// Content is the service's FULL tab (Tabs 3-18), verbatim — its own URL,
// meta title/description, eyebrow, H1, intro, CTA buttons, H2/H3 body and
// FAQ. The old one-line-summary body is superseded.
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = TAB_PAGES[slug];
    if (!page) return {};
    return tabMetadata(page, HERO_IMAGE[slug]);
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  const page = TAB_PAGES[slug];
  if (!service || !page) notFound();
  return (
    <TabPageView
      page={page}
      kind="service"
      image={HERO_IMAGE[slug]}
      serviceAnchor={service.anchor}
      breadcrumb={[{ label: "Home", href: "/" }, { label: service.anchor }]}
    />
  );
}
