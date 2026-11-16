// Fresh Belleville components — written new for this site. No file copied
// from any past site. Design follows the locked Theme v2 skeleton only
// (header / hero / trust band / cards / process / FAQ / footer / sticky bar).
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { SITE, SERVICES, HERO } from "@/lib/content";
import type { Seg } from "@/lib/tab-pages";

export const TEL_HREF = `tel:${SITE.phoneTel}`;

/* ---------- reveal wrapper: structural wrapper only. Content is never
   hidden — Tier-1 motion lives in card hover only. ---------- */
export function Reveal({ children, className = "" }: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

/* ---------- hero buttons: Button 1 and Button 2, exactly equal ----------
   Same class, same height/padding/font/weight — only the colour differs.
   Button 1 carries ONLY the phone number. ---------- */
export function HeroButtons({ label = "Get Emergency Help" }: { label?: string }) {
  return (
    <p className="hero-buttons">
      <a className="btn btn-call" href={TEL_HREF}>
        {SITE.phoneDisplay}
      </a>
      <a className="btn btn-help" href={TEL_HREF}>
        {label}
      </a>
    </p>
  );
}

/* ---------- photo hero: ONE pattern on all 20 pages.
   Order: breadcrumb (inner pages) -> eyebrow -> H1 (verbatim, exactly 1) ->
   INTRO inside the hero (verbatim) -> the 2 equal buttons.
   The hero image is a darkened photographic background (LCP image, preloaded
   automatically by Next from fetchPriority="high"). Content is never hidden
   by animation.
   image === null (Services hub / About / Contact — the Doc gives those tabs
   no photo): solid dark hero, same classes, no <img>. No photo is reused
   from another page to fill the slot. ---------- */
export function PhotoHero({
  image,
  alt,
  eyebrow,
  h1,
  intro,
  breadcrumb,
  cta2 = "Get Emergency Help",
}: {
  image: string | null;
  alt: string;
  eyebrow: string;
  h1: string;
  intro: string;
  breadcrumb?: ReactNode;
  cta2?: string;
}) {
  // DESIGN 10x 2026-11-13: no-photo pages get .hero-solid (brick-toned
  // depth via CSS gradients) — same hero, same words, no borrowed photo.
  return (
    <section className={`hero hero-photo${image ? "" : " hero-solid"}`}>
      {image ? (
        <>
          <img
            className="hero-img"
            src={image}
            alt={alt}
            width={1600}
            height={900}
            fetchPriority="high"
          />
          <div className="hero-shade" aria-hidden="true" />
        </>
      ) : null}
      <div className="wrap hero-content">
        {breadcrumb}
        <p className="eyebrow">{eyebrow}</p>
        <h1>{h1}</h1>
        <p className="intro">{intro}</p>
        <HeroButtons label={cta2} />
      </div>
    </section>
  );
}

/* ---------- photographic card image: 16:9, height auto ---------- */
export function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      className="card-img"
      src={src}
      alt={alt}
      width={720}
      height={405}
      loading="lazy"
    />
  );
}

/* ---------- rich paragraph: Doc-verbatim text with link annotations
   resolved to <Link>s at generation time (see lib/tab-pages.ts).
   Plain strings render as text; {a, h} segments render as links.
   The parenthetical path itself never renders. ---------- */
export function RichPara({ segs }: { segs: Seg[] }) {
  return (
    <p>
      {segs.map((s, i) =>
        typeof s === "string" ? (
          s
        ) : (
          <Link key={i} href={s.h}>
            {s.a}
          </Link>
        )
      )}
    </p>
  );
}

/* ---------- header: mobile menu button 46px, Escape closes ---------- */
const HEADER_SERVICES = [
  "emergency-water-removal",
  "sewer-backup-cleanup",
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  // Set when a nav link is tapped: the menu closes AND navigation starts in
  // the same click handler, but React runs the close cleanup before the URL
  // changes — so the cleanup cannot tell a link tap from Escape/toggle by
  // pathname alone. The flag tells it to skip the scroll restore (which
  // would otherwise clamp-scroll the new page).
  const navigatingRef = useRef(false);
  const pathname = usePathname();
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    // Close the menu on scroll (standing rule: menu closes on scroll).
    // Ignored while the scroll lock below is active: applying/removing
    // position:fixed fires a scroll event of its own, which must not
    // close the menu the instant it opens.
    const onScroll = () => {
      if (document.body.style.position === "fixed") return;
      setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Scroll lock while the menu is open (Round 3 Gate 2): the page behind
    // the open menu must not scroll. NOTE: `overflow: hidden` on body/html
    // does NOT lock scrolling in this Chromium (verified: window.scrollTo
    // and wheel both still move scrollTop), so the lock uses position:fixed
    // on body with the scroll offset preserved and restored on close.
    // The restore is skipped when the pathname changed meanwhile (a menu
    // link was tapped): restoring then would scroll the NEW page.
    const y = window.scrollY;
    const path = window.location.pathname;
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.width = "100%";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      // Restore the pre-menu scroll position — unless a navigation started
      // (menu link tapped) or the pathname already changed (back/forward):
      // restoring then would scroll the new page.
      const navigated =
        navigatingRef.current || window.location.pathname !== path;
      navigatingRef.current = false;
      if (!navigated) {
        window.scrollTo({ top: y, behavior: "instant" });
      }
    };
  }, [menuOpen]);
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="30" height="30">
              <path
                d="M16 3C16 3 6 14 6 20a10 10 0 0 0 20 0C26 14 16 3 16 3Z"
                fill="#7a2e1d"
              />
            </svg>
          </span>
          <span className="brand-text">
            Water Damage Restoration
            <span className="brand-city">Belleville, IL</span>
          </span>
        </Link>
        <nav
          id="main-nav"
          className={`main-nav${menuOpen ? " open" : ""}`}
          aria-label="Main"
        >
          <Link
            href="/"
            onClick={() => {
              navigatingRef.current = true;
              setMenuOpen(false);
            }}
          >
            Home
          </Link>
          {HEADER_SERVICES.map((slug) => {
            const s = SERVICES.find((x) => x.slug === slug)!;
            return (
              <Link
                key={slug}
                href={`/services/${slug}`}
                onClick={() => {
                  navigatingRef.current = true;
                  setMenuOpen(false);
                }}
              >
                {s.anchor}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          className="menu-btn"
          ref={menuBtnRef}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden="true" />
        </button>
        <a className="header-phone" href={TEL_HREF}>
          {SITE.phoneDisplay}
        </a>
      </div>
    </header>
  );
}

/* ---------- footer: map on every page (no area pages in this build) ---------- */
const FOOTER_SERVICES = [
  "emergency-water-removal",
  "basement-flood-cleanup",
  "sewer-backup-cleanup",
  "sump-pump-failure-cleanup",
  "burst-pipe-water-damage",
  "mold-remediation",
  "flood-damage-restoration",
  "ceiling-water-damage-repair",
  "drywall-plaster-water-damage-repair",
  "hardwood-floor-water-damage",
  "crawl-space-water-removal",
  "water-heater-appliance-leak-cleanup",
  "toilet-overflow-cleanup",
  "commercial-water-damage-restoration",
  "apartment-rental-water-damage",
  "water-damage-insurance-claims",
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-map">
        <iframe
          title="Map: Belleville, IL 62220"
          src="https://www.google.com/maps?q=Belleville%2C%20IL%2062220&output=embed"
          referrerPolicy="no-referrer-when-downgrade"
          loading="lazy"
        />
        <p className="footer-map-fallback">
          <a
            href="https://www.google.com/maps?q=Belleville%2C+IL+62220"
            target="_blank"
            rel="noreferrer"
          >
            Open map of Belleville, IL 62220
          </a>
        </p>
      </div>
      <div className="wrap footer-grid">
        <div>
          <p className="footer-brand">
            Water Damage Restoration Belleville, IL
          </p>
          <p>
            24/7 water damage restoration in Belleville, IL 62220.
            <br />
            <a href={TEL_HREF}>{SITE.phoneDisplay}</a>
          </p>
        </div>
        <nav aria-label="Services">
          <p className="footer-h">Services</p>
          <ul>
            {FOOTER_SERVICES.map((slug) => {
              const s = SERVICES.find((x) => x.slug === slug)!;
              return (
                <li key={slug}>
                  <Link href={`/services/${slug}`}>{s.anchor}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <nav aria-label="Help">
          <p className="footer-h">Emergency Help</p>
          <ul>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/#services">All Belleville Services</Link>
            </li>
            <li>
              <Link href="/#faq">Belleville Water Damage Questions</Link>
            </li>
            <li>
              <a href={TEL_HREF}>Call {SITE.phoneDisplay}</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="wrap footer-base">
        <p>
          Water Damage Restoration Belleville, IL · Belleville, IL 62220 ·{" "}
          <a href={TEL_HREF}>{SITE.phoneDisplay}</a>
        </p>
        <p className="footer-credits">
          Photo credit: Buckled hardwood floor photo on the Hardwood Floor
          Water Damage page · Photo: Raimond Spekking, Wikimedia Commons,
          CC BY-SA 4.0.
        </p>
      </div>
    </footer>
  );
}

/* ---------- sticky mobile call bar (every page, always tappable) ----------
   Hidden while the hero is on screen (IntersectionObserver) so it never
   covers hero Button 2 at first paint; appears once the hero scrolls out.
   No-JS default: bar visible. ---------- */
export function StickyBar() {
  const [heroGone, setHeroGone] = useState(false);
  useEffect(() => {
    const hero = document.querySelector(".hero-photo, .hero");
    if (!hero) {
      setHeroGone(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setHeroGone(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  return (
    <div className={`sticky-bar${heroGone ? "" : " bar-hidden"}`}>
      <a href={TEL_HREF}>Call {SITE.phoneDisplay} · 24/7</a>
    </div>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={i}>
            {it.href ? (
              <Link href={it.href}>{it.label}</Link>
            ) : (
              <span aria-current="page">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ---------- trust band: the Doc's 4 badges, verbatim ----------
   Cycle 1 fix I-2: the "·" separators dangled at line starts on mobile
   (flex wrap + nowrap spans). Each badge is now its own flex item with
   a gap — no separator characters, badges wrap as wholes. */
export function TrustBand() {
  return (
    <div className="trust-band">
      <div className="wrap">
        <p>
          {HERO.trust.map((t) => (
            <span key={t}>✓ {t}</span>
          ))}
        </p>
      </div>
    </div>
  );
}
