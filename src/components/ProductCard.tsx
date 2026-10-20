"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { formatDimensions, formatKes } from "@/lib/format";
import type { Product } from "@/lib/products";
import AddToCart from "./AddToCart";
import WishlistButton from "./WishlistButton";

export default function ProductCard({ product }: { product: Product }) {
  const reduced = useReducedMotion();
  const sale = Boolean(product.compareAtPrice);

  return (
    <motion.div
      className="product-card"
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <Link href={`/shop/${product.slug}`} className="product-media">
        {product.isNew ? <span className="product-badge">New</span> : null}
        {!product.isNew && sale ? <span className="product-badge is-sale">Sale</span> : null}
        {!product.isNew && !sale && product.bestSeller ? (
          <span className="product-badge">Best seller</span>
        ) : null}
        <img src={product.images[0].src} alt={product.images[0].alt} loading="lazy" />
      </Link>
      <WishlistButton slug={product.slug} name={product.name} />
      <div className="product-body">
        <span className="product-cat">{product.materials[0]}</span>
        <h3 className="product-name">
          <Link href={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>
        <span className="product-dims">{formatDimensions(product.dimensions)}</span>
        <div className="product-price">
          <strong className="mono">{formatKes(product.price)}</strong>
          {product.compareAtPrice ? (
            <s className="mono">{formatKes(product.compareAtPrice)}</s>
          ) : null}
        </div>
        <AddToCart product={product} />
      </div>
    </motion.div>
  );
}
