import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Star, MapPin, Coffee } from "lucide-react";
import { media, BOOKING_URL, hotel } from "../data/content";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ocean-950">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={media.hero}
          alt="Golden sunset over the Caribbean through palm trees, West End, Roatán"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Gradient scrims (original decorative graphics) */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/70 via-ocean-950/25 to-ocean-950/85" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,rgba(4,32,43,0.85),transparent_60%)]" aria-hidden />

      <motion.div style={{ opacity: fade }} className="relative z-10 flex h-full flex-col justify-end pb-16 md:justify-center md:pb-0">
        <div className="container-x">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow mb-6 flex items-center gap-3 text-turq-300"
          >
            <span className="h-px w-10 bg-turq-300/60" aria-hidden />
            {hotel.tagline}
          </motion.p>

          <h1 className="max-w-[20ch] font-display text-[clamp(2.3rem,7.2vw,6rem)] font-normal leading-[1.08] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]">
            {["Stay Steps Away From", "Half Moon Bay"].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.15em]">
                <motion.span
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.05, delay: 0.35 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  {i === 1 ? <em className="not-italic text-coral-500">{line}</em> : line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-sand-100/85 md:text-xl"
          >
            Boutique comfort in the heart of West End, Roatán.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-3.5"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-turq-500 px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ocean-950 shadow-[0_18px_40px_-14px_rgba(23,183,196,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-turq-400"
            >
              Book Your Stay
            </a>
            <a
              href="#rooms"
              className="glass-dark inline-flex items-center justify-center rounded-full px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-ocean-950"
            >
              Explore Rooms
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05 }}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[0.8rem] text-white/75"
          >
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4 text-turq-300" aria-hidden />
              {hotel.rating}/5 · {hotel.reviewCount} traveller reviews
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-turq-300" aria-hidden />
              Location rated {hotel.locationScore}/10
            </li>
            <li className="flex items-center gap-2">
              <Coffee className="h-4 w-4 text-turq-300" aria-hidden />
              Breakfast included at Bean Crazy
            </li>
          </motion.ul>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ opacity: fade }}
        aria-label="Scroll to discover more"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/65 transition-colors hover:text-white md:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.35em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-floaty" />
      </motion.a>
    </section>
  );
}
