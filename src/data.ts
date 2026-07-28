// Centralised content & imagery for Bean Crazy Roatán
//
// IMAGE SOURCING NOTE:
// breakfast / lunch below are genuine Bean Crazy photographs, sourced from the
// site of Mr. Tucán Hotel — Bean Crazy's sister property (same address, phone,
// and ownership; the café sits inside the hotel's footprint on West End Road).
// They were explicitly labeled "Breakfast" / "Lunch" at the source.
// Every other IMG.* entry below is still licensed stock photography (Pexels, free-to-use),
// kept as a placeholder because the remaining photos found across Bean Crazy's own
// Facebook/Instagram/TripAdvisor presence are either reviewer-submitted (not the
// business's to license) or on platforms that don't expose stable, reusable image URLs.
// Swap these out with real photos from the owner whenever possible — see README.
export const IMG_REAL = {
  breakfast:
    "https://static.wixstatic.com/media/0b65ff_447e120a845e4df98272778205640d82~mv2.jpg/v1/fill/w_1600,h_1200,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0b65ff_447e120a845e4df98272778205640d82~mv2.jpg",
  lunch:
    "https://static.wixstatic.com/media/0b65ff_7b48f814454243609b6d88ac7536b520~mv2_d_3968_2976_s_4_2.jpg/v1/fill/w_1600,h_1200,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0b65ff_7b48f814454243609b6d88ac7536b520~mv2_d_3968_2976_s_4_2.jpg",
};

// Official Bean Crazy logo mark. Original was black artwork on a white
// background; background was removed (converted to alpha transparency) so it
// composites cleanly on any color. It's pure black by default — use the
// Tailwind `invert` utility (with a transition) to flip it to white on dark
// backgrounds rather than keeping two separate image files.
export const LOGO = "/images/logo-bean-crazy.png";

export const IMG = {
  // User-supplied hero photo (upscaled 200% by the user to 1250x700, then further
  // upscaled here via Lanczos resampling + sharpening) to 2400px (desktop) and
  // 1000px (mobile) — see public/images/.
  heroCoffeeShore: "/images/hero-coffee-shore.jpg",
  heroCoffeeShoreMobile: "/images/hero-coffee-shore-mobile.jpg",
  espresso:
    "https://images.pexels.com/photos/302893/pexels-photo-302893.jpeg?auto=compress&cs=tinysrgb&w=1400",
  latteArt:
    "https://images.pexels.com/photos/18163776/pexels-photo-18163776.jpeg?auto=compress&cs=tinysrgb&w=1400",
  moka:
    "https://images.pexels.com/photos/31710614/pexels-photo-31710614.jpeg?auto=compress&cs=tinysrgb&w=1400",
  beans2:
    "https://images.pexels.com/photos/19162213/pexels-photo-19162213.jpeg?auto=compress&cs=tinysrgb&w=1600",
  beans3:
    "https://images.pexels.com/photos/9899790/pexels-photo-9899790.jpeg?auto=compress&cs=tinysrgb&w=1600",
  breakfast4:
    "https://images.pexels.com/photos/7936964/pexels-photo-7936964.jpeg?auto=compress&cs=tinysrgb&w=1400",
  bakery3:
    "https://images.pexels.com/photos/32547536/pexels-photo-32547536.jpeg?auto=compress&cs=tinysrgb&w=1400",
  beach1:
    "https://images.pexels.com/photos/10490913/pexels-photo-10490913.jpeg?auto=compress&cs=tinysrgb&w=1800",
  beach2:
    "https://images.pexels.com/photos/10490921/pexels-photo-10490921.jpeg?auto=compress&cs=tinysrgb&w=1800",
  beach3:
    "https://images.pexels.com/photos/38376805/pexels-photo-38376805.jpeg?auto=compress&cs=tinysrgb&w=1800",
  beach4:
    "https://images.pexels.com/photos/10490919/pexels-photo-10490919.jpeg?auto=compress&cs=tinysrgb&w=1800",
  barista:
    "https://images.pexels.com/photos/7487375/pexels-photo-7487375.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

// Testimonials (real, publicly posted Tripadvisor & Google reviews of Bean Crazy Café &
// Breakfast, paraphrased per copyright best practice) now live bilingually in src/i18n.tsx
// under reviews.items for each language, since the review text itself is translated.
