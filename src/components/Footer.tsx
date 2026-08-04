import { ArrowUp } from "lucide-react";
import { hotel, logos, navLinks, socials, BOOKING_URL, WHATSAPP_URL } from "../data/content";
import { iconMap } from "./ui";

export default function Footer() {
  const mapSrc = `https://www.google.com/maps?q=${hotel.lat},${hotel.lng}&hl=en&z=15&output=embed`;

  return (
    <footer className="bg-ocean-900 pt-20 text-sand-100/70">
      <div className="container-x">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.2fr]">
          <div>
            <img
              src={logos.hotel}
              alt="Mr. Tucan Hotel logo"
              loading="lazy"
              className="h-16 w-auto object-contain"
            />
            <p className="mt-6 max-w-sm text-[0.9rem] leading-relaxed">
              Beachfront hotel on the main street of West End, walking distance from numerous bars,
              restaurants, dive shops and stores. Come and enjoy a piece of this Caribbean paradise — we'll
              make sure you feel at home.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex rounded-full bg-turq-500 px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ocean-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-turq-400"
            >
              Book your stay
            </a>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-5 text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-turq-300">
              Explore
            </h2>
            <ul className="space-y-3 text-[0.9rem]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="transition-colors hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="mb-5 text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-turq-300">
              Contact
            </h2>
            <address className="space-y-3 text-[0.9rem] not-italic leading-relaxed">
              <p>
                {hotel.addressLine2}
                <br />
                {hotel.addressLine3}
              </p>
              <p>
                <a href={hotel.telHref} className="block transition-colors hover:text-white">
                  Tel. {hotel.tel}
                </a>
                <a href={hotel.celHref} className="block transition-colors hover:text-white">
                  Cel. {hotel.cel}
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">
                  WhatsApp
                </a>
                <a href={`mailto:${hotel.email}`} className="block break-all transition-colors hover:text-white">
                  {hotel.email}
                </a>
              </p>
            </address>

            <h2 className="mb-4 mt-8 text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-turq-300">
              Follow
            </h2>
            <ul className="flex flex-wrap gap-2.5">
              {socials.map((s) => {
                const Icon = iconMap[s.icon];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:border-turq-400 hover:bg-turq-500 hover:text-ocean-950"
                    >
                      {Icon && <Icon className="h-4 w-4" strokeWidth={1.6} />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-turq-300">
              Find us
            </h2>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Mr. Tucan Hotel location map"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-52 w-full grayscale-[0.25]"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-[0.76rem] md:flex-row">
          <p>© {new Date().getFullYear()} Mr. Tucan Hotel · Half Moon Bay, West End, Roatán, Honduras C.A.</p>
          <div className="flex items-center gap-6">
            <a
              href="#top"
              aria-label="Back to top"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:border-turq-400 hover:bg-turq-500 hover:text-ocean-950"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
