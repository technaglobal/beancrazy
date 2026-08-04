import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { reviews, hotel } from "../data/content";
import { Reveal, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

export default function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((d: number) => setI((p) => (p + d + reviews.length) % reviews.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 8000);
    return () => clearInterval(t);
  }, [paused, go]);

  const r = reviews[i];

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-ocean-900 py-24 text-sand-50 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_0%,rgba(23,183,196,0.18),transparent_65%)]"
        aria-hidden
      />
      <div className="container-x relative">
        <SectionHeading
          light
          align="center"
          eyebrow="Guest Reviews"
          title={
            <>
              What guests say
              <br />
              <em className="not-italic text-turq-300">after they leave</em>
            </>
          }
        />

        <Reveal delay={0.1}>
          <div className="mt-6 flex items-center justify-center gap-3 text-sand-100/70">
            <span className="flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, n) => (
                <Star key={n} className="h-4 w-4 fill-turq-300 text-turq-300" />
              ))}
            </span>
            <span className="text-sm">
              {hotel.rating} out of 5 · {hotel.reviewCount} traveller reviews
            </span>
          </div>
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-4xl">
          <Quote className="mx-auto mb-8 h-9 w-9 text-turq-500/50" aria-hidden />
          <div className="min-h-[15rem] md:min-h-[13rem]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
                aria-live="polite"
              >
                <p className="font-display text-[clamp(1.15rem,2.3vw,1.75rem)] leading-[1.55] text-sand-50/95">
                  “{r.text}”
                </p>
                <footer className="mt-7 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-turq-300">
                  {r.name} · via {r.source}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="rounded-full border border-white/20 p-3 text-white/80 transition-colors hover:bg-white hover:text-ocean-950"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setI(n)}
                  aria-label={`Go to review ${n + 1}`}
                  aria-current={n === i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-400",
                    n === i ? "w-8 bg-turq-400" : "w-1.5 bg-white/25 hover:bg-white/50",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next review"
              className="rounded-full border border-white/20 p-3 text-white/80 transition-colors hover:bg-white hover:text-ocean-950"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
