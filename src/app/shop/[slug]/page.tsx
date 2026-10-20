import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import PDPBuyBox from "@/components/PDPBuyBox";
import ProductCard from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import {
  PRODUCTS,
  getCategory,
  getProduct,
  getRoom,
  relatedProducts,
} from "@/lib/products";
import { formatDimensions, formatKes } from "@/lib/format";
import { SITE } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | ${SITE.name}`,
      description: product.shortDescription,
      images: [{ url: product.images[0].src }],
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const room = getRoom(product.room);
  const category = getCategory(product.category);
  const related = relatedProducts(product, 4);
  const whatsapp = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    `Hello Joseph Decor, I would like to ask about the ${product.name} (${formatKes(product.price)}).`,
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => image.src),
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "KES",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/shop/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-4 pb-5">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb pt-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href={`/shop?category=${product.category}`}>{category?.name}</Link>
              </li>
              <li>{product.name}</li>
            </ol>
          </nav>

          <div className="row g-4 g-lg-5 mt-1">
            <div className="col-lg-7">
              <ProductGallery images={product.images} />
            </div>

            <div className="col-lg-5">
              <span className="micro-label">
                {room?.name} / {category?.name}
              </span>
              <h1 className="pdp-title mt-2 mb-2">{product.name}</h1>
              <div className="d-flex align-items-baseline gap-3 mb-3">
                <span className="pdp-price mono">{formatKes(product.price)}</span>
                {product.compareAtPrice ? (
                  <s className="text-muted mono">{formatKes(product.compareAtPrice)}</s>
                ) : null}
                <span className="micro-label">VAT included</span>
              </div>

              <p className="pdp-copy">{product.shortDescription}</p>
              <p className="pdp-copy" style={{ fontSize: "0.9rem" }}>
                {product.description}
              </p>

              <PDPBuyBox product={product} />

              <div className="spec-grid mt-4">
                <div className="spec-cell">
                  <span>Width</span>
                  <strong>{product.dimensions.width} cm</strong>
                </div>
                <div className="spec-cell">
                  <span>Depth</span>
                  <strong>{product.dimensions.depth} cm</strong>
                </div>
                <div className="spec-cell">
                  <span>Height</span>
                  <strong>{product.dimensions.height} cm</strong>
                </div>
              </div>
              <p className="text-muted mt-2 mb-0" style={{ fontSize: "0.76rem" }}>
                Full footprint: {formatDimensions(product.dimensions)}. Measure your doorway and
                lift before ordering large pieces.
              </p>

              <div className="mt-4">
                <div className="pdp-note">
                  <i className="bi bi-layers" aria-hidden="true" />
                  <div>
                    <strong>Materials</strong>
                    {product.materials.join(", ")}
                  </div>
                </div>
                <div className="pdp-note">
                  <i className="bi bi-tools" aria-hidden="true" />
                  <div>
                    <strong>Assembly</strong>
                    {product.assembly}
                  </div>
                </div>
                <div className="pdp-note">
                  <i className="bi bi-truck" aria-hidden="true" />
                  <div>
                    <strong>Estimated delivery</strong>
                    {product.deliveryEstimate}. Free delivery above KES 15,000.
                  </div>
                </div>
                <div className="pdp-note">
                  <i className="bi bi-arrow-repeat" aria-hidden="true" />
                  <div>
                    <strong>Returns</strong>
                    7 days from delivery, unused and in original packaging.
                  </div>
                </div>
              </div>

              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark w-100 mt-4"
              >
                <i className="bi bi-whatsapp me-2" aria-hidden="true" />
                Ask about this piece on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="py-5 bg-light">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <div>
                  <span className="eyebrow">Pairs well with</span>
                  <h2 className="section-title mt-3">Complete the room.</h2>
                </div>
                <Link href={`/shop?room=${product.room}`} className="link-arrow">
                  More for the {room?.name.toLowerCase()}
                  <i className="bi bi-arrow-right" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
            <div className="row g-3 g-lg-4">
              {related.map((item) => (
                <div className="col-6 col-lg-3" key={item.slug}>
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
