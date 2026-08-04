import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Clock, Check, Send } from "lucide-react";
import { hotel, WHATSAPP_URL, BOOKING_URL, media } from "../data/content";
import { Reveal, SectionHeading } from "./ui";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const next: Errors = {};
    if (name.length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Please enter a valid email address.";
    if (message.length < 10) next.message = "Please add a few more details so we can help.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = encodeURIComponent(`Reservation inquiry — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nArrival: ${fd.get("arrival") || "—"}\nDeparture: ${fd.get("departure") || "—"}\nGuests: ${fd.get("guests") || "—"}\n\n${message}`,
    );
    window.location.href = `mailto:${hotel.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-ocean-950 py-24 text-sand-50 md:py-32">
      <div className="absolute inset-0 opacity-[0.12]" aria-hidden>
        <img src={media.propertyHero} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(85%_60%_at_15%_10%,rgba(23,183,196,0.2),transparent_60%)]" aria-hidden />

      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <SectionHeading
              light
              eyebrow="Reservations & Inquiries"
              title={
                <>
                  Let's plan
                  <br />
                  <em className="not-italic text-turq-300">your island stay</em>
                </>
              }
              intro="We typically respond within 24 hours of your inquiry. Please be thorough in your message so we can help you with all the details you need. Thank you."
            />

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <a
                href={hotel.celHref}
                className="glass-dark group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/95"
              >
                <Phone className="h-5 w-5 shrink-0 text-turq-300 transition-colors group-hover:text-ocean-900" />
                <span className="min-w-0">
                  <span className="block text-[0.62rem] uppercase tracking-[0.22em] text-sand-100/55 transition-colors group-hover:text-ocean-800/60">
                    Click to call
                  </span>
                  <span className="block truncate text-[0.95rem] font-medium text-white transition-colors group-hover:text-ocean-950">
                    {hotel.cel}
                  </span>
                </span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-dark group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/95"
              >
                <MessageCircle className="h-5 w-5 shrink-0 text-turq-300 transition-colors group-hover:text-ocean-900" />
                <span className="min-w-0">
                  <span className="block text-[0.62rem] uppercase tracking-[0.22em] text-sand-100/55 transition-colors group-hover:text-ocean-800/60">
                    Click to WhatsApp
                  </span>
                  <span className="block truncate text-[0.95rem] font-medium text-white transition-colors group-hover:text-ocean-950">
                    {hotel.cel}
                  </span>
                </span>
              </a>
            </div>

            <dl className="mt-10 space-y-6 text-[0.92rem]">
              <Row icon={MapPin} label="Address">
                {hotel.addressLine1}
                <br />
                {hotel.addressLine2}
                <br />
                {hotel.addressLine3}
              </Row>
              <Row icon={Phone} label="Telephone">
                <a className="transition-colors hover:text-turq-300" href={hotel.telHref}>
                  Tel. {hotel.tel}
                </a>
                <br />
                <a className="transition-colors hover:text-turq-300" href={hotel.celHref}>
                  Cel. {hotel.cel}
                </a>
                <br />
                <a className="transition-colors hover:text-turq-300" href={hotel.reservationsHref}>
                  Reservations {hotel.reservations}
                </a>
              </Row>
              <Row icon={Mail} label="Email">
                <a className="break-all transition-colors hover:text-turq-300" href={`mailto:${hotel.email}`}>
                  {hotel.email}
                </a>
              </Row>
              <Row icon={Clock} label="Hours">
                Reception: daily, 7:00 AM – 9:00 PM
                <br />
                Check-in from {hotel.checkIn} · Check-out {hotel.checkOut}
                <br />
                WhatsApp inquiries answered within 24 hours
              </Row>
            </dl>
          </div>

          <Reveal delay={0.12}>
            <div className="glass rounded-[2rem] p-7 shadow-[var(--shadow-lift)] md:p-9">
              <h3 className="font-display text-2xl text-ocean-900">Request a reservation</h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-ocean-800/65">
                Prefer to book instantly? Use our{" "}
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-turq-600 underline underline-offset-4"
                >
                  live availability calendar
                </a>
                .
              </p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 flex items-start gap-4 rounded-2xl bg-palm-600/10 p-6 text-ocean-900"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-palm-600" />
                  <p className="text-[0.92rem] leading-relaxed">
                    <strong className="font-semibold">Success! Message received.</strong>
                    <br />
                    Your email client should have opened with your inquiry. If it didn't, write to us at{" "}
                    <a href={`mailto:${hotel.email}`} className="text-turq-600 underline underline-offset-4">
                      {hotel.email}
                    </a>{" "}
                    or message us on WhatsApp.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="mt-7 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Full name" error={errors.name}>
                      <input id="name" name="name" type="text" autoComplete="name" className={inputCls} placeholder="Jane Doe" />
                    </Field>
                    <Field id="email" label="Email" error={errors.email}>
                      <input id="email" name="email" type="email" autoComplete="email" className={inputCls} placeholder="jane@email.com" />
                    </Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-3">
                    <Field id="arrival" label="Arrival">
                      <input id="arrival" name="arrival" type="date" className={inputCls} />
                    </Field>
                    <Field id="departure" label="Departure">
                      <input id="departure" name="departure" type="date" className={inputCls} />
                    </Field>
                    <Field id="guests" label="Guests">
                      <select id="guests" name="guests" className={inputCls} defaultValue="2">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field id="message" label="Your message" error={errors.message}>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className={inputCls}
                      placeholder="Room preference, number of guests, dive plans, airport transfer…"
                    />
                  </Field>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ocean-900 px-8 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-sand-50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-turq-500 hover:text-ocean-950"
                  >
                    <Send className="h-4 w-4" /> Send inquiry
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-ocean-900/12 bg-white/85 px-4 py-3 text-[0.92rem] text-ocean-900 placeholder:text-ocean-800/35 transition-colors focus:border-turq-500 focus:outline-none";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ocean-800/60">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-[0.75rem] text-coral-500">
          {error}
        </p>
      )}
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-1 h-4.5 w-4.5 shrink-0 text-turq-300" strokeWidth={1.6} />
      <div>
        <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-sand-100/50">{label}</dt>
        <dd className="mt-1.5 leading-relaxed text-sand-100/85">{children}</dd>
      </div>
    </div>
  );
}
