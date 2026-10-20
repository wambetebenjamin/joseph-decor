import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { getProduct, type Product } from "@/lib/products";
import { pexels } from "@/lib/images";
import { formatKes } from "@/lib/format";
import { WHATSAPP_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Room planner",
  description:
    "Six styled room mood boards for Nairobi homes, with shoppable furniture recommendations for each look.",
};

type MoodBoard = {
  room: string;
  style: string;
  description: string;
  detail: string;
  images: [string, string];
  palette: { name: string; hex: string }[];
  products: string[];
};

const MOODBOARDS: MoodBoard[] = [
  {
    room: "Living Room",
    style: "Nairobi Modern",
    description:
      "A cream sofa against warm timber, one deep navy chair for contrast and a handwoven rug to soften the hard lines. This is the look most of our Nairobi customers start with, and it ages well.",
    detail: "Best for open plan apartments in Kilimani, Westlands and Kileleshwa.",
    images: [pexels("4170056"), pexels("11295890")],
    palette: [
      { name: "Cream", hex: "#efe9dd" },
      { name: "Navy", hex: "#2f4f5f" },
      { name: "Walnut", hex: "#6b4a35" },
      { name: "Clay", hex: "#d47f31" },
    ],
    products: [
      "nairobi-three-seater-sofa",
      "karen-navy-accent-chair",
      "kileleshwa-side-table",
      "naivasha-handwoven-wool-rug",
      "ngong-wall-clock",
      "karen-ceramic-planter",
    ],
  },
  {
    room: "Bedroom",
    style: "Coastal Kenyan",
    description:
      "Soft greys and pale timber with a woven runner at the side of the bed. Keep the palette light, add one warm lamp, and let the textiles carry the texture instead of pattern.",
    detail: "A calm base for bedrooms in Nyali, Diani and Nairobi's cooler suburbs.",
    images: [pexels("6903157"), pexels("6444973")],
    palette: [
      { name: "Stone", hex: "#dad7d2" },
      { name: "Sand", hex: "#d9c7ae" },
      { name: "Natural", hex: "#b58b5e" },
      { name: "White", hex: "#f7f6f3" },
    ],
    products: [
      "karen-upholstered-queen-bed",
      "nyali-bedside-table",
      "muthaiga-table-lamp",
      "tsavo-flatweave-runner",
      "diani-woven-basket-set",
    ],
  },
  {
    room: "Dining Room",
    style: "Warm Minimalist",
    description:
      "Round tables make small dining rooms feel generous. Pair mango wood with woven chairs, one sculptural pendant and a bench that hides the table linen when the meal is over.",
    detail: "Works in apartments where the dining table doubles as a desk.",
    images: [pexels("2995012"), pexels("7538106")],
    palette: [
      { name: "Natural", hex: "#b58b5e" },
      { name: "Cream", hex: "#efe9dd" },
      { name: "Black", hex: "#211f1c" },
      { name: "Terracotta", hex: "#b4593a" },
    ],
    products: [
      "mombasa-round-dining-table",
      "diani-dining-chair-pair",
      "malindi-storage-bench",
      "karen-pendant-light",
    ],
  },
  {
    room: "Home Office",
    style: "Quiet Focus",
    description:
      "A slim walnut desk by the window, a chair that supports a full day and one lamp doing the work of three ceiling lights. Keep the surface mostly clear and the cables out of sight.",
    detail: "Built for remote work in a spare room or a corner of the living room.",
    images: [pexels("36123565"), pexels("10922370")],
    palette: [
      { name: "Walnut", hex: "#6b4a35" },
      { name: "Stone", hex: "#dad7d2" },
      { name: "Black", hex: "#211f1c" },
      { name: "Sage", hex: "#9db9a5" },
    ],
    products: [
      "nairobi-walnut-writing-desk",
      "hurlingham-high-back-office-chair",
      "lavington-task-floor-lamp",
      "kilimani-bookshelf",
    ],
  },
  {
    room: "Outdoor",
    style: "Garden Retreat",
    description:
      "Weather ready seating around a low table, with a lounger for the afternoon sun. Powder coated frames and quick dry cushions mean the room can stay outside through the short rains.",
    detail: "For balconies, terraces and garden corners in Nairobi and the coast.",
    images: [pexels("12715508"), pexels("3063047")],
    palette: [
      { name: "Natural", hex: "#b58b5e" },
      { name: "Sage", hex: "#9db9a5" },
      { name: "Cream", hex: "#efe9dd" },
      { name: "Charcoal", hex: "#3a3834" },
    ],
    products: [
      "nyali-outdoor-lounge-set",
      "diani-teak-garden-table",
      "malindi-bistro-chair-pair",
      "watamu-sun-lounger",
    ],
  },
  {
    room: "Kids Room",
    style: "Playful Calm",
    description:
      "A bunk bed that splits into two singles, a low shelf the children can reach and a desk that grows with them. Natural pine and soft sage keep the room playful without turning it into a toy shop.",
    detail: "Designed for shared rooms and small Nairobi apartments.",
    images: [pexels("4221413"), pexels("6670652")],
    palette: [
      { name: "Sage", hex: "#9db9a5" },
      { name: "Natural", hex: "#b58b5e" },
      { name: "White", hex: "#f7f6f3" },
      { name: "Sand", hex: "#d9c7ae" },
    ],
    products: [
      "kileleshwa-bunk-bed",
      "kilimani-kids-study-desk",
      "lavington-kids-bookshelf",
      "diani-woven-basket-set",
    ],
  },
];

export default function RoomPlannerPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>Room planner</li>
            </ol>
          </nav>
          <span className="eyebrow">Room planner</span>
          <h1 className="mt-3 mb-3">Six looks, ready to copy.</h1>
          <p className="section-intro mb-0">
            Our stylists put these boards together from pieces we actually stock. Start with the
            look closest to your room, then swap a piece or two until it feels like yours.
          </p>
        </div>
      </section>

      <div className="container">
        {MOODBOARDS.map((board, index) => {
          const products = board.products
            .map((slug) => getProduct(slug))
            .filter((product): product is Product => Boolean(product));

          return (
            <section className="moodboard" key={board.style}>
              <div className="row g-4 g-lg-5 align-items-center">
                <div className={`col-lg-6${index % 2 === 1 ? " order-lg-2" : ""}`}>
                  <Reveal>
                    <div className="mood-grid">
                      <div className="mood-img tall">
                        <img
                          src={board.images[0]}
                          alt={`${board.style} ${board.room.toLowerCase()} inspiration`}
                          loading="lazy"
                        />
                      </div>
                      <div className="mood-stack">
                        <div className="mood-img short">
                          <img
                            src={board.images[1]}
                            alt={`Details from the ${board.style} look`}
                            loading="lazy"
                          />
                        </div>
                        <div
                          style={{
                            border: "1px solid var(--jd-line)",
                            padding: "1rem",
                            background: "var(--jd-canvas)",
                          }}
                        >
                          <span className="micro-label d-block mb-2">Palette</span>
                          <div className="d-flex gap-1">
                            {board.palette.map((colour) => (
                              <span
                                key={colour.name}
                                title={colour.name}
                                style={{
                                  width: "100%",
                                  height: "26px",
                                  backgroundColor: colour.hex,
                                  border: "1px solid var(--jd-line-strong)",
                                }}
                              />
                            ))}
                          </div>
                          <p className="text-muted mb-0 mt-2" style={{ fontSize: "0.7rem" }}>
                            {board.palette.map((colour) => colour.name).join(" / ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>

                <div className="col-lg-6">
                  <Reveal delay={0.08}>
                    <span className="eyebrow">{board.room}</span>
                    <h2 className="style-name">{board.style}</h2>
                    <p className="section-intro" style={{ maxWidth: "52ch" }}>
                      {board.description}
                    </p>
                    <p className="text-muted" style={{ fontSize: "0.78rem" }}>
                      {board.detail}
                    </p>

                    <ul className="mood-products">
                      {products.map((product) => (
                        <li key={product.slug}>
                          <img src={product.images[0].src} alt={product.name} loading="lazy" />
                          <Link href={`/shop/${product.slug}`}>{product.name}</Link>
                          <span className="mono">{formatKes(product.price)}</span>
                          <Link href={`/shop/${product.slug}`} aria-label={`View ${product.name}`}>
                            <i className="bi bi-arrow-right" aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/shop?room=${board.room.toLowerCase().replace(" ", "-")}`}
                      className="link-arrow mt-4 d-inline-flex"
                    >
                      Shop the {board.room.toLowerCase()}
                      <i className="bi bi-arrow-right" aria-hidden="true" />
                    </Link>
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="py-5 bg-light">
        <div className="container text-center">
          <span className="eyebrow">Not sure where to start?</span>
          <h2 className="section-title mt-3">Send us a photo of the room.</h2>
          <p className="section-intro mx-auto">
            Our team will suggest pieces that fit your space and budget. No charge, no pressure
            to buy.
          </p>
          <div className="d-flex justify-content-center gap-2 flex-wrap mt-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <i className="bi bi-whatsapp me-2" aria-hidden="true" />
              WhatsApp a stylist
            </a>
            <Link href="/shop" className="btn btn-outline-dark">
              Browse all furniture
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
