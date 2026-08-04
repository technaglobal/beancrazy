/**
 * All content and imagery below is sourced from the hotel's own web properties:
 *  - mrtucanhotelroatan.com (Wix media library: static.wixstatic.com)
 *  - the hotel's own Cloudbeds booking engine (us2.cloudbeds.com/reservation/7vB3M6)
 * No photography has been invented or replaced. The hero and About imagery are
 * bundled locally (src/assets) instead of hotlinked, for reliability.
 */
import heroHalfMoonBay from "../assets/hero-sunset-beach.jpg";
import mrTucanLogo from "../assets/mr-tucan-logo.png";
import mrTucanLogoOnLight from "../assets/mr-tucan-logo-on-light.png";
import beanCrazyLogo from "../assets/bean-crazy-logo.png";
import beanCrazyMain from "../assets/bean-crazy-main.jpg";
import beanCrazyBreakfastPhoto from "../assets/bean-crazy-breakfast.jpg";

/** Build a resized Wix media URL from the original media URI used on mrtucanhotelroatan.com */
export const wix = (uri: string, w: number, h: number) =>
  `https://static.wixstatic.com/media/${uri}/v1/fill/w_${w},h_${h},al_c,q_85,usm_0.66_1.00_0.01,enc_auto/${uri}`;

const cb = (host: 1 | 2 | 3, file: string) =>
  `https://h-img${host}.us2.cloudbeds.com/uploads/60132752064640/${file}`;

export const BOOKING_URL = "https://us2.cloudbeds.com/reservation/7vB3M6";
export const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=50494523736";

export const hotel = {
  name: "Mr. Tucan Hotel",
  tagline: "Half Moon Bay · West End · Roatán",
  addressLine1: "Calle Principal, edificio #5, mano izquierda del redondel",
  addressLine2: "Half Moon Bay, West End, Roatán",
  addressLine3: "Islas de la Bahía, Honduras, C.A.",
  tel: "+504-2407-2072",
  telHref: "tel:+50424072072",
  cel: "+504-9452-3736",
  celHref: "tel:+50494523736",
  reservations: "+504 9343 9050",
  reservationsHref: "tel:+50493439050",
  email: "reservation@mrtucanhotelroatan.com",
  lat: 16.305415,
  lng: -86.593198,
  checkIn: "3:00 PM",
  checkOut: "11:00 AM",
  rating: "4.7",
  reviewCount: "215",
  locationScore: "9.7",
};

export const logos = {
  /** Primary hotel logo — bundled locally (client-supplied artwork) */
  hotel: mrTucanLogo,
  /** Same mark, used wherever a compact/square logo is needed */
  mark: mrTucanLogo,
  /** Same mark with the hollow "TUCAN" letters filled solid black instead of white — for use over light backgrounds (e.g. the scrolled nav bar) where the white fill disappears */
  markOnLight: mrTucanLogoOnLight,
  beanCrazy: beanCrazyLogo,
  beanCrazyWord:
    "https://static.wixstatic.com/media/0b65ff_b7c6043893494e50a437f3dce867e85b~mv2.png/v1/fill/w_464,h_116,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0b65ff_b7c6043893494e50a437f3dce867e85b~mv2.png",
};

export const BEAN_CRAZY_SITE_URL = "https://beancrazyroatan.com";

export const media = {
  /** Half Moon Bay, directly across from the hotel — bundled locally for reliability */
  hero: heroHalfMoonBay,
  heroPortrait: heroHalfMoonBay,
  beachChairs: wix("69e63d_7a74041d90c64bea8767f4c621312919~mv2.jpg", 900, 1120),
  terrace: wix("69e63d_ac0d840e77cc4810a393aaa3e283be70~mv2.jpg", 1200, 800),
  comfortableRooms: wix("69e63d_8aca7bbfd06146199b826aa34205c5c2~mv2.jpg", 900, 1120),
  coffeeShop: wix("69e63d_9254a2c713174b2d92845e0e04d8010f~mv2.jpg", 900, 1120),
  restaurant: wix("69e63d_8f902f8ef8fa4ca5bea0a46b58209e72~mv2.jpg", 1400, 933),
  wifi: wix("69e63d_93c386748c3f4868b6bf60e9219817c3~mv2.jpg", 1400, 933),
  beanCrazyAbout: wix("69e63d_6d02f1c8fad64cf4b2d371a620934ecb~mv2.jpg", 1200, 1500),
  breakfastIncluded: wix("0b65ff_0cbc47ad348e4c0cbeb9c76e7f2745e2~mv2.jpg", 900, 975),
  beanCrazyHome: wix("0b65ff_bda21e28fcab43ffaa22c0e2429d33b6~mv2_d_2000_1333_s_2.jpg", 1400, 933),
  roastVideo:
    "https://video.wixstatic.com/video/0b65ff_3d116754aa7f4e3b8cb94a67761e0b08/720p/mp4/file.mp4",
  roastPoster: wix("0b65ff_3d116754aa7f4e3b8cb94a67761e0b08f000.jpg", 1280, 720),
  toursLand: wix("0b65ff_505033bd2a00418bbe6b27718b9b7e22~mv2.png", 1263, 706),
  catamaran: wix("0b65ff_e2b76fdb4d984ddd8c58b03ac5f55150~mv2.jpg", 1400, 933),
  building: cb(1, "edifcio_nuevo~~67a55a18a90ed.jpeg"),
  propertyHero: cb(3, "917bbbed-2db9-48fd-b358-087df12bf684_gallery~~67a8f755eb686.jpg"),
};

export type Room = {
  name: string;
  blurb: string;
  guests: string;
  beds: string;
  image: string;
  balcony?: boolean;
  kitchen?: boolean;
  offsite?: boolean;
  extras: string[];
};

/** Room names, descriptions, capacities and photography from the hotel's own booking engine. */
export const rooms: Room[] = [
  {
    name: "King Ocean View",
    blurb:
      "A warm second-floor room with a king bed and a private balcony framing a partial beach view. Guests also share the ocean-view terrace — a natural spot to unwind and meet fellow travellers.",
    guests: "2 guests",
    beds: "1 king bed",
    image: cb(3, "img_9574~~67a53ddea3d1d.jpg"),
    balcony: true,
    extras: ["Private balcony", "Safe", "Cable TV", "Mini refrigerator", "Hot water", "Parking"],
  },
  {
    name: "Queen Bed Ocean View",
    blurb:
      "A cosy second-floor room with a queen bed and a private balcony with a partial beach view, plus access to the shared terrace. Caribbean charm, right on the main street.",
    guests: "2 guests",
    beds: "1 queen bed",
    image: cb(2, "img_9760~~67a53661ed21d.jpg"),
    balcony: true,
    extras: ["Private balcony", "Safe", "Ceiling fan", "Cable TV", "Mini refrigerator", "Parking"],
  },
  {
    name: "Panoramic View Suite",
    blurb:
      "Wake to breathtaking ocean views straight from your bed. A king-size suite in the second building with a private balcony and a kitchenette with basic utensils and a two-burner electric stove.",
    guests: "2 guests",
    beds: "1 king bed",
    image: cb(3, "mr._tucan_a-01~~67b1557c45fa1.jpg"),
    balcony: true,
    kitchen: true,
    extras: ["Private balcony", "Kitchenette", "Microwave", "Safe box", "Cable TV", "Ceiling fan"],
  },
  {
    name: "Altitude Horizon Suite",
    blurb:
      "A spacious suite with two king beds and sweeping ocean views, located in the second building beside the parking area. Ideal for those who love a scenic vista and don't mind the stairs.",
    guests: "3 – 4 guests",
    beds: "2 king beds",
    image: cb(3, "mr._tucan_a-32~~67af7f3bdb868.jpg"),
    kitchen: true,
    extras: ["Ocean views", "Microwave", "Mini fridge", "Safe box", "Cable TV", "Parking"],
  },
  {
    name: "Family Studio",
    blurb:
      "A comfortable, family-friendly studio with two queen beds and a single sofa bed. The kitchenette comes with basic utensils and a two-burner electric stove, plus access to a cosy terrace.",
    guests: "4 – 5 guests",
    beds: "2 queen beds + 1 sofa bed",
    image: cb(1, "e980203f-4a2b-4b97-8ffd-caefeea396d7~~67a54f08b3294.jpg"),
    kitchen: true,
    extras: ["Kitchenette", "Refrigerator", "Microwave", "Safe", "Ceiling fan", "Terrace access"],
  },
  {
    name: "One Bedroom Apartment",
    blurb:
      "A spacious second-floor apartment with two queen beds, a fully equipped kitchen and a small private deck at the back. At the front, the shared terrace is perfect for slow mornings.",
    guests: "4 guests",
    beds: "2 queen beds",
    image: cb(1, "0014_hotelalta~~67a54f29ddd08.jpg"),
    kitchen: true,
    extras: ["Full kitchen", "Private deck", "Electric oven stove", "Microwave", "Safe", "Beach towels"],
  },
  {
    name: "Standard Double Beds",
    blurb:
      "On the second floor, two double beds for guests who want extra room to spread out. The shared terrace comes with a small library of books for lazy afternoons.",
    guests: "2 guests",
    beds: "2 double beds",
    image: cb(2, "2476a60c-6aa4-45ed-9645-d9873d0f65da~~67a542ee0c180.jpg"),
    extras: ["Shared terrace", "Safe", "Ceiling fan", "Cable TV", "Mini refrigerator", "Shampoo & conditioner"],
  },
  {
    name: "Standard King",
    blurb:
      "Perfect for solo travellers or couples: a second-floor room with a king-size bed and access to the shared terrace overlooking the main street and the beach beyond.",
    guests: "2 guests",
    beds: "1 king bed",
    image: cb(2, "km_mr_tucan-76~~6793092bd0dbc.jpg"),
    extras: ["Shared terrace", "Safe", "Ceiling fan", "Cable TV", "Mini fridge", "Beach towels & chairs"],
  },
  {
    name: "Standard Queen",
    blurb:
      "A cosy second-floor room with a queen bed and a shared terrace looking out over the main street and the sea. Steps from restaurants, bars and dive shops.",
    guests: "2 guests",
    beds: "1 queen bed",
    image: cb(3, "3f0ab422-2125-404f-bcbb-94b1f77524bd~~67a53a0a84bc4.jpg"),
    extras: ["Shared terrace", "Safe", "Ceiling fan", "Cable TV", "Mini refrigerator", "Parking"],
  },
  {
    name: "Cozy Suite",
    blurb:
      "A ground-floor suite with a queen-size bed that pairs comfort with a prime location — cross the street and you're on the beach. Guests also enjoy the main terrace upstairs.",
    guests: "2 guests",
    beds: "1 queen bed",
    image: cb(2, "101-3_png_-_copia~~67aa4b697889b.png"),
    kitchen: true,
    extras: ["Ground floor", "Refrigerator", "Microwave", "Ceiling fan", "Cable TV", "Terrace access"],
  },
  {
    name: "Cozy Nest",
    blurb:
      "Our smallest and most snug room, on the first floor of the building, with a double bed and a small closet. Simple, spotless and superbly located.",
    guests: "2 guests",
    beds: "1 double bed",
    image: cb(2, "103-4~~67b13251a8799.jpg"),
    extras: ["Ground floor", "Air conditioning", "Ceiling fan", "Cable TV", "Hot water", "Parking"],
  },
  {
    name: "Cozy Apartment",
    blurb:
      "A one-bedroom apartment on the first floor with a queen bed, private bathroom with shower and a small, well-equipped kitchen. Terrace access on the second floor.",
    guests: "2 guests",
    beds: "1 queen bed",
    image: cb(1, "0583217d-9014-435c-a10c-021d4acbbbbb_1~~67afbd505cba6.jpg"),
    kitchen: true,
    extras: ["Kitchen", "Gas stove", "Refrigerator", "Microwave", "Ceiling fan", "Terrace access"],
  },
  {
    name: "Mango Breeze Cottage",
    blurb:
      "A charming little cabin set apart from the hotel beneath a beautiful mango tree, a three-minute walk from the beach. Queen bed, small kitchenette and a balcony made for sitting still.",
    guests: "2 guests",
    beds: "1 queen bed",
    image: cb(3, "photo_2-10-24_1_30_38_pm~~67b152b292b7a.jpg"),
    balcony: true,
    kitchen: true,
    offsite: true,
    extras: ["Private cabin", "Balcony", "Kitchenette", "Microwave", "Mini refrigerator", "Parking"],
  },
  {
    name: "Coastal Charm Studio",
    blurb:
      "A spacious self-catering studio five minutes from the hotel, on the ground floor. King bed, private balcony with a hammock, a functional kitchen and high-speed internet.",
    guests: "2 guests",
    beds: "1 king bed",
    image: cb(2, "7ebbdd17-5755-4e36-b06b-c68d1c2f4291~~67b15ad193993.jpg"),
    balcony: true,
    kitchen: true,
    offsite: true,
    extras: ["Balcony with hammock", "Kitchen", "Coffee maker", "Blender, oven & toaster", "Safe", "Parking"],
  },
  {
    name: "The Artsy Loft Apartment",
    blurb:
      "A spacious apartment about five minutes from the hotel, opposite Blue Elephant Restaurant. A quiet second-floor bedroom with a queen and a single bed, plus a functional kitchen.",
    guests: "2 – 3 guests",
    beds: "1 queen bed + 1 single bed",
    image: cb(1, "cama~~67afd21cdd535.jpg"),
    kitchen: true,
    offsite: true,
    extras: ["Kitchen", "Coffee maker", "Kettle & blender", "Safe", "Cable TV", "Excellent Wi-Fi"],
  },
];

export const inRoomAmenities = [
  "Air conditioning",
  "Cable TV",
  "Free Wi-Fi",
  "Safe box",
  "Hot water",
  "Refrigerator",
  "Ceiling fan",
  "Private bathroom & shower",
  "Shampoo & conditioner",
  "Daily housekeeping",
];

export type Amenity = { title: string; text: string; icon: string };

export const amenities: Amenity[] = [
  { icon: "coffee", title: "Complimentary Breakfast", text: "A full breakfast every morning at Bean Crazy Coffee Shop, included for all guests." },
  { icon: "cup", title: "Coffee Shop & Restaurant", text: "Bean Crazy serves home-style meals, fresh bread and pastry — and roasts its own coffee next door." },
  { icon: "waves", title: "Beach Front Location", text: "Directly across the main street from Half Moon Bay — the Caribbean is a 30-second walk away." },
  { icon: "umbrella", title: "Beach Chairs & Towels", text: "Beach chairs and towels are provided for guests, ready whenever you are." },
  { icon: "sun", title: "Ocean-View Terrace", text: "A shared rooftop terrace with sea views — the best seat in West End for sunset." },
  { icon: "wifi", title: "Free Wi-Fi", text: "Fast, reliable wireless internet throughout the hotel and in every room." },
  { icon: "snowflake", title: "Air Conditioning", text: "Every room is air-conditioned, with ceiling fans and screens for fresh island air." },
  { icon: "car", title: "Free Private Parking", text: "Secure on-site private parking for guests, right at the building." },
  { icon: "shield", title: "24-Hour Security", text: "Key-coded entry, CCTV in common areas and round-the-clock security." },
  { icon: "gift", title: "Gift Shop & Duty Free", text: "A duty-free shop and gift store in the same building — for that souvenir you'll actually keep." },
  { icon: "map", title: "Tour Desk", text: "Tour and ticket assistance for diving, snorkelling, catamarans and island tours." },
  { icon: "plane", title: "Airport Transfers", text: "Round-trip airport shuttle available 24 hours on request (surcharge applies)." },
  { icon: "shirt", title: "Laundry Service", text: "Dry cleaning, laundry service and laundry facilities available on site." },
  { icon: "key", title: "Safe Deposit", text: "In-room safe boxes plus a safe-deposit box at the front desk." },
  { icon: "anchor", title: "Diving & Snorkelling", text: "Dive centres are a short stroll away; snorkel straight off Half Moon Bay." },
  { icon: "globe", title: "English · Español · Français", text: "Our team welcomes guests in English, Spanish and French." },
];

export const beanCrazy = {
  title: "The Coffee Experience",
  intro:
    "Right next to the hotel we have our café, Bean Crazy. It's not just a coffee shop — we cook home-style meals, bake fresh bread and pastry, and keep a relaxing environment with A/C, Wi-Fi, music in the background and much more.",
  roast: "We Roast Our Own Coffee",
  prices: ["$6 half-pound", "$12 pound"],
  email: "BCRAZYROATAN@GMAIL.COM",
  phone: "+504-9437-9470",
  instagram: "https://www.instagram.com/beancrazyroatan/",
  handle: "@beancrazyroatan",
  /** Main interior/atmosphere shot, replacing the old low-contrast photo */
  mainImage: beanCrazyMain,
  /** Small overlay photo */
  breakfastPhoto: beanCrazyBreakfastPhoto,
  meals: [
    { label: "Breakfast", img: wix("0b65ff_447e120a845e4df98272778205640d82~mv2.jpg", 1600, 1200) },
    { label: "Lunch", img: wix("0b65ff_7b48f814454243609b6d88ac7536b520~mv2_d_3968_2976_s_4_2.jpg", 1600, 1200) },
    { label: "Dinner", img: wix("0b65ff_09880885f0e5434ab88f4063f380df74~mv2.jpg", 900, 675) },
  ],
};

export type Activity = { title: string; text: string; image?: string; icon: string };

export const activities: Activity[] = [
  {
    icon: "compass",
    title: "Land Island Tour",
    text: "Tour the entire island by land with our team — beaches, villages and viewpoints from end to end. Special prices for groups.",
    image: media.toursLand,
  },
  {
    icon: "fish",
    title: "4 Activities Tour",
    text: "Snorkelling, sea stars, mangroves and a dolphin show — four island highlights in a single day on the water.",
  },
  {
    icon: "sailboat",
    title: "Catamaran · 3 Hour Tour",
    text: "Morning or sunset sailing and snorkelling in the Blue Channel, the natural barrier reef channel just offshore.",
    image: media.catamaran,
  },
  {
    icon: "sun",
    title: "Catamaran · Full Day Tour",
    text: "8:30am – 3:30pm. Sail through the bays with a quick sight of the dolphins, snorkel the crystal-clear waters of Starfish Bay and the Blue Channel reef, with Italian lunch served on board. Every tour includes soft drinks, beer, rum punch, snacks, snorkelling gear and a snorkelling guide.",
  },
  {
    icon: "anchor",
    title: "Scuba Diving",
    text: "West End is one of the world's great dive bases. Dive centres line the main street within a few minutes' walk of reception.",
  },
  {
    icon: "waves",
    title: "Snorkel Half Moon Bay",
    text: "Cross the street, wade in and you're on the reef. Grab a beach chair, leave your things and swim straight out from the bay.",
  },
  {
    icon: "palm",
    title: "West Bay, Marine Park & Little French Key",
    text: "West End is a central, easily accessible base for exploring the island — by boat or by land — including West Bay Beach, the Roatán Marine Park and Little French Key.",
  },
  {
    icon: "leaf",
    title: "Gumbalimba Park & Carambola Gardens",
    text: "Monkeys, macaws and botanical trails a short drive away: Gumbalimba Park is 3.7 miles from the hotel and Carambola Gardens 2.5 miles.",
  },
];

export const reviews = [
  {
    text: "Awesome stay! Just steps from the beach in the heart of the West End. Super convenient location for accessing any number of the dive shops in town. Rooms were clean and regularly serviced each morning. AC, great WiFi, safe & secure. Complimentary breakfast each morning at Bean Crazy was delicious. Beach chairs a nice touch — spent most mornings soaking it all up. Left Roatán feeling totally relaxed and rejuvenated.",
    source: "Tripadvisor",
    name: "Verified guest",
  },
  {
    text: "Great location, easy to get anywhere in town in 5 minutes. Beautiful sunset from the balcony with the beach just across the street. The staff is extremely helpful and courteous. Bean Crazy coffee and breakfast are just the way to start a day of diving. The room was just the right size with plenty of space for all the gear. Great value for the money. This is year 3 at Mr. Tucan's and we will return.",
    source: "Tripadvisor",
    name: "Returning guest",
  },
  {
    text: "Everything was very good; I recommend it. The rooms are spacious. Breakfast included, everything is close to the beach, restaurants, and all kinds of shops to buy what you want. Everyone was kind, even the young lady at the reception was very attentive and friendly.",
    source: "Tripadvisor",
    name: "Claudio B.",
  },
  {
    text: "Right across the street from the beach, room is super clean and very big. Downstairs restaurant serves great coffee!",
    source: "Booking.com",
    name: "Verified guest",
  },
  {
    text: "Excellent breakfasts. Our huge room had a kitchen, awesome ocean view, lots of windows and screens for fresh air, great shower. Friendly, helpful staff.",
    source: "Booking.com",
    name: "Verified guest",
  },
  {
    text: "Can't beat this location in the West End. Loved that I could just walk across the street to snorkel in Half Moon Bay without worrying about where to leave my things. Security at night with key coded entrance door. Definitely recommend this lovely small hotel.",
    source: "Hotels.com",
    name: "Solo traveller",
  },
  {
    text: "I think Mr. Tucan's properties are in the best location. Their amenities are exceptional. Even when we weren't staying on their property they allowed us to park in their lot for a minimal fee.",
    source: "Booking.com",
    name: "Verified guest",
  },
];

export const faqs = [
  {
    q: "Where exactly is Mr. Tucan Hotel?",
    a: "On the main street of West End, Roatán — the fifth building on the left after the roundabout — directly in front of Half Moon Bay. Bars, restaurants, dive centres and shops are all within a few minutes' walk.",
  },
  {
    q: "What time are check-in and check-out?",
    a: "Check-in is from 3:00 PM and check-out is at 11:00 AM. Early check-in or late check-out may be possible on request, subject to availability.",
  },
  {
    q: "Is breakfast really included?",
    a: "Yes. A complimentary breakfast is included for every guest at Bean Crazy Coffee Shop, right next to the hotel — the best coffee in West End, roasted in-house.",
  },
  {
    q: "Is there parking?",
    a: "Yes. Free private parking is available on site for guests, along with 24-hour security and key-coded entry.",
  },
  {
    q: "Do you arrange airport transfers?",
    a: "Yes. A round-trip airport shuttle is available 24 hours a day for a surcharge. Please contact us at least 24 hours before arrival so we can arrange your pick-up. Juan Manuel Gálvez International Airport is roughly 8 miles away.",
  },
  {
    q: "Is there a swimming pool?",
    a: "There is no pool — the Caribbean Sea is directly across the street. We provide beach chairs and towels for all guests, and there is a shared ocean-view terrace on the property.",
  },
  {
    q: "Do the rooms have kitchens?",
    a: "Every room includes a refrigerator. Our studios and apartments add kitchenettes or fully equipped kitchens with basic utensils, microwaves and stoves — ideal for longer stays and families.",
  },
  {
    q: "Is the hotel suitable for divers?",
    a: "Very much so. West End's dive centres are a short walk away, rooms have plenty of space for gear, and breakfast at Bean Crazy opens early — the perfect start to a day of diving.",
  },
  {
    q: "Where are the off-site apartments?",
    a: "Two of our apartments and studios sit two to five minutes from the main building. They offer extra peace and privacy without sacrificing easy access to the beach and West End's attractions. Look for 'Paradise Tucan Accommodations' on Google Maps.",
  },
  {
    q: "What languages does your team speak?",
    a: "Our team welcomes guests in English, Spanish and French.",
  },
];

export const socials = [
  { label: "Book on Cloudbeds", href: BOOKING_URL, icon: "calendar" },
  { label: "Tripadvisor", href: "https://www.tripadvisor.com/Hotel_Review-g303875-d10807592-Reviews-Mr_Tucan_Hotel-West_End_Roatan_Bay_Islands.html", icon: "star" },
  { label: "Bean Crazy on Instagram", href: "https://www.instagram.com/beancrazyroatan/", icon: "instagram" },
  { label: "WhatsApp", href: WHATSAPP_URL, icon: "message" },
];

export const navLinks = [
  { label: "Stay", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Bean Crazy", href: "#bean-crazy" },
  { label: "Explore", href: "#explore" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];
