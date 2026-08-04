import { Reveal, RevealImage, SectionHeading, WaveDivider } from "./ui";
import { media, hotel } from "../data/content";
import { Sparkles, Heart, Users, Anchor, Footprints, HomeIcon } from "lucide-react";

const pillars = [
  { icon: Sparkles, title: "Exceptionally clean", text: "Rooms serviced daily and kept spotless — the detail guests mention most." },
  { icon: Footprints, title: "Walk to everything", text: "Bars, restaurants, dive centres and shops are all a few minutes on foot." },
  { icon: Anchor, title: "Made for divers", text: "Room to store gear, early breakfast and dive shops along the same street." },
  { icon: Heart, title: "Perfect for couples", text: "Private balconies, partial ocean views and sunsets from the terrace." },
  { icon: Users, title: "Perfect for families", text: "Studios and apartments with kitchens, sofa beds and space to spread out." },
  { icon: HomeIcon, title: "Locally owned", text: "A small, family-run hotel where the team makes sure you feel at home." },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-sand-50 pt-24 pb-0 md:pt-32">
      <div
        className="pointer-events-none absolute -left-40 top-24 h-[28rem] w-[28rem] rounded-full bg-turq-100/60 blur-3xl"
        aria-hidden
      />
      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <Reveal>
              <RevealImage
                src={media.terrace}
                alt="Half Moon Bay and the shoreline beside Mr. Tucan Hotel"
                className="aspect-[4/5] rounded-[2rem] shadow-[var(--shadow-lift)] sm:aspect-[4/3] lg:aspect-[4/5]"
              />
            </Reveal>
            <div
              className="absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-[2rem] border border-turq-500/25"
              aria-hidden
            />
          </div>

          <div>
            <SectionHeading
              eyebrow="About Mr. Tucan"
              title={
                <>
                  A small hotel with the
                  <br />
                  <em className="not-italic text-turq-500">best address in West End</em>
                </>
              }
              intro="Located right in front of the stunning Half Moon Bay, on the main street of West End, Mr. Tucan places you just steps from bars, restaurants, dive centres and shops — close enough to feel the vibrant rhythm of the island, calm enough to sleep well."
            />
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl leading-relaxed text-ocean-800/70">
                Inside the same building you'll find a duty-free shop and a gift store. Every room includes
                air conditioning, cable TV, a safe, hot water, Wi-Fi, a refrigerator and private parking, and
                every guest has access to the ocean-view terrace — the perfect place to relax and take in
                the surroundings. Beach towels and chairs are always ready for you.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <blockquote className="mt-8 border-l-2 border-turq-500/50 pl-5 font-display text-lg italic leading-relaxed text-ocean-800">
                "Mr. Tucan Hotel has a cosy and clean environment suitable for every visitor — the kind of
                place where you feel at home the moment you arrive."
                <footer className="mt-3 text-[0.7rem] font-sans font-semibold uppercase not-italic tracking-[0.25em] text-turq-500">
                  — Mr. Tucan
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={0.3}>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ocean-900/10 pt-8">
                {[
                  { k: hotel.rating + "/5", v: "Guest rating" },
                  { k: "30 sec", v: "To the beach" },
                  { k: "14", v: "Rooms & apartments" },
                ].map((s) => (
                  <div key={s.v}>
                    <dt className="font-display text-3xl text-ocean-900">{s.k}</dt>
                    <dd className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-ocean-800/55">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <ul className="mt-24 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.06} className="group">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-turq-500 shadow-[var(--shadow-soft)] transition-transform duration-500 group-hover:-translate-y-1">
                <p.icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <h3 className="text-xl text-ocean-900">{p.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ocean-800/65">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>

      <WaveDivider className="mt-14 h-16 text-white md:mt-16 md:h-24" />
    </section>
  );
}
