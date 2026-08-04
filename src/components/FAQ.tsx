import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "../data/content";
import { Reveal, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-sand-100 py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="Good to know"
            title={
              <>
                Frequently asked
                <br />
                <em className="not-italic text-turq-500">questions</em>
              </>
            }
            intro="Anything we haven't covered? Message us on WhatsApp — we typically reply within 24 hours."
          />

          <ul className="divide-y divide-ocean-900/10 border-y border-ocean-900/10">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal as="li" key={f.q} delay={Math.min(i, 6) * 0.04}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={cn(
                          "font-display text-[1.1rem] leading-snug transition-colors duration-300 md:text-[1.2rem]",
                          isOpen ? "text-turq-600" : "text-ocean-900",
                        )}
                      >
                        {f.q}
                      </span>
                      <Plus
                        className={cn(
                          "mt-1 h-5 w-5 shrink-0 text-turq-500 transition-transform duration-400",
                          isOpen && "rotate-45",
                        )}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 pr-10 text-[0.95rem] leading-relaxed text-ocean-800/70">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
