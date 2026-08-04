import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { navLinks, BOOKING_URL, WHATSAPP_URL, hotel, logos } from "../data/content";
import { cn } from "../utils/cn";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ocean-900 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "bg-sand-50/85 backdrop-blur-xl shadow-[0_1px_0_rgba(7,43,56,0.08)]" : "bg-transparent",
        )}
      >
        <nav className="container-x flex items-center justify-between py-4" aria-label="Main">
          <a href="#top" className="flex items-center" aria-label={`${hotel.name} home`}>
            <img
              src={scrolled ? logos.markOnLight : logos.mark}
              alt="Mr. Tucan Hotel"
              className="h-11 w-auto object-contain drop-shadow-md transition-all duration-500 md:h-14"
            />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "relative text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-turq-500 after:transition-all after:duration-300 hover:after:w-full",
                  scrolled ? "text-ocean-800/80 hover:text-ocean-900" : "text-white/85 hover:text-white",
                )}
              >
                {l.label}
              </a>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-turq-500 px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ocean-950 shadow-[0_12px_28px_-12px_rgba(23,183,196,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-turq-400"
            >
              Book Now
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={cn(
              "rounded-full border p-2.5 transition-colors lg:hidden",
              scrolled ? "border-ocean-900/15 text-ocean-900" : "border-white/30 text-white",
            )}
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ocean-950/97 backdrop-blur-xl lg:hidden"
          >
            <div className="container-x flex items-center justify-between py-4">
              <span className="font-display text-xl text-sand-50">Mr. Tucan</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-full border border-white/25 p-2.5 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="container-x mt-8 flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.5 }}
                  className="border-b border-white/10 py-4 font-display text-3xl text-sand-50"
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-turq-500 py-4 text-center text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-ocean-950"
                >
                  Book your stay
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={hotel.celHref}
                    className="flex items-center justify-center gap-2 rounded-full border border-white/25 py-3.5 text-xs uppercase tracking-widest text-white"
                  >
                    <Phone className="h-4 w-4" /> Call
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full border border-white/25 py-3.5 text-xs uppercase tracking-widest text-white"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating CTA */}
      <AnimatePresence>
        {scrolled && (
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Chat with Mr. Tucan Hotel on WhatsApp"
            className="fixed bottom-14 right-5 z-50 flex items-center gap-3 rounded-full bg-palm-600 py-3.5 pl-4 pr-5 text-sm font-semibold text-white shadow-[0_18px_40px_-14px_rgba(46,107,84,0.8)] transition-transform hover:-translate-y-1 md:bottom-16 md:right-8"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
