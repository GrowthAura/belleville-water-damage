# Belleville IL — Water Damage Restoration

24/7 emergency water damage restoration in Belleville, IL (ZIPs 62220,
62221, 62223, 62226). Phone: (618) 330-9060.

- Stack: Next.js 16.4.6 + React 19.3.1, static export (`output: "export"`).
- Theme: Tulsa Water Damage Repair Theme v2 (design language only, fresh code).
- Routes: 17 — homepage + 16 services under `/services/<slug>` (no trailing slash).
- Content: 100% verbatim from the client's Google Doc (homepage only);
  service pages carry only their verbatim homepage summary.
- Live: https://growthaura.github.io/belleville-water-damage/ (GitHub Pages,
  `gh-pages` branch = built `out/` + `.nojekyll`).

## Build

```sh
npm install
NEXT_PUBLIC_SITE_URL=https://growthaura.github.io/belleville-water-damage \
NEXT_PUBLIC_BASE_PATH=/belleville-water-damage npm run build
# output in out/
```

`basePath` + `assetPrefix` (`/belleville-water-damage`) are required for the
GitHub Pages project-site subpath — without them the live site white-screens
(Midvale failure mode). Image `src`s carry the same prefix via
`NEXT_PUBLIC_BASE_PATH` (`ASSET_PREFIX` in `lib/content.ts`); plain `<img>`
tags do not get `basePath` applied by Next.
