import { MapPin, Waves, Utensils, Anchor, Music, Plane } from "lucide-react";
import { hotel } from "../data/content";
import { Reveal, SectionHeading } from "./ui";

const near = [
  { icon: Waves, title: "Half Moon Bay", detail: "Directly across the street — snorkel straight off the beach." },
  { icon: Utensils, title: "West End restaurants", detail: "Dozens of bars and restaurants within a few minutes' walk." },
  { icon: Anchor, title: "Dive shops", detail: "Multiple dive centres along the same main street." },
  { icon: Music, title: "Nightlife", detail: "West End's music and nightlife on your doorstep — and your bed a minute away." },
  { icon: MapPin, title: "West Bay Beach", detail: "About a 10-minute drive, or a short water-taxi ride from the bay." },
  { icon: Plane, title: "Roatán Airport (RTB)", detail: "Roughly 8 miles / 20 minutes. Transfers available on request." },
];

export default function Location() {
  const mapSrc = `https://www.google.com/maps?q=${hotel.lat},${hotel.lng}&hl=en&z=16&output=embed`;

  return (
    <section id="location" className="bg-white py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Location"
              title={
                <>
                  Everything within
                  <br />
                  <em className="not-italic text-turq-500">a five-minute walk</em>
                </>
              }
              intro="Calle Principal, fifth building on the left after the roundabout, right in front of Half Moon Bay. It is, quite simply, the most walkable address in West End."
            />

            <ul className="mt-10 space-y-6">
              {near.map((n, i) => (
                <Reveal as="li" key={n.title} delay={i * 0.06} className="flex gap-4">
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand-100 text-turq-600">
                    <n.icon className="h-4.5 w-4.5" strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3 className="text-[1.05rem] text-ocean-900">{n.title}</h3>
                    <p className="mt-1 text-[0.9rem] leading-relaxed text-ocean-800/65">{n.detail}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.3}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${hotel.lat},${hotel.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-ocean-900/20 px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ocean-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ocean-900 hover:text-sand-50"
              >
                <MapPin className="h-4 w-4" /> Open in Google Maps
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="h-full overflow-hidden rounded-[2rem] border border-ocean-900/8 shadow-[var(--shadow-lift)]">
              <iframe
                title="Map showing Mr. Tucan Hotel in West End, Roatán"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[420px] w-full lg:h-full lg:min-h-[560px]"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
