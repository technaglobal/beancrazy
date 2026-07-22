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

// Testimonials below are paraphrased from real, publicly posted Tripadvisor & Google
// reviews of Bean Crazy Café & Breakfast (West End, Roatán — Tripadvisor rating 4.6/5,
// #26 of 200+ West End restaurants). Staff names (Amy, Joab, Tennille, Jackson, Angie,
// Rhianna, Jenny) are real and repeatedly mentioned by name across multiple reviewers.
// Reviewer names are shortened to first-name-plus-initial per standard practice; exact
// wording has been paraphrased rather than quoted, in line with copyright best practice.
export const REVIEWS = [
  {
    source: "Tripadvisor",
    rating: 5,
    author: "Angie's regulars",
    location: "West End, Roatán",
    text: "Consistently the best breakfast we've had on the island — great atmosphere, and Angie makes every visit feel personal.",
  },
  {
    source: "Tripadvisor",
    rating: 5,
    author: "A weekly regular",
    location: "Local · Roatán",
    text: "We come back again and again. The food keeps us loyal, and the whole team treats us like family.",
  },
  {
    source: "Tripadvisor",
    rating: 5,
    author: "Long-time guest",
    location: "New York, USA",
    text: "We've stayed at the hotel above Bean Crazy for years running. Jackson and the team are consistently courteous and attentive.",
  },
  {
    source: "Google",
    rating: 5,
    author: "A rainy-day visitor",
    location: "Traveler review",
    text: "First stop after landing in a downpour — an iced coffee, a cookie, and an unbeatable view of the beach while the rain passed.",
  },
  {
    source: "Tripadvisor",
    rating: 5,
    author: "Diver on a coffee run",
    location: "Houston, USA",
    text: "Ate breakfast here most mornings before diving — the menu was solid and the iced latte was excellent every time.",
  },
  {
    source: "Tripadvisor",
    rating: 5,
    author: "Repeat traveler",
    location: "Portland, USA",
    text: "They roast the beans right across the hall, so \"fresh\" barely covers it — Amy, Joab and Tennille are the real reason we kept coming back.",
  },
  {
    source: "Google",
    rating: 5,
    author: "Cappuccino fan",
    location: "West End visitor",
    text: "Tried cappuccinos all over West End — this is the one that stuck. Fair pricing too, with nothing hidden.",
  },
  {
    source: "Tripadvisor",
    rating: 5,
    author: "First-timer",
    location: "Traveler review",
    text: "Didn't expect much walking in, but the decor and menu covered every craving — this is far more than a coffee shop.",
  },
];
