"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cartTotals, useCart } from "@/lib/store";
import { SITE } from "@/lib/site";
import { formatKes } from "@/lib/format";

export default function CartDrawer() {
  const open = useCart((state) => state.drawerOpen);
  const close = useCart((state) => state.closeDrawer);
  const items = useCart((state) => state.items);
  const setQuantity = useCart((state) => state.setQuantity);
  const remove = useCart((state) => state.remove);
  const { count, subtotal } = cartTotals(items);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("jd-locked");
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("jd-locked");
    };
  }, [open, close]);

  const remaining = Math.max(0, SITE.freeDeliveryThreshold - subtotal);
  const progress = Math.min(100, Math.round((subtotal / SITE.freeDeliveryThreshold) * 100));

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.36, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="drawer-head">
              <h2>
                Your cart{count > 0 ? ` (${count})` : ""}
              </h2>
              <button
                ref={closeRef}
                type="button"
                className="drawer-close"
                onClick={close}
                aria-label="Close cart"
              >
                <i className="bi bi-x-lg" aria-hidden="true" />
              </button>
            </div>

            <div className="drawer-body">
              {items.length === 0 ? (
                <div className="py-5 text-center">
                  <i
                    className="bi bi-bag"
                    aria-hidden="true"
                    style={{ fontSize: "2rem", color: "var(--jd-grey-light)" }}
                  />
                  <p className="mt-3 mb-1">Your cart is empty.</p>
                  <p className="text-muted mb-4" style={{ fontSize: "0.82rem" }}>
                    Start with a sofa, a bed or something small for a shelf.
                  </p>
                  <Link href="/shop" className="btn btn-primary btn-sm" onClick={close}>
                    Shop the collection
                  </Link>
                </div>
              ) : (
                <>
                  {items.map((line) => (
                    <div key={line.key} className="drawer-line">
                      <img src={line.image} alt={line.name} />
                      <div>
                        <h3>{line.name}</h3>
                        <p className="meta mb-0">
                          {line.colour} · {formatKes(line.price)}
                        </p>
                        <div className="row-between">
                          <div className="qty qty-sm">
                            <button
                              type="button"
                              onClick={() => setQuantity(line.key, line.quantity - 1)}
                              aria-label={`Decrease quantity of ${line.name}`}
                            >
                              <i className="bi bi-dash" aria-hidden="true" />
                            </button>
                            <span className="mono">{line.quantity}</span>
                            <button
                              type="button"
                              onClick={() => setQuantity(line.key, line.quantity + 1)}
                              aria-label={`Increase quantity of ${line.name}`}
                            >
                              <i className="bi bi-plus" aria-hidden="true" />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="link-quiet"
                            onClick={() => remove(line.key)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="py-4">
                    <p className="mb-1" style={{ fontSize: "0.8rem" }}>
                      {remaining > 0
                        ? `${formatKes(remaining)} away from free delivery`
                        : "Free delivery unlocked on this order"}
                    </p>
                    <div className="ship-progress">
                      <span style={{ width: `${remaining > 0 ? progress : 100}%` }} />
                    </div>
                    <p className="text-muted mb-0" style={{ fontSize: "0.74rem" }}>
                      Delivery is calculated by zone at checkout.
                    </p>
                  </div>
                </>
              )}
            </div>

            {items.length > 0 ? (
              <div className="drawer-foot">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <strong className="mono">{formatKes(subtotal)}</strong>
                </div>
                <Link href="/checkout" className="btn btn-primary w-100 mt-3" onClick={close}>
                  Proceed to checkout
                </Link>
                <Link
                  href="/cart"
                  className="btn btn-outline-dark w-100 mt-2"
                  onClick={close}
                >
                  View cart
                </Link>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
