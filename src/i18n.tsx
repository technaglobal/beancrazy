import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

/* ================================================================== */
/* CONTENT DICTIONARY                                                  */
/* ================================================================== */

export type Lang = "en" | "es";

export interface Content {
  nav: { links: [string, string][]; cta: string };
  drawer: { hours: string; hours2: string };
  hero: {
    kicker: string; h1a: string; h1b: string; sub: string;
    ctaPrimary: string; ctaSecondary: string; stat1: string; stat2: string; stat3: string;
  };
  marquee: string[];
  story: { kicker: string; h2a: string; h2b: string; p: string[]; stats: [string, string][] };
  coffee: {
    kicker: string; h2a: string; h2b: string; p: string;
    features: [string, string][]; cta1: string; cta2: string;
    badgeKicker: string; badgeTitle: string; badgeSub: string;
  };
  favorites: {
    kicker: string; h2a: string; h2b: string; p: string;
    items: { name: string; note: string }[]; footer: string;
  };
  vibes: { kicker: string; h2a: string; h2b: string; p: string };
  whyLove: { kicker: string; h2a: string; h2b: string; items: { t: string; d: string }[] };
  reviews: {
    kicker: string; h2a: string; h2b: string; statTripadvisor: string; statGoogle: string;
    prev: string; next: string;
    items: { source: string; rating: number; author: string; location: string; text: string }[];
  };
  visit: {
    kicker: string; h2a: string; h2b: string; p: string;
    addressLabel: string; address: string[]; hoursLabel: string; hours: string[]; hoursNote: string;
    phoneLabel: string; emailLabel: string; directions: string; whatsapp: string; mapTitle: string;
  };
  footer: {
    area: string; tagline: string; visitLabel: string; address: string[]; hoursLabel: string;
    days: string[]; hoursValues: string[]; copyright: string; links: [string, string][];
  };
  aria: {
    openMenu: string; closeMenu: string; siteNav: string; whatsappBtn: string; directionsBtn: string;
    langToggle: string; langEn: string; langEs: string;
  };
}

const content: Record<Lang, Content> = {
  en: {
    nav: {
      links: [
        ["Story", "story"],
        ["Coffee", "coffee"],
        ["Favorites", "favorites"],
        ["Vibes", "vibes"],
        ["Reviews", "reviews"],
        ["Visit", "visit"],
      ] as [string, string][],
      cta: "See What's Inside",
    },
    drawer: {
      hours: "West End Road · Half Moon Bay",
      hours2: "Mon–Sat 7am–5pm · Sun 7am–2pm",
    },
    hero: {
      kicker: "West End · Half Moon Bay · Roatán",
      h1a: "Start your day",
      h1b: "the Roatán way.",
      sub: "Fresh roasted Honduran coffee. Island breakfasts. Slow Caribbean mornings just steps from the water.",
      ctaPrimary: "See What's Inside",
      ctaSecondary: "Find Us",
      stat1: "4.6 · 341+ Tripadvisor reviews",
      stat2: "Ranked #26 of 215 restaurants in West End",
      stat3: "Mon–Sat 7am–5pm · Sun 7am–2pm",
    },
    marquee: [
      "Fresh Roasted Honduran Coffee",
      "Island Breakfasts",
      "Half Moon Bay",
      "Best Cappuccino in West End",
      "Home-Baked Pastries",
      "Fresh Pressed Juice",
      "Ocean Views",
      "Roasted In-House",
    ],
    story: {
      kicker: "Our Story",
      h2a: "More than a coffee shop.",
      h2b: "A morning ritual.",
      p: [
        "Bean Crazy started with a simple idea — good coffee, made with care, in a place worth lingering in. We roast our beans across the hall, sourced from small Honduran farms a few hours away by ferry, so what lands in your cup was likely still green a day or two ago.",
        "Mornings here move at island speed. The espresso machine hisses, the pastries come out warm, guests drift in from the beach still smelling of sunscreen, and by 9am half the room is on a first-name basis with our team.",
        "Some guests come once. Most come back the next morning. And plenty plan their whole Roatán trip around a table by the window and a cappuccino they've been thinking about all year.",
      ],
      stats: [
        ["4.6★", "Rating on Tripadvisor"],
        ["100%", "Honduran-grown beans"],
        ["7am", "Doors open daily"],
      ] as [string, string][],
    },
    coffee: {
      kicker: "Fresh Roasted Honduran Coffee",
      h2a: "Roasted across the hall.",
      h2b: "Served with the sunrise.",
      p: "Our beans come from small Honduran farms and are roasted right across the hall — a few steps from where you're sitting. No middlemen, no month-old bags, no compromise on the cup.",
      features: [
        ["Single-origin", "Small-lot Honduran arabica, roasted weekly in-house."],
        ["Whole bean & ground", "Take a bag home — roasted on site, from $12/lb."],
        ["Coffee gifts", "Beautiful bags, mugs, and gift sets in our shop."],
      ] as [string, string][],
      cta1: "See What's Inside",
      cta2: "Take Beans Home",
      badgeKicker: "Today's Roast",
      badgeTitle: "Honduran Single-Origin",
      badgeSub: "Roasted fresh, in-house",
    },
    favorites: {
      kicker: "What People Come Back For",
      h2a: "The reason people",
      h2b: "set an alarm on vacation.",
      p: "Reviewers keep mentioning the same things: hearty Honduran breakfast plates, good burgers and sandwiches, and fresh-baked treats that don't last past noon.",
      items: [
        { name: "Honduran Breakfast Plates", note: "Huevos rancheros, baleadas & more" },
        { name: "Waffles & Classics", note: "All-day breakfast favourites" },
        { name: "Burgers & Sandwiches", note: "Guest-favourite lunch plates" },
        { name: "Fresh-Baked Daily", note: "Banana bread, cinnamon rolls, cookies" },
      ],
      footer: "Full menu and current prices available in-house — ask your server.",
    },
    vibes: {
      kicker: "Oceanfront Island Vibes",
      h2a: "The Caribbean is",
      h2b: "right outside the door.",
      p: "Half Moon Bay is a two-minute walk from your table. Warm sand between coffee refills. A sunbed on the beach after your third cappuccino. Somehow, no one's ever in a hurry.",
    },
    whyLove: {
      kicker: "Why Travelers Love Bean Crazy",
      h2a: "Six reasons you'll",
      h2b: "come back tomorrow.",
      items: [
        { t: "Freshest coffee on the island", d: "Roasted a few steps from your cup. Small Honduran farms, small-batch roasts." },
        { t: "The breakfast people plan around", d: "Baleadas, benedicts, avocado toast, waffles. All-day. All excellent." },
        { t: "The staff people rebook to see", d: "Ask any regular — Angie, Jackson, Jenny, Rhianna. They make the place." },
        { t: "Right on Half Moon Bay", d: "Two minutes to the sand, with an ocean breeze that's always included." },
        { t: "A/C when the island gets hot", d: "Cool inside, warm hospitality. The best of both." },
        { t: "A vacation tradition", d: "Multi-year regulars. First-timers who rebook before flying home. That kind of place." },
      ],
    },
    reviews: {
      kicker: "Reviews",
      h2a: "Loved by locals.",
      h2b: "Missed by travelers.",
      statTripadvisor: "on Tripadvisor · 341 reviews",
      statGoogle: "Also loved on Google · 4.4 · 479 reviews",
      prev: "Prev",
      next: "Next",
      items: [
        { source: "Tripadvisor", rating: 5, author: "Angie's regulars", location: "West End, Roatán", text: "Consistently the best breakfast we've had on the island — great atmosphere, and Angie makes every visit feel personal." },
        { source: "Tripadvisor", rating: 5, author: "A weekly regular", location: "Local · Roatán", text: "We come back again and again. The food keeps us loyal, and the whole team treats us like family." },
        { source: "Tripadvisor", rating: 5, author: "Long-time guest", location: "New York, USA", text: "We've stayed at the hotel above Bean Crazy for years running. Jackson and the team are consistently courteous and attentive." },
        { source: "Google", rating: 5, author: "A rainy-day visitor", location: "Traveler review", text: "First stop after landing in a downpour — an iced coffee, a cookie, and an unbeatable view of the beach while the rain passed." },
        { source: "Tripadvisor", rating: 5, author: "Diver on a coffee run", location: "Houston, USA", text: "Ate breakfast here most mornings before diving — the menu was solid and the iced latte was excellent every time." },
        { source: "Tripadvisor", rating: 5, author: "Repeat traveler", location: "Portland, USA", text: "They roast the beans right across the hall, so \"fresh\" barely covers it — Amy, Joab and Tennille are the real reason we kept coming back." },
        { source: "Google", rating: 5, author: "Cappuccino fan", location: "West End visitor", text: "Tried cappuccinos all over West End — this is the one that stuck. Fair pricing too, with nothing hidden." },
        { source: "Tripadvisor", rating: 5, author: "First-timer", location: "Traveler review", text: "Didn't expect much walking in, but the decor and menu covered every craving — this is far more than a coffee shop." },
      ],
    },
    visit: {
      kicker: "Visit Us",
      h2a: "Come find your",
      h2b: "table by the window.",
      p: "Right on West End Road, between Carlito's Wave Inn and the Tucán Gift Shop, steps from Half Moon Bay.",
      addressLabel: "Address",
      address: ["West End Road", "Half Moon Bay", "West End, Roatán 34101", "Bay Islands, Honduras"],
      hoursLabel: "Hours",
      hours: ["Mon–Sat · 7am – 5pm", "Sun · 7am – 2pm"],
      hoursNote: "Breakfast served all day",
      phoneLabel: "Phone / WhatsApp",
      emailLabel: "Email",
      directions: "Get Directions",
      whatsapp: "WhatsApp Us",
      mapTitle: "Bean Crazy on the map",
    },
    footer: {
      area: "Roatán · West End",
      tagline: "Fresh roasted Honduran coffee, island breakfasts and slow Caribbean mornings on Half Moon Bay, West End, Roatán. More than a coffee shop — a Roatán tradition.",
      visitLabel: "Visit",
      address: ["West End Road", "Half Moon Bay", "West End, Roatán 34101", "Honduras"],
      hoursLabel: "Hours",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      hoursValues: ["7 – 5", "7 – 5", "7 – 5", "7 – 5", "7 – 5", "7 – 5", "7 – 2"],
      copyright: "Bean Crazy Café & Breakfast · West End, Roatán",
      links: [
        ["Story", "story"],
        ["Favorites", "favorites"],
        ["Reviews", "reviews"],
        ["Visit", "visit"],
      ] as [string, string][],
    },
    aria: {
      openMenu: "Open menu",
      closeMenu: "Close",
      siteNav: "Site navigation",
      whatsappBtn: "WhatsApp Bean Crazy",
      directionsBtn: "Directions to Bean Crazy",
      langToggle: "Choose language",
      langEn: "Switch to English",
      langEs: "Switch to Spanish",
    },
  },

  es: {
    nav: {
      links: [
        ["Historia", "story"],
        ["Café", "coffee"],
        ["Favoritos", "favorites"],
        ["Ambiente", "vibes"],
        ["Reseñas", "reviews"],
        ["Visítanos", "visit"],
      ] as [string, string][],
      cta: "Ver el Menú",
    },
    drawer: {
      hours: "West End Road · Half Moon Bay",
      hours2: "Lun–Sáb 7am–5pm · Dom 7am–2pm",
    },
    hero: {
      kicker: "West End · Half Moon Bay · Roatán",
      h1a: "Empieza tu día",
      h1b: "a la manera de Roatán.",
      sub: "Café hondureño recién tostado. Desayunos isleños. Mañanas caribeñas tranquilas, a pasos del mar.",
      ctaPrimary: "Ver el Menú",
      ctaSecondary: "Cómo Llegar",
      stat1: "4.6 · Más de 341 reseñas en Tripadvisor",
      stat2: "Puesto #26 de 215 restaurantes en West End",
      stat3: "Lun–Sáb 7am–5pm · Dom 7am–2pm",
    },
    marquee: [
      "Café Hondureño Recién Tostado",
      "Desayunos Isleños",
      "Half Moon Bay",
      "El Mejor Capuchino de West End",
      "Repostería Casera",
      "Jugos Naturales",
      "Vista al Mar",
      "Tostado en Casa",
    ],
    story: {
      kicker: "Nuestra Historia",
      h2a: "Más que una cafetería.",
      h2b: "Un ritual matutino.",
      p: [
        "Bean Crazy nació de una idea simple: buen café, hecho con cuidado, en un lugar donde vale la pena quedarse. Tostamos nuestros granos al otro lado del salón, provenientes de pequeñas fincas hondureñas a pocas horas en ferry, así que lo que llega a tu taza probablemente estaba verde apenas uno o dos días antes.",
        "Las mañanas aquí se mueven al ritmo de la isla. La máquina de espresso silba, la repostería sale caliente, los huéspedes llegan desde la playa todavía con olor a bloqueador solar, y para las 9am medio salón ya conoce a nuestro equipo por su nombre.",
        "Algunos huéspedes vienen una sola vez. La mayoría regresa a la mañana siguiente. Y muchos planean todo su viaje a Roatán alrededor de una mesa junto a la ventana y un capuchino que han estado imaginando todo el año.",
      ],
      stats: [
        ["4.6★", "Calificación en Tripadvisor"],
        ["100%", "Granos cultivados en Honduras"],
        ["7am", "Abrimos todos los días"],
      ] as [string, string][],
    },
    coffee: {
      kicker: "Café Hondureño Recién Tostado",
      h2a: "Tostado al otro lado del salón.",
      h2b: "Servido con el amanecer.",
      p: "Nuestros granos vienen de pequeñas fincas hondureñas y se tuestan justo al otro lado del salón, a pocos pasos de donde estás sentado. Sin intermediarios, sin bolsas de un mes, sin comprometer la calidad de la taza.",
      features: [
        ["Origen único", "Arábica hondureño de lote pequeño, tostado semanalmente en casa."],
        ["Grano entero y molido", "Llévate una bolsa a casa — tostado en el local, desde $12/lb."],
        ["Regalos de café", "Hermosas bolsas, tazas y sets de regalo en nuestra tienda."],
      ] as [string, string][],
      cta1: "Ver el Menú",
      cta2: "Llévate Café a Casa",
      badgeKicker: "Tueste de Hoy",
      badgeTitle: "Origen Único Hondureño",
      badgeSub: "Tostado fresco, en casa",
    },
    favorites: {
      kicker: "Por Qué la Gente Regresa",
      h2a: "La razón por la que la gente",
      h2b: "pone alarma en sus vacaciones.",
      p: "Los reseñadores mencionan lo mismo una y otra vez: platos de desayuno hondureño abundantes, buenas hamburguesas y sándwiches, y repostería recién horneada que no dura hasta el mediodía.",
      items: [
        { name: "Platos de Desayuno Hondureño", note: "Huevos rancheros, baleadas y más" },
        { name: "Waffles y Clásicos", note: "Favoritos de desayuno todo el día" },
        { name: "Hamburguesas y Sándwiches", note: "Los platos de almuerzo favoritos" },
        { name: "Horneado Fresco a Diario", note: "Pan de banano, rollos de canela, galletas" },
      ],
      footer: "Menú completo y precios actuales disponibles en el local — pregúntale a tu mesero.",
    },
    vibes: {
      kicker: "Ambiente Frente al Mar",
      h2a: "El Caribe está",
      h2b: "justo afuera de la puerta.",
      p: "Half Moon Bay está a dos minutos caminando desde tu mesa. Arena tibia entre recargas de café. Una tumbona en la playa después de tu tercer capuchino. De alguna manera, nadie tiene prisa nunca.",
    },
    whyLove: {
      kicker: "Por Qué los Viajeros Aman Bean Crazy",
      h2a: "Seis razones por las que",
      h2b: "regresarás mañana.",
      items: [
        { t: "El café más fresco de la isla", d: "Tostado a pocos pasos de tu taza. Pequeñas fincas hondureñas, tuestes en lotes pequeños." },
        { t: "El desayuno alrededor del cual todos planean", d: "Baleadas, benedictinos, tostadas de aguacate, waffles. Todo el día. Todo excelente." },
        { t: "El personal por el que la gente vuelve a reservar", d: "Pregúntale a cualquier cliente frecuente — Angie, Jackson, Jenny, Rhianna. Ellos hacen el lugar." },
        { t: "Justo en Half Moon Bay", d: "A dos minutos de la arena, con una brisa marina que siempre está incluida." },
        { t: "Aire acondicionado cuando la isla se calienta", d: "Fresco por dentro, hospitalidad cálida. Lo mejor de ambos mundos." },
        { t: "Una tradición vacacional", d: "Clientes fieles desde hace años. Primerizos que reservan de nuevo antes de volar a casa. Ese tipo de lugar." },
      ],
    },
    reviews: {
      kicker: "Reseñas",
      h2a: "Amado por los locales.",
      h2b: "Extrañado por los viajeros.",
      statTripadvisor: "en Tripadvisor · 341 reseñas",
      statGoogle: "También en Google · 4.4 · 479 reseñas",
      prev: "Anterior",
      next: "Siguiente",
      items: [
        { source: "Tripadvisor", rating: 5, author: "Clientes habituales de Angie", location: "West End, Roatán", text: "Sistemáticamente el mejor desayuno que hemos tenido en la isla — un ambiente excelente, y Angie hace que cada visita se sienta personal." },
        { source: "Tripadvisor", rating: 5, author: "Cliente semanal habitual", location: "Local · Roatán", text: "Volvemos una y otra vez. La comida nos mantiene fieles, y todo el equipo nos trata como familia." },
        { source: "Tripadvisor", rating: 5, author: "Huésped de muchos años", location: "Nueva York, EE. UU.", text: "Nos hemos hospedado en el hotel arriba de Bean Crazy por años consecutivos. Jackson y el equipo son siempre corteses y atentos." },
        { source: "Google", rating: 5, author: "Visitante de día lluvioso", location: "Reseña de viajero", text: "La primera parada tras aterrizar en medio de un aguacero — un café helado, una galleta, y una vista inmejorable de la playa mientras pasaba la lluvia." },
        { source: "Tripadvisor", rating: 5, author: "Buzo en pausa para café", location: "Houston, EE. UU.", text: "Desayunamos aquí casi todas las mañanas antes de bucear — el menú era sólido y el latte helado era excelente cada vez." },
        { source: "Tripadvisor", rating: 5, author: "Viajero recurrente", location: "Portland, EE. UU.", text: "Tuestan los granos justo al otro lado del salón, así que \"fresco\" se queda corto — Amy, Joab y Tennille son la verdadera razón por la que seguimos regresando." },
        { source: "Google", rating: 5, author: "Fan del capuchino", location: "Visitante de West End", text: "Probamos capuchinos por todo West End — este fue el que se quedó con nosotros. Precios justos también, sin nada oculto." },
        { source: "Tripadvisor", rating: 5, author: "Primera vez", location: "Reseña de viajero", text: "No esperábamos mucho al entrar, pero la decoración y el menú cubrieron todos los antojos — esto es mucho más que una cafetería." },
      ],
    },
    visit: {
      kicker: "Visítanos",
      h2a: "Ven a encontrar tu",
      h2b: "mesa junto a la ventana.",
      p: "Justo en West End Road, entre Carlito's Wave Inn y Tucán Gift Shop, a pasos de Half Moon Bay.",
      addressLabel: "Dirección",
      address: ["West End Road", "Half Moon Bay", "West End, Roatán 34101", "Islas de la Bahía, Honduras"],
      hoursLabel: "Horario",
      hours: ["Lun–Sáb · 7am – 5pm", "Dom · 7am – 2pm"],
      hoursNote: "Desayuno servido todo el día",
      phoneLabel: "Teléfono / WhatsApp",
      emailLabel: "Correo Electrónico",
      directions: "Cómo Llegar",
      whatsapp: "Escríbenos por WhatsApp",
      mapTitle: "Bean Crazy en el mapa",
    },
    footer: {
      area: "Roatán · West End",
      tagline: "Café hondureño recién tostado, desayunos isleños y mañanas caribeñas tranquilas en Half Moon Bay, West End, Roatán. Más que una cafetería — una tradición de Roatán.",
      visitLabel: "Visítanos",
      address: ["West End Road", "Half Moon Bay", "West End, Roatán 34101", "Honduras"],
      hoursLabel: "Horario",
      days: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
      hoursValues: ["7 – 5", "7 – 5", "7 – 5", "7 – 5", "7 – 5", "7 – 5", "7 – 2"],
      copyright: "Bean Crazy Café & Breakfast · West End, Roatán",
      links: [
        ["Historia", "story"],
        ["Favoritos", "favorites"],
        ["Reseñas", "reviews"],
        ["Visítanos", "visit"],
      ] as [string, string][],
    },
    aria: {
      openMenu: "Abrir menú",
      closeMenu: "Cerrar",
      siteNav: "Navegación del sitio",
      whatsappBtn: "WhatsApp de Bean Crazy",
      directionsBtn: "Cómo llegar a Bean Crazy",
      langToggle: "Elegir idioma",
      langEn: "Cambiar a inglés",
      langEs: "Cambiar a español",
    },
  },
} as const;

/* ================================================================== */
/* CONTEXT + PROVIDER                                                  */
/* ================================================================== */

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Content;
} | null>(null);

const STORAGE_KEY = "bc-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") return saved;
    return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

  const value = useMemo(() => ({ lang, setLang, t: content[lang] }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

/* ================================================================== */
/* FLAGS                                                               */
/* ================================================================== */

function FlagUS(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" {...p}>
      <clipPath id="us-circle">
        <circle cx="16" cy="16" r="16" />
      </clipPath>
      <g clipPath="url(#us-circle)">
        <rect width="32" height="32" fill="#B22234" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} y={i * 4.92 + 2.46} width="32" height="2.46" fill="#fff" />
        ))}
        <rect width="14" height="17.5" fill="#3C3B6E" />
        {Array.from({ length: 18 }).map((_, i) => {
          const row = Math.floor(i / 3);
          const col = i % 3;
          return (
            <circle
              key={i}
              cx={2.6 + col * 4.6 + (row % 2 === 1 ? 2.3 : 0)}
              cy={2.2 + row * 2.9}
              r="0.7"
              fill="#fff"
            />
          );
        })}
      </g>
    </svg>
  );
}

function FlagHN(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" {...p}>
      <clipPath id="hn-circle">
        <circle cx="16" cy="16" r="16" />
      </clipPath>
      <g clipPath="url(#hn-circle)">
        <rect width="32" height="10.67" y="0" fill="#0073CF" />
        <rect width="32" height="10.67" y="10.67" fill="#fff" />
        <rect width="32" height="10.67" y="21.33" fill="#0073CF" />
        <g fill="#0073CF">
          {[[16, 13.8], [12.4, 15.6], [19.6, 15.6], [13.2, 19.2], [18.8, 19.2]].map(([cx, cy], i) => (
            <path
              key={i}
              transform={`translate(${cx} ${cy}) scale(0.34)`}
              d="M0 -3.4 0.99 -1.05 3.23 -1.05 1.4 0.4 2.1 2.75 0 1.3 -2.1 2.75 -1.4 0.4 -3.23 -1.05 -0.99 -1.05Z"
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

/* ================================================================== */
/* TOGGLE                                                               */
/* ================================================================== */

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t.aria.langToggle}
      className={`inline-flex items-center gap-0.5 p-1 rounded-full bg-espresso/5 border border-espresso/10 backdrop-blur-sm ${className}`}
    >
      <button
        type="button"
        aria-label={t.aria.langEn}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
        className={`relative w-8 h-8 rounded-full overflow-hidden transition-all duration-300 ${
          lang === "en"
            ? "ring-2 ring-espresso ring-offset-1 ring-offset-transparent scale-100 opacity-100"
            : "opacity-45 hover:opacity-80 scale-95"
        }`}
      >
        <FlagUS className="w-full h-full" />
      </button>
      <button
        type="button"
        aria-label={t.aria.langEs}
        aria-pressed={lang === "es"}
        onClick={() => setLang("es")}
        className={`relative w-8 h-8 rounded-full overflow-hidden transition-all duration-300 ${
          lang === "es"
            ? "ring-2 ring-espresso ring-offset-1 ring-offset-transparent scale-100 opacity-100"
            : "opacity-45 hover:opacity-80 scale-95"
        }`}
      >
        <FlagHN className="w-full h-full" />
      </button>
    </div>
  );
}

/** Header variant — same toggle, tuned to sit on a transparent/dark hero as well as the
 *  scrolled cream bar, since the header crossfades between the two. */
export function LanguageToggleHeader({ scrolled }: { scrolled: boolean }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t.aria.langToggle}
      className={`inline-flex items-center gap-0.5 p-1 rounded-full border backdrop-blur-md transition-colors duration-500 ${
        scrolled ? "bg-espresso/5 border-espresso/10" : "bg-cream/10 border-cream/30"
      }`}
    >
      <button
        type="button"
        aria-label={t.aria.langEn}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
        className={`relative w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden transition-all duration-300 ${
          lang === "en"
            ? `scale-100 opacity-100 ring-2 ring-offset-1 ring-offset-transparent ${scrolled ? "ring-espresso" : "ring-cream"}`
            : "opacity-45 hover:opacity-80 scale-90"
        }`}
      >
        <FlagUS className="w-full h-full" />
      </button>
      <button
        type="button"
        aria-label={t.aria.langEs}
        aria-pressed={lang === "es"}
        onClick={() => setLang("es")}
        className={`relative w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden transition-all duration-300 ${
          lang === "es"
            ? `scale-100 opacity-100 ring-2 ring-offset-1 ring-offset-transparent ${scrolled ? "ring-espresso" : "ring-cream"}`
            : "opacity-45 hover:opacity-80 scale-90"
        }`}
      >
        <FlagHN className="w-full h-full" />
      </button>
    </div>
  );
}
