import { useEffect, useRef, useState } from "react";
import { IMG, IMG_REAL, LOGO } from "./data";
import { useLanguage, LanguageToggleHeader, LanguageToggle } from "./i18n";
import { LOCATIONS, useBeanLocation, mapsEmbedSrc, mapsDirectionsHref } from "./locations";

/* ---------- Small helpers ---------- */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Icons (inline SVG, tiny) ---------- */
const Icon = {
  Menu: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
    </svg>
  ),
  X: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
    </svg>
  ),
  Pin: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  Whats: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.15 1.6 5.96L2 22l4.28-1.68a9.87 9.87 0 004.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2zm5.79 14.09c-.25.7-1.24 1.34-1.86 1.42-.5.06-1.13.09-1.83-.11-.42-.13-.96-.31-1.66-.6-2.92-1.26-4.82-4.2-4.97-4.4-.14-.19-1.18-1.57-1.18-3s.76-2.13 1.03-2.42c.27-.29.59-.36.79-.36.2 0 .4 0 .58.01.19.01.44-.07.68.52.25.6.85 2.07.93 2.22.08.15.14.32.02.51-.11.19-.17.31-.34.48-.17.17-.35.38-.5.51-.17.15-.34.31-.14.6.2.29.87 1.43 1.87 2.32 1.28 1.14 2.36 1.49 2.65 1.65.29.15.46.13.63-.08.17-.2.72-.84.91-1.13.19-.29.38-.24.64-.14.26.09 1.66.78 1.94.92.29.14.48.21.55.32.07.11.07.66-.18 1.36z" />
    </svg>
  ),
  Star: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  ),
  Arrow: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // NOTE: placeholder logo mark — swap for Bean Crazy's real logo file as soon as
  // it's available (their actual logo lives on Instagram/Facebook, which block
  // automated fetching; upload the real file and drop it in as an <img> instead
  // of this SVG throughout the header, mobile drawer, marquee, and footer).
  Bean: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 64 64" fill="none" {...p}>
      <ellipse cx="32" cy="32" rx="16" ry="26" transform="rotate(35 32 32)" fill="currentColor" opacity="0.9"/>
      <path d="M22 14c4 10 4 30 20 36" stroke="#f7f2ea" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
    </svg>
  ),
  Sun: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
    </svg>
  ),
  Instagram: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  Facebook: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <circle cx="12" cy="12" r="9.5" />
      <path
        d="M13.6 20v-6.3h2.1l.3-2.4h-2.4v-1.6c0-.68.2-1.14 1.16-1.14h1.24V6.5c-.6-.07-1.28-.1-1.96-.1-1.94 0-3.34 1.18-3.34 3.36v1.84H8.6v2.4h2.1V20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

/* ================================================================== */
/* SOCIAL LINKS                                                        */
/* ================================================================== */

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/beancrazyroatan/", Icon: Icon.Instagram },
  { label: "Facebook", href: "https://www.facebook.com/BeanCrazyRoatan", Icon: Icon.Facebook },
];

/** Small icon-only social buttons for the header — mirrors the LanguageToggle's
 *  pill styling so it reads as one family of controls, not a bolted-on addition. */
function SocialLinksHeader({ scrolled }: { scrolled: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-0.5 p-1 rounded-full border backdrop-blur-md transition-colors duration-500 ${
        scrolled ? "bg-espresso/5 border-espresso/10" : "bg-cream/10 border-cream/30"
      }`}
    >
      {SOCIAL_LINKS.map(({ label, href, Icon: SocialIcon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener"
          aria-label={label}
          className={`relative w-7 h-7 md:w-8 md:h-8 rounded-full grid place-items-center transition-all duration-300 hover:opacity-100 ${
            scrolled ? "text-espresso/70 hover:text-espresso" : "text-cream/85 hover:text-cream"
          }`}
        >
          <SocialIcon className="w-[23px] h-[23px] md:w-[26px] md:h-[26px]" />
        </a>
      ))}
    </div>
  );
}

/** Slightly larger variant for the mobile drawer, sitting inline with the language toggle. */
function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-0.5 p-1 rounded-full bg-espresso/5 border border-espresso/10 ${className}`}>
      {SOCIAL_LINKS.map(({ label, href, Icon: SocialIcon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener"
          aria-label={label}
          className="relative w-8 h-8 rounded-full grid place-items-center text-espresso/70 hover:text-espresso transition"
        >
          <SocialIcon className="w-[27px] h-[27px]" />
        </a>
      ))}
    </div>
  );
}

/* ================================================================== */

export default function App() {
  useReveal();
  const { t } = useLanguage();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer on Escape and lock background scroll while it's open
  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [navOpen]);

  const links = t.nav.links;

  return (
    <div className="min-h-screen bg-cream text-espresso overflow-x-hidden">
      {/* ============== NAV ============== */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/85 backdrop-blur-md shadow-[0_1px_0_rgba(42,31,24,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-16 md:h-20">
          <a href="#top" className="flex items-center group">
            <img
              src={LOGO}
              alt="Bean Crazy"
              className={`h-10 md:h-12 w-auto transition-all duration-500 ${scrolled ? "invert-0" : "invert"}`}
            />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map(([l, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`text-sm tracking-wide transition ${
                  scrolled ? "text-espresso/80 hover:text-espresso" : "text-cream/85 hover:text-cream"
                }`}
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <SocialLinksHeader scrolled={scrolled} />
            <LanguageToggleHeader scrolled={scrolled} />
            <a
              href="#favorites"
              className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-espresso text-cream hover:bg-bark transition"
            >
              {t.nav.cta} <Icon.Arrow className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggleHeader scrolled={scrolled} />
            <button
              aria-label={t.aria.openMenu}
              aria-expanded={navOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setNavOpen(true)}
              className={`-mr-2 p-2.5 ${scrolled ? "text-espresso" : "text-cream"}`}
            >
              <Icon.Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] transition ${
          navOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!navOpen}
      >
        <div
          className={`absolute inset-0 bg-espresso/60 transition-opacity ${
            navOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setNavOpen(false)}
        />
        <aside
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={t.aria.siteNav}
          className={`absolute top-0 right-0 h-full w-[86%] max-w-sm bg-cream text-espresso p-8 transition-transform ${
            navOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <img src={LOGO} alt="Bean Crazy" className="h-9 w-auto" />
            <button aria-label={t.aria.closeMenu} onClick={() => setNavOpen(false)} className="-mr-2.5 p-2.5">
              <Icon.X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {links.map(([l, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setNavOpen(false)}
                className="font-display text-3xl py-2 border-b border-espresso/10"
              >
                {l}
              </a>
            ))}
          </nav>
          <div className="mt-8 flex items-center gap-4">
            <LanguageToggle />
            <a
              href="#favorites"
              onClick={() => setNavOpen(false)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-espresso text-cream rounded-full"
            >
              {t.nav.cta} <Icon.Arrow className="w-4 h-4" />
            </a>
          </div>
          <div className="mt-10 text-sm opacity-70 leading-relaxed">
            {t.drawer.hours} <br />
            {t.drawer.hours2}
          </div>
          <SocialLinks className="mt-6" />
        </aside>
      </div>

      {/* ============== HERO ============== */}
      <Hero />

      {/* Marquee strip */}
      <Marquee />

      {/* ============== STORY ============== */}
      <Story />

      {/* ============== COFFEE ============== */}
      <CoffeeSection />

      {/* ============== FAVORITES ============== */}
      <Favorites />

      {/* ============== VIBES ============== */}
      <Vibes />

      {/* ============== WHY TRAVELERS LOVE ============== */}
      <WhyLove />

      {/* ============== REVIEWS ============== */}
      <ReviewsSection />

      {/* ============== VISIT ============== */}
      <Visit />

      {/* ============== FOOTER ============== */}
      <Footer />

      {/* Floating action buttons */}
      <FloatingButtons />

    </div>
  );
}

/* ================================================================== */
/* HERO                                                                */
/* ================================================================== */

function Hero() {
  const { t } = useLanguage();
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden flex flex-col">
      <img
        src={IMG.heroCoffeeShore}
        srcSet={`${IMG.heroCoffeeShoreMobile} 1000w, ${IMG.heroCoffeeShore} 2400w`}
        sizes="100vw"
        alt="A warm cup of coffee on a wooden table at sunrise by the beach"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 hero-wash" />

      {/* Main content: grows to fill all space above the stats strip, and
          bottom-anchors its own text within that space. Since the strip below
          is a normal-flow sibling (not absolutely positioned over this), the
          two can never overlap regardless of how tall the strip gets. */}
      <div className="relative z-10 flex-1 min-h-0 w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-6 md:pb-12">
        <div className="max-w-3xl fade-up">
          <div className="inline-flex items-center gap-2 text-cream/90 text-xs md:text-sm tracking-[0.28em] uppercase mb-6">
            <Icon.Sun className="w-4 h-4" /> {t.hero.kicker}
          </div>
          <h1 className="font-display text-cream text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            {t.hero.h1a}
            <br />
            <em className="not-italic font-light italic-serif">{t.hero.h1b}</em>
          </h1>
          <p className="mt-6 text-cream/85 text-base md:text-lg max-w-xl leading-relaxed">
            {t.hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#favorites"
              className="inline-flex items-center gap-2 bg-cream text-espresso px-6 py-3.5 rounded-full text-sm font-medium hover:bg-white transition"
            >
              {t.hero.ctaPrimary} <Icon.Arrow className="w-4 h-4" />
            </a>
            <a
              href="#visit"
              className="inline-flex items-center gap-2 border border-cream/60 text-cream px-6 py-3.5 rounded-full text-sm font-medium hover:bg-cream/10 transition"
            >
              <Icon.Pin className="w-4 h-4" /> {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      {/* stats strip — normal flow, shrink-0 so it always takes exactly the
          space it needs and content above never gets covered by it */}
      <div className="relative z-10 shrink-0 border-t border-cream/15 backdrop-blur-sm bg-espresso/25">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 md:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-4 text-cream/90 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <div className="flex text-coral">
              {[...Array(5)].map((_, i) => <Icon.Star key={i} className="w-3.5 h-3.5" />)}
            </div>
            <span>{t.hero.stat1}</span>
          </div>
          <div className="hidden md:block opacity-70">{t.hero.stat2}</div>
          <div className="opacity-80">{t.hero.stat3}</div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* MARQUEE                                                             */
/* ================================================================== */

function Marquee() {
  const { t } = useLanguage();
  const words = t.marquee;
  const line = [...words, ...words];
  return (
    <div className="bg-espresso text-cream border-y border-espresso/10 overflow-hidden py-5">
      <div className="flex gap-14 whitespace-nowrap animate-marquee font-display text-2xl md:text-3xl">
        {line.map((w, i) => (
          <span key={i} className="flex items-center gap-14 opacity-90">
            {w}
            <Icon.Bean className="w-4 h-4 text-clay" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/* STORY                                                               */
/* ================================================================== */

function Story() {
  const { t } = useLanguage();
  return (
    <section id="story" className="relative py-24 md:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-5 reveal">
          <div className="grid grid-cols-2 gap-4">
            <img src={IMG.beans2} alt="Roasted Honduran coffee beans" className="rounded-2xl aspect-[4/5] object-cover w-full" loading="lazy"/>
            <img src={IMG_REAL.breakfast} alt="Real breakfast plate served at Bean Crazy" className="rounded-2xl aspect-[4/5] object-cover w-full mt-10" loading="lazy"/>
            <img src={IMG.moka} alt="Coffee brewing, stovetop moka pot" className="rounded-2xl aspect-[4/5] object-cover w-full -mt-6" loading="lazy"/>
            <img src={IMG_REAL.lunch} alt="Real lunch plate served at Bean Crazy" className="rounded-2xl aspect-[4/5] object-cover w-full mt-4" loading="lazy"/>
          </div>
        </div>

        <div className="md:col-span-7 reveal">
          <div className="text-xs uppercase tracking-[0.28em] text-teal-deep mb-5">{t.story.kicker}</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-espresso">
            {t.story.h2a} <br />
            <em className="text-sage-deep font-light italic">{t.story.h2b}</em>
          </h2>
          <div className="mt-8 space-y-5 text-espresso/80 text-lg leading-relaxed max-w-xl">
            {t.story.p.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
            {t.story.stats.map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl md:text-4xl text-espresso">{n}</div>
                <div className="text-xs uppercase tracking-widest text-espresso/60 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* COFFEE                                                              */
/* ================================================================== */

function CoffeeSection() {
  const { t } = useLanguage();
  return (
    <section id="coffee" className="relative py-24 md:py-36 bg-espresso text-cream overflow-hidden">
      <img
        src={IMG.beans2}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso via-espresso/95 to-espresso" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="reveal order-2 md:order-1">
            <div className="text-xs uppercase tracking-[0.28em] text-clay mb-5">{t.coffee.kicker}</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
              {t.coffee.h2a} <br/>
              <em className="italic font-light text-clay">{t.coffee.h2b}</em>
            </h2>
            <p className="mt-6 text-cream/75 text-lg leading-relaxed max-w-lg">
              {t.coffee.p}
            </p>

            <ul className="mt-8 space-y-4">
              {t.coffee.features.map(([ft, d]) => (
                <li key={ft} className="flex gap-4">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-clay shrink-0" />
                  <div>
                    <div className="font-medium text-cream">{ft}</div>
                    <div className="text-cream/65 text-sm">{d}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#favorites" className="inline-flex items-center gap-2 bg-cream text-espresso px-6 py-3 rounded-full text-sm hover:bg-white transition">
                {t.coffee.cta1} <Icon.Arrow className="w-4 h-4" />
              </a>
              <a href="#visit" className="inline-flex items-center gap-2 border border-cream/40 px-6 py-3 rounded-full text-sm hover:bg-cream/10 transition">
                {t.coffee.cta2}
              </a>
            </div>
          </div>

          <div className="relative reveal order-1 md:order-2">
            <div className="grid grid-cols-6 grid-rows-6 gap-3 aspect-square">
              <img src={IMG.beans3} className="col-span-4 row-span-3 rounded-2xl object-cover w-full h-full" alt="Roasted beans"/>
              <img src={IMG.espresso} className="col-span-2 row-span-2 rounded-2xl object-cover w-full h-full" alt="Espresso"/>
              <img src={IMG.moka} className="col-span-2 row-span-2 rounded-2xl object-cover w-full h-full" alt="Moka pot"/>
              <img src={IMG.barista} className="col-span-3 row-span-3 rounded-2xl object-cover w-full h-full" alt="Barista"/>
              <img src={IMG.latteArt} className="col-span-3 row-span-3 rounded-2xl object-cover w-full h-full" alt="Latte art"/>
            </div>
            <div className="absolute -bottom-6 -left-4 bg-cream text-espresso px-5 py-4 rounded-2xl shadow-2xl max-w-[220px] hidden md:block">
              <div className="text-xs uppercase tracking-widest opacity-60 mb-1">{t.coffee.badgeKicker}</div>
              <div className="font-display text-lg leading-tight">{t.coffee.badgeTitle}</div>
              <div className="text-xs mt-1 text-espresso/70">{t.coffee.badgeSub}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* FAVORITES — real, review-confirmed dishes only, no invented menu   */
/* ================================================================== */

function Favorites() {
  const { t } = useLanguage();
  const imgs = [IMG_REAL.breakfast, IMG.breakfast4, IMG_REAL.lunch, IMG.bakery3];
  const items = t.favorites.items.map((it, i) => ({ ...it, img: imgs[i] }));
  return (
    <section id="favorites" className="py-24 md:py-36 bg-linen">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 reveal">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-[0.28em] text-teal-deep mb-5">{t.favorites.kicker}</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-espresso">
              {t.favorites.h2a} <br/>
              <em className="italic font-light text-teal-deep">{t.favorites.h2b}</em>
            </h2>
          </div>
          <p className="max-w-md text-espresso/70 leading-relaxed">
            {t.favorites.p}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {items.map((it, i) => (
            <article key={i} className="reveal group" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-sand">
                <img
                  src={it.img}
                  alt={it.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-espresso/70 via-espresso/10 to-transparent">
                  <div className="text-cream font-display text-2xl leading-tight">{it.name}</div>
                  <div className="text-cream/80 text-xs mt-1 uppercase tracking-widest">{it.note}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-espresso/50 text-sm reveal">
          {t.favorites.footer}
        </p>
      </div>
    </section>
  );
}

/* ================================================================== */
/* VIBES                                                               */
/* ================================================================== */

function Vibes() {
  const { t } = useLanguage();
  return (
    <section id="vibes" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMG.beach1} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-deep/70 via-teal-deep/40 to-teal-deep/80" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 text-center text-cream reveal">
        <div className="text-xs uppercase tracking-[0.32em] text-cream/80 mb-6">{t.vibes.kicker}</div>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.98] tracking-tight">
          {t.vibes.h2a} <br/>
          <em className="italic font-light">{t.vibes.h2b}</em>
        </h2>
        <p className="mt-8 text-cream/85 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {t.vibes.p}
        </p>
        <div className="mt-12 grid sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {[IMG.beach2, IMG.beach3, IMG.beach4].map((src, i) => (
            <img key={i} src={src} alt="" className="rounded-2xl aspect-[4/5] object-cover w-full" loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* WHY LOVE                                                            */
/* ================================================================== */

function WhyLove() {
  const { t, lang } = useLanguage();
  const { location } = useBeanLocation();
  const items = t.whyLove.items
    .map((it, i) => (i === 3 ? location.highlight[lang] : it))
    .map((it, i) => ({ ...it, n: String(i + 1).padStart(2, "0") }));
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl reveal">
          <div className="text-xs uppercase tracking-[0.28em] text-teal-deep mb-5">{t.whyLove.kicker}</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-espresso">
            {t.whyLove.h2a} <em className="italic font-light text-teal-deep">{t.whyLove.h2b}</em>
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((it, i) => (
            <div
              key={it.n}
              className="reveal p-6 md:p-8 rounded-3xl bg-linen border border-espresso/5 hover:border-sage/40 transition"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="font-display text-sm text-teal opacity-70">{it.n}</div>
              <div className="mt-3 font-display text-2xl text-espresso leading-snug">{it.t}</div>
              <p className="mt-3 text-espresso/70 leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* REVIEWS                                                             */
/* ================================================================== */

function ReviewsSection() {
  const { t } = useLanguage();
  const scroller = useRef<HTMLDivElement | null>(null);
  const scroll = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };
  return (
    <section id="reviews" className="py-24 md:py-32 bg-linen">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between gap-4 mb-10 reveal">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-teal-deep mb-5">{t.reviews.kicker}</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-espresso max-w-xl">
              {t.reviews.h2a} <em className="italic font-light text-sage-deep">{t.reviews.h2b}</em>
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button aria-label={t.reviews.prev} onClick={() => scroll(-1)} className="w-11 h-11 rounded-full border border-espresso/20 grid place-items-center hover:bg-espresso hover:text-cream transition">
              <Icon.Arrow className="w-4 h-4 rotate-180" />
            </button>
            <button aria-label={t.reviews.next} onClick={() => scroll(1)} className="w-11 h-11 rounded-full border border-espresso/20 grid place-items-center hover:bg-espresso hover:text-cream transition">
              <Icon.Arrow className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-6 text-sm text-espresso/70 reveal">
          <div className="flex items-center gap-2">
            <div className="flex text-coral">
              {[...Array(5)].map((_, i) => <Icon.Star key={i} className="w-4 h-4"/>)}
            </div>
            <span><strong className="text-espresso">4.6</strong> {t.reviews.statTripadvisor}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex text-coral">
              {[...Array(5)].map((_, i) => <Icon.Star key={i} className="w-4 h-4"/>)}
            </div>
            <span>{t.reviews.statGoogle}</span>
          </div>
        </div>

        <div
          ref={scroller}
          className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 pb-4"
        >
          {t.reviews.items.map((r, i) => (
            <article
              key={i}
              className="reveal snap-start shrink-0 w-[85%] sm:w-[420px] bg-cream rounded-3xl p-7 md:p-8 border border-espresso/5 shadow-sm"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-coral">
                  {[...Array(r.rating)].map((_, i) => <Icon.Star key={i} className="w-4 h-4"/>)}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-espresso/50">{r.source}</span>
              </div>
              <p className="font-display text-lg md:text-xl leading-snug text-espresso">"{r.text}"</p>
              <div className="mt-6 pt-5 border-t border-espresso/10 text-sm">
                <div className="text-espresso font-medium">{r.author}</div>
                <div className="text-espresso/60 text-xs mt-0.5">{r.location}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* VISIT                                                               */
/* ================================================================== */

function LocationPills() {
  const { locationId, setLocationId } = useBeanLocation();
  const { lang } = useLanguage();
  return (
    <div role="group" aria-label="Choose a location" className="flex flex-wrap gap-2 mt-5 mb-8">
      {LOCATIONS.map((loc) => (
        <button
          key={loc.id}
          type="button"
          aria-pressed={locationId === loc.id}
          onClick={() => setLocationId(loc.id)}
          className={`px-4 py-2 rounded-full text-sm tracking-wide border transition ${
            locationId === loc.id
              ? "bg-cream text-espresso border-cream"
              : "border-cream/30 text-cream/75 hover:bg-cream/10 hover:text-cream"
          }`}
        >
          {loc.label}
        </button>
      ))}
      <span className="sr-only">{lang === "es" ? "Elige una ubicación" : "Choose a location"}</span>
    </div>
  );
}

function Visit() {
  const { t, lang } = useLanguage();
  const { location } = useBeanLocation();
  return (
    <section id="visit" className="py-24 md:py-32 bg-espresso text-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-16 items-start">
        <div className="reveal">
          <div className="text-xs uppercase tracking-[0.28em] text-clay mb-5">{t.visit.kicker}</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
            {t.visit.h2a} <em className="italic font-light text-clay">{t.visit.h2b}</em>
          </h2>

          <LocationPills />

          <p className="text-cream/75 text-lg leading-relaxed max-w-lg">
            {location.description[lang]}
          </p>

          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-lg">
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-cream/50 mb-2">{t.visit.addressLabel}</dt>
              <dd className="leading-relaxed">
                {location.addressLines.map((line, i) => (
                  <span key={i}>{line}{i < location.addressLines.length - 1 && <br/>}</span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-cream/50 mb-2">{t.visit.hoursLabel}</dt>
              <dd className="leading-relaxed">
                {location.hours[0]}<br/>
                {location.hours[1]}<br/>
                <span className="text-cream/60">{t.visit.hoursNote}</span>
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-cream/50 mb-2">{t.visit.phoneLabel}</dt>
              <dd><a href={location.telHref} className="hover:text-clay">{location.phone}</a></dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-cream/50 mb-2">{t.visit.emailLabel}</dt>
              <dd><a href={`mailto:${location.email}`} className="hover:text-clay">{location.email}</a></dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={mapsDirectionsHref(location.mapsQuery)}
              target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 bg-cream text-espresso px-6 py-3 rounded-full text-sm hover:bg-white transition"
            >
              <Icon.Pin className="w-4 h-4"/> {t.visit.directions}
            </a>
            <a
              href={location.whatsappHref}
              target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 border border-cream/40 px-6 py-3 rounded-full text-sm hover:bg-cream/10 transition"
            >
              <Icon.Whats className="w-4 h-4"/> {t.visit.whatsapp}
            </a>
          </div>
        </div>

        <div className="reveal rounded-3xl overflow-hidden border border-cream/10 aspect-[4/5] md:aspect-auto md:h-[620px]">
          <iframe
            key={location.id}
            title={t.visit.mapTitle}
            src={mapsEmbedSrc(location.mapsQuery)}
            className="w-full h-full grayscale-[30%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* FOOTER                                                              */
/* ================================================================== */

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-bark text-cream/85">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <img src={LOGO} alt="Bean Crazy" className="h-11 w-auto invert" />
          <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-cream/70">{t.footer.area}</div>
          <p className="mt-6 max-w-md leading-relaxed">
            {t.footer.tagline}
          </p>
          <div className="mt-6 flex gap-3">
            {([
              ["Instagram", "https://www.instagram.com/beancrazyroatan/", Icon.Instagram],
              ["Facebook", "https://www.facebook.com/BeanCrazyRoatan", Icon.Facebook],
              ["Tripadvisor", "https://www.tripadvisor.com/Restaurant_Review-g303875-d11946248-Reviews-Bean_Crazy_Cafe_Breasfast-West_End_Roatan_Bay_Islands.html", null],
            ] as const).map(([n, u, PillIcon]) => (
              <a key={n} href={u} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest border border-cream/25 rounded-full hover:bg-cream hover:text-espresso transition">
                {PillIcon && <PillIcon className="w-3.5 h-3.5" />}
                {n}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-widest text-cream/50 mb-4">{t.footer.visitLabel}</div>
          <ul className="space-y-3 leading-relaxed">
            {LOCATIONS.map((loc) => (
              <li key={loc.id}>
                <a
                  href={`#visit`}
                  className="font-medium text-cream/90 hover:text-cream"
                >
                  {loc.label}
                </a>
                <div className="text-cream/60 text-sm">{loc.addressLines[0]}, {loc.addressLines[2]}</div>
              </li>
            ))}
            <li className="pt-2"><a className="hover:text-cream" href="tel:+50496228396">+504 9622-8396</a></li>
            <li><a className="hover:text-cream" href="mailto:bcrazyraotan@gmail.com">bcrazyraotan@gmail.com</a></li>
          </ul>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-widest text-cream/50 mb-4">{t.footer.hoursLabel}</div>
          <ul className="space-y-1.5 max-w-[140px]">
            {t.footer.days.map((d, i) => (
              <li key={d} className="flex items-baseline gap-3">
                <span className="w-9 shrink-0">{d}</span>
                <span className="text-cream/65">{t.footer.hoursValues[i]}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 text-[11px] text-cream/45 leading-snug max-w-[160px]">{t.footer.hoursSameNote}</div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-cream/60">
          <div>© {new Date().getFullYear()} {t.footer.copyright}</div>
          <div className="flex gap-5">
            {t.footer.links.map(([l, id]) => (
              <a key={id} href={`#${id}`} className="hover:text-cream">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/* FLOATING BUTTONS                                                    */
/* ================================================================== */

function FloatingButtons() {
  const { t } = useLanguage();
  return (
    <div
      className="fixed right-4 sm:right-5 z-40 flex flex-col gap-2.5 sm:gap-3"
      style={{ bottom: "max(4.1rem, calc(env(safe-area-inset-bottom) + 3.7rem))" }}
    >
      <a
        href="https://wa.me/50496228396"
        target="_blank" rel="noopener"
        aria-label={t.aria.whatsappBtn}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-xl hover:scale-105 transition animate-floaty"
      >
        <Icon.Whats className="w-6 h-6 sm:w-7 sm:h-7"/>
      </a>
      <a
        href="https://maps.google.com/?q=Bean+Crazy+Cafe+West+End+Roatan"
        target="_blank" rel="noopener"
        aria-label={t.aria.directionsBtn}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-espresso text-cream grid place-items-center shadow-xl hover:scale-105 transition"
      >
        <Icon.Pin className="w-5 h-5 sm:w-6 sm:h-6"/>
      </a>
    </div>
  );
}

