import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE, SERVICES, serviceBySlug, HERO_IMAGE, schemaBusiness, schemaWebSite } from "@/lib/content";
import { HeroButtons, Breadcrumb, JsonLd, PhotoHero } from "@/components/site";

// Flat routes under /services/<slug>. No trailing slash (trailingSlash: false).
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = serviceBySlug(slug);
    if (!service) return {};
    const h1 = `${service.anchor} in Belleville, IL`;
    const desc = service.summary ?? service.h3;
    return {
      title: h1,
      description: desc,
      alternates: { canonical: `${SITE.base}/services/${service.slug}` },
      openGraph: {
        title: h1,
        description: desc,
        url: `${SITE.base}/services/${service.slug}`,
        images: [
          {
            url: SITE.base + HERO_IMAGE[service.slug].src,
            alt: HERO_IMAGE[service.slug].alt,
          },
        ],
      },
      twitter: {
        title: h1,
        description: desc,
        images: [SITE.base + HERO_IMAGE[service.slug].src],
      },
    };
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();
  const h1 = `${service.anchor} in Belleville, IL`;
  const url = `${SITE.base}/services/${service.slug}`;
  // Hero intro: the verbatim summary paragraph where the Doc gives one;
  // for grouped services the Doc gives no paragraph, so the verbatim
  // group H3 is the intro line instead. Nothing invented either way.
  const intro = service.summary ?? service.h3;
  // Round 3 Gate 9: ONE @graph, @id-linked (Business + WebSite + WebPage +
  // Service + BreadcrumbList). Every value is visible on the page.
  const serviceGraph = {
    "@context": "https://schema.org",
    "@graph": [
      schemaBusiness(),
      schemaWebSite(),
      {
        "@type": "WebPage",
        "@id": url + "#webpage",
        url,
        name: h1,
        description: intro,
        isPartOf: { "@id": SITE.base + "/#website" },
        about: { "@id": url + "#service" },
        primaryImageOfPage: SITE.base + HERO_IMAGE[service.slug].src,
      },
      {
        "@type": "Service",
        "@id": url + "#service",
        name: service.anchor,
        serviceType: service.anchor,
        description: intro,
        url,
        areaServed: {
          "@type": "City",
          name: "Belleville",
          addressRegion: "IL",
          postalCode: "62220",
        },
        provider: { "@id": SITE.base + "/#business" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": url + "#breadcrumbs",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.base + "/" },
          { "@type": "ListItem", position: 2, name: service.anchor, item: url },
        ],
      },
    ],
  };
  return (
    <>
      <JsonLd data={serviceGraph} />
      <PhotoHero
        image={HERO_IMAGE[service.slug].src}
        alt={HERO_IMAGE[service.slug].alt}
        eyebrow="WATER DAMAGE RESTORATION • BELLEVILLE, ILLINOIS"
        h1={h1}
        intro={intro}
        breadcrumb={
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: service.anchor }]}
          />
        }
      />
      <section className="page-body">
        <div className="wrap">
          {/* Body dedup: the verbatim summary is the hero intro now — it is
              NOT repeated here. Body keeps the verbatim H2, the link back,
              and the call buttons. No self-link: the Doc's own link line for
              this service is dropped on its own page. */}
          <h2 style={{ marginTop: 0 }}>
            {service.grouped ? service.anchor : service.h3}
          </h2>
          <p>
            <Link href="/#services">See all Belleville services</Link>
          </p>
          <HeroButtons />
        </div>
      </section>
    </>
  );
}
