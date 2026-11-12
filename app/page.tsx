import type { Metadata } from "next";
import Link from "next/link";
import {
  SITE,
  HERO,
  SERVICES,
  SERVICE_GROUPS,
  WHO_RESPONDS,
  HOME_TYPES,
  PROCESS,
  WHY_WET,
  WHILE_WAITING,
  COST,
  INSURANCE,
  AREAS,
  FAQ,
  FINAL_CTA,
  HERO_IMAGE,
  CARD_IMAGE,
  schemaBusiness,
  schemaWebSite,
} from "@/lib/content";
import {
  HeroButtons,
  Reveal,
  JsonLd,
  PhotoHero,
  TrustBand,
  CardImage,
} from "@/components/site";

export const metadata: Metadata = {
  title: SITE.metaTitle,
  description: SITE.metaDescription,
  // NOTE: Next's Metadata API strips the trailing slash from the homepage
  // canonical AND og:url, so both are emitted as explicit tags below
  // (exactly one of each). No `url` in openGraph here, and none in the
  // root layout either, or Next would emit a second slash-less og:url.
  openGraph: {
    title: SITE.metaTitle,
    description: SITE.metaDescription,
    images: [{ url: SITE.base + HERO_IMAGE.home.src, alt: HERO_IMAGE.home.alt }],
  },
  twitter: {
    title: SITE.metaTitle,
    description: SITE.metaDescription,
    images: [SITE.base + HERO_IMAGE.home.src],
  },
};

// Round 3 Gate 9: ONE @graph, @id-linked. HomeAndConstructionBusiness +
// WebSite + WebPage + FAQPage + BreadcrumbList + HowTo (the visible 5-step
// process) + SpeakableSpecification (hero intro + FAQ headings). Every
// value is visible on the page; no reviews, no invented fields.
const homeGraph = {
  "@context": "https://schema.org",
  "@graph": [
    schemaBusiness(),
    schemaWebSite(),
    {
      "@type": "WebPage",
      "@id": SITE.base + "/#webpage",
      url: SITE.base + "/",
      name: SITE.metaTitle,
      description: SITE.metaDescription,
      isPartOf: { "@id": SITE.base + "/#website" },
      about: { "@id": SITE.base + "/#business" },
      primaryImageOfPage: SITE.base + HERO_IMAGE.home.src,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".hero p.intro", ".faq-item h3"],
      },
    },
    {
      "@type": "FAQPage",
      "@id": SITE.base + "/#faq",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": SITE.base + "/#breadcrumbs",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.base + "/" },
      ],
    },
    {
      "@type": "HowTo",
      "@id": SITE.base + "/#howto",
      name: PROCESS.h2,
      step: PROCESS.steps.map((s) => ({
        "@type": "HowToStep",
        name: s.h3,
        text: s.body,
      })),
    },
  ],
};

const individual = SERVICES.filter((s) => !s.grouped);

export default function HomePage() {
  return (
    <>
      <link rel="canonical" href={SITE.base + "/"} />
      <meta property="og:url" content={SITE.base + "/"} />
      <JsonLd data={homeGraph} />

      {/* 1 — HERO: photo hero. Intro is IN the hero. */}
      <PhotoHero
        image={HERO_IMAGE.home.src}
        alt={HERO_IMAGE.home.alt}
        eyebrow={HERO.eyebrow}
        h1={HERO.h1}
        intro={HERO.intro}
      />

      {/* 2 — Trust band: the Doc's 4 badges, verbatim */}
      <TrustBand />

      {/* 3 — Who responds */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <h2>{WHO_RESPONDS.h2}</h2>
            {WHO_RESPONDS.paras.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 4 — The two kinds of homes */}
      <section className="section alt">
        <div className="wrap">
          <Reveal>
            <h2>{HOME_TYPES.h2}</h2>
          </Reveal>
          <div className="split">
            <div className="area-card">
              <h3>{HOME_TYPES.older.h3}</h3>
              <p>{HOME_TYPES.older.body}</p>
            </div>
            <div className="area-card">
              <h3>{HOME_TYPES.newer.h3}</h3>
              <p>{HOME_TYPES.newer.body}</p>
            </div>
          </div>
          <p style={{ marginTop: 24 }}>{HOME_TYPES.closing}</p>
        </div>
      </section>

      {/* 5 — What we do when we arrive (5 steps, verbatim) */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <h2>{PROCESS.h2}</h2>
          </Reveal>
          <ol className="steps">
            {PROCESS.steps.map((s) => (
              <li key={s.h3}>
                <h3>{s.h3}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6 — Services: 16 image cards.
          The Doc gives 7 individual H3 blocks + 3 group H3s (10 H3s total);
          every service gets an image card, and the group H3s stay verbatim
          headings above their 3 mini-cards, so the homepage H3 count stays
          exactly 23 (2 + 5 + 10 + 6). Mini-card titles are <p>, not H3. */}
      <section className="section alt" id="services">
        <div className="wrap">
          <Reveal>
            <h2>Water damage services in Belleville</h2>
          </Reveal>
          <div className="card-grid">
            {individual.map((s) => (
              <article className="card" key={s.slug}>
                <CardImage src={CARD_IMAGE[s.slug].src} alt={CARD_IMAGE[s.slug].alt} />
                <div className="card-body">
                  <h3>{s.h3}</h3>
                  <p>{s.summary}</p>
                  <Link className="card-link" href={`/services/${s.slug}`}>
                    {s.anchor}
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {SERVICE_GROUPS.map((g) => (
            <div className="group-block" key={g.h3}>
              <h3>{g.h3}</h3>
              <div className="card-grid">
                {g.slugs.map((slug) => {
                  const s = SERVICES.find((x) => x.slug === slug)!;
                  return (
                    <article className="card" key={slug}>
                      <CardImage
                        src={CARD_IMAGE[slug].src}
                        alt={CARD_IMAGE[slug].alt}
                      />
                      <div className="card-body">
                        <p className="card-title">{s.anchor}</p>
                        <p>{g.h3}</p>
                        <Link className="card-link" href={`/services/${slug}`}>
                          {s.anchor}
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7 — Why Belleville basements get wet */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <h2>{WHY_WET.h2}</h2>
            {WHY_WET.paras.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 8 — What to do while the crew is on the way */}
      <section className="section alt">
        <div className="wrap">
          <Reveal>
            <h2>{WHILE_WAITING.h2}</h2>
            <ul>
              {WHILE_WAITING.items.map((it) => (
                <li key={it.slice(0, 24)}>{it}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 9 — Cost */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <h2>{COST.h2}</h2>
            {COST.paras.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 10 — Insurance, sewer backup and mine subsidence */}
      <section className="section alt">
        <div className="wrap">
          <Reveal>
            <h2>{INSURANCE.h2}</h2>
            {INSURANCE.paras.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 11 — Neighborhoods and ZIP codes */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <h2>{AREAS.h2}</h2>
            {AREAS.paras.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 12 — FAQ */}
      <section className="section alt" id="faq">
        <div className="wrap">
          <Reveal>
            <h2>Belleville water damage questions</h2>
          </Reveal>
          <div className="faq-list">
            {FAQ.map((f) => (
              <div className="faq-item" key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13 — Final CTA */}
      <section className="section final-cta">
        <div className="wrap">
          <Reveal>
            <h2>{FINAL_CTA.h2}</h2>
            {FINAL_CTA.paras.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <HeroButtons />
          </Reveal>
        </div>
      </section>
    </>
  );
}
