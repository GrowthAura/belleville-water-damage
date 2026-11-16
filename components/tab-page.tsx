// Shared renderer for the 19 full-tab pages (Tabs 2-20): Services hub,
// 16 service pages, About, Contact. Every string comes from lib/tab-pages.ts
// (generated verbatim from the Doc) — this file adds no words of its own.
// Template kept from the live site: PhotoHero (photo, or solid dark hero
// where the tab gives no photo) -> body blocks (H2/H3/p in Doc order) ->
// equal hero buttons. Schema: ONE @graph (Round 3 Gate 9 pattern) with
// FAQPage added only when the tab has a visible questions section, so the
// schema always exactly matches visible Q/A.
import type { Metadata } from "next";
import {
  SITE,
  ASSET_PREFIX,
  absoluteAsset,
  schemaBusiness,
  schemaWebSite,
  heroImageObject,
  COUNTY_AREA_SERVED,
  SERVICES,
  type PageImage,
} from "@/lib/content";
import { BODY_IMAGES_BY_PAGE } from "@/lib/body-images";
import type { Seg, TabBlock, TabPage } from "@/lib/tab-pages";
import { HeroButtons, Breadcrumb, JsonLd, PhotoHero, RichPara } from "@/components/site";

export type TabKind = "service" | "hub" | "about" | "contact";

const PAGE_TYPE: Record<TabKind, string> = {
  service: "WebPage",
  hub: "CollectionPage",
  about: "AboutPage",
  contact: "ContactPage",
};

/** Plain visible text of segments (link anchors become their words). */
export function segText(segs: Seg[]): string {
  return segs
    .map((s) => (typeof s === "string" ? s : s.a))
    .join("");
}

export function tabMetadata(page: TabPage, image?: PageImage): Metadata {
  const url = `${SITE.base}${page.route}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE.brand,
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      ...(image
        ? { images: [{ url: absoluteAsset(image.src), alt: image.alt }] }
        : {}),
    },
    twitter: {
      title: page.metaTitle,
      description: page.metaDescription,
      ...(image ? { images: [absoluteAsset(image.src)] } : {}),
    },
  };
}

/** Procedure pages: the named H2 followed by named h3+p step pairs.
    Generalises the flood builder (Cycle 1 schema fix #1): every step name
    is doc-verbatim (verified against qa/doc-full-tabs.json in the Cycle 1
    audit). Returns null unless the H2 is found AND the step names match
    exactly in count and order — the caller OMITS the HowTo node then
    (never improvises). HowTo on mold/burst-pipe/emergency/about/drywall
    stays rejected (audit §6): bare paragraphs, equipment lists or
    principles, not step sequences. */
const PROCEDURE_HOWTOS: Record<
  string,
  { h2: string; steps: string[] }
> = {
  "flood-damage-restoration": {
    h2: "Step by step",
    steps: [
      "Safety check",
      "Water out",
      "Mud out",
      "Tear out",
      "Clean and disinfect",
      "Dry",
      "Rebuild",
    ],
  },
  "basement-flood-cleanup": {
    h2: "How we clean up a flooded basement",
    steps: [
      "Remove the water",
      "Clear out what is ruined",
      "Wash and disinfect",
      "Dry the structure",
      "Repair",
    ],
  },
  "sewer-backup-cleanup": {
    h2: "Our cleanup process",
    steps: [
      "Set up",
      "Pump and extract",
      "Tear out",
      "Wash, then disinfect",
      "Dry and filter the air",
      "Repair",
    ],
  },
  "sump-pump-failure-cleanup": {
    h2: "What the cleanup includes",
    steps: [
      "Control the water level",
      "Extract",
      "Check the walls",
      "Clean",
      "Dry",
      "Repair",
    ],
  },
  "crawl-space-water-removal": {
    h2: "What we do",
    steps: ["Pump", "Clear", "Clean", "Dry", "Protect"],
  },
};

function procedureHowToSteps(
  page: TabPage
): { h2: string; steps: { name: string; text: string }[] } | null {
  const spec = PROCEDURE_HOWTOS[page.key];
  if (!spec) return null;
  const start = page.blocks.findIndex(
    (b) => b.kind === "h2" && b.text === spec.h2
  );
  if (start < 0) return null;
  const steps: { name: string; text: string }[] = [];
  for (let i = start + 1; i < page.blocks.length; i++) {
    const b = page.blocks[i];
    if (b.kind === "h2") break;
    if (b.kind === "h3") {
      const p = page.blocks[i + 1];
      if (!p || p.kind !== "p") return null;
      steps.push({ name: b.text, text: segText(p.segs) });
      i++;
    }
  }
  // Exact count AND exact names, in order — any mismatch omits the node.
  if (
    steps.length !== spec.steps.length ||
    steps.some((s, i) => s.name !== spec.steps[i])
  )
    return null;
  return { h2: spec.h2, steps };
}

export function TabPageView({
  page,
  kind,
  image = null,
  serviceAnchor,
  breadcrumb,
}: {
  page: TabPage;
  kind: TabKind;
  image?: PageImage | null;
  /** Service pages only: the verbatim homepage anchor for the Service node. */
  serviceAnchor?: string;
  breadcrumb: { label: string; href?: string }[];
}) {
  const url = `${SITE.base}${page.route}`;
  // Body images for this page (if any), in section order — 1st right,
  // 2nd left, ... by position in this list. Pages with no entry
  // (services hub, about, contact) render exactly as before.
  const pageImages = BODY_IMAGES_BY_PAGE[page.key] ?? [];
  // DESIGN 10x ROUND 2026-11-13 (structure only — no words, links or
  // heading order change): group the flat block list into one section per
  // H2 so the long full-tab pages get real section rhythm (padding,
  // hairline separators, alternating sand on odd sections) instead of a
  // single unbroken stack. Blocks before the first H2 form the opening
  // section. The closing buttons move into a brick CTA band.
  const sections: TabBlock[][] = [];
  {
    let cur: TabBlock[] = [];
    for (const b of page.blocks) {
      if (b.kind === "h2" && cur.length > 0) {
        sections.push(cur);
        cur = [];
      }
      cur.push(b);
    }
    if (cur.length > 0) sections.push(cur);
  }
  const howTo = procedureHowToSteps(page);
  const graph: Record<string, unknown>[] = [
    schemaBusiness(),
    schemaWebSite(),
    {
      "@type": PAGE_TYPE[kind],
      "@id": url + "#webpage",
      url,
      name: page.h1,
      description: page.intro,
      inLanguage: "en",
      isPartOf: { "@id": SITE.base + "/#website" },
      // Cycle 1 fix #3: link the WebPage-family node to its BreadcrumbList.
      breadcrumb: { "@id": url + "#breadcrumbs" },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".hero p.intro"],
      },
      ...(kind === "about" || kind === "contact"
        ? { mainEntity: { "@id": SITE.base + "/#business" } }
        : {}),
      // Cycle 2 fix #2: service pages state their Service as the primary
      // entity (same @id the page already references via `about`); hub
      // states its ItemList (same @id its `hasPart` already references).
      // Mirrors the existing About/Contact mainEntity → business pattern.
      ...(kind === "service"
        ? { mainEntity: { "@id": url + "#service" } }
        : {}),
      ...(kind === "hub"
        ? {
            mainEntity: { "@id": url + "#services" },
            // Cycle 2 fix #3: hub CollectionPage `about` → business @id,
            // consistency with the homepage WebPage.
            about: { "@id": SITE.base + "/#business" },
            hasPart: { "@id": url + "#services" },
          }
        : {}),
      ...(kind === "service"
        ? {
            about: { "@id": url + "#service" },
            // Cycle 1 fix #8: ImageObject (contentUrl + 1600x900 + caption).
            primaryImageOfPage: image ? heroImageObject(page.key) : undefined,
          }
        : {}),
    },
  ];
  if (kind === "hub") {
    graph.push({
      "@type": "ItemList",
      "@id": url + "#services",
      name: "Water damage services in Belleville",
      inLanguage: "en",
      // Cycle 1 fix #7: pure count of visible items (16 services).
      numberOfItems: SERVICES.length,
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.anchor,
        url: SITE.base + "/services/" + s.slug,
      })),
    });
  }
  if (kind === "service" && serviceAnchor) {
    graph.push({
      "@type": "Service",
      "@id": url + "#service",
      name: serviceAnchor,
      serviceType: serviceAnchor,
      description: page.intro,
      url,
      inLanguage: "en",
      areaServed: [
        ...SITE.zips.map((zip) => ({
          "@type": "City",
          name: SITE.city,
          addressRegion: SITE.state,
          postalCode: zip,
        })),
        // Cycle 1 fix #2: same St. Clair County node as the business node.
        COUNTY_AREA_SERVED,
      ],
      // Cycle 1 fix #8: ImageObject (contentUrl + 1600x900 + caption).
      ...(image ? { image: heroImageObject(page.key) } : {}),
      provider: { "@id": SITE.base + "/#business" },
    });
  }
  if (howTo) {
    graph.push({
      "@type": "HowTo",
      "@id": url + "#howto",
      name: howTo.h2,
      inLanguage: "en",
      step: howTo.steps.map((s) => ({
        "@type": "HowToStep",
        name: s.name,
        text: s.text,
      })),
    });
  }
  graph.push({
    "@type": "BreadcrumbList",
    "@id": url + "#breadcrumbs",
    inLanguage: "en",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.base + "/" },
      ...breadcrumb
        .filter((b) => !b.href)
        .map((b, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: b.label,
          item: url,
        })),
    ],
  });
  if (page.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": url + "#faq",
      inLanguage: "en",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: segText(f.a) },
      })),
    });
  }
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />
      <PhotoHero
        image={image ? image.src : null}
        alt={image ? image.alt : ""}
        eyebrow={page.eyebrow}
        h1={page.h1}
        intro={page.intro}
        cta2={page.cta2}
        breadcrumb={<Breadcrumb items={breadcrumb} />}
      />
      <section className={`page-body${kind === "hub" ? " hub-page" : ""}`}>
        {sections.map((sec, si) => {
          // Body-image wiring (2026-11-13): an image attaches to the
          // section whose H2 exactly equals its manifest `section`
          // (gate passed 57/57). The H2 stays outside the split; the
          // section's existing h3/p blocks move — unchanged, not
          // copied — into .media-text. No manifest entry names the
          // FAQ/questions H2, the closing CTA H2 or "Related pages",
          // so those sections render exactly as before. No visible
          // caption: alt text only.
          const first = sec[0];
          const h2Text =
            first && first.kind === "h2" ? first.text : null;
          const imgIndex = h2Text
            ? pageImages.findIndex((im) => im.section === h2Text)
            : -1;
          const img = imgIndex >= 0 ? pageImages[imgIndex] : undefined;
          const rest = h2Text ? sec.slice(1) : sec;
          return (
            <div
              className={`tab-section${si % 2 === 1 ? " alt" : ""}`}
              key={si}
            >
              <div className="wrap">
                {img && h2Text ? (
                  <>
                    <h2>{h2Text}</h2>
                    <div
                      className={`media-split ${
                        imgIndex % 2 === 0 ? "media-right" : "media-left"
                      }`}
                    >
                      <div className="media-text">
                        {rest.map((b, i) =>
                          b.kind === "h2" ? (
                            <h2 key={i}>{b.text}</h2>
                          ) : b.kind === "h3" ? (
                            <h3 key={i}>{b.text}</h3>
                          ) : (
                            <RichPara key={i} segs={b.segs} />
                          )
                        )}
                      </div>
                      <figure className="media-figure">
                        <img
                          src={ASSET_PREFIX + img.file}
                          width={1020}
                          height={680}
                          loading="lazy"
                          alt={img.alt}
                        />
                      </figure>
                    </div>
                  </>
                ) : (
                  sec.map((b, i) =>
                    b.kind === "h2" ? (
                      <h2 key={i}>{b.text}</h2>
                    ) : b.kind === "h3" ? (
                      <h3 key={i}>{b.text}</h3>
                    ) : (
                      <RichPara key={i} segs={b.segs} />
                    )
                  )
                )}
              </div>
            </div>
          );
        })}
        <div className="tab-cta">
          <div className="wrap">
            <HeroButtons label={page.cta2} />
          </div>
        </div>
      </section>
    </>
  );
}
