import { useEffect, useMemo, useRef, useState } from "react";
import { IMG, IMG_REAL, MENU, REVIEWS } from "./data";

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
  Leaf: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 64 64" fill="none" {...p}>
      <path d="M32 4c-14 8-22 20-22 32 0 14 10 24 22 24s22-10 22-24C54 24 46 12 32 4z" fill="currentColor" opacity="0.15"/>
      <path d="M32 4c-14 8-22 20-22 32 0 14 10 24 22 24s22-10 22-24C54 24 46 12 32 4zM32 8c11 7 18 17 18 28M32 8v52M32 12c-9 6-14 15-14 24M22 30h10M20 40h12M24 48h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
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
};

/* ================================================================== */

export default function App() {
  useReveal();
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

  const links = [
    ["Story", "story"],
    ["Coffee", "coffee"],
    ["Breakfast", "breakfast"],
    ["Menu", "menu"],
    ["Vibes", "vibes"],
    ["Reviews", "reviews"],
    ["Gallery", "gallery"],
    ["Visit", "visit"],
  ];

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
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-10 h-16 md:h-20">
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-full bg-espresso text-cream grid place-items-center">
              <Icon.Bean className="w-5 h-5" />
            </span>
            <div className={`leading-none ${scrolled ? "text-espresso" : "text-cream"}`}>
              <div className="font-display font-semibold tracking-tight text-lg">Bean Crazy</div>
              <div className="text-[10px] uppercase tracking-[0.22em] opacity-70">Roatán · West End</div>
            </div>
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

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-espresso text-cream hover:bg-bark transition"
            >
              View Menu <Icon.Arrow className="w-4 h-4" />
            </a>
          </div>

          <button
            aria-label="Open menu"
            aria-expanded={navOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setNavOpen(true)}
            className={`lg:hidden ${scrolled ? "text-espresso" : "text-cream"}`}
          >
            <Icon.Menu className="w-7 h-7" />
          </button>
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
          aria-label="Site navigation"
          className={`absolute top-0 right-0 h-full w-[86%] max-w-sm bg-cream text-espresso p-8 transition-transform ${
            navOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-espresso text-cream grid place-items-center">
                <Icon.Bean className="w-5 h-5" />
              </span>
              <span className="font-display text-xl">Bean Crazy</span>
            </div>
            <button aria-label="Close" onClick={() => setNavOpen(false)}>
              <Icon.X className="w-7 h-7" />
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
          <a
            href="#menu"
            onClick={() => setNavOpen(false)}
            className="mt-8 inline-flex items-center gap-2 px-5 py-3 bg-espresso text-cream rounded-full"
          >
            View Menu <Icon.Arrow className="w-4 h-4" />
          </a>
          <div className="mt-10 text-sm opacity-70 leading-relaxed">
            West End Road · Half Moon Bay <br />
            Open daily · 7am – 5pm
          </div>
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

      {/* ============== BREAKFAST ============== */}
      <Breakfast />

      {/* ============== BAKERY ============== */}
      <Bakery />

      {/* ============== LUNCH ============== */}
      <Lunch />

      {/* ============== JUICES ============== */}
      <Juices />

      {/* ============== VIBES ============== */}
      <Vibes />

      {/* ============== MENU ============== */}
      <MenuSection />

      {/* ============== WHY TRAVELERS LOVE ============== */}
      <WhyLove />

      {/* ============== REVIEWS ============== */}
      <ReviewsSection />

      {/* ============== GALLERY ============== */}
      <Gallery />

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
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <img
        src={IMG.heroPour}
        alt="Barista pouring fresh espresso at Bean Crazy Roatán"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 hero-wash" />
      {/* palm silhouette */}
      <Icon.Leaf aria-hidden="true" className="absolute -left-6 top-16 md:top-24 w-40 md:w-64 text-sage/60 animate-swing hidden sm:block" />
      <Icon.Leaf aria-hidden="true" className="absolute -right-10 bottom-24 w-40 md:w-64 text-sage/50 animate-swing hidden sm:block" style={{ animationDelay: "-3s" }} />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-16 md:pb-24">
        <div className="max-w-3xl fade-up">
          <div className="inline-flex items-center gap-2 text-cream/90 text-xs md:text-sm tracking-[0.28em] uppercase mb-6">
            <Icon.Sun className="w-4 h-4" /> West End · Half Moon Bay · Roatán
          </div>
          <h1 className="font-display text-cream text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            Start your day
            <br />
            <em className="not-italic font-light italic-serif">the Roatán way.</em>
          </h1>
          <p className="mt-6 text-cream/85 text-base md:text-lg max-w-xl leading-relaxed">
            Fresh roasted Honduran coffee. Island breakfasts. Slow Caribbean mornings just steps from the water.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 bg-cream text-espresso px-6 py-3.5 rounded-full text-sm font-medium hover:bg-white transition"
            >
              View Menu <Icon.Arrow className="w-4 h-4" />
            </a>
            <a
              href="#visit"
              className="inline-flex items-center gap-2 border border-cream/60 text-cream px-6 py-3.5 rounded-full text-sm font-medium hover:bg-cream/10 transition"
            >
              <Icon.Pin className="w-4 h-4" /> Find Us
            </a>
          </div>
        </div>
      </div>

      {/* stats strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-cream/15 backdrop-blur-sm bg-espresso/25">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-wrap items-center justify-between gap-4 text-cream/90 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <div className="flex text-coral">
              {[...Array(5)].map((_, i) => <Icon.Star key={i} className="w-3.5 h-3.5" />)}
            </div>
            <span>4.6 · 341+ Tripadvisor reviews</span>
          </div>
          <div className="hidden md:block opacity-70">Ranked #26 of 215 restaurants in West End</div>
          <div className="opacity-80">Open daily · 7am – 5pm</div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* MARQUEE                                                             */
/* ================================================================== */

function Marquee() {
  const words = [
    "Fresh Roasted Honduran Coffee",
    "Island Breakfasts",
    "Half Moon Bay",
    "Best Cappuccino in West End",
    "Home-Baked Pastries",
    "Fresh Pressed Juice",
    "Ocean Views",
    "Roasted In-House",
  ];
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
  return (
    <section id="story" className="relative py-24 md:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-5 reveal">
          <div className="grid grid-cols-2 gap-4">
            <img src={IMG_REAL.interior} alt="Inside Bean Crazy Café, West End, Roatán" className="rounded-2xl aspect-[4/5] object-cover w-full" loading="lazy"/>
            <img src={IMG_REAL.breakfast} alt="Real breakfast plate served at Bean Crazy" className="rounded-2xl aspect-[4/5] object-cover w-full mt-10" loading="lazy"/>
            <img src={IMG.people2} alt="Friends enjoying coffee" className="rounded-2xl aspect-[4/5] object-cover w-full -mt-6" loading="lazy"/>
            <img src={IMG_REAL.lunch} alt="Real lunch plate served at Bean Crazy" className="rounded-2xl aspect-[4/5] object-cover w-full mt-4" loading="lazy"/>
          </div>
        </div>

        <div className="md:col-span-7 reveal">
          <div className="text-xs uppercase tracking-[0.28em] text-teal-deep mb-5">Our Story</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-espresso">
            More than a coffee shop. <br />
            <em className="text-sage-deep font-light italic">A morning ritual.</em>
          </h2>
          <div className="mt-8 space-y-5 text-espresso/80 text-lg leading-relaxed max-w-xl">
            <p>
              Bean Crazy started with a simple idea — good coffee, made with care, in a place worth
              lingering in. We roast our beans across the hall, sourced from small Honduran farms
              a few hours away by ferry, so what lands in your cup was likely still green a day or two ago.
            </p>
            <p>
              Mornings here move at island speed. The espresso machine hisses, the pastries come out
              warm, guests drift in from the beach still smelling of sunscreen, and by 9am half the
              room is on a first-name basis with our team.
            </p>
            <p>
              Some guests come once. Most come back the next morning. And plenty plan their whole
              Roatán trip around a table by the window and a cappuccino they've been thinking about
              all year.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
            {[
              ["4.6★", "Rating on Tripadvisor"],
              ["100%", "Honduran-grown beans"],
              ["7am", "Doors open daily"],
            ].map(([n, l]) => (
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
            <div className="text-xs uppercase tracking-[0.28em] text-clay mb-5">Fresh Roasted Honduran Coffee</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
              Roasted across the hall. <br/>
              <em className="italic font-light text-clay">Served with the sunrise.</em>
            </h2>
            <p className="mt-6 text-cream/75 text-lg leading-relaxed max-w-lg">
              Our beans come from small Honduran farms and are roasted right across the hall —
              a few steps from where you're sitting. No middlemen, no month-old bags, no
              compromise on the cup.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                ["Single-origin", "Small-lot Honduran arabica, roasted weekly in-house."],
                ["Whole bean & ground", "Take a bag home — most guests take two."],
                ["Coffee gifts", "Beautiful bags, mugs, and gift sets in our shop."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-clay shrink-0" />
                  <div>
                    <div className="font-medium text-cream">{t}</div>
                    <div className="text-cream/65 text-sm">{d}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#menu" className="inline-flex items-center gap-2 bg-cream text-espresso px-6 py-3 rounded-full text-sm hover:bg-white transition">
                Explore Coffee Menu <Icon.Arrow className="w-4 h-4" />
              </a>
              <a href="#visit" className="inline-flex items-center gap-2 border border-cream/40 px-6 py-3 rounded-full text-sm hover:bg-cream/10 transition">
                Take Beans Home
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
              <div className="text-xs uppercase tracking-widest opacity-60 mb-1">Today's Roast</div>
              <div className="font-display text-lg leading-tight">Honduran Single-Origin</div>
              <div className="text-xs mt-1 text-espresso/70">Roasted fresh, in-house</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* BREAKFAST                                                           */
/* ================================================================== */

function Breakfast() {
  const items = [
    { img: IMG_REAL.breakfast, name: "The Honduran", note: "Local favourite" },
    { img: IMG.breakfast1, name: "Half Moon Sandwich", note: "Chicken · bacon · avocado" },
    { img: IMG.breakfast3, name: "Roatán Avo Toast", note: "Poached · chili · lime" },
    { img: IMG.breakfast4, name: "Island Waffle", note: "Tropical fruit & cream" },
  ];
  return (
    <section id="breakfast" className="py-24 md:py-36 bg-linen">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 reveal">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-[0.28em] text-teal-deep mb-5">Breakfast Favourites</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-espresso">
              The reason people <br/>
              <em className="italic font-light text-teal-deep">set an alarm on vacation.</em>
            </h2>
          </div>
          <p className="max-w-md text-espresso/70 leading-relaxed">
            Served all day, because you're on island time. From proper Honduran plates to fluffy
            waffles and everything in between — nothing frozen, everything cooked to order.
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
      </div>
    </section>
  );
}

/* ================================================================== */
/* BAKERY                                                              */
/* ================================================================== */

function Bakery() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6 relative reveal">
          <img src={IMG.bakery3} alt="Bakery display" className="rounded-3xl w-full aspect-[5/6] object-cover" loading="lazy"/>
          <img src={IMG.bakery1} alt="Fresh pastries" className="hidden md:block absolute -right-8 -bottom-10 w-56 h-72 object-cover rounded-2xl shadow-2xl border-8 border-cream" loading="lazy"/>
        </div>
        <div className="md:col-span-6 md:pl-10 reveal">
          <div className="text-xs uppercase tracking-[0.28em] text-teal-deep mb-5">Fresh Bakery</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
            Baked before <em className="italic font-light text-sage-deep">the divers</em> even wake up.
          </h2>
          <p className="mt-6 text-espresso/75 text-lg leading-relaxed max-w-lg">
            Buttery croissants, warm cinnamon rolls, banana bread and the cookies our regulars come
            back for on the ferry ride home. Everything baked in small batches. Everything usually
            gone by noon.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[IMG.bakery2, IMG.bakery4, IMG.bakery1].map((src, i) => (
              <img key={i} src={src} alt="" className="aspect-square object-cover rounded-xl" loading="lazy"/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* LUNCH                                                               */
/* ================================================================== */

function Lunch() {
  return (
    <section className="py-24 md:py-32 bg-espresso text-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14 items-center">
        <div className="reveal">
          <div className="text-xs uppercase tracking-[0.28em] text-clay mb-5">Lunch</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
            Post-dive fuel. <br/>
            <em className="italic font-light text-clay">Beach-day burgers.</em>
          </h2>
          <p className="mt-6 text-cream/75 text-lg leading-relaxed max-w-lg">
            When breakfast quietly turns into lunch — fresh fish sandwiches, generous burgers, quinoa bowls
            and the fries our regulars swear by. Come hungry, leave in a hammock.
          </p>
          <a href="#menu" className="mt-8 inline-flex items-center gap-2 bg-cream text-espresso px-6 py-3 rounded-full text-sm hover:bg-white transition">
            See Lunch Menu <Icon.Arrow className="w-4 h-4"/>
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 reveal">
          <img src={IMG.lunch1} alt="Burger" className="rounded-2xl aspect-[4/5] object-cover w-full" loading="lazy"/>
          <img src={IMG.lunch2} alt="Lunch plate" className="rounded-2xl aspect-[4/5] object-cover w-full mt-10" loading="lazy"/>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* JUICES                                                              */
/* ================================================================== */

function Juices() {
  const j = [
    { img: IMG.juice4, name: "Fresh Pressed", sub: "Orange · Pineapple · Watermelon" },
    { img: IMG.juice1, name: "Funky Monkey", sub: "The one everyone Instagrams" },
    { img: IMG.juice2, name: "Mango Sunrise", sub: "Tropical, cold, sunny" },
    { img: IMG.juice5, name: "Watermelon Lime", sub: "Most refreshing on island" },
  ];
  return (
    <section className="py-24 md:py-32 bg-linen">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl reveal">
          <div className="text-xs uppercase tracking-[0.28em] text-teal-deep mb-5">Fresh Juice & Smoothies</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-espresso">
            Pressed to order. <em className="italic font-light text-teal-deep">Sipped by the sea.</em>
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {j.map((it, i) => (
            <div key={i} className="reveal group" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="overflow-hidden rounded-3xl aspect-[3/4] bg-sand">
                <img src={it.img} alt={it.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700"/>
              </div>
              <div className="mt-4">
                <div className="font-display text-xl text-espresso">{it.name}</div>
                <div className="text-xs uppercase tracking-widest text-espresso/60 mt-1">{it.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* VIBES                                                               */
/* ================================================================== */

function Vibes() {
  return (
    <section id="vibes" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMG.beach1} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-deep/70 via-teal-deep/40 to-teal-deep/80" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 text-center text-cream reveal">
        <div className="text-xs uppercase tracking-[0.32em] text-cream/80 mb-6">Oceanfront Island Vibes</div>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.98] tracking-tight">
          The Caribbean is <br/>
          <em className="italic font-light">right outside the door.</em>
        </h2>
        <p className="mt-8 text-cream/85 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Half Moon Bay is a two-minute walk from your table. Warm sand between coffee refills.
          A sunbed on the beach after your third cappuccino. Somehow, no one's ever in a hurry.
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
/* MENU                                                                */
/* ================================================================== */

function MenuSection() {
  const [active, setActive] = useState(MENU[0].id);
  const cat = useMemo(() => MENU.find((c) => c.id === active)!, [active]);

  return (
    <section id="menu" className="py-24 md:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 reveal">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-teal-deep mb-5">The Menu</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-espresso">
              Everything, on <em className="italic font-light text-sage-deep">island time.</em>
            </h2>
          </div>
          <p className="text-espresso/70 max-w-sm">
            Prices in Honduran Lempira (L). USD accepted. Breakfast served all day.
          </p>
        </div>

        {/* Tabs */}
        <div className="reveal">
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 pb-2">
            {MENU.map((c) => {
              const on = c.id === active;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`shrink-0 px-5 py-2.5 rounded-full text-sm border transition ${
                    on
                      ? "bg-espresso text-cream border-espresso"
                      : "bg-transparent text-espresso/80 border-espresso/15 hover:border-espresso/40"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-12 gap-10 md:gap-14">
          <div className="md:col-span-5 reveal">
            <div className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-sand">
              <img key={cat.image} src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                <div className="font-display text-3xl">{cat.label}</div>
                <div className="text-cream/85 text-sm mt-1">{cat.blurb}</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 reveal">
            <ul className="divide-y divide-espresso/10">
              {cat.items.map((it) => (
                <li key={it.name} className="py-5 flex items-start gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="font-display text-xl md:text-2xl text-espresso">{it.name}</div>
                      {it.tag && (
                        <span className="text-[10px] uppercase tracking-widest bg-sage/20 text-sage-deep px-2 py-0.5 rounded-full">
                          {it.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-espresso/70 text-sm mt-1 leading-relaxed">{it.desc}</p>
                  </div>
                  <div className="font-display text-lg text-espresso whitespace-nowrap pt-1">{it.price}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* WHY LOVE                                                            */
/* ================================================================== */

function WhyLove() {
  const items = [
    { n: "01", t: "Freshest coffee on the island", d: "Roasted a few steps from your cup. Small Honduran farms, small-batch roasts." },
    { n: "02", t: "The breakfast people plan around", d: "Baleadas, benedicts, avocado toast, waffles. All-day. All excellent." },
    { n: "03", t: "The staff people rebook to see", d: "Ask any regular — Angie, Jackson, Jenny, Rhianna. They make the place." },
    { n: "04", t: "Right on Half Moon Bay", d: "Two minutes to the sand, with an ocean breeze that's always included." },
    { n: "05", t: "A/C when the island gets hot", d: "Cool inside, warm hospitality. The best of both." },
    { n: "06", t: "A vacation tradition", d: "Multi-year regulars. First-timers who rebook before flying home. That kind of place." },
  ];
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl reveal">
          <div className="text-xs uppercase tracking-[0.28em] text-teal-deep mb-5">Why Travelers Love Bean Crazy</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-espresso">
            Six reasons you'll <em className="italic font-light text-teal-deep">come back tomorrow.</em>
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((it, i) => (
            <div
              key={it.n}
              className="reveal p-8 rounded-3xl bg-linen border border-espresso/5 hover:border-sage/40 transition"
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
  const scroller = useRef<HTMLDivElement | null>(null);
  const scroll = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };
  return (
    <section id="reviews" className="py-24 md:py-32 bg-linen">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between gap-4 mb-10 reveal">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-teal-deep mb-5">Reviews</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-espresso max-w-xl">
              Loved by locals. <em className="italic font-light text-sage-deep">Missed by travelers.</em>
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button aria-label="Prev" onClick={() => scroll(-1)} className="w-11 h-11 rounded-full border border-espresso/20 grid place-items-center hover:bg-espresso hover:text-cream transition">
              <Icon.Arrow className="w-4 h-4 rotate-180" />
            </button>
            <button aria-label="Next" onClick={() => scroll(1)} className="w-11 h-11 rounded-full border border-espresso/20 grid place-items-center hover:bg-espresso hover:text-cream transition">
              <Icon.Arrow className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-6 text-sm text-espresso/70 reveal">
          <div className="flex items-center gap-2">
            <div className="flex text-coral">
              {[...Array(5)].map((_, i) => <Icon.Star key={i} className="w-4 h-4"/>)}
            </div>
            <span><strong className="text-espresso">4.6</strong> on Tripadvisor · 341 reviews</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex text-coral">
              {[...Array(5)].map((_, i) => <Icon.Star key={i} className="w-4 h-4"/>)}
            </div>
            <span>Also loved on Google</span>
          </div>
        </div>

        <div
          ref={scroller}
          className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 pb-4"
        >
          {REVIEWS.map((r, i) => (
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
/* GALLERY                                                             */
/* ================================================================== */

function Gallery() {
  const shots = [
    IMG.pouring, IMG_REAL.breakfast, IMG.beans1, IMG.interior3,
    IMG.latteArt, IMG_REAL.dinner, IMG.beach2, IMG.people1,
    IMG.espresso, IMG_REAL.lunch, IMG.interior5, IMG.juice1,
  ];
  return (
    <section id="gallery" className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 reveal">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-teal-deep mb-5">The Gallery</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-espresso max-w-xl">
              A morning at Bean Crazy, <em className="italic font-light text-sage-deep">in pictures.</em>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/beancrazyroatan/"
            target="_blank"
            rel="noopener"
            className="text-sm underline underline-offset-4 hover:text-teal-deep"
          >
            Follow on Instagram →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
          {shots.map((src, i) => {
            // create a mosaic pattern
            const spans = [
              "row-span-2", "", "", "row-span-2",
              "", "row-span-2", "", "",
              "row-span-2", "", "row-span-2", "",
            ];
            return (
              <div key={i} className={`reveal overflow-hidden rounded-2xl ${spans[i] || ""}`} style={{ transitionDelay: `${i * 40}ms` }}>
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* VISIT                                                               */
/* ================================================================== */

function Visit() {
  return (
    <section id="visit" className="py-24 md:py-32 bg-espresso text-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-16 items-start">
        <div className="reveal">
          <div className="text-xs uppercase tracking-[0.28em] text-clay mb-5">Visit Us</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
            Come find your <em className="italic font-light text-clay">table by the window.</em>
          </h2>
          <p className="mt-6 text-cream/75 text-lg leading-relaxed max-w-lg">
            Right on West End Road, between Carlito's Wave Inn and the Tucán Gift Shop,
            steps from Half Moon Bay.
          </p>

          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-lg">
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-cream/50 mb-2">Address</dt>
              <dd className="leading-relaxed">
                West End Road<br/>
                Half Moon Bay<br/>
                West End, Roatán 34101<br/>
                Bay Islands, Honduras
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-cream/50 mb-2">Hours</dt>
              <dd className="leading-relaxed">
                Open daily · 7am – 5pm<br/>
                <span className="text-cream/60">Breakfast served all day</span>
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-cream/50 mb-2">Phone / WhatsApp</dt>
              <dd><a href="tel:+50496228396" className="hover:text-clay">+504 9622-8396</a></dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-cream/50 mb-2">Email</dt>
              <dd><a href="mailto:bcrazyraotan@gmail.com" className="hover:text-clay">bcrazyraotan@gmail.com</a></dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="https://maps.google.com/?q=Bean+Crazy+Cafe+West+End+Roatan"
              target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 bg-cream text-espresso px-6 py-3 rounded-full text-sm hover:bg-white transition"
            >
              <Icon.Pin className="w-4 h-4"/> Get Directions
            </a>
            <a
              href="https://wa.me/50496228396"
              target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 border border-cream/40 px-6 py-3 rounded-full text-sm hover:bg-cream/10 transition"
            >
              <Icon.Whats className="w-4 h-4"/> WhatsApp Us
            </a>
          </div>
        </div>

        <div className="reveal rounded-3xl overflow-hidden border border-cream/10 aspect-[4/5] md:aspect-auto md:h-[620px]">
          <iframe
            title="Bean Crazy on the map"
            src="https://www.google.com/maps?q=Bean+Crazy+Cafe+West+End+Roatan&output=embed"
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
  return (
    <footer className="bg-bark text-cream/85">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-cream text-espresso grid place-items-center">
              <Icon.Bean className="w-5 h-5"/>
            </span>
            <div>
              <div className="font-display text-2xl text-cream">Bean Crazy</div>
              <div className="text-[10px] uppercase tracking-[0.22em] opacity-70">Roatán · West End</div>
            </div>
          </div>
          <p className="mt-6 max-w-md leading-relaxed">
            Fresh roasted Honduran coffee, island breakfasts and slow Caribbean mornings on
            Half Moon Bay, West End, Roatán. More than a coffee shop — a Roatán tradition.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              ["Instagram", "https://www.instagram.com/beancrazyroatan/"],
              ["Facebook", "https://www.facebook.com/BeanCrazyRoatan"],
              ["Tripadvisor", "https://www.tripadvisor.com/Restaurant_Review-g303875-d11946248-Reviews-Bean_Crazy_Cafe_Breasfast-West_End_Roatan_Bay_Islands.html"],
            ].map(([n, u]) => (
              <a key={n} href={u} target="_blank" rel="noopener" className="px-4 py-2 text-xs uppercase tracking-widest border border-cream/25 rounded-full hover:bg-cream hover:text-espresso transition">
                {n}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-widest text-cream/50 mb-4">Visit</div>
          <ul className="space-y-2 leading-relaxed">
            <li>West End Road</li>
            <li>Half Moon Bay</li>
            <li>West End, Roatán 34101</li>
            <li>Honduras</li>
            <li className="pt-3"><a className="hover:text-cream" href="tel:+50496228396">+504 9622-8396</a></li>
            <li><a className="hover:text-cream" href="mailto:bcrazyraotan@gmail.com">bcrazyraotan@gmail.com</a></li>
          </ul>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-widest text-cream/50 mb-4">Hours</div>
          <ul className="space-y-1.5">
            <li className="flex justify-between"><span>Mon</span><span>7 – 5</span></li>
            <li className="flex justify-between"><span>Tue</span><span>7 – 5</span></li>
            <li className="flex justify-between"><span>Wed</span><span>7 – 5</span></li>
            <li className="flex justify-between"><span>Thu</span><span>7 – 5</span></li>
            <li className="flex justify-between"><span>Fri</span><span>7 – 5</span></li>
            <li className="flex justify-between"><span>Sat</span><span>7 – 5</span></li>
            <li className="flex justify-between"><span>Sun</span><span>7 – 5</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-cream/60">
          <div>© {new Date().getFullYear()} Bean Crazy Café & Breakfast · West End, Roatán</div>
          <div className="flex gap-5">
            <a href="#story" className="hover:text-cream">Story</a>
            <a href="#menu" className="hover:text-cream">Menu</a>
            <a href="#reviews" className="hover:text-cream">Reviews</a>
            <a href="#visit" className="hover:text-cream">Visit</a>
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
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/50496228396"
        target="_blank" rel="noopener"
        aria-label="WhatsApp Bean Crazy"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-xl hover:scale-105 transition animate-floaty"
      >
        <Icon.Whats className="w-7 h-7"/>
      </a>
      <a
        href="https://maps.google.com/?q=Bean+Crazy+Cafe+West+End+Roatan"
        target="_blank" rel="noopener"
        aria-label="Directions to Bean Crazy"
        className="w-14 h-14 rounded-full bg-espresso text-cream grid place-items-center shadow-xl hover:scale-105 transition"
      >
        <Icon.Pin className="w-6 h-6"/>
      </a>
    </div>
  );
}
