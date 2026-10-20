"use client";

import Link from "next/link";
import { cartTotals, useCart } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import { DELIVERY_ZONES, SITE } from "@/lib/site";
import { formatKes } from "@/lib/format";

export default function CartView() {
  const hydrated = useHydrated();
  const items = useCart((state) => state.items);
  const zone = useCart((state) => state.zone);
  const setZone = useCart((state) => state.setZone);
  const setQuantity = useCart((state) => state.setQuantity);
  const remove = useCart((state) => state.remove);
  const clear = useCart((state) => state.clear);
  const { count, subtotal } = cartTotals(items);

  const selectedZone = DELIVERY_ZONES.find((item) => item.id === zone) ?? DELIVERY_ZONES[1];
  const deliveryFee = subtotal >= SITE.freeDeliveryThreshold ? 0 : selectedZone.fee;
  const total = subtotal + deliveryFee;
  const remaining = Math.max(0, SITE.freeDeliveryThreshold - subtotal);

  if (!hydrated) {
    return (
      <div className="container py-5">
        <p className="text-muted">Loading your cart.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-5">
        <div className="empty-state">
          <i className="bi bi-bag" aria-hidden="true" />
          <h2 className="h4 mt-3 mb-2">Your cart is empty.</h2>
          <p className="text-muted mb-4">
            Start with a sofa, a bed, or something small for a shelf.
          </p>
          <Link href="/shop" className="btn btn-primary">
            Shop the collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-4 g-lg-5">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-baseline mb-3">
            <span className="micro-label">
              {count} {count === 1 ? "item" : "items"}
            </span>
            <button type="button" className="link-quiet" onClick={clear}>
              Clear cart
            </button>
          </div>

          {items.map((line) => (
            <div className="cart-line" key={line.key}>
              <Link href={`/shop/${line.slug}`} className="cart-line-media">
                <img src={line.image} alt={line.name} />
              </Link>
              <div>
                <h3>
                  <Link href={`/shop/${line.slug}`} className="text-decoration-none">
                    {line.name}
                  </Link>
                </h3>
                <p className="meta mb-2">
                  {line.colour} · {formatKes(line.price)} each
                </p>
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
                  className="cart-line-remove d-block"
                  onClick={() => remove(line.key)}
                >
                  Remove
                </button>
              </div>
              <div className="text-end">
                <strong className="mono">{formatKes(line.price * line.quantity)}</strong>
              </div>
            </div>
          ))}

          <div className="mt-4">
            <Link href="/shop" className="btn btn-outline-dark btn-sm">
              <i className="bi bi-arrow-left me-2" aria-hidden="true" />
              Continue shopping
            </Link>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="summary-card">
            <h2>Order summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong className="mono">{formatKes(subtotal)}</strong>
            </div>

            <label className="micro-label d-block mt-3 mb-2" htmlFor="cart-zone">
              Delivery zone
            </label>
            <select
              id="cart-zone"
              className="form-select form-select-sm mb-3"
              value={zone}
              onChange={(event) => setZone(event.target.value)}
            >
              {DELIVERY_ZONES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>

            <div className="summary-row">
              <span>Delivery</span>
              <strong className="mono">
                {deliveryFee === 0 ? "Free" : formatKes(deliveryFee)}
              </strong>
            </div>
            <p className="text-muted mb-3" style={{ fontSize: "0.74rem" }}>
              {selectedZone.detail}. Usually {selectedZone.days} working days.
            </p>

            {remaining > 0 ? (
              <p className="text-muted mb-2" style={{ fontSize: "0.74rem" }}>
                Add {formatKes(remaining)} more for free delivery.
              </p>
            ) : (
              <p className="mb-2" style={{ fontSize: "0.74rem", color: "var(--jd-clay)" }}>
                Free delivery unlocked.
              </p>
            )}
            <div className="ship-progress mb-3">
              <span
                style={{
                  width: `${Math.min(100, Math.round((subtotal / SITE.freeDeliveryThreshold) * 100))}%`,
                }}
              />
            </div>

            <div className="summary-row summary-total">
              <span>Total</span>
              <span className="mono">{formatKes(total)}</span>
            </div>

            <Link href="/checkout" className="btn btn-primary w-100 mt-3">
              Proceed to checkout
            </Link>

            <p className="text-muted mt-3 mb-0" style={{ fontSize: "0.72rem" }}>
              Assembly is included on large items. Pay by M-Pesa or card after confirming your
              delivery details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
