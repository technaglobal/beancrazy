import { activities, media, logos } from "../data/content";
import { Reveal, SectionHeading, iconMap } from "./ui";

export default function Explore() {
  const [first, second, third, fourth, ...rest] = activities;

  return (
    <section id="explore" className="relative overflow-hidden bg-sand-50 py-24 md:py-32">
      <div className="pointer-events-none absolute -right-32 top-40 h-96 w-96 rounded-full bg-turq-100/70 blur-3xl" aria-hidden />

      <div className="container-x relative">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Things To Do"
            title={
              <>
                A sample of what you can
                <br />
                <em className="not-italic text-turq-500">enjoy on Roatán</em>
              </>
            }
            intro="West End is a central, easily accessible base for exploring the rest of the island — by boat or by land. Our tour desk can arrange everything from reception."
          />
          <Reveal delay={0.15}>
            <img
              src={logos.markOnLight}
              alt="Mr. Tucan Hotel"
              loading="lazy"
              className="h-16 w-auto object-contain opacity-90 md:h-20"
            />
          </Reveal>
        </div>

        {/* Feature pair */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {[first, third].map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1}>
              <article className="group relative h-full min-h-[22rem] overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-soft)]">
                <img
                  src={a.image ?? media.catamaran}
                  alt={a.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-107"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/90 via-ocean-950/35 to-transparent" aria-hidden />
                <div className="relative flex h-full flex-col justify-end p-8 md:p-10">
                  <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.15rem)] leading-tight text-white">{a.title}</h3>
                  <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-sand-100/80">{a.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Remaining activities */}
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[second, fourth, ...rest].map((a, i) => {
            const Icon = iconMap[a.icon];
            return (
              <Reveal
                as="li"
                key={a.title}
                delay={(i % 3) * 0.07}
                className="group flex flex-col rounded-[1.5rem] border border-ocean-900/8 bg-white p-7 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-turq-100 text-turq-600 transition-colors duration-500 group-hover:bg-turq-500 group-hover:text-ocean-950">
                  {Icon && <Icon className="h-5 w-5" strokeWidth={1.6} />}
                </div>
                <h3 className="text-[1.2rem] leading-snug text-ocean-900">{a.title}</h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ocean-800/65">{a.text}</p>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.15}>
          <p className="mt-10 text-center text-[0.8rem] uppercase tracking-[0.2em] text-ocean-800/45">
            Special prices for groups · Ask at reception
          </p>
        </Reveal>
      </div>
    </section>
  );
}
