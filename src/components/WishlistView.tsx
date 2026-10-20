"use client";

import Link from "next/link";
import { useWishlist, useCart, useToasts } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import { formatDimensions, formatKes } from "@/lib/format";
import { getProduct } from "@/lib/products";

export default function WishlistView() {
  const hydrated = useHydrated();
  const slugs = useWishlist((state) => state.slugs);
  const remove = useWishlist((state) => state.remove);
  const add = useCart((state) => state.add);
  const push = useToasts((state) => state.push);

  if (!hydrated) {
    return (
      <div className="container py-5">
        <p className="text-muted">Loading your saved pieces.</p>
      </div>
    );
  }

  const products = slugs
    .map((slug) => getProduct(slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  if (products.length === 0) {
    return (
      <div className="container py-5">
        <div className="empty-state">
          <i className="bi bi-heart" aria-hidden="true" />
          <h2 className="h4 mt-3 mb-2">Nothing saved yet.</h2>
          <p className="text-muted mb-4">
            Tap the heart on any piece to keep it here while you decide.
          </p>
          <Link href="/shop" className="btn btn-primary">
            Browse the collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-baseline mb-4">
        <span className="micro-label">
          {products.length} saved {products.length === 1 ? "piece" : "pieces"}
        </span>
        <span className="text-muted" style={{ fontSize: "0.74rem" }}>
          Saved on this device, and in your account when signed in.
        </span>
      </div>

      <div className="row g-4">
        {products.map((product) => (
          <div className="col-md-6" key={product.slug}>
            <div className="product-card">
              <div className="row g-0">
                <div className="col-5">
                  <Link
                    href={`/shop/${product.slug}`}
                    className="product-media"
                    style={{ aspectRatio: "1 / 1", display: "block", height: "100%" }}
                  >
                    <img src={product.images[0].src} alt={product.images[0].alt} loading="lazy" />
                  </Link>
                </div>
                <div className="col-7">
                  <div className="product-body h-100">
                    <span className="product-cat">{product.materials[0]}</span>
                    <h3 className="product-name">
                      <Link href={`/shop/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <span className="product-dims">{formatDimensions(product.dimensions)}</span>
                    <div className="product-price">
                      <strong className="mono">{formatKes(product.price)}</strong>
                    </div>
                    <button
                      type="button"
                      className="btn-card"
                      onClick={() => {
                        add({
                          slug: product.slug,
                          name: product.name,
                          price: product.price,
                          image: product.images[0].src,
                          colour: product.colors[0]?.name ?? "Default",
                        });
                        remove(product.slug);
                        push(`${product.name} moved to your cart`);
                      }}
                    >
                      <i className="bi bi-bag-plus" aria-hidden="true" />
                      Move to cart
                    </button>
                    <button
                      type="button"
                      className="link-quiet mt-2"
                      onClick={() => remove(product.slug)}
                    >
                      Remove from saved
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
