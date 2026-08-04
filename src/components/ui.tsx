import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import {
  Anchor, Calendar, Car, Coffee, Compass, CupSoda, Fish, Gift, Globe, Camera,
  Key, Leaf, Map, MessageCircle, Plane, Sailboat, Shield, Shirt, Snowflake, Star,
  Sun, TreePalm, Umbrella, Waves, Wifi,
} from "lucide-react";
import { cn } from "../utils/cn";

export const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  coffee: Coffee, cup: CupSoda, waves: Waves, umbrella: Umbrella, sun: Sun, wifi: Wifi,
  snowflake: Snowflake, car: Car, shield: Shield, gift: Gift, map: Map, plane: Plane,
  shirt: Shirt, key: Key, anchor: Anchor, globe: Globe, compass: Compass, fish: Fish,
  sailboat: Sailboat, palm: TreePalm, leaf: Leaf, star: Star, instagram: Camera,
  message: MessageCircle, calendar: Calendar,
};

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;
  return (
    <M
      ref={ref}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </M>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className={cn("eyebrow mb-4 flex items-center gap-3", align === "center" && "justify-center", light ? "text-turq-300" : "text-turq-500")}>
            <span className={cn("h-px w-8", light ? "bg-turq-300/60" : "bg-turq-500/50")} aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2
          className={cn(
            "text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.08]",
            light ? "text-sand-50" : "text-ocean-900",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <p className={cn("mt-6 text-[1.0625rem] leading-relaxed", light ? "text-sand-100/80" : "text-ocean-800/70")}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

type BtnProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "light";
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  external,
  ariaLabel,
}: BtnProps) {
  const base =
    "group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 will-change-transform";
  const variants = {
    primary:
      "bg-turq-500 text-ocean-950 shadow-[0_14px_34px_-12px_rgba(23,183,196,0.75)] hover:bg-turq-400 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-14px_rgba(23,183,196,0.85)]",
    outline:
      "border border-ocean-900/20 text-ocean-900 hover:border-ocean-900/50 hover:bg-ocean-900 hover:text-sand-50 hover:-translate-y-0.5",
    light:
      "glass-dark text-white hover:bg-white/95 hover:text-ocean-950 hover:-translate-y-0.5",
    ghost: "text-ocean-800 hover:text-turq-500",
  };
  const cls = cn(base, variants[variant], className);
  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={cls}>
      {children}
    </button>
  );
}

/** Image with a soft reveal + zoom, lazy loaded. */
export function RevealImage({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-sand-200", className)}>
      <motion.img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        initial={reduce ? false : { scale: 1.12, opacity: 0 }}
        animate={inView || priority ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}

/** Decorative original SVG wave divider (not photography). */
export function WaveDivider({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block w-full", flip && "rotate-180", className)}
    >
      <path
        d="M0,64 C240,120 420,8 720,40 C1020,72 1200,120 1440,72 L1440,120 L0,120 Z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M0,88 C260,40 480,116 760,80 C1040,44 1240,96 1440,56 L1440,120 L0,120 Z"
        fill="currentColor"
      />
    </svg>
  );
}
