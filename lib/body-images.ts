// Body images for the 16 service pages (Tabs 3-18) — wiring data only.
// Generated 2026-11-13 by merging the four verified manifests
// qa/body-images-A.json (14), -B.json (15), -C.json (12), -D.json (16),
// minus 1 exclusion below = 56 wired entries.
// FIX ROUND 2026-11-13 (qa/FIX-bodyimages-2026-11-13.md): 3 swapped
// (drywall-3 Pexels 5089052, hardwood-3 Wikimedia Commons 5560,
// water-heater-2 Pexels 8142983) + 2 entries REMOVED (water-heater-1,
// crawl-1 — no fitting fresh photo exists, slots left unfilled) = 54
// wired entries. Any future re-merge must re-apply these exclusions.
// No words change: `section` is the verbatim H2 the image attaches to
// (exact-match gate passed 57/57 against site/lib/tab-pages.ts — 56 wired
// after the exclusion); `alt` is the verified photo description — alt
// text only, never a visible caption. Entries are ordered per page by the
// section's position in the tab content, so the renderer alternates sides
// in section order (1st image right, 2nd left, 3rd right, 4th left).
// EXCLUDED — quarantined in qa/removed-body/, never wired, never in
// site/public/: drywall-plaster-water-damage-repair-1.webp (Pexels
// 6474308, confirmed reuse), emergency-water-removal-2.webp and
// emergency-water-removal-4.webp (solid-grey placeholders), and
// emergency-water-removal-3.webp — coordinator catch ~09:55 PKT: Unsplash
// 1660642670168-d2c7a9921d6d IS the hardwood-floor-water-damage HERO
// (qa/images-manifest.json) — site-internal repeat, same photo as a hero.
// Emergency page therefore ships with 1 body image; a replacement pick
// for the "What happens to carpet, floors and stored items" section is
// still needed (fresh search once the VM write gate opens).
// FIX ROUND 2026-11-13 — P1 reuses quarantined in qa/removed-body/,
// never wired, never in site/public/: water-heater-appliance-leak-cleanup-1
// (Pexels 19980200, Plano 3 live — slot UNFILLED, entry removed: every
// real home tank photo on Pexels is a live reuse elsewhere),
// crawl-space-water-removal-1 (Pexels 28272345, Tulsa Hardwood Sapulpa —
// slot UNFILLED, entry removed: the only true crawl-space photo, Pexels
// 32497163, is itself a multi-site reuse), hardwood-floor-water-damage-3
// (Pexels 7027844, Texas + Plano live — REPLACED by Wikimedia Commons
// File:Wasserschaden_Kölnisches_Stadtmuseum_Juni_2017-5560.jpg, Raimond
// Spekking, CC BY-SA 4.0; credit carried in the alt text, re-verifier to
// adjudicate), drywall-plaster-water-damage-repair-3 (Pexels 4874401,
// Apopka LIVE mold hero — REPLACED by Pexels 5089052). P3 swap:
// water-heater-2 radiator (Pexels 7718449) REPLACED by Pexels 8142983
// (real wall-mounted tank; list hits traced to Lancaster scout-pool +
// Belleville staging only, no installed-live file — see FIX log).
// CORRECTION 2026-11-13 (Cycle 1 audit P1-1): that clearance was WRONG —
// 8142983 IS installed live (Apopka water-heater card + Broken Arrow
// body image + Tulsa). The entry is REMOVED this round; file quarantined
// in qa/removed-cycle1/. Do NOT re-add 8142983.
// P3 slots kept with flags recorded (no better fresh photo found):
// hardwood-1/2, water-heater-3, crawl-3, toilet-1, sump-3/4.
// CYCLE 1 REMOVALS (qa/removed-cycle1/, slots honestly UNFILLED):
// water-heater-appliance-leak-cleanup-2 (8142983, P1-1 reuse),
// toilet-overflow-cleanup-3 (Unsplash 1558211583-03ed8a0b3d5f, P2-1
// wrong-country EU bathroom + alt claimed a mosaic floor not in frame).
// 50 wired entries.
// Source ids are strings (manifest C stored pexels_id as integers).
// POLISH 2026-11-16 (order 13): 23 entries carry a `size` tier + resized
// file dims (see the `size` field comment in the BodyImage type) — the
// image/text balance fix. Files were resized + GPS re-tagged; see
// qa/FIX-polish-2026-11-16.md for the before/after ratios.

export type BodyImage = {
  slug: string;
  n: number;
  section: string;
  file: string;
  alt: string;
  pexels_id: string | null;
  unsplash_id: string | null;
  // POLISH 2026-11-16 (order 13 — image/text balance): display-size tier
  // for splits whose facing text is short (measured in
  // qa/polish-balance.json). "small" = image column 0.7fr (~448px at
  // 1440px, file 780x520); "xs" = image column 0.5fr (~320px at 1440px,
  // file 570x380). Absent = full 1fr column, file 1020x680. w/h are the
  // resized file's real dimensions (rendered as the img width/height
  // attributes); all three sizes are exact 3:2.
  size?: "small" | "xs";
  w?: number;
  h?: number;
};

export const BODY_IMAGES: BodyImage[] = [
  {
    slug: "emergency-water-removal",
    n: 1,
    section: "How quickly does standing water need to come out of a Belleville basement with a brick foundation?",
    file: "/images/body/emergency-water-removal-1.webp",
    alt: "A brick-vaulted basement room with bare brick walls and a warm ceiling light",
    pexels_id: null,
    unsplash_id: "1593871295829-1aae9c21de92",
  },
  {
    slug: "basement-flood-cleanup",
    n: 1,
    section: "Why do Belleville basements with limestone or brick walls seep after every long rain?",
    file: "/images/body/basement-flood-cleanup-1.webp",
    alt: "A weathered brick and stone masonry wall with damp staining, moss, and eroded mortar",
    pexels_id: "692063",
    unsplash_id: null,
  },
  {
    slug: "basement-flood-cleanup",
    n: 2,
    section: "Where the water comes from",
    file: "/images/body/basement-flood-cleanup-2.webp",
    alt: "Standing water and puddles on a smooth floor around a steel column base",
    pexels_id: null,
    unsplash_id: "1636136324469-6222ce2c26d9",
  },
  {
    slug: "basement-flood-cleanup",
    n: 3,
    section: "How we clean up a flooded basement",
    file: "/images/body/basement-flood-cleanup-3.webp",
    alt: "A hand in a yellow rubber glove scrubbing a wet, soapy floor",
    pexels_id: null,
    unsplash_id: "1740657254989-42fe9c3b8cce",
  },
  // UIUX-AZ P1-1 (2026-11-13): basement-4 is REMOVED from the body wiring —
  // it is now the basement HERO (heroes/basement-flood-cleanup.webp, 16:9
  // crop + upscale of this file). The file itself is quarantined in
  // qa/removed-uiux-az/. Do NOT re-merge this entry from qa/body-images-A.json.
  {
    slug: "sewer-backup-cleanup",
    n: 1,
    section: "Why do floor drains back up in Belleville's older neighborhoods during heavy storms?",
    file: "/images/body/sewer-backup-cleanup-1.webp",
    size: "small",
    w: 780,
    h: 520,
    alt: "A blue underground pipe with valves exposed in an excavated trench",
    pexels_id: null,
    unsplash_id: "1693907986952-3cd372e4c9d8",
  },
  {
    slug: "sewer-backup-cleanup",
    n: 2,
    section: "Our cleanup process",
    file: "/images/body/sewer-backup-cleanup-2.webp",
    alt: "A worker in a white protective suit, respirator, and blue gloves using a sprayer wand on a carpet in a living room",
    pexels_id: null,
    unsplash_id: "1742483359033-13315b247c74",
  },
  {
    slug: "sewer-backup-cleanup",
    n: 3,
    section: "Appliances and mechanical equipment",
    file: "/images/body/sewer-backup-cleanup-3.webp",
    size: "xs",
    w: 570,
    h: 380,
    alt: "A basement laundry room with a washer, dryer, utility sink, and exposed pipes and joists overhead",
    pexels_id: null,
    unsplash_id: "1646592491525-1d4abf467273",
  },
  {
    slug: "sewer-backup-cleanup",
    n: 4,
    section: "Preventing the next one",
    file: "/images/body/sewer-backup-cleanup-4.webp",
    size: "small",
    w: 780,
    h: 520,
    alt: "A wall of white painted pipes and elbows",
    pexels_id: null,
    unsplash_id: "1646009445351-b8192e095f3a",
  },
  // UIUX-AZ P2-1 (2026-11-13): sump-1 (blue pump) is REMOVED from the body
  // wiring — it is now the sump HERO (heroes/sump-pump-failure-cleanup.webp,
  // 16:9 crop + upscale of this file). The file itself is quarantined in
  // qa/removed-uiux-az/. Do NOT re-merge this entry from qa/body-images-A.json.
  {
    slug: "sump-pump-failure-cleanup",
    n: 2,
    section: "A quick check when the power is on",
    file: "/images/body/sump-pump-failure-cleanup-2.webp",
    alt: "A blue pipe with a red shutoff valve wheel on a white wall",
    pexels_id: null,
    unsplash_id: "1696154994502-93dd97495a4f",
  },
  {
    slug: "sump-pump-failure-cleanup",
    n: 3,
    section: "Why it matters in newer Belleville homes",
    file: "/images/body/sump-pump-failure-cleanup-3.webp",
    size: "small",
    w: 780,
    h: 520,
    alt: "An empty finished basement with white walls, support columns, and wood-look flooring",
    pexels_id: null,
    unsplash_id: "1646592474103-cfd22d1d9e34",
  },
  {
    slug: "sump-pump-failure-cleanup",
    n: 4,
    section: "Before the next storm",
    file: "/images/body/sump-pump-failure-cleanup-4.webp",
    size: "xs",
    w: 570,
    h: 380,
    alt: "An unfinished basement with white block walls, steel support poles, and a grey painted floor",
    pexels_id: null,
    unsplash_id: "1782353921981-bb73a53a7482",
  },
  {
    slug: "burst-pipe-water-damage",
    n: 1,
    section: "Why are galvanized and cast-iron pipes in older Belleville homes more likely to burst in winter?",
    file: "/images/body/burst-pipe-water-damage-1.webp",
    size: "small",
    w: 780,
    h: 520,
    alt: "Close-up of heavily rusted metal pipes with flaking paint and corroded joints",
    pexels_id: null,
    unsplash_id: "photo-1695143339807-89a3093982a7",
  },
  {
    slug: "burst-pipe-water-damage",
    n: 2,
    section: "Shut the water off",
    file: "/images/body/burst-pipe-water-damage-2.webp",
    alt: "An old metal shut-off valve wheel with worn red paint on dark pipes",
    pexels_id: null,
    unsplash_id: "photo-1596394723537-ee8cb659ce24",
  },
  {
    slug: "burst-pipe-water-damage",
    n: 3,
    section: "Where pipes break in Belleville houses",
    file: "/images/body/burst-pipe-water-damage-3.webp",
    alt: "Pipes running along a damp, stained wall in a dim basement",
    pexels_id: null,
    unsplash_id: "photo-1710964821010-cd96202b09c4",
  },
  {
    slug: "burst-pipe-water-damage",
    n: 4,
    section: "Our repair process",
    file: "/images/body/burst-pipe-water-damage-4.webp",
    alt: "Close-up of a yellow air mover fan with a speed control dial",
    pexels_id: null,
    unsplash_id: "photo-1707409464212-fac93d5f38a3",
  },
  {
    slug: "mold-remediation",
    n: 1,
    section: "Is the musty smell in a Belleville cellar mold, and does it need professional removal?",
    file: "/images/body/mold-remediation-1.webp",
    size: "small",
    w: 780,
    h: 520,
    alt: "A damp older basement with a painted concrete block wall, exposed joists and old electrical panels",
    pexels_id: null,
    unsplash_id: "photo-1632192723921-fe6feb9c905d",
  },
  {
    slug: "mold-remediation",
    n: 2,
    section: "Why mold is common in Belleville homes",
    file: "/images/body/mold-remediation-2.webp",
    alt: "A damp concrete block wall with dark moisture stains",
    pexels_id: null,
    unsplash_id: "photo-1604177421038-9bdba34e78bd",
  },
  {
    slug: "mold-remediation",
    n: 3,
    section: "Mold on plaster, paneling and old wood",
    file: "/images/body/mold-remediation-3.webp",
    alt: "Black and green mold growth along the edge of a white painted wall",
    pexels_id: null,
    unsplash_id: "photo-1649777882133-525e923fd5d7",
  },
  {
    slug: "mold-remediation",
    n: 4,
    section: "Our remediation steps",
    file: "/images/body/mold-remediation-4.webp",
    alt: "A worker in white coveralls wearing a respirator mask",
    pexels_id: null,
    unsplash_id: "photo-1576918783754-00613f24b68b",
  },
  {
    slug: "flood-damage-restoration",
    n: 1,
    section: "Which parts of Belleville flood when Richland Creek rises?",
    file: "/images/body/flood-damage-restoration-1.webp",
    alt: "A road bridge crossing a tree-lined creek",
    pexels_id: null,
    unsplash_id: "photo-1590972584732-1e774e162b5e",
  },
  {
    slug: "flood-damage-restoration",
    n: 2,
    section: "How flood water gets in",
    file: "/images/body/flood-damage-restoration-2.webp",
    alt: "An old basement room with peeling plaster walls, a bare bulb and a concrete floor",
    pexels_id: null,
    unsplash_id: "photo-1646377365268-27dd70e88b47",
  },
  {
    slug: "flood-damage-restoration",
    n: 3,
    section: "What makes floodwater a special case",
    file: "/images/body/flood-damage-restoration-3.webp",
    size: "xs",
    w: 570,
    h: 380,
    alt: "Churning brown muddy floodwater",
    pexels_id: null,
    unsplash_id: "photo-1612038385745-53cfb4fbd19b",
  },
  {
    slug: "ceiling-water-damage-repair",
    n: 1,
    section: "Can a water-stained plaster ceiling in an older Belleville home be repaired instead of replaced?",
    file: "/images/body/ceiling-water-damage-repair-1.webp",
    size: "small",
    w: 780,
    h: 520,
    alt: "A plaster ceiling with peeling paint and brown water-stained patches",
    pexels_id: null,
    unsplash_id: "photo-1603889022202-5e442bd5c7ef",
  },
  {
    slug: "ceiling-water-damage-repair",
    n: 2,
    section: "Danger signs",
    file: "/images/body/ceiling-water-damage-repair-2.webp",
    size: "xs",
    w: 570,
    h: 380,
    alt: "A water-damaged ceiling corner with dark mold growth along a seam",
    pexels_id: null,
    unsplash_id: "photo-1579830780149-0a7a0d8114ea",
  },
  {
    slug: "ceiling-water-damage-repair",
    n: 4,
    section: "How we repair it",
    file: "/images/body/ceiling-water-damage-repair-4.webp",
    alt: "A worker on a ladder reaching into a ceiling access panel",
    pexels_id: null,
    unsplash_id: "photo-1774977863604-59f4e6d37a90",
  },
  {
    slug: "ceiling-water-damage-repair",
    n: 3,
    section: "Roof leaks",
    file: "/images/body/ceiling-water-damage-repair-3.webp",
    size: "xs",
    w: 570,
    h: 380,
    alt: "A gray asphalt shingle roof with a gable vent and trees behind it",
    pexels_id: null,
    unsplash_id: "photo-1590365876016-da05ac533e83",
  },
  {
    slug: "drywall-plaster-water-damage-repair",
    n: 2,
    section: "Plaster",
    file: "/images/body/drywall-plaster-water-damage-repair-2.webp",
    alt: "A gloved hand smoothing white plaster on a wall with a wide putty knife",
    pexels_id: "5691622",
    unsplash_id: null,
  },
  {
    slug: "drywall-plaster-water-damage-repair",
    n: 3,
    section: "Paneling and wallpaper",
    file: "/images/body/drywall-plaster-water-damage-repair-3.webp",
    size: "xs",
    w: 570,
    h: 380,
    alt: "Vintage blue floral wallpaper peeling away from a damaged plaster wall, exposing the plaster beneath",
    pexels_id: "5089052",
    unsplash_id: null,
  },
  {
    slug: "drywall-plaster-water-damage-repair",
    n: 4,
    section: "Rebuilding",
    file: "/images/body/drywall-plaster-water-damage-repair-4.webp",
    size: "small",
    w: 780,
    h: 520,
    alt: "A hand holding an electric sander on a pale wall",
    pexels_id: "5767957",
    unsplash_id: null,
  },
  {
    slug: "crawl-space-water-removal",
    n: 2,
    section: "Sources of water",
    file: "/images/body/crawl-space-water-removal-2.webp",
    alt: "Rusted pipes running down a cracked, water-stained plaster wall",
    pexels_id: "2238808",
    unsplash_id: null,
  },
  {
    slug: "crawl-space-water-removal",
    n: 3,
    section: "Signs from upstairs",
    file: "/images/body/crawl-space-water-removal-3.webp",
    size: "xs",
    w: 570,
    h: 380,
    alt: "A bright empty room with wide-plank wood flooring, dark ceiling beams and a ceiling fan",
    pexels_id: "10099329",
    unsplash_id: null,
  },
  {
    slug: "water-heater-appliance-leak-cleanup",
    n: 3,
    section: "Appliance leaks, room by room",
    file: "/images/body/water-heater-appliance-leak-cleanup-3.webp",
    alt: "A clean white steel radiator with a thermostat valve on a white wall",
    pexels_id: "12034871",
    unsplash_id: null,
  },
  {
    slug: "hardwood-floor-water-damage",
    n: 1,
    section: "Can the original hardwood floors in a Belleville bungalow be saved after a leak?",
    file: "/images/body/hardwood-floor-water-damage-1.webp",
    size: "small",
    w: 780,
    h: 520,
    alt: "A bright two-story home entry and living room with light oak hardwood floors and an arched window",
    pexels_id: "5178095",
    unsplash_id: null,
  },
  {
    slug: "hardwood-floor-water-damage",
    n: 2,
    section: "How old floors are built",
    file: "/images/body/hardwood-floor-water-damage-2.webp",
    size: "small",
    w: 780,
    h: 520,
    alt: "Sunlit wide-plank wood floor in a doorway",
    pexels_id: "9819644",
    unsplash_id: null,
  },
  {
    slug: "hardwood-floor-water-damage",
    n: 3,
    section: "What water does",
    file: "/images/body/hardwood-floor-water-damage-3.webp",
    alt: "Hardwood floorboards buckled and lifted into a ridge by water damage, with a dehumidifier drying the room in the background. Photo: Raimond Spekking, Wikimedia Commons, CC BY-SA 4.0.",
    pexels_id: null,
    unsplash_id: null,
  },
  {
    slug: "commercial-water-damage-restoration",
    n: 1,
    section: "How do Main Street storefronts and offices in Belleville stay open after a pipe break upstairs?",
    file: "/images/body/commercial-water-damage-restoration-1.webp",
    size: "small",
    w: 780,
    h: 520,
    alt: "Brick storefronts along a small-town main street at dusk, with lit lampposts, US flags and flower beds",
    pexels_id: null,
    unsplash_id: "1761839259488-2bdeeae794f5",
  },
  {
    slug: "commercial-water-damage-restoration",
    n: 2,
    section: "Buildings we work in",
    file: "/images/body/commercial-water-damage-restoration-2.webp",
    alt: "A quiet street of old brick commercial buildings under a grey winter sky",
    pexels_id: null,
    unsplash_id: "1768790997680-6dc2f933c536",
  },
  {
    slug: "commercial-water-damage-restoration",
    n: 3,
    section: "How we run a commercial job",
    file: "/images/body/commercial-water-damage-restoration-3.webp",
    alt: "A room being repaired, with a ladder, tools and blue protective sheeting over the floor",
    pexels_id: null,
    unsplash_id: "1770838773417-08b18661c62f",
  },
  {
    slug: "commercial-water-damage-restoration",
    n: 4,
    section: "Restaurants",
    file: "/images/body/commercial-water-damage-restoration-4.webp",
    size: "xs",
    w: 570,
    h: 380,
    alt: "A clean stainless-steel commercial kitchen with hanging pots and pans",
    pexels_id: null,
    unsplash_id: "1790156591731-09dbf6aee75a",
  },
  {
    slug: "apartment-rental-water-damage",
    n: 1,
    section: "Who calls for cleanup when a Belleville rental floods: the tenant or the landlord?",
    file: "/images/body/apartment-rental-water-damage-1.webp",
    alt: "A tall red-brick apartment building with balconies and rows of windows under a blue sky",
    pexels_id: "28832657",
    unsplash_id: null,
  },
  {
    slug: "apartment-rental-water-damage",
    n: 2,
    section: "Leaks between units",
    file: "/images/body/apartment-rental-water-damage-2.webp",
    size: "xs",
    w: 570,
    h: 380,
    alt: "A ceiling with a large yellow-brown water stain spreading from a skylight opening",
    pexels_id: null,
    unsplash_id: "1597296721548-ad75c6a150b3",
  },
  {
    slug: "apartment-rental-water-damage",
    n: 4,
    section: "Common causes in Belleville rentals",
    file: "/images/body/apartment-rental-water-damage-4.webp",
    alt: "A white front-loading washing machine in a small home laundry nook with a laundry basket",
    pexels_id: null,
    unsplash_id: "1758279745240-b75977c88fa8",
  },
  {
    slug: "apartment-rental-water-damage",
    n: 3,
    section: "What the work involves",
    file: "/images/body/apartment-rental-water-damage-3.webp",
    alt: "A close-up of a bright yellow industrial air mover drying fan",
    pexels_id: null,
    unsplash_id: "1627815254693-b612ae670310",
  },
  {
    slug: "toilet-overflow-cleanup",
    n: 1,
    section: "Is a toilet overflow in a Belleville home with one bathroom an emergency call?",
    file: "/images/body/toilet-overflow-cleanup-1.webp",
    size: "small",
    w: 780,
    h: 520,
    alt: "A plain small bathroom with a white toilet, wooden door and towel rail",
    pexels_id: null,
    unsplash_id: "1590690810009-2f912b48b382",
  },
  {
    slug: "toilet-overflow-cleanup",
    n: 2,
    section: "Stop it",
    file: "/images/body/toilet-overflow-cleanup-2.webp",
    alt: "A close-up of an old worn chrome toilet shut-off valve",
    pexels_id: null,
    unsplash_id: "1739176566047-d9573b6c9fac",
  },
  {
    slug: "toilet-overflow-cleanup",
    n: 4,
    section: "The ceiling underneath",
    file: "/images/body/toilet-overflow-cleanup-4.webp",
    size: "xs",
    w: 570,
    h: 380,
    alt: "A plaster ceiling with water staining around a decorative ceiling medallion",
    pexels_id: null,
    unsplash_id: "1682103990208-a773499991ea",
  },
  {
    slug: "water-damage-insurance-claims",
    n: 1,
    section: "Does homeowners insurance in Illinois cover sewer backup or mine subsidence damage in Belleville?",
    file: "/images/body/water-damage-insurance-claims-1.webp",
    size: "small",
    w: 780,
    h: 520,
    alt: "A large two-storey orange-brick house with white trim, columns and a lawn",
    pexels_id: null,
    unsplash_id: "1792716539816-b9f23a439b47",
  },
  {
    slug: "water-damage-insurance-claims",
    n: 2,
    section: "First-day checklist",
    file: "/images/body/water-damage-insurance-claims-2.webp",
    alt: "A hand holding a smartphone photographing a hallway inside a home",
    pexels_id: null,
    unsplash_id: "1767355112909-88ceaa7acf18",
  },
  {
    slug: "water-damage-insurance-claims",
    n: 3,
    section: "What our file contains",
    file: "/images/body/water-damage-insurance-claims-3.webp",
    alt: "Hands filling in printed forms with a pen on a dark wooden table",
    pexels_id: null,
    unsplash_id: "1635859890085-ec8cb5466806",
  },
  {
    slug: "water-damage-insurance-claims",
    n: 4,
    section: "Old houses and claim disputes",
    file: "/images/body/water-damage-insurance-claims-4.webp",
    size: "xs",
    w: 570,
    h: 380,
    alt: "Two people sitting on a porch bench looking at a phone together",
    pexels_id: null,
    unsplash_id: "1791395534168-af200f472f93",
  },
];

// Per-page lists, in section order. Pages with no body images
// (services hub, about, contact, homepage) simply have no entry.
export const BODY_IMAGES_BY_PAGE: Record<string, BodyImage[]> = (() => {
  const byPage: Record<string, BodyImage[]> = {};
  for (const img of BODY_IMAGES) {
    (byPage[img.slug] ??= []).push(img);
  }
  return byPage;
})();
