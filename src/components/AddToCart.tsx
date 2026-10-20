"use client";

import { useState } from "react";
import { useCart, useToasts } from "@/lib/store";
import type { Product } from "@/lib/products";

export default function AddToCart({
  product,
  quantity = 1,
  colour,
  className = "btn-card",
  label = "Add to cart",
}: {
  product: Product;
  quantity?: number;
  colour?: string;
  className?: string;
  label?: string;
}) {
  const add = useCart((state) => state.add);
  const push = useToasts((state) => state.push);
  const [busy, setBusy] = useState(false);

  const chosen = colour ?? product.colors[0]?.name ?? "Default";

  return (
    <button
      type="button"
      className={className}
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        add(
          {
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.images[0].src,
            colour: chosen,
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
              colourOption: chosen,
            }),
          });
        } catch {
          // The cart is stored on the device, so a failed sync does not block the shopper.
        } finally {
          setBusy(false);
        }
      }}
    >
      <i className="bi bi-bag-plus" aria-hidden="true" />
      {busy ? "Adding" : label}
    </button>
  );
}
