// Belleville IL — all content VERBATIM from Google Doc
// "Belleville IL Water Damage - Page Copy"
// (1bVH-IOEkhev0G53m8r0wlTLpwApNtiV6wlBpVq2XLWM).
// No word added, cut, shortened or paraphrased. Paths in parentheses in the
// Doc are LINK ANNOTATIONS only — the live form is no trailing slash.
// Doc has ZERO hyperlink objects; parentheses paths are the only authority.

export const SITE = {
  brand: "Water Damage Restoration Belleville, IL",
  city: "Belleville",
  state: "IL",
  zips: ["62220", "62221", "62223", "62226"],
  phoneDisplay: "(618) 330-9060",
  phoneTel: "+16183309060",
  metaTitle:
    "Water Damage Restoration Belleville IL | Emergency 24/7 Crew",
  metaDescription:
    "Water damage in Belleville, IL 62220? Crew dispatched immediately, day or night. Call (618) 330-9060 for help now.",
  // LOCAL-ONLY placeholder base. No domain exists in the Doc (OPEN item).
  // Override with NEXT_PUBLIC_SITE_URL when the real domain arrives, then
  // regenerate sitemap/canonicals before any publish.
  base: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

// Deploy-target asset prefix. Plain <img> tags do NOT get basePath
// applied by Next (only _next/* assets and Link hrefs do), so image
// srcs must carry the prefix themselves. Local root builds pass
// NEXT_PUBLIC_BASE_PATH unset ("" = root-relative, as before);
// the GitHub Pages build passes "/belleville-water-damage".
export const ASSET_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Absolute URL for an asset path. Asset srcs already carry ASSET_PREFIX
// (plain <img> tags need it), while SITE.base already ends with the
// subpath on a Pages deploy — joining both naively doubles the subpath
// (og:image 404 on 17/20 pages, found by fill QA 2026-11-12). Strip the
// prefix from the path first so the join happens exactly once; on a
// root/apex build ASSET_PREFIX is "" and this is a plain SITE.base + path.
export function absoluteAsset(path: string): string {
  const p =
    ASSET_PREFIX && path.startsWith(ASSET_PREFIX)
      ? path.slice(ASSET_PREFIX.length)
      : path;
  return SITE.base + p;
}

// Shared schema.org nodes (Round 3 Gate 9): every page emits ONE @graph
// with @id-linked nodes instead of separate scripts. All values come from
// SITE / the Doc — nothing invented. No street address exists in the Doc,
// so PostalAddress carries locality/region/postalCode only.

// St. Clair County node — the one doc-grounded AdministrativeArea
// (doc: "St. Clair County" 3x). Shared by the business node and all 16
// Service nodes (Cycle 1 schema fix #2).
export const COUNTY_AREA_SERVED = {
  "@type": "AdministrativeArea",
  name: "St. Clair County",
  addressRegion: "IL",
} as const;

// ImageObject for a hero image (Cycle 1 schema fix #8). All 17 hero files
// measure exactly 1600x900 (PIL-verified 2026-11-13); caption is the
// visible alt text of that hero. contentUrl is the absolute asset URL.
export function heroImageObject(key: string) {
  const img = HERO_IMAGE[key];
  return {
    "@type": "ImageObject",
    contentUrl: absoluteAsset(img.src),
    width: 1600,
    height: 900,
    caption: img.alt,
    // Cycle 2 fix #5: ImageObject is a CreativeWork; caption is English.
    inLanguage: "en",
  };
}

export function schemaBusiness() {
  return {
    "@type": "HomeAndConstructionBusiness",
    "@id": SITE.base + "/#business",
    name: SITE.brand,
    // Cycle 2 fix #1: the doc's actual company name (Tab 19 About eyebrow
    // "SIGNAL HILL RESTORATION CO." + opening sentence "Signal Hill
    // Restoration Co. is a water damage company in Belleville, IL.").
    // alternateName, NOT legalName — the doc states no legal-entity status.
    alternateName: "Signal Hill Restoration Co.",
    description: SITE.metaDescription,
    image: heroImageObject("home"),
    telephone: SITE.phoneTel,
    // Cycle 1 fix #6: the doc's only contact channel, in structured form.
    // contactType "emergency" is doc-grounded (Emergency 24/7 Crew,
    // "Answered 24/7"); no "customer service" label invented.
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phoneTel,
      contactType: "emergency",
      availableLanguage: "en",
    },
    url: SITE.base + "/",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.state,
      postalCode: SITE.zips[0],
    },
    areaServed: [
      ...SITE.zips.map((zip) => ({
        "@type": "City",
        name: SITE.city,
        addressRegion: SITE.state,
        postalCode: zip,
      })),
      COUNTY_AREA_SERVED,
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "24:00",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Water damage services in Belleville",
      // Cycle 1 fix #7: pure count of visible items (16 services).
      numberOfItems: SERVICES.length,
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.anchor,
          url: SITE.base + "/services/" + s.slug,
        },
      })),
    },
  };
}

export function schemaWebSite() {
  return {
    "@type": "WebSite",
    "@id": SITE.base + "/#website",
    name: SITE.brand,
    url: SITE.base + "/",
    // Cycle 1 fix #4: doc meta description (Tab 1), already the business
    // description — a traced literal, no invention.
    description: SITE.metaDescription,
    inLanguage: "en",
  };
}

export const HERO = {
  eyebrow: "WATER DAMAGE RESTORATION \u2022 BELLEVILLE, ILLINOIS",
  h1: "24/7 Emergency Water Damage Restoration in Belleville, IL",
  intro:
    "Old basements and heavy rain are a bad mix. Our local crew provides water damage restoration in Belleville, IL across 62220, 62221, 62223 and 62226, handling sewer backups, flooded basements and cellars, burst pipes, failed sump pumps and storm water in homes, rentals and storefronts. Call at any hour and a crew is dispatched immediately, equipped to pump, extract, clean and dry from the first visit.",
  trust: [
    "Answered 24/7",
    "Crew Dispatched Immediately",
    "Local Metro East Crew",
    "Photo and Moisture Reports",
  ],
} as const;

export type Service = {
  slug: string;
  /** Verbatim H3 on the homepage (individual block) or the group H3 that
      carries this service's link (grouped services). */
  h3: string;
  /** Verbatim link anchor from the Doc. */
  anchor: string;
  /** Verbatim summary paragraph, or null for grouped services (the Doc
      gives those no paragraph — only the link line). */
  summary: string | null;
  /** True when the service lives under a shared group H3. */
  grouped: boolean;
};

// H3 + paragraph + link anchor, verbatim. The trailing "( /services/.../ )"
// annotation is stored as `slug`/`anchor` only and is NOT paragraph text.
export const SERVICES: Service[] = [
  {
    slug: "emergency-water-removal",
    h3: "Emergency water removal in Belleville",
    anchor: "Emergency Water Removal",
    summary: "Standing water pumped and extracted at any hour.",
    grouped: false,
  },
  {
    slug: "basement-flood-cleanup",
    h3: "Basement flood cleanup in Belleville",
    anchor: "Basement Flood Cleanup",
    summary:
      "Brick, stone and poured-wall basements pumped, cleaned and dried.",
    grouped: false,
  },
  {
    slug: "sewer-backup-cleanup",
    h3: "Sewer backup cleanup in Belleville",
    anchor: "Sewer Backup Cleanup",
    summary:
      "Sewage removed, porous materials taken out and the area disinfected.",
    grouped: false,
  },
  {
    slug: "sump-pump-failure-cleanup",
    h3: "Sump pump failure cleanup in Belleville",
    anchor: "Sump Pump Failure Cleanup",
    summary: "Water removal and drying after a pump quits.",
    grouped: false,
  },
  {
    slug: "burst-pipe-water-damage",
    h3: "Burst pipe water damage in Belleville",
    anchor: "Burst Pipe Water Damage",
    summary: "Frozen and corroded pipe breaks, wet walls and ceilings.",
    grouped: false,
  },
  {
    slug: "mold-remediation",
    h3: "Mold remediation in Belleville",
    anchor: "Mold Remediation",
    summary:
      "Containment and removal of mold after leaks and damp cellars.",
    grouped: false,
  },
  {
    slug: "flood-damage-restoration",
    h3: "Flood damage restoration in Belleville",
    anchor: "Flood Damage Restoration",
    summary: "Storm and Richland Creek flooding cleaned up.",
    grouped: false,
  },
  {
    slug: "ceiling-water-damage-repair",
    h3: "Ceilings, walls and floors in Belleville",
    anchor: "Ceiling Water Damage Repair",
    summary: null,
    grouped: true,
  },
  {
    slug: "drywall-plaster-water-damage-repair",
    h3: "Ceilings, walls and floors in Belleville",
    anchor: "Water Damaged Drywall and Plaster Repair",
    summary: null,
    grouped: true,
  },
  {
    slug: "hardwood-floor-water-damage",
    h3: "Ceilings, walls and floors in Belleville",
    anchor: "Hardwood Floor Water Damage",
    summary: null,
    grouped: true,
  },
  {
    slug: "crawl-space-water-removal",
    h3: "Crawl spaces, appliances and bathrooms in Belleville",
    anchor: "Crawl Space Water Removal",
    summary: null,
    grouped: true,
  },
  {
    slug: "water-heater-appliance-leak-cleanup",
    h3: "Crawl spaces, appliances and bathrooms in Belleville",
    anchor: "Water Heater Leak Cleanup",
    summary: null,
    grouped: true,
  },
  {
    slug: "toilet-overflow-cleanup",
    h3: "Crawl spaces, appliances and bathrooms in Belleville",
    anchor: "Toilet Overflow Cleanup",
    summary: null,
    grouped: true,
  },
  {
    slug: "commercial-water-damage-restoration",
    h3: "Businesses, rentals and claims in Belleville",
    anchor: "Commercial Water Damage Restoration",
    summary: null,
    grouped: true,
  },
  {
    slug: "apartment-rental-water-damage",
    h3: "Businesses, rentals and claims in Belleville",
    anchor: "Apartment Water Damage",
    summary: null,
    grouped: true,
  },
  {
    slug: "water-damage-insurance-claims",
    h3: "Businesses, rentals and claims in Belleville",
    anchor: "Water Damage Insurance Claim help",
    summary: null,
    grouped: true,
  },
];

/** The three group H3s, in Doc order, each with its services. */
export const SERVICE_GROUPS: { h3: string; slugs: string[] }[] = [
  {
    h3: "Ceilings, walls and floors in Belleville",
    slugs: [
      "ceiling-water-damage-repair",
      "drywall-plaster-water-damage-repair",
      "hardwood-floor-water-damage",
    ],
  },
  {
    h3: "Crawl spaces, appliances and bathrooms in Belleville",
    slugs: [
      "crawl-space-water-removal",
      "water-heater-appliance-leak-cleanup",
      "toilet-overflow-cleanup",
    ],
  },
  {
    h3: "Businesses, rentals and claims in Belleville",
    slugs: [
      "commercial-water-damage-restoration",
      "apartment-rental-water-damage",
      "water-damage-insurance-claims",
    ],
  },
];

export const WHO_RESPONDS = {
  h2: "Who responds to water damage in Belleville, IL at 2 a.m. when an old basement takes on water?",
  paras: [
    "A local water damage crew that answers 24/7. In Belleville, a crew is dispatched immediately to stop the source, remove the water and start drying before brick, plaster and framing soak it up.",
    "Speed matters more in Belleville than in newer towns because of what the houses are made of. Soft brick, lime mortar, plaster and old-growth lumber all absorb water slowly and release it slowly. The sooner water is off the floor, the less of it ends up inside the walls.",
  ],
} as const;

export const HOME_TYPES = {
  h2: "The two kinds of homes we work in",
  older: {
    h3: "Older Belleville: downtown, the West End and Signal Hill",
    body: "In 62220 and 62223, many homes are brick houses and bungalows that have stood for a century or more. They sit on limestone or brick foundations with no drain tile, have partial cellars or crawl spaces, plaster-and-lath walls, galvanized supply pipes and cast-iron drains. Floor drains connect to aging clay-tile sewer laterals. In a hard storm the sewer system overloads and the lowest drain in the house becomes the exit point. That is why sewer backup is the most common emergency call in this part of town.",
  },
  newer: {
    h3: "Newer Belleville: east and north subdivisions",
    body: "In 62221 and 62226, toward Frank Scott Parkway, Green Mount Road and Swansea, homes are newer, with poured foundations, finished basements and sump pits. Problems here are sump pump failures during Ameren Illinois outages, supply-line and water heater leaks, and second-floor plumbing that drains through the ceiling below.",
  },
  closing:
    "A crew that treats both the same way gets one of them wrong. Plaster is dried differently from drywall, and a brick foundation cannot be handled like poured concrete.",
} as const;

export const PROCESS = {
  h2: "What we do when we arrive",
  steps: [
    {
      h3: "Make it safe",
      body: "We check for electrical hazards, identify whether the water is clean, gray or sewage, and keep people and pets out of contaminated areas.",
    },
    {
      h3: "Stop and remove the water",
      body: "Pumps handle deep water in cellars and basements. Extractors pull water from carpet, pad and hard floors. On old masonry foundations, deep water is lowered in stages so the walls are not stressed.",
    },
    {
      h3: "Find where it went",
      body: "Moisture meters and thermal imaging show water inside plaster, behind paneling, under hardwood and in joist bays, so nothing wet is left hidden.",
    },
    {
      h3: "Clean and dry",
      body: "Contaminated materials are removed and surfaces disinfected. Air movers and dehumidifiers run until daily readings show the structure is dry.",
    },
    {
      h3: "Put it back",
      body: "Plaster and drywall repair, insulation, trim and flooring are completed after drying so you are not left with open walls.",
    },
  ],
} as const;

export const WHY_WET = {
  h2: "Why Belleville basements get wet",
  paras: [
    "Three things come up again and again. First, older foundations were built to be damp. Stone and brick walls let groundwater seep through, and without drain tile there is nothing to carry it away. Second, the sewers in the older neighborhoods are easily overloaded in heavy rain, which pushes water back up private laterals. Third, parts of St. Clair County sit over old coal mine workings, and ground movement can crack foundations and break buried water and sewer lines.",
    "Water damage repair in Belleville, IL has to account for all three. Drying a room is only half the job if the cause is a cracked lateral or a foundation that seeps every time it rains, so we tell you what we find and what a plumber or foundation contractor would need to address.",
  ],
} as const;

export const WHILE_WAITING = {
  h2: "What to do while the crew is on the way",
  items: [
    "If a pipe broke, close the main valve, usually where the water line enters the basement.",
    "If the floor drain is backing up, stop using sinks, toilets, the washer and the dishwasher. Every gallon you send down comes back up.",
    "Keep out of sewage and floodwater. Do not let children or pets near it.",
    "Switch off power to the wet area only if the panel can be reached from a dry floor.",
    "Lift what you can off the floor: boxes, rugs, electronics.",
    "Photograph each room and the water line on the walls.",
    "Leave the furnace and water heater off if water reached them.",
  ],
} as const;

export const COST = {
  h2: "What does water damage cleanup cost in Belleville?",
  paras: [
    "Price follows the size of the wet area, the type of water and how long it sat. A clean-water leak in one room, caught early, often falls between several hundred dollars and a couple of thousand. Sewage in a basement or a flooded finished lower level typically ranges from a few thousand dollars upward, depending on how much material has to be removed and rebuilt. You receive a written, room-by-room scope after the inspection and before work begins.",
    "For water damage cleanup in Belleville, IL that goes through insurance, we provide photos, a cause description and daily moisture logs for the adjuster.",
  ],
} as const;

export const INSURANCE = {
  h2: "Insurance, sewer backup and mine subsidence",
  paras: [
    "Standard homeowners policies generally cover sudden pipe and appliance failures. Sewer and drain backup needs its own endorsement, and outside flooding needs a flood policy. In Illinois, mine subsidence coverage is a separate item on the policy and applies to ground movement, not to water itself. We do not determine coverage. We document what happened so your insurer can.",
  ],
} as const;

export const AREAS = {
  h2: "Neighborhoods and ZIP codes we serve",
  paras: [
    "We work throughout Belleville: downtown around the Public Square, West Main Street and East Main Street, the West End, Signal Hill, the Carlyle Avenue and Lebanon Avenue corridors, and the newer neighborhoods off IL-15, IL-159, IL-161 and Frank Scott Parkway. ZIP codes covered are 62220, 62221, 62223 and 62226.",
  ],
} as const;

export const FAQ = [
  {
    q: "How soon will someone come out?",
    a: "The crew is dispatched immediately after your call, any time of day or night. You are given an expected arrival time on the phone.",
  },
  {
    q: "Can a wet plaster wall be saved?",
    a: "Often it can. Plaster tolerates water better than drywall if it is dried slowly and evenly. Plaster that has turned soft, crumbly or has pulled away from the lath is removed.",
  },
  {
    q: "Is water in my basement after rain normal for an old Belleville house?",
    a: "Seepage is common in stone and brick foundations, but standing water, sewage odor or water from the floor drain is not something to wait on.",
  },
  {
    q: "How long does it take to dry an older home?",
    a: "Plan on four to seven days. Dense materials such as plaster, brick and thick lumber dry more slowly than modern drywall and framing.",
  },
  {
    q: "I searched water damage restoration near me. Do you cover rentals?",
    a: "Yes. We work with tenants, landlords and property managers, and can coordinate access when the owner is out of town.",
  },
  {
    q: "Is this a 24 hour water damage service?",
    a: "Yes. Calls are answered around the clock, including weekends and holidays.",
  },
] as const;

export const FINAL_CTA = {
  h2: "Get a crew out now",
  paras: [
    "For water damage restoration in Belleville, IL, call (618) 330-9060. You reach a local water restoration company that picks up day and night, and the crew is dispatched immediately. From a wet cellar to a soaked ceiling, water damage repair in Belleville, IL begins with one call.",
  ],
} as const;

export const ALL_ROUTES: string[] = [
  "/",
  "/services",
  ...SERVICES.map((s) => `/services/${s.slug}`),
  "/about",
  "/contact",
];

// Images: REAL Pexels photography, fresh for Belleville only — zero reuse
// from any past site (checked by Pexels ID against the past-site ban lists
// AND by perceptual hash).
// Alt text describes what the photo ACTUALLY shows; no alt claims a photo
// was taken in Belleville. Filenames carry no "AI" word; all metadata
// stripped at conversion (PIL re-save, EXIF-free) and verified per image.
// Keys: "home", service slugs. Filenames/alt filled in after viewing;
// see qa/images-manifest.json for source URLs and relevance flags.
export type PageImage = { src: string; alt: string };
export const HERO_IMAGE: Record<string, PageImage> = {
  home: {
    src: ASSET_PREFIX + "/images/heroes/home.webp",
    alt: "A living room with standing floodwater across the floor, reflecting a leather sofa and a table lamp",
  },
  "emergency-water-removal": {
    src: ASSET_PREFIX + "/images/heroes/emergency-water-removal.webp",
    alt: "Industrial wet/dry vacuum with hose standing on a wood floor in a room under repair",
  },
  "basement-flood-cleanup": {
    src: ASSET_PREFIX + "/images/heroes/basement-flood-cleanup.webp",
    alt: "Unfinished basement with exposed ceiling joists, wood-framed walls, a concrete floor and a white door",
  },
  "sewer-backup-cleanup": {
    src: ASSET_PREFIX + "/images/heroes/sewer-backup-cleanup.webp",
    alt: "A plumber's hands tightening a drain fitting on the pipes under a sink",
  },
  "sump-pump-failure-cleanup": {
    src: ASSET_PREFIX + "/images/heroes/sump-pump-failure-cleanup.webp",
    alt: "A blue electric water pump with black hoses on a wet concrete floor",
  },
  "burst-pipe-water-damage": {
    src: ASSET_PREFIX + "/images/heroes/burst-pipe-water-damage.webp",
    alt: "A hand gripping yellow-handled pliers on a pipe fitting beside a white water heater",
  },
  "mold-remediation": {
    src: ASSET_PREFIX + "/images/heroes/mold-remediation.webp",
    alt: "Worker in a white protective suit fogging a living room during mold treatment",
  },
  "flood-damage-restoration": {
    src: ASSET_PREFIX + "/images/heroes/flood-damage-restoration.webp",
    alt: "Large dark water stain spreading across a damaged interior wall",
  },
  "ceiling-water-damage-repair": {
    src: ASSET_PREFIX + "/images/heroes/ceiling-water-damage-repair.webp",
    alt: "A ceiling with a large section of plaster collapsed to the wooden lath after water damage, above a lived-in room",
  },
  "drywall-plaster-water-damage-repair": {
    src: ASSET_PREFIX + "/images/heroes/drywall-plaster-water-damage-repair.webp",
    alt: "Construction worker wearing a respirator mask applying plaster to an interior wall with a spatula",
  },
  "hardwood-floor-water-damage": {
    src: ASSET_PREFIX + "/images/heroes/hardwood-floor-water-damage.webp",
    alt: "Water splashing and pooling across wet wooden floorboards",
  },
  "crawl-space-water-removal": {
    src: ASSET_PREFIX + "/images/heroes/crawl-space-water-removal.webp",
    alt: "Exposed wooden floor joists and a stone wall in a low under-house crawl space lit by hanging bulbs",
  },
  "water-heater-appliance-leak-cleanup": {
    src: ASSET_PREFIX + "/images/heroes/water-heater-appliance-leak-cleanup.webp",
    alt: "Technician in gloves servicing a wall-mounted water heater with copper pipes",
  },
  "toilet-overflow-cleanup": {
    src: ASSET_PREFIX + "/images/heroes/toilet-overflow-cleanup.webp",
    alt: "Water swirling inside a toilet bowl, viewed from above",
  },
  "commercial-water-damage-restoration": {
    src: ASSET_PREFIX + "/images/heroes/commercial-water-damage-restoration.webp",
    alt: "A worker using a wet/dry vacuum to clean the carpet in a modern office",
  },
  "apartment-rental-water-damage": {
    src: ASSET_PREFIX + "/images/heroes/apartment-rental-water-damage.webp",
    alt: "Water-damaged ceiling and walls with peeling paint and crumbling plaster in an old apartment interior",
  },
  "water-damage-insurance-claims": {
    src: ASSET_PREFIX + "/images/heroes/water-damage-insurance-claims.webp",
    alt: "Businessman reviewing a contract while holding a pen at a desk",
  },
};

export const CARD_IMAGE: Record<string, PageImage> = {
  "emergency-water-removal": {
    src: ASSET_PREFIX + "/images/cards/emergency-water-removal.webp",
    alt: "Industrial wet/dry vacuum with hose standing on a wood floor in a room under repair",
  },
  "basement-flood-cleanup": {
    src: ASSET_PREFIX + "/images/cards/basement-flood-cleanup.webp",
    alt: "Unfinished basement with exposed ceiling joists, wood-framed walls, a concrete floor and a white door",
  },
  "sewer-backup-cleanup": {
    src: ASSET_PREFIX + "/images/cards/sewer-backup-cleanup.webp",
    alt: "A plumber's hands tightening a drain fitting on the pipes under a sink",
  },
  "sump-pump-failure-cleanup": {
    src: ASSET_PREFIX + "/images/cards/sump-pump-failure-cleanup.webp",
    alt: "A blue pipe with a red shutoff valve wheel on a white wall",
  },
  "burst-pipe-water-damage": {
    src: ASSET_PREFIX + "/images/cards/burst-pipe-water-damage.webp",
    alt: "Water flowing from industrial pipes against a clear sky",
  },
  // CYCLE 1 FIX 2026-11-13 (qa/CYCLE1-images-audit-2026-11-13.md P1-2):
  // mold-remediation card REMOVED — Pexels 4099087 is Broken Arrow's LIVE
  // homepage card + sewage hero (same photo, viewed full-size). No fresh
  // mold photo passed full nets (all Pexels mold candidates are the same
  // 4098xxx shoot as the banned photo, or the same Buonarroti fogging
  // shoot as our own mold hero 4176610) — slot honestly EMPTY. The
  // homepage renders the mold card without an image (page.tsx guards
  // CARD_IMAGE[slug]); the sitemap skips unwired cards. File quarantined
  // in qa/removed-cycle1/mold-remediation.webp. Do NOT re-add 4099087.
  "flood-damage-restoration": {
    src: ASSET_PREFIX + "/images/cards/flood-damage-restoration.webp",
    alt: "Large dark water stain spreading across a damaged interior wall",
  },
  "ceiling-water-damage-repair": {
    src: ASSET_PREFIX + "/images/cards/ceiling-water-damage-repair.webp",
    alt: "Severe brown water stain with peeling paint on a ceiling",
  },
  "drywall-plaster-water-damage-repair": {
    src: ASSET_PREFIX + "/images/cards/drywall-plaster-water-damage-repair.webp",
    alt: "Hands applying spackling paste to a wall with a putty knife",
  },
  "hardwood-floor-water-damage": {
    src: ASSET_PREFIX + "/images/cards/hardwood-floor-water-damage.webp",
    alt: "Water splashing and pooling across wet wooden floorboards",
  },
  "crawl-space-water-removal": {
    src: ASSET_PREFIX + "/images/cards/crawl-space-water-removal.webp",
    alt: "Exposed wooden floor joists and a stone wall in a low under-house crawl space lit by hanging bulbs",
  },
  "water-heater-appliance-leak-cleanup": {
    src: ASSET_PREFIX + "/images/cards/water-heater-appliance-leak-cleanup.webp",
    alt: "Technician in gloves servicing a wall-mounted water heater with copper pipes",
  },
  "toilet-overflow-cleanup": {
    src: ASSET_PREFIX + "/images/cards/toilet-overflow-cleanup.webp",
    alt: "Water swirling inside a toilet bowl, viewed from above",
  },
  "commercial-water-damage-restoration": {
    src: ASSET_PREFIX + "/images/cards/commercial-water-damage-restoration.webp",
    alt: "A worker using a wet/dry vacuum to clean the carpet in a modern office",
  },
  "apartment-rental-water-damage": {
    src: ASSET_PREFIX + "/images/cards/apartment-rental-water-damage.webp",
    alt: "Water-damaged ceiling and walls with peeling paint and crumbling plaster in an old apartment interior",
  },
  "water-damage-insurance-claims": {
    src: ASSET_PREFIX + "/images/cards/water-damage-insurance-claims.webp",
    alt: "A woman holding a clipboard headed Home Insurance Policy, with a smiling couple standing behind her",
  },
};

export function serviceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
