export const SITE = {
  name: "Joseph Decor",
  tagline: "Your room. Your style. Delivered.",
  description:
    "Quality furniture and home decor for Nairobi homes, delivered and assembled at your door.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254112272061",
  whatsappMessage:
    "Hello Joseph Decor, I would like to browse furniture or ask about delivery and assembly.",
  email: "hello@josephdecor.co.ke",
  phoneDisplay: "+254 112 272 061",
  address: "Ngong Road, Nairobi, Kenya",
  hours: "Monday to Saturday, 9am to 6pm",
  freeDeliveryThreshold: 15000,
  consentKey: "joseph_decor_consent",
  currency: "KES",
} as const;

export const WHATSAPP_LINK = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  SITE.whatsappMessage,
)}`;

export const USPS = [
  {
    icon: "bi-tools",
    title: "Locally assembled options",
    copy: "Pieces built and finished by Nairobi workshops, with imported classics alongside.",
  },
  {
    icon: "bi-truck",
    title: "Free delivery above KES 15,000",
    copy: "Across Nairobi and its outskirts, with county delivery arranged at checkout.",
  },
  {
    icon: "bi-arrow-repeat",
    title: "7 day returns",
    copy: "Change your mind after delivery and we will collect the item within seven days.",
  },
  {
    icon: "bi-person-workspace",
    title: "Assembly included on large items",
    copy: "Beds, wardrobes and dining sets are assembled in your home by our team.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "The sofa arrived on Saturday morning and was set up before lunch. The fabric is even richer in person, and the team took away every piece of packaging.",
    name: "Wanjiku M.",
    role: "Homeowner, Kilimani",
    initials: "WM",
  },
  {
    quote:
      "I ordered a bed and two bedside tables for my apartment in Westlands. Assembly was included, the delivery window was accurate, and payment by M-Pesa took seconds.",
    name: "Brian O.",
    role: "Homeowner, Westlands",
    initials: "BO",
  },
  {
    quote:
      "Joseph Decor helped me plan my dining room over WhatsApp. They sent measurements for each piece and it all fits exactly as promised. I will order again.",
    name: "Amina H.",
    role: "Homeowner, Lavington",
    initials: "AH",
  },
] as const;

export type DeliveryZone = {
  id: string;
  label: string;
  detail: string;
  fee: number;
  days: number;
};

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: "nairobi-cbd",
    label: "Nairobi CBD",
    detail: "Central business district and immediate surroundings",
    fee: 300,
    days: 2,
  },
  {
    id: "nairobi-suburbs",
    label: "Nairobi suburbs",
    detail: "Westlands, Kilimani, Karen, Lavington, Kileleshwa, Langata",
    fee: 500,
    days: 3,
  },
  {
    id: "nairobi-outskirts",
    label: "Nairobi outskirts",
    detail: "Ruiru, Kiambu, Syokimau, Athi River, Ngong",
    fee: 900,
    days: 4,
  },
  {
    id: "major-towns",
    label: "Mombasa, Kisumu, Nakuru, Eldoret",
    detail: "Consolidated county delivery, scheduled twice a week",
    fee: 1800,
    days: 6,
  },
  {
    id: "rest-of-kenya",
    label: "Rest of Kenya",
    detail: "County pickup or courier delivery to your town",
    fee: 2500,
    days: 8,
  },
];

export function getZone(id: string | null | undefined): DeliveryZone {
  return DELIVERY_ZONES.find((zone) => zone.id === id) ?? DELIVERY_ZONES[1];
}

export function deliveryFeeFor(subtotal: number, zoneId?: string | null): number {
  if (subtotal >= SITE.freeDeliveryThreshold) return 0;
  return getZone(zoneId).fee;
}
