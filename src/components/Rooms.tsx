import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Users, BedDouble, Wifi, Snowflake, ShowerHead, Refrigerator, Sun, ChefHat, ArrowUpRight, Plus,
} from "lucide-react";
import { rooms, inRoomAmenities, BOOKING_URL } from "../data/content";
import { Reveal, SectionHeading } from "./ui";

export default function Rooms() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? rooms : rooms.slice(0, 6);

  return (
    <section id="rooms" className="relative bg-white pb-24 pt-10 md:pb-32 md:pt-14">
      <div className="container-x">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Rooms, Studios & Apartments"
            title={
              <>
                Somewhere to land,
                <br />
                <em className="not-italic text-turq-500">whatever your trip looks like</em>
              </>
            }
            intro="From single and double rooms to studios with kitchenettes and spacious apartments — including two set two to five minutes from the main building for extra peace and privacy."
          />
          <Reveal delay={0.15}>
            <div className="rounded-3xl bg-sand-100 p-6 md:max-w-xs">
              <p className="eyebrow text-turq-500">Every room includes</p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[0.82rem] text-ocean-800/75">
                {inRoomAmenities.map((a) => (
                  <li key={a} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-turq-500" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {visible.map((room, i) => (
              <motion.li
                key={room.name}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-ocean-900/8 bg-sand-50 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
                  <img
                    src={room.image}
                    alt={`${room.name} at Mr. Tucan Hotel`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-107"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ocean-950/55 to-transparent" aria-hidden />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    {room.balcony && <Tag>Private balcony</Tag>}
                    {room.kitchen && <Tag>Kitchen</Tag>}
                    {room.offsite && <Tag>Steps away</Tag>}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[1.4rem] leading-snug text-ocean-900">{room.name}</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.78rem] text-ocean-800/60">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-turq-500" aria-hidden /> {room.guests}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="h-3.5 w-3.5 text-turq-500" aria-hidden /> {room.beds}
                    </span>
                  </div>
                  <p className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-ocean-800/70">{room.blurb}</p>

                  <ul className="mt-5 flex flex-wrap gap-x-3.5 gap-y-2 text-[0.72rem] text-ocean-800/55">
                    <Feature icon={Wifi} label="Wi-Fi" />
                    <Feature icon={Snowflake} label="A/C" />
                    <Feature icon={ShowerHead} label="Private bath" />
                    <Feature icon={Refrigerator} label="Fridge" />
                    {room.balcony && <Feature icon={Sun} label="Balcony" />}
                    {room.kitchen && <Feature icon={ChefHat} label="Kitchen" />}
                  </ul>

                  <details className="mt-4 text-[0.78rem] text-ocean-800/60">
                    <summary className="cursor-pointer list-none font-medium text-turq-600 transition-colors hover:text-turq-500">
                      Full amenity list
                    </summary>
                    <p className="mt-2 leading-relaxed">{room.extras.join(" · ")}</p>
                  </details>

                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-between gap-2 rounded-full bg-ocean-900 px-6 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-sand-50 transition-all duration-300 hover:bg-turq-500 hover:text-ocean-950"
                  >
                    Book now
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {!showAll && (
          <Reveal className="mt-14 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2.5 rounded-full border border-ocean-900/20 px-8 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ocean-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-ocean-900/50 hover:bg-ocean-900 hover:text-sand-50"
            >
              <Plus className="h-4 w-4" /> View all {rooms.length} accommodations
            </button>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="glass-dark rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white">
      {children}
    </span>
  );
}

function Feature({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <li className="flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 text-ocean-800/40" />
      {label}
    </li>
  );
}
