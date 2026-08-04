import { amenities, media } from "../data/content";
import { Reveal, SectionHeading, iconMap } from "./ui";

export default function Amenities() {
  return (
    <section id="amenities" className="relative overflow-hidden bg-ocean-950 py-24 text-sand-50 md:py-32">
      <div className="absolute inset-0 opacity-[0.14]" aria-hidden>
        <img src={media.wifi} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div
        className="absolute inset-0 bg-[radial-gradient(90%_70%_at_20%_0%,rgba(23,183,196,0.22),transparent_60%)]"
        aria-hidden
      />

      <div className="container-x relative">
        <SectionHeading
          light
          align="center"
          eyebrow="Amenities & Services"
          title={
            <>
              Everything you need,
              <br />
              <em className="not-italic text-turq-300">nothing you don't</em>
            </>
          }
          intro="The small things that make an island stay effortless — from beach chairs waiting by the door to breakfast already taken care of."
        />

        <ul className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((a, i) => {
            const Icon = iconMap[a.icon];
            return (
              <Reveal
                as="li"
                key={a.title}
                delay={(i % 4) * 0.05}
                className="group bg-ocean-950/85 p-7 backdrop-blur-sm transition-colors duration-500 hover:bg-ocean-900/90"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-turq-500/12 text-turq-300 transition-all duration-500 group-hover:bg-turq-500 group-hover:text-ocean-950">
                  {Icon && <Icon className="h-5 w-5" strokeWidth={1.6} />}
                </div>
                <h3 className="text-[1.1rem] leading-snug text-sand-50">{a.title}</h3>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-sand-100/60">{a.text}</p>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-[0.82rem] leading-relaxed text-sand-100/50">
            Also on site: non-smoking rooms, designated smoking areas, fire extinguishers, CCTV in common
            areas, currency exchange, daily housekeeping, iron and ironing board on request, water refill
            station, and 32" flat-screen TVs with cable channels in every room.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
