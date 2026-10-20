"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ProductImage } from "@/lib/products";

export default function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="product-gallery-main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt}
            initial={reduced ? undefined : { opacity: 0, scale: 1.02 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AnimatePresence>
      </div>

      <div className="gallery-thumbs" role="group" aria-label="Product images">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`gallery-thumb${index === active ? " is-active" : ""}`}
            onClick={() => setActive(index)}
            aria-label={`View image ${index + 1}: ${image.alt}`}
            aria-pressed={index === active}
          >
            <img src={image.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
