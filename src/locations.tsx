import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

/* ================================================================== */
/* LOCATION DATA                                                       */
/*                                                                      */
/* Bean Crazy now operates three locations across Roatán (per the      */
/* business's own Facebook/Instagram bio: "West Bay | West End |       */
/* Dolphin Plaza"). West End's address/hours/phone are the ones        */
/* already verified for the original build (Tripadvisor, Waze, the     */
/* business's own JSON-LD). West Bay and Dolphin Plaza are placed by   */
/* general area (West Bay Mall; Dolphin Plaza on the main road in       */
/* Coxen Hole, near the airport) since a public, addressable street    */
/* number wasn't available online — flag these two to the client to    */
/* confirm exact address, and whether phone/WhatsApp/hours differ by    */
/* location before this goes live.                                      */
/* ================================================================== */

export type LocationId = "westend" | "westbay" | "dolphinplaza";

export interface LocationFacts {
  id: LocationId;
  /** Proper noun — same in English and Spanish */
  label: string;
  addressLines: string[];
  hours: [string, string];
  hoursNote: string;
  mapsQuery: string;
  phone: string;
  telHref: string;
  whatsappHref: string;
  email: string;
  description: { en: string; es: string };
  highlight: {
    en: { t: string; d: string };
    es: { t: string; d: string };
  };
}

export const LOCATIONS: LocationFacts[] = [
  {
    id: "westend",
    label: "West End",
    addressLines: ["West End Road", "Half Moon Bay", "West End, Roatán 34101", "Bay Islands, Honduras"],
    hours: ["Mon–Sat · 7am – 5pm", "Sun · 7am – 2pm"],
    hoursNote: "Breakfast served all day",
    mapsQuery: "Bean Crazy Cafe West End Roatan",
    phone: "+504 9622-8396",
    telHref: "tel:+50496228396",
    whatsappHref: "https://wa.me/50496228396",
    email: "bcrazyraotan@gmail.com",
    description: {
      en: "Right on West End Road, between Carlito's Wave Inn and the Tucán Gift Shop, steps from Half Moon Bay.",
      es: "Justo en West End Road, entre Carlito's Wave Inn y Tucán Gift Shop, a pasos de Half Moon Bay.",
    },
    highlight: {
      en: { t: "Right on Half Moon Bay", d: "Two minutes to the sand, with an ocean breeze that's always included." },
      es: { t: "Justo en Half Moon Bay", d: "A dos minutos de la arena, con una brisa marina que siempre está incluida." },
    },
  },
  {
    id: "westbay",
    label: "West Bay",
    addressLines: ["West Bay Mall", "West Bay Beach Road", "West Bay, Roatán", "Bay Islands, Honduras"],
    hours: ["Mon–Sat · 7am – 5pm", "Sun · 7am – 2pm"],
    hoursNote: "Breakfast served all day",
    mapsQuery: "Bean Crazy West Bay Mall Roatan",
    phone: "+504 9622-8396",
    telHref: "tel:+50496228396",
    whatsappHref: "https://wa.me/50496228396",
    email: "bcrazyraotan@gmail.com",
    description: {
      en: "Inside West Bay Mall, steps from West Bay Beach — the same fresh roast, closer to the reef.",
      es: "Dentro de West Bay Mall, a pasos de West Bay Beach — el mismo tueste fresco, más cerca del arrecife.",
    },
    highlight: {
      en: { t: "Steps from West Bay Beach", d: "One of the best beaches in the Caribbean, just outside the door." },
      es: { t: "A Pasos de West Bay Beach", d: "Una de las mejores playas del Caribe, justo afuera de la puerta." },
    },
  },
  {
    id: "dolphinplaza",
    label: "Dolphin Plaza",
    addressLines: ["Dolphin Plaza", "Carretera Principal", "Coxen Hole, Roatán", "Bay Islands, Honduras"],
    hours: ["Mon–Sat · 7am – 5pm", "Sun · 7am – 2pm"],
    hoursNote: "Breakfast served all day",
    mapsQuery: "Bean Crazy Dolphin Plaza Roatan",
    phone: "+504 9622-8396",
    telHref: "tel:+50496228396",
    whatsappHref: "https://wa.me/50496228396",
    email: "bcrazyraotan@gmail.com",
    description: {
      en: "Inside Dolphin Plaza on the main road in Coxen Hole, minutes from the airport — perfect on your way in or out.",
      es: "Dentro de Dolphin Plaza, en la carretera principal de Coxen Hole, a minutos del aeropuerto — perfecto al llegar o antes de volar.",
    },
    highlight: {
      en: { t: "Minutes From the Airport", d: "A proper coffee before your flight, or the first stop when you land." },
      es: { t: "A Minutos del Aeropuerto", d: "Un buen café antes de tu vuelo, o la primera parada al aterrizar." },
    },
  },
];

export function getLocation(id: LocationId): LocationFacts {
  return LOCATIONS.find((l) => l.id === id) ?? LOCATIONS[0];
}

export function mapsEmbedSrc(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function mapsDirectionsHref(query: string) {
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}

/* ================================================================== */
/* CONTEXT + PROVIDER                                                  */
/* ================================================================== */

const LocationContext = createContext<{
  locationId: LocationId;
  setLocationId: (id: LocationId) => void;
  location: LocationFacts;
} | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [locationId, setLocationId] = useState<LocationId>("westend");
  const value = useMemo(
    () => ({ locationId, setLocationId, location: getLocation(locationId) }),
    [locationId]
  );
  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useBeanLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useBeanLocation must be used within a LocationProvider");
  return ctx;
}
