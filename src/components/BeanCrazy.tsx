import { Coffee, Mail, Phone, Camera as IgIcon, ArrowUpRight } from "lucide-react";
import { beanCrazy, logos, media, BEAN_CRAZY_SITE_URL } from "../data/content";
import { Reveal, RevealImage, SectionHeading } from "./ui";

export default function BeanCrazy() {
  return (
    <section id="bean-crazy" className="relative overflow-hidden bg-sand-100 py-24 md:py-32">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <Reveal>
              <RevealImage
                src={beanCrazy.mainImage}
                alt="Barista pulling espresso at Bean Crazy, next to Mr. Tucan Hotel"
                className="aspect-[4/5] rounded-[2rem] shadow-[var(--shadow-lift)]"
              />
            </Reveal>
            <Reveal delay={0.18} className="absolute -bottom-8 -left-4 w-44 sm:w-56 lg:-left-10">
              <RevealImage
                src={beanCrazy.breakfastPhoto}
                alt="Breakfast included for guests of Mr. Tucan Hotel"
                className="aspect-square rounded-[1.5rem] border-8 border-sand-100 shadow-[var(--shadow-soft)]"
              />
            </Reveal>
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-7 flex flex-wrap items-center justify-center gap-5 text-center sm:justify-start sm:text-left">
              <img
                src={logos.beanCrazy}
                alt="Bean Crazy Coffee Shop logo"
                loading="lazy"
                className="h-32 w-auto object-contain md:h-36"
              />
              <a
                href={BEAN_CRAZY_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ocean-900/20 px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ocean-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-ocean-900/50 hover:bg-ocean-900 hover:text-sand-50"
              >
                Visit Bean Crazy
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <SectionHeading
              eyebrow="Breakfast & Coffee"
              title={
                <>
                  {beanCrazy.title}
                  <br />
                  <em className="not-italic text-turq-500">starts next door</em>
                </>
              }
              intro={beanCrazy.intro}
            />
            <Reveal delay={0.18}>
              <div className="mt-8 rounded-3xl bg-white p-7 shadow-[var(--shadow-soft)]">
                <p className="flex items-center gap-2.5 font-display text-xl text-ocean-900">
                  <Coffee className="h-5 w-5 text-turq-500" aria-hidden />
                  {beanCrazy.roast}
                </p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ocean-800/65">
                  Visit the roastery beside the café, watch the beans turn, and take the aroma home with you.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {beanCrazy.prices.map((p) => (
                    <span
                      key={p}
                      className="rounded-full bg-sand-100 px-5 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-ocean-900"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.85rem] text-ocean-800/70">
                <a href={`mailto:${beanCrazy.email.toLowerCase()}`} className="flex items-center gap-2 transition-colors hover:text-turq-500">
                  <Mail className="h-4 w-4 text-turq-500" aria-hidden /> {beanCrazy.email.toLowerCase()}
                </a>
                <a href="tel:+50494379470" className="flex items-center gap-2 transition-colors hover:text-turq-500">
                  <Phone className="h-4 w-4 text-turq-500" aria-hidden /> {beanCrazy.phone}
                </a>
                <a
                  href={beanCrazy.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-turq-500"
                >
                  <IgIcon className="h-4 w-4 text-turq-500" aria-hidden /> {beanCrazy.handle}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Meals */}
        <ul className="mt-20 grid gap-6 sm:grid-cols-3">
          {beanCrazy.meals.map((m, i) => (
            <Reveal as="li" key={m.label} delay={i * 0.1} className="group relative overflow-hidden rounded-[1.5rem]">
              <img
                src={m.img}
                alt={`${m.label} served at Bean Crazy`}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-107"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/75 via-ocean-950/10 to-transparent" aria-hidden />
              <span className="absolute bottom-5 left-6 font-display text-2xl text-white">{m.label}</span>
            </Reveal>
          ))}
        </ul>

        {/* Roastery video (existing asset from the hotel's website) */}
        <Reveal delay={0.1} className="mt-6">
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-soft)]">
            <video
              className="h-[240px] w-full object-cover md:h-[380px]"
              src={media.roastVideo}
              poster={media.roastPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-label="Coffee roasting at Bean Crazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/75 via-ocean-950/25 to-transparent" aria-hidden />
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14">
              <p className="eyebrow text-turq-300">Roasted in West End</p>
              <p className="mt-3 max-w-md font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-tight text-white">
                Home-style meals, fresh bread &amp; pastry, and the best coffee in West End.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
