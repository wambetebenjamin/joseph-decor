"use client";

import { useState } from "react";
import { useCart, useToasts } from "@/lib/store";
import WishlistButton from "./WishlistButton";
import type { Product } from "@/lib/products";

export default function PDPBuyBox({ product }: { product: Product }) {
  const [colour, setColour] = useState(product.colors[0]?.name ?? "Default");
  const [quantity, setQuantity] = useState(1);
  const [busy, setBusy] = useState(false);
  const add = useCart((state) => state.add);
  const push = useToasts((state) => state.push);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <span className="micro-label">Colour</span>
        <span style={{ fontSize: "0.82rem" }}>{colour}</span>
      </div>
      <div className="swatch-row mb-4">
        {product.colors.map((option) => (
          <button
            key={option.name}
            type="button"
            className={`swatch${colour === option.name ? " is-active" : ""}`}
            style={{ backgroundColor: option.hex }}
            onClick={() => setColour(option.name)}
            aria-label={`Select ${option.name}`}
            aria-pressed={colour === option.name}
            title={option.name}
          />
        ))}
      </div>

      <div className="d-flex flex-wrap align-items-center gap-3">
        <div className="qty" role="group" aria-label="Quantity">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            aria-label="Decrease quantity"
          >
            <i className="bi bi-dash" aria-hidden="true" />
          </button>
          <span className="mono">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(10, value + 1))}
            aria-label="Increase quantity"
          >
            <i className="bi bi-plus" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          className="btn btn-primary flex-grow-1"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            add(
              {
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0].src,
                colour,
              },
              quantity,
            );
            push(`${product.name} added to cart`);
            try {
              await fetch("/api/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  productId: product.slug,
                  quantity,
                  colourOption: colour,
                }),
              });
            } catch {
              // The device cart is the source of truth for shoppers.
            } finally {
              setBusy(false);
            }
          }}
        >
          <i className="bi bi-bag-plus me-2" aria-hidden="true" />
          {busy ? "Adding" : "Add to cart"}
        </button>
      </div>

      <div className="d-flex align-items-center gap-3 mt-3">
        <WishlistButton
          slug={product.slug}
          name={product.name}
          className="link-quiet d-inline-flex align-items-center gap-2"
          showLabel
        />
        <span className="text-muted" style={{ fontSize: "0.7rem" }}>
          Saved items stay on this device, and in your account when signed in.
        </span>
      </div>
    </div>
  );
}
