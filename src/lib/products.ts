import { pexels } from "./images";

export type RoomId =
  | "living-room"
  | "bedroom"
  | "dining-room"
  | "home-office"
  | "outdoor"
  | "kids-room";

export type CategoryId =
  | "sofas"
  | "beds"
  | "tables"
  | "chairs"
  | "storage"
  | "lighting"
  | "rugs"
  | "decor-accessories";

export type ProductImage = { src: string; alt: string };

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  room: RoomId;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  shortDescription: string;
  description: string;
  dimensions: { width: number; height: number; depth: number };
  materials: string[];
  colors: { name: string; hex: string }[];
  assembly: string;
  assemblyIncluded: boolean;
  deliveryEstimate: string;
  isNew: boolean;
  bestSeller: boolean;
  featured: boolean;
  createdAt: string;
};

export type Room = {
  id: RoomId;
  name: string;
  blurb: string;
  image: string;
};

export type Category = {
  id: CategoryId;
  name: string;
  blurb: string;
  image: string;
};

const local = {
  sofa: "/images/products/sofa.jpg",
  navyChair: "/images/products/navy-chair.jpg",
  floorLamp: "/images/products/floor-lamp.jpg",
  loungeChair: "/images/products/lounge-chair.jpg",
  tubChair: "/images/products/tub-chair.jpg",
  officeChair: "/images/products/office-chair.jpg",
  wallClock: "/images/products/wall-clock.jpg",
  sideTable: "/images/products/side-table.jpg",
  planter: "/images/products/planter.jpg",
};

export const ROOMS: Room[] = [
  {
    id: "living-room",
    name: "Living Room",
    blurb: "Sofas, chairs and tables for the room where everyone gathers.",
    image: pexels("4170056"),
  },
  {
    id: "bedroom",
    name: "Bedroom",
    blurb: "Beds, bedside tables and warm lighting for slower mornings.",
    image: pexels("6903157"),
  },
  {
    id: "dining-room",
    name: "Dining Room",
    blurb: "Tables, chairs and sideboards made for long Sunday lunches.",
    image: pexels("2995012"),
  },
  {
    id: "home-office",
    name: "Home Office",
    blurb: "Desks and chairs that keep your working day calm and focused.",
    image: pexels("36123565"),
  },
  {
    id: "outdoor",
    name: "Outdoor",
    blurb: "Weather-ready seating for balconies, terraces and gardens.",
    image: pexels("12715508"),
  },
  {
    id: "kids-room",
    name: "Kids Room",
    blurb: "Bunk beds, desks and storage that grow with little ones.",
    image: pexels("4221413"),
  },
];

export const CATEGORIES: Category[] = [
  {
    id: "sofas",
    name: "Sofas",
    blurb: "Three seaters, loveseats and lounge sets",
    image: pexels("6758245", 800),
  },
  {
    id: "beds",
    name: "Beds",
    blurb: "Upholstered, oak and bunk beds",
    image: pexels("6903157", 800),
  },
  {
    id: "tables",
    name: "Tables",
    blurb: "Dining, coffee, side and writing tables",
    image: pexels("2995012", 800),
  },
  {
    id: "chairs",
    name: "Chairs",
    blurb: "Accent, dining, office and outdoor chairs",
    image: pexels("11295890", 800),
  },
  {
    id: "storage",
    name: "Storage",
    blurb: "Wardrobes, bookshelves and sideboards",
    image: pexels("7045947", 800),
  },
  {
    id: "lighting",
    name: "Lighting",
    blurb: "Floor lamps, pendants and table lamps",
    image: local.floorLamp,
  },
  {
    id: "rugs",
    name: "Rugs",
    blurb: "Handwoven wool, jute and flatweave rugs",
    image: pexels("4857775", 800),
  },
  {
    id: "decor-accessories",
    name: "Decor Accessories",
    blurb: "Clocks, planters, baskets and finishing touches",
    image: pexels("32736387", 800),
  },
];

const C = {
  charcoal: { name: "Charcoal", hex: "#3a3834" },
  stone: { name: "Stone", hex: "#dad7d2" },
  sand: { name: "Sand", hex: "#d9c7ae" },
  clay: { name: "Clay", hex: "#d47f31" },
  navy: { name: "Navy", hex: "#2f4f5f" },
  sage: { name: "Sage", hex: "#9db9a5" },
  natural: { name: "Natural", hex: "#b58b5e" },
  walnut: { name: "Walnut", hex: "#6b4a35" },
  black: { name: "Black", hex: "#211f1c" },
  white: { name: "White", hex: "#f7f6f3" },
  terracotta: { name: "Terracotta", hex: "#b4593a" },
  cream: { name: "Cream", hex: "#efe9dd" },
};

export const PRODUCTS: Product[] = [
  {
    slug: "nairobi-three-seater-sofa",
    name: "Nairobi Three-Seater Sofa",
    category: "sofas",
    room: "living-room",
    price: 84500,
    compareAtPrice: 92000,
    images: [
      { src: local.sofa, alt: "Cream three seater sofa in a bright living room" },
      { src: pexels("6758245"), alt: "Sofa with layered cushions against a painted wall" },
      { src: pexels("11295890"), alt: "Close view of a grey sofa with a decorative cushion" },
    ],
    shortDescription: "Deep seats, feather blend cushions, made for long evenings.",
    description:
      "Our most requested sofa, built in Nairobi with a hardwood frame and a soft feather blend seat. The cover is a stain resistant weave that handles everyday family life, and the cushions keep their shape after months of use. Choose a colourway below and we will confirm the fabric before delivery.",
    dimensions: { width: 214, height: 84, depth: 92 },
    materials: ["Hardwood frame", "Feather blend cushions", "Stain resistant woven fabric"],
    colors: [C.cream, C.charcoal, C.sage],
    assembly: "Assembly included at delivery, legs fitted and positioned in your room.",
    assemblyIncluded: true,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: false,
    bestSeller: true,
    featured: true,
    createdAt: "2026-04-18",
  },
  {
    slug: "karen-navy-accent-chair",
    name: "Karen Navy Accent Chair",
    category: "chairs",
    room: "living-room",
    price: 27500,
    images: [
      { src: local.navyChair, alt: "Navy accent armchair with buttoned back" },
      { src: pexels("4170056"), alt: "Styled living area with armchair and dining table" },
      { src: pexels("11295890"), alt: "Sofa and cushion detail in a modern living room" },
    ],
    shortDescription: "A quiet statement piece for a reading corner.",
    description:
      "A compact armchair with a buttoned back and tapered timber legs. It is comfortable enough for a whole afternoon with a book, and small enough for a city apartment. The navy velvet is hard wearing and easy to brush clean.",
    dimensions: { width: 78, height: 86, depth: 82 },
    materials: ["Velvet upholstery", "Beech wood legs", "High density foam"],
    colors: [C.navy, C.charcoal, C.stone],
    assembly: "No assembly required, delivered ready to use.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: true,
    bestSeller: false,
    featured: false,
    createdAt: "2026-07-02",
  },
  {
    slug: "muthaiga-sage-tub-chair",
    name: "Muthaiga Sage Tub Chair",
    category: "chairs",
    room: "living-room",
    price: 24900,
    images: [
      { src: local.tubChair, alt: "Sage green tub chair with pale timber legs" },
      { src: pexels("11295890"), alt: "Grey sofa with a patterned cushion" },
      { src: pexels("6758245"), alt: "Living room sofa and coffee table scene" },
    ],
    shortDescription: "Rounded, generous and surprisingly light to move.",
    description:
      "The tub shape wraps around you without feeling heavy in a small room. Upholstered in a soft sage weave with pale timber legs, it pairs well with cream sofas and warm wood tables.",
    dimensions: { width: 82, height: 79, depth: 80 },
    materials: ["Woven polyester blend", "Timber legs", "Foam seat"],
    colors: [C.sage, C.stone, C.sand],
    assembly: "No assembly required, delivered ready to use.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-05-21",
  },
  {
    slug: "westlands-lounge-chair",
    name: "Westlands Lounge Chair",
    category: "chairs",
    room: "living-room",
    price: 32000,
    images: [
      { src: local.loungeChair, alt: "Oak lounge chair with beige cushions" },
      { src: pexels("6758245"), alt: "Modern living room with sofa and wall art" },
      { src: pexels("4857775"), alt: "Studio apartment with sofa and bed" },
    ],
    shortDescription: "Oak arms, a deep seat, and a cushion you can sink into.",
    description:
      "A mid century lounge chair with an exposed oak frame and removable cushions. The seat is deep and low, made for lounges and bedrooms that need one comfortable chair rather than another sofa.",
    dimensions: { width: 74, height: 78, depth: 84 },
    materials: ["Solid oak frame", "Linen blend cushions", "Webbed seat support"],
    colors: [C.sand, C.charcoal, C.terracotta],
    assembly: "Light assembly, tools and instructions included.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: true,
    bestSeller: false,
    featured: false,
    createdAt: "2026-09-05",
  },
  {
    slug: "kilimani-two-seater-loveseat",
    name: "Kilimani Two-Seater Loveseat",
    category: "sofas",
    room: "living-room",
    price: 62000,
    images: [
      { src: pexels("6758245"), alt: "Two seater sofa with cushions in a modern living room" },
      { src: pexels("4170056"), alt: "Open plan living and dining room" },
      { src: pexels("11295890"), alt: "Detail of a sofa with a decorative cushion" },
    ],
    shortDescription: "All the comfort of a sofa, in a footprint that fits.",
    description:
      "A two seater for apartments, reading rooms and smaller lounges. Same hardwood frame and feather blend cushions as our three seater, with slimmer arms so it sits neatly against a wall.",
    dimensions: { width: 168, height: 84, depth: 90 },
    materials: ["Hardwood frame", "Feather blend cushions", "Woven fabric"],
    colors: [C.stone, C.charcoal, C.clay],
    assembly: "Assembly included at delivery.",
    assemblyIncluded: true,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-03-11",
  },
  {
    slug: "karen-upholstered-queen-bed",
    name: "Karen Upholstered Queen Bed",
    category: "beds",
    room: "bedroom",
    price: 98500,
    compareAtPrice: 106000,
    images: [
      { src: pexels("6903157"), alt: "Queen bed with grey bedding in a bright bedroom" },
      { src: pexels("6444973"), alt: "Bedroom with soft pillows and a blanket" },
      { src: pexels("8135118"), alt: "White bed with brown throw pillows" },
    ],
    shortDescription: "A tall, softly padded headboard and a solid slatted base.",
    description:
      "A queen bed with a padded headboard that is comfortable to lean against, and a slatted base that supports the mattress without a box spring. The upholstery is a tight grey weave, easy to vacuum and forgiving in a busy household.",
    dimensions: { width: 168, height: 122, depth: 214 },
    materials: ["Padded headboard", "Solid timber slats", "Grey woven upholstery"],
    colors: [C.stone, C.charcoal, C.sand],
    assembly: "Assembly included at delivery, including mattress positioning.",
    assemblyIncluded: true,
    deliveryEstimate: "Nairobi, 3 to 5 working days",
    isNew: false,
    bestSeller: true,
    featured: true,
    createdAt: "2026-02-14",
  },
  {
    slug: "lavington-oak-king-bed",
    name: "Lavington Oak King Bed",
    category: "beds",
    room: "bedroom",
    price: 112000,
    images: [
      { src: pexels("6444973"), alt: "King bed with white bedding and timber frame" },
      { src: pexels("6903157"), alt: "Bedroom with pendant lighting and grey bedding" },
      { src: pexels("8135118"), alt: "Bed with layered throw pillows" },
    ],
    shortDescription: "Solid oak, a low profile, and room for a proper lie in.",
    description:
      "A king bed in solid oak with a low footboard so the room stays open. The frame is built to be repaired rather than replaced, and the slats are spaced for airflow and mattress life.",
    dimensions: { width: 196, height: 108, depth: 220 },
    materials: ["Solid oak", "Oak veneer panels", "Reinforced slats"],
    colors: [C.natural, C.walnut],
    assembly: "Assembly included at delivery.",
    assemblyIncluded: true,
    deliveryEstimate: "Nairobi, 3 to 5 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-01-20",
  },
  {
    slug: "nyali-bedside-table",
    name: "Nyali Bedside Table",
    category: "tables",
    room: "bedroom",
    price: 18500,
    images: [
      { src: local.sideTable, alt: "Round walnut side table with tapered legs" },
      { src: pexels("6903157"), alt: "Bedside area in a modern bedroom" },
      { src: pexels("6444973"), alt: "Bedroom with pillows and warm textiles" },
    ],
    shortDescription: "One drawer, one shelf, exactly enough.",
    description:
      "A small round table with a single drawer and an open shelf below. It suits a bedside, a reading corner or the space beside a sofa. The walnut finish is sealed against spills and everyday wear.",
    dimensions: { width: 45, height: 55, depth: 45 },
    materials: ["Walnut veneer", "Solid wood legs", "Metal drawer runner"],
    colors: [C.walnut, C.natural, C.black],
    assembly: "Light assembly, legs to be fitted with the supplied key.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-05-09",
  },
  {
    slug: "ngong-wardrobe-with-mirror",
    name: "Ngong Wardrobe with Mirror",
    category: "storage",
    room: "bedroom",
    price: 76500,
    images: [
      { src: pexels("7045947"), alt: "Built in wardrobe with sliding doors in a bedroom" },
      { src: pexels("6903157"), alt: "Bedroom with timber floor and neutral walls" },
      { src: pexels("8135118"), alt: "Bedroom with a made bed and soft lighting" },
    ],
    shortDescription: "Two sliding doors, a full length mirror and a quiet close.",
    description:
      "A floor standing wardrobe with two sliding doors, one of them mirrored, and a hanging rail plus four shelves inside. The runners are soft close, so early mornings stay quiet.",
    dimensions: { width: 180, height: 210, depth: 60 },
    materials: ["Engineered wood", "Mirror glass", "Soft close runners"],
    colors: [C.white, C.natural, C.charcoal],
    assembly: "Assembly included at delivery, levelled and anchored to the wall.",
    assemblyIncluded: true,
    deliveryEstimate: "Nairobi, 4 to 6 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-02-28",
  },
  {
    slug: "kilimani-bookshelf",
    name: "Kilimani Bookshelf",
    category: "storage",
    room: "home-office",
    price: 34500,
    images: [
      { src: pexels("32736387"), alt: "Open shelf unit with art and decor objects" },
      { src: pexels("36123565"), alt: "Workspace desk with books and a laptop" },
      { src: pexels("10922370"), alt: "Warm desk corner with a lamp and plant" },
    ],
    shortDescription: "Five open shelves for books, records and the good vase.",
    description:
      "An open shelving unit with five bays, slim uprights and a low plinth. It works as a room divider in an open plan flat, or flat against a wall in a study.",
    dimensions: { width: 90, height: 180, depth: 34 },
    materials: ["Oak veneer", "Powder coated steel frame"],
    colors: [C.natural, C.black, C.white],
    assembly: "Assembly included at delivery.",
    assemblyIncluded: true,
    deliveryEstimate: "Nairobi, 3 to 5 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-04-02",
  },
  {
    slug: "nyeri-six-seater-dining-set",
    name: "Nyeri Six-Seater Dining Set",
    category: "tables",
    room: "dining-room",
    price: 89900,
    compareAtPrice: 98000,
    images: [
      { src: pexels("7538106"), alt: "Wooden dining table with six chairs in a warm room" },
      { src: pexels("2995012"), alt: "Round dining table with white chairs" },
      { src: pexels("241520"), alt: "Dining set in a softly lit room" },
    ],
    shortDescription: "A solid acacia table with six matching chairs.",
    description:
      "A generous six seater in solid acacia with a hand finished top. The chairs have a gently curved back and a seat height that works for long meals. Delivered as a set and assembled in the room you choose.",
    dimensions: { width: 180, height: 76, depth: 90 },
    materials: ["Solid acacia", "Acacia veneer", "Timber chairs"],
    colors: [C.natural, C.walnut],
    assembly: "Assembly included at delivery, table and chairs set up in place.",
    assemblyIncluded: true,
    deliveryEstimate: "Nairobi, 4 to 6 working days",
    isNew: false,
    bestSeller: true,
    featured: true,
    createdAt: "2026-03-25",
  },
  {
    slug: "mombasa-round-dining-table",
    name: "Mombasa Round Dining Table",
    category: "tables",
    room: "dining-room",
    price: 54500,
    images: [
      { src: pexels("2995012"), alt: "Round dining table with chairs in a sunlit room" },
      { src: pexels("7538106"), alt: "Wooden dining table and chairs" },
      { src: pexels("241520"), alt: "Dining table under warm pendant lighting" },
    ],
    shortDescription: "Round, sociable, and generous enough for four.",
    description:
      "A round mango wood table that makes a small dining room feel open. There are no corners to walk into and everyone can reach the middle. Seats four comfortably, five at a push.",
    dimensions: { width: 120, height: 75, depth: 120 },
    materials: ["Solid mango wood", "Sealed matte finish"],
    colors: [C.natural, C.walnut],
    assembly: "Light assembly, legs to be fitted at delivery.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 3 to 5 working days",
    isNew: true,
    bestSeller: false,
    featured: false,
    createdAt: "2026-08-28",
  },
  {
    slug: "diani-dining-chair-pair",
    name: "Diani Dining Chair Pair",
    category: "chairs",
    room: "dining-room",
    price: 26500,
    images: [
      { src: pexels("241520"), alt: "Dining chairs around a timber table" },
      { src: pexels("7538106"), alt: "Wooden chairs at a dining table" },
      { src: pexels("2995012"), alt: "White dining chairs in a bright room" },
    ],
    shortDescription: "Rattan backs, cushioned seats, sold as a pair.",
    description:
      "Two dining chairs with woven rattan backs and a padded seat in a neutral weave. Light enough to move around when the table needs to become a desk.",
    dimensions: { width: 46, height: 82, depth: 52 },
    materials: ["Rattan back", "Solid wood frame", "Padded seat"],
    colors: [C.natural, C.black, C.white],
    assembly: "No assembly required, delivered ready to use.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-05-30",
  },
  {
    slug: "malindi-storage-bench",
    name: "Malindi Storage Bench",
    category: "storage",
    room: "dining-room",
    price: 24500,
    images: [
      { src: pexels("7538106"), alt: "Timber bench seating at a dining table" },
      { src: pexels("241520"), alt: "Dining bench and table in a warm room" },
      { src: pexels("2995012"), alt: "Dining area with a pale timber bench" },
    ],
    shortDescription: "Extra seats at the table, with a home for the clutter.",
    description:
      "A dining bench with a lift up seat and a divided storage bay underneath. Good for a small dining room that also has to store table linen, board games and the good cutlery.",
    dimensions: { width: 140, height: 46, depth: 38 },
    materials: ["Solid acacia", "Plywood storage bay", "Soft close hinges"],
    colors: [C.natural, C.walnut],
    assembly: "Assembly included at delivery.",
    assemblyIncluded: true,
    deliveryEstimate: "Nairobi, 3 to 5 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-06-16",
  },
  {
    slug: "hurlingham-high-back-office-chair",
    name: "Hurlingham High-Back Office Chair",
    category: "chairs",
    room: "home-office",
    price: 38500,
    images: [
      { src: local.officeChair, alt: "Light grey high back office chair with chrome base" },
      { src: pexels("36123565"), alt: "Home office desk with a laptop and books" },
      { src: pexels("10922370"), alt: "Desk with a warm lamp, plant and computer" },
    ],
    shortDescription: "Support for a full working day, not just an hour.",
    description:
      "A high back task chair with adjustable height, a tilting back and a seat that stays comfortable past the third meeting. The mesh back keeps you cool in a Nairobi afternoon.",
    dimensions: { width: 66, height: 118, depth: 68 },
    materials: ["Mesh back", "Fabric seat", "Chrome base"],
    colors: [C.stone, C.charcoal, C.black],
    assembly: "Assembly included at delivery, gas lift tested on site.",
    assemblyIncluded: true,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: false,
    bestSeller: true,
    featured: false,
    createdAt: "2026-01-08",
  },
  {
    slug: "nairobi-walnut-writing-desk",
    name: "Nairobi Walnut Writing Desk",
    category: "tables",
    room: "home-office",
    price: 42500,
    images: [
      { src: pexels("36123565"), alt: "Minimal writing desk with a laptop, cup and books" },
      { src: pexels("10922370"), alt: "Desk with a lamp and a plant" },
      { src: pexels("6444973"), alt: "Calm neutral interior with timber furniture" },
    ],
    shortDescription: "A slim desk with one drawer and cable space at the back.",
    description:
      "A writing desk in walnut with a shallow drawer and a cable cut out at the back, so the laptop charger stays out of sight. Works against a wall or floated in the middle of a room.",
    dimensions: { width: 120, height: 75, depth: 55 },
    materials: ["Walnut veneer", "Solid wood legs", "Metal runners"],
    colors: [C.walnut, C.natural, C.black],
    assembly: "Light assembly, legs fitted at delivery.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: false,
    bestSeller: false,
    featured: true,
    createdAt: "2026-04-27",
  },
  {
    slug: "lavington-task-floor-lamp",
    name: "Lavington Task Floor Lamp",
    category: "lighting",
    room: "home-office",
    price: 12900,
    images: [
      { src: local.floorLamp, alt: "Floor lamp with pale drum shade and timber base" },
      { src: pexels("10922370"), alt: "Warm desk lamp light in an office corner" },
      { src: pexels("36123565"), alt: "Bright home office with a desk by the window" },
    ],
    shortDescription: "A warm pool of light for late work and late reading.",
    description:
      "A tall floor lamp with a linen drum shade and a weighted timber base. The foot switch is on the cable, so you do not have to reach under the shade.",
    dimensions: { width: 36, height: 152, depth: 36 },
    materials: ["Linen shade", "Timber base", "Braided cable"],
    colors: [C.cream, C.black, C.natural],
    assembly: "Light assembly, shade and base to be joined.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-06-04",
  },
  {
    slug: "nyali-outdoor-lounge-set",
    name: "Nyali Outdoor Lounge Set",
    category: "sofas",
    room: "outdoor",
    price: 115000,
    compareAtPrice: 124000,
    images: [
      { src: pexels("12715508"), alt: "Outdoor lounge seating beside a pool" },
      { src: pexels("3629622"), alt: "Modern outdoor chairs on a timber deck" },
      { src: pexels("3063047"), alt: "Outdoor table and chair in sunlight" },
    ],
    shortDescription: "A four piece set that handles sun, rain and long lunches.",
    description:
      "A sofa, two chairs and a coffee table in powder coated aluminium with all weather cushions. Built for covered terraces and gardens, and light enough to rearrange when the shade moves.",
    dimensions: { width: 190, height: 76, depth: 82 },
    materials: ["Powder coated aluminium", "All weather cushions", "Woven resin"],
    colors: [C.natural, C.charcoal],
    assembly: "Assembly included at delivery.",
    assemblyIncluded: true,
    deliveryEstimate: "Nairobi, 4 to 7 working days",
    isNew: false,
    bestSeller: true,
    featured: false,
    createdAt: "2026-02-06",
  },
  {
    slug: "diani-teak-garden-table",
    name: "Diani Teak Garden Table",
    category: "tables",
    room: "outdoor",
    price: 68500,
    images: [
      { src: pexels("3063047"), alt: "Outdoor table and chair set in a garden" },
      { src: pexels("12715508"), alt: "Poolside seating and table" },
      { src: pexels("3629622"), alt: "Timber deck with lounge chairs and a table" },
    ],
    shortDescription: "Teak that greys gracefully and lasts for years.",
    description:
      "A garden table in solid teak with a slatted top that drains quickly when it rains. Left outside, the timber settles into a soft silver grey, or oil it once a season to keep the warm tone.",
    dimensions: { width: 150, height: 75, depth: 90 },
    materials: ["Solid teak", "Stainless steel fixings"],
    colors: [C.natural],
    assembly: "Assembly included at delivery.",
    assemblyIncluded: true,
    deliveryEstimate: "Nairobi, 4 to 7 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-03-02",
  },
  {
    slug: "malindi-bistro-chair-pair",
    name: "Malindi Bistro Chair Pair",
    category: "chairs",
    room: "outdoor",
    price: 18500,
    images: [
      { src: pexels("3063047"), alt: "Green metal café chair beside a small table" },
      { src: pexels("3629622"), alt: "Outdoor lounge chairs on a sunny deck" },
      { src: pexels("12715508"), alt: "Wicker chairs around a poolside table" },
    ],
    shortDescription: "Two stacking chairs for a balcony or a small café.",
    description:
      "A pair of powder coated steel chairs with a slatted seat. They stack flat against a wall when not in use, and the finish is ready for both sun and short rains.",
    dimensions: { width: 44, height: 82, depth: 50 },
    materials: ["Powder coated steel", "Weather resistant finish"],
    colors: [C.white, C.sage, C.black],
    assembly: "No assembly required, delivered ready to use.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: true,
    bestSeller: false,
    featured: false,
    createdAt: "2026-09-26",
  },
  {
    slug: "watamu-sun-lounger",
    name: "Watamu Sun Lounger",
    category: "chairs",
    room: "outdoor",
    price: 39500,
    images: [
      { src: pexels("3629622"), alt: "Sun lounger on an outdoor timber deck" },
      { src: pexels("12715508"), alt: "Outdoor seating area beside a pool" },
      { src: pexels("3063047"), alt: "Sunlit patio with outdoor furniture" },
    ],
    shortDescription: "Five back positions and a cushion that dries fast.",
    description:
      "A timber lounger with an adjustable back and a quick drying cushion. Made for poolside afternoons and the long balcony you never quite finish furnishing.",
    dimensions: { width: 68, height: 88, depth: 198 },
    materials: ["Solid eucalyptus", "Quick dry foam", "Outdoor fabric"],
    colors: [C.cream, C.stone, C.terracotta],
    assembly: "Assembly included at delivery.",
    assemblyIncluded: true,
    deliveryEstimate: "Nairobi, 4 to 7 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-01-29",
  },
  {
    slug: "kileleshwa-bunk-bed",
    name: "Kileleshwa Bunk Bed",
    category: "beds",
    room: "kids-room",
    price: 74500,
    images: [
      { src: pexels("4221413"), alt: "Wooden bunk bed in a children's bedroom" },
      { src: pexels("6670652"), alt: "Children's bedroom with a desk and bed" },
      { src: pexels("7045947"), alt: "Bedroom with storage and toys" },
    ],
    shortDescription: "Two beds, one footprint, and a proper ladder.",
    description:
      "A pine bunk bed with a wide ladder, raised guard rails and a slatted base on both levels. It splits into two single beds when the children want their own rooms.",
    dimensions: { width: 108, height: 172, depth: 202 },
    materials: ["Solid pine", "Non toxic water based finish", "Plywood slats"],
    colors: [C.natural, C.white],
    assembly: "Assembly included at delivery, safety rails checked on site.",
    assemblyIncluded: true,
    deliveryEstimate: "Nairobi, 4 to 6 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-05-14",
  },
  {
    slug: "kilimani-kids-study-desk",
    name: "Kilimani Kids Study Desk",
    category: "tables",
    room: "kids-room",
    price: 22500,
    images: [
      { src: pexels("6670652"), alt: "Children's study desk in a bright bedroom" },
      { src: pexels("4221413"), alt: "Bunk bed and play area in a kids room" },
      { src: pexels("36123565"), alt: "Desk with a laptop and stationery" },
    ],
    shortDescription: "A first desk with a shelf for the important things.",
    description:
      "A compact desk with a raised shelf and a cable gap, sized for homework and drawing. The height suits children from about six to twelve years old.",
    dimensions: { width: 100, height: 74, depth: 50 },
    materials: ["Pine wood", "Water based finish"],
    colors: [C.white, C.natural, C.sage],
    assembly: "Light assembly, tools included.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 3 to 5 working days",
    isNew: true,
    bestSeller: false,
    featured: false,
    createdAt: "2026-09-18",
  },
  {
    slug: "lavington-kids-bookshelf",
    name: "Lavington Kids Bookshelf",
    category: "storage",
    room: "kids-room",
    price: 16900,
    images: [
      { src: pexels("32736387"), alt: "Low shelf with books and decor in a child's room" },
      { src: pexels("6670652"), alt: "Kids bedroom with a bookshelf and desk" },
      { src: pexels("4221413"), alt: "Children's room with storage and a bunk bed" },
    ],
    shortDescription: "Low shelves so the books are actually reachable.",
    description:
      "A low, wide bookshelf with four open bays and rounded edges. It is stable enough to be leaned on and simple enough for children to keep tidy themselves.",
    dimensions: { width: 90, height: 72, depth: 30 },
    materials: ["Pine wood", "Rounded edges", "Water based finish"],
    colors: [C.white, C.natural, C.sage],
    assembly: "Assembly included at delivery, anchored to the wall.",
    assemblyIncluded: true,
    deliveryEstimate: "Nairobi, 3 to 5 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-06-28",
  },
  {
    slug: "karen-pendant-light",
    name: "Karen Pendant Light",
    category: "lighting",
    room: "dining-room",
    price: 8900,
    images: [
      { src: pexels("10922370"), alt: "Warm pendant style lamp above a table" },
      { src: pexels("6903157"), alt: "Bedroom with pendant lights above the bed" },
      { src: pexels("241520"), alt: "Dining table under warm lighting" },
    ],
    shortDescription: "A single matte black pendant that flatters a dining table.",
    description:
      "A simple dome pendant in matte black with a warm white bulb included. Hang one over a small table, or three in a row over a longer one.",
    dimensions: { width: 30, height: 26, depth: 30 },
    materials: ["Powder coated steel", "Braided cable"],
    colors: [C.black, C.cream, C.natural],
    assembly: "Ceiling fixing required, a qualified electrician is recommended.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: true,
    bestSeller: false,
    featured: false,
    createdAt: "2026-09-12",
  },
  {
    slug: "muthaiga-table-lamp",
    name: "Muthaiga Table Lamp",
    category: "lighting",
    room: "bedroom",
    price: 6400,
    images: [
      { src: pexels("10922370"), alt: "Table lamp glowing on a desk" },
      { src: pexels("36123565"), alt: "Lamp on a desk with books" },
      { src: pexels("8135118"), alt: "Warm bedroom lighting beside a bed" },
    ],
    shortDescription: "Soft light for a bedside, with a ceramic base.",
    description:
      "A small table lamp with a glazed ceramic base and a linen shade. Warm enough for reading in bed without waking anyone else.",
    dimensions: { width: 24, height: 38, depth: 24 },
    materials: ["Glazed ceramic", "Linen shade", "Warm white bulb included"],
    colors: [C.cream, C.sage, C.terracotta],
    assembly: "No assembly required, delivered ready to use.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: true,
    bestSeller: false,
    featured: false,
    createdAt: "2026-10-08",
  },
  {
    slug: "naivasha-handwoven-wool-rug",
    name: "Naivasha Handwoven Wool Rug",
    category: "rugs",
    room: "living-room",
    price: 24500,
    images: [
      { src: pexels("4857775"), alt: "Living area with a soft rug under a sofa" },
      { src: pexels("4170056"), alt: "Open living room with a large area rug" },
      { src: pexels("11295890"), alt: "Sofa and cushion details above a rug" },
    ],
    shortDescription: "Handwoven wool, a quiet pattern, and a soft landing.",
    description:
      "A handwoven wool rug in a cream and sand weave. It is dense enough to feel warm underfoot and neutral enough to stay in the room when you change the sofa.",
    dimensions: { width: 160, height: 1, depth: 230 },
    materials: ["Handwoven wool", "Cotton warp", "Natural dyes"],
    colors: [C.cream, C.sand, C.stone],
    assembly: "No assembly required. Rug pad recommended on smooth floors.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: false,
    bestSeller: true,
    featured: false,
    createdAt: "2026-04-09",
  },
  {
    slug: "tsavo-flatweave-runner",
    name: "Tsavo Flatweave Runner",
    category: "rugs",
    room: "bedroom",
    price: 9800,
    images: [
      { src: pexels("11295890"), alt: "Textured textiles in a neutral living room" },
      { src: pexels("6758245"), alt: "Living room with rugs and layered textiles" },
      { src: pexels("6903157"), alt: "Bedroom floor with soft woven textiles" },
    ],
    shortDescription: "A warm runner for the side of the bed or a hallway.",
    description:
      "A flatweave runner in cotton with a terracotta stripe. Light enough to shake out, tough enough for a hallway that sees every pair of shoes in the house.",
    dimensions: { width: 70, height: 1, depth: 200 },
    materials: ["Cotton flatweave", "Natural dyes"],
    colors: [C.terracotta, C.sand, C.charcoal],
    assembly: "No assembly required.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: true,
    bestSeller: false,
    featured: false,
    createdAt: "2026-10-02",
  },
  {
    slug: "ngong-wall-clock",
    name: "Ngong Wall Clock",
    category: "decor-accessories",
    room: "living-room",
    price: 6500,
    images: [
      { src: local.wallClock, alt: "Round black wall clock with timber hands" },
      { src: pexels("4170056"), alt: "Living room wall with decor and furniture" },
      { src: pexels("32736387"), alt: "Shelf with art and decorative objects" },
    ],
    shortDescription: "A quiet sweep clock in matte black.",
    description:
      "A 40cm wall clock with a silent sweep movement, so there is no tick in a quiet room. The matte black face reads clearly from across a living room.",
    dimensions: { width: 40, height: 40, depth: 4 },
    materials: ["Matte black metal", "Timber hands", "Silent movement"],
    colors: [C.black, C.natural],
    assembly: "No assembly required. Hanging hardware included.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-07-22",
  },
  {
    slug: "karen-ceramic-planter",
    name: "Karen Ceramic Planter",
    category: "decor-accessories",
    room: "living-room",
    price: 3200,
    images: [
      { src: local.planter, alt: "White ceramic planter with a green plant" },
      { src: pexels("32736387"), alt: "Decor shelf with a plant and art" },
      { src: pexels("4170056"), alt: "Living room with plants and soft furnishings" },
    ],
    shortDescription: "A simple white pot with a drainage tray.",
    description:
      "A glazed ceramic planter with a matching drainage tray. It suits a snake plant, a small palm or the cutting that has been waiting in a jug for weeks.",
    dimensions: { width: 22, height: 20, depth: 22 },
    materials: ["Glazed ceramic", "Drainage tray included"],
    colors: [C.white, C.cream, C.terracotta],
    assembly: "No assembly required.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: true,
    bestSeller: false,
    featured: false,
    createdAt: "2026-10-12",
  },
  {
    slug: "kileleshwa-side-table",
    name: "Kileleshwa Side Table",
    category: "tables",
    room: "living-room",
    price: 9800,
    images: [
      { src: local.sideTable, alt: "Round side table in walnut beside a chair" },
      { src: pexels("4857775"), alt: "Small table beside a sofa in a studio flat" },
      { src: pexels("6758245"), alt: "Living room with a coffee table and sofa" },
    ],
    shortDescription: "A small round table that works beside anything.",
    description:
      "A compact walnut side table with a round top and three tapered legs. It fits beside an armchair, at the end of a sofa, or as a bedside table in a small room.",
    dimensions: { width: 42, height: 52, depth: 42 },
    materials: ["Walnut veneer", "Solid wood legs"],
    colors: [C.walnut, C.natural, C.black],
    assembly: "Light assembly, legs to be fitted.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-06-11",
  },
  {
    slug: "malindi-jute-round-rug",
    name: "Malindi Jute Round Rug",
    category: "rugs",
    room: "living-room",
    price: 12500,
    images: [
      { src: pexels("4170056"), alt: "Round rug under a coffee table in a bright room" },
      { src: pexels("4857775"), alt: "Living area with layered rugs and soft seating" },
      { src: pexels("6758245"), alt: "Neutral living room with woven textures" },
    ],
    shortDescription: "Natural jute, braided by hand, easy to live with.",
    description:
      "A round braided jute rug that adds texture under a small table or at the centre of a reading corner. Naturally hard wearing and easy to spot clean.",
    dimensions: { width: 150, height: 1, depth: 150 },
    materials: ["Hand braided jute", "Natural fibres"],
    colors: [C.sand, C.natural],
    assembly: "No assembly required.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-07-30",
  },
  {
    slug: "diani-woven-basket-set",
    name: "Diani Woven Basket Set",
    category: "decor-accessories",
    room: "living-room",
    price: 4800,
    images: [
      { src: pexels("32736387"), alt: "Woven baskets on a wooden shelf" },
      { src: pexels("6670652"), alt: "Baskets used for storage in a family room" },
      { src: pexels("7045947"), alt: "Bedroom storage baskets beside a wardrobe" },
    ],
    shortDescription: "Three baskets for the things that never find a home.",
    description:
      "A set of three woven baskets in graded sizes, made for blankets, toys and the shoes that live by the door. Woven by a women's cooperative in Kilifi.",
    dimensions: { width: 36, height: 30, depth: 36 },
    materials: ["Woven sisal", "Leather handles"],
    colors: [C.natural, C.white],
    assembly: "No assembly required.",
    assemblyIncluded: false,
    deliveryEstimate: "Nairobi, 2 to 4 working days",
    isNew: false,
    bestSeller: false,
    featured: false,
    createdAt: "2026-08-06",
  },
];

export const productMap = new Map(PRODUCTS.map((product) => [product.slug, product]));

export function getProduct(slug: string): Product | undefined {
  return productMap.get(slug);
}

export function getRoom(id: string): Room | undefined {
  return ROOMS.find((room) => room.id === id);
}

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((category) => category.id === id);
}

export function productCountForRoom(roomId: RoomId): number {
  return PRODUCTS.filter((product) => product.room === roomId).length;
}

export function productCountForCategory(categoryId: CategoryId): number {
  return PRODUCTS.filter((product) => product.category === categoryId).length;
}

export function featuredProducts(): Product[] {
  return PRODUCTS.filter((product) => product.featured).slice(0, 4);
}

export function bestSellers(): Product[] {
  return PRODUCTS.filter((product) => product.bestSeller);
}

export function newArrivals(limit = 8): Product[] {
  return [...PRODUCTS]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .filter((product) => product.isNew)
    .slice(0, limit);
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  const sameRoom = PRODUCTS.filter(
    (item) => item.slug !== product.slug && item.room === product.room,
  );
  const sameCategory = PRODUCTS.filter(
    (item) =>
      item.slug !== product.slug &&
      item.category === product.category &&
      item.room !== product.room,
  );
  return [...sameRoom, ...sameCategory].slice(0, limit);
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "best-selling";

export type ProductFilters = {
  room?: string;
  category?: string;
  material?: string;
  colour?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  page?: number;
  perPage?: number;
};

export function filterProducts(filters: ProductFilters) {
  const {
    room,
    category,
    material,
    colour,
    minPrice,
    maxPrice,
    sort = "newest",
    page = 1,
    perPage = 12,
  } = filters;

  let items = PRODUCTS.filter((product) => {
    if (room && product.room !== room) return false;
    if (category && product.category !== category) return false;
    if (minPrice !== undefined && product.price < minPrice) return false;
    if (maxPrice !== undefined && product.price > maxPrice) return false;
    if (material) {
      const group = MATERIAL_GROUPS.find(
        (entry) =>
          entry.label.toLowerCase() === material.toLowerCase() ||
          entry.id === material.toLowerCase(),
      );
      const hasMaterial = group
        ? product.materials.some((item) => group.match.test(item))
        : product.materials.some((item) =>
            item.toLowerCase().includes(material.toLowerCase()),
          );
      if (!hasMaterial) return false;
    }
    if (colour) {
      const hasColour = product.colors.some((item) =>
        item.name.toLowerCase().includes(colour.toLowerCase()),
      );
      if (!hasColour) return false;
    }
    return true;
  });

  switch (sort) {
    case "price-asc":
      items = [...items].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      items = [...items].sort((a, b) => b.price - a.price);
      break;
    case "best-selling":
      items = [...items].sort(
        (a, b) => Number(b.bestSeller) - Number(a.bestSeller) || b.price - a.price,
      );
      break;
    default:
      items = [...items].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    total,
    page: safePage,
    perPage,
    totalPages,
  };
}

export const MATERIAL_GROUPS: { id: string; label: string; match: RegExp }[] = [
  {
    id: "wood",
    label: "Wood",
    match: /wood|oak|acacia|mango|pine|eucalyptus|beech|mahogany|plywood|walnut|teak/i,
  },
  {
    id: "fabric",
    label: "Fabric and upholstery",
    match: /fabric|upholster|linen|velvet|cotton|woven|weave|canvas|polyester|boucle|cushion|foam/i,
  },
  {
    id: "leather",
    label: "Leather",
    match: /leather/i,
  },
  {
    id: "metal",
    label: "Metal",
    match: /metal|steel|chrome|brass|iron|aluminium|powder coated/i,
  },
  {
    id: "rattan",
    label: "Rattan and cane",
    match: /rattan|cane|wicker|bamboo/i,
  },
  {
    id: "glass",
    label: "Glass and mirror",
    match: /glass|mirror/i,
  },
  {
    id: "ceramic",
    label: "Ceramic and stone",
    match: /ceramic|stone|terracotta|clay|marble/i,
  },
  {
    id: "natural",
    label: "Natural fibres",
    match: /wool|jute|sisal|seagrass|hemp|raffia/i,
  },
];

export function materialOptions(): string[] {
  return MATERIAL_GROUPS.map((group) => group.label);
}

export function materialCountForGroup(group: string): number {
  const entry = MATERIAL_GROUPS.find((item) => item.label === group || item.id === group);
  if (!entry) return 0;
  return PRODUCTS.filter((product) =>
    product.materials.some((item) => entry.match.test(item)),
  ).length;
}

export function colourOptions(): { name: string; hex: string }[] {
  const map = new Map<string, string>();
  PRODUCTS.forEach((product) =>
    product.colors.forEach((colour) => {
      if (!map.has(colour.name)) map.set(colour.name, colour.hex);
    }),
  );
  return Array.from(map, ([name, hex]) => ({ name, hex })).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}
