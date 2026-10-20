"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCart, useToasts } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import { cartTotals } from "@/lib/store";
import { DELIVERY_ZONES, SITE } from "@/lib/site";
import { formatKes } from "@/lib/format";
import { checkoutSchema, type CheckoutInput } from "@/lib/schemas";
import { executeRecaptcha } from "@/lib/recaptchaClient";
import RecaptchaFallback from "./RecaptchaFallback";

export default function CheckoutForm() {
  const hydrated = useHydrated();
  const router = useRouter();
  const items = useCart((state) => state.items);
  const zoneId = useCart((state) => state.zone);
  const setZone = useCart((state) => state.setZone);
  const clear = useCart((state) => state.clear);
  const push = useToasts((state) => state.push);
  const { count, subtotal } = cartTotals(items);

  const [minDate, setMinDate] = useState("");
  const [fallbackV2, setFallbackV2] = useState(false);
  const [v2Token, setV2Token] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutInput>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      town: "",
      zone: zoneId,
      deliveryDate: "",
      assembly: true,
      instructions: "",
      payment: "mpesa",
    },
  });

  const selectedZone = DELIVERY_ZONES.find((zone) => zone.id === watch("zone")) ??
    DELIVERY_ZONES[1];
  const deliveryFee = subtotal >= SITE.freeDeliveryThreshold ? 0 : selectedZone.fee;
  const total = subtotal + deliveryFee;
  const payment = watch("payment");
  const assembly = watch("assembly");

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    setMinDate(date.toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    if (hydrated) setValue("zone", zoneId);
  }, [hydrated, zoneId, setValue]);

  if (!hydrated) {
    return (
      <div className="container py-5">
        <p className="text-muted">Loading checkout.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-5">
        <div className="empty-state">
          <i className="bi bi-bag" aria-hidden="true" />
          <h2 className="h4 mt-3 mb-2">There is nothing to check out yet.</h2>
          <p className="text-muted mb-4">Add a piece to your cart and come back here.</p>
          <Link href="/shop" className="btn btn-primary">
            Shop the collection
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (values: CheckoutInput) => {
    setServerError("");
    const parsed = checkoutSchema.safeParse(values);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof CheckoutInput;
        if (field) setError(field, { type: "manual", message: issue.message });
      });
      return;
    }

    try {
      const token = await executeRecaptcha("checkout");
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: parsed.data,
          items: items.map((line) => ({
            slug: line.slug,
            name: line.name,
            price: line.price,
            quantity: line.quantity,
            colour: line.colour,
            image: line.image,
          })),
          recaptchaToken: token ?? undefined,
          recaptchaV2Token: v2Token || undefined,
        }),
      });

      const data = (await response.json()) as {
        reference?: string;
        error?: string;
        fallback?: string;
        order?: {
          reference: string;
          subtotal: number;
          deliveryFee: number;
          total: number;
          estimatedDelivery: string;
          zoneLabel: string;
          createdAt: string;
        };
      };

      if (!response.ok || !data.order) {
        if (data.fallback === "v2") {
          setFallbackV2(true);
          setServerError(
            "Please complete the security check below, then place your order again.",
          );
          return;
        }
        setServerError(data.error ?? "We could not place that order. Please try again.");
        return;
      }

      const snapshot = {
        reference: data.order.reference,
        items,
        customer: parsed.data,
        subtotal: data.order.subtotal,
        deliveryFee: data.order.deliveryFee,
        total: data.order.total,
        estimatedDelivery: data.order.estimatedDelivery,
        zoneLabel: data.order.zoneLabel,
        createdAt: data.order.createdAt,
      };
      try {
        window.sessionStorage.setItem("joseph_decor_last_order", JSON.stringify(snapshot));
      } catch {
        // The confirmation page can still fetch the order when signed in.
      }
      clear();
      push("Order placed. Check your WhatsApp for confirmation.");
      router.push(`/order-confirmation?ref=${data.order.reference}`);
    } catch {
      setServerError("Something went wrong on the network. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="container py-5">
        <div className="row g-4 g-lg-5">
          <div className="col-lg-7">
            <div className="form-card">
              <div className="form-card-title">
                <span>01</span>
                <h2>Delivery details</h2>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="name">
                    Full name
                  </label>
                  <input
                    id="name"
                    className="form-control"
                    autoComplete="name"
                    placeholder="Jane Wanjiku"
                    {...register("name")}
                  />
                  {errors.name ? <p className="form-error">{errors.name.message}</p> : null}
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="phone">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    className="form-control"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="0712 345 678"
                    {...register("phone")}
                  />
                  {errors.phone ? <p className="form-error">{errors.phone.message}</p> : null}
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="email">
                    Email (optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    autoComplete="email"
                    placeholder="you@example.com"
                    {...register("email")}
                  />
                  {errors.email ? <p className="form-error">{errors.email.message}</p> : null}
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="address">
                    Delivery address
                  </label>
                  <input
                    id="address"
                    className="form-control"
                    autoComplete="street-address"
                    placeholder="Building, street, house number"
                    {...register("address")}
                  />
                  {errors.address ? <p className="form-error">{errors.address.message}</p> : null}
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="town">
                    Town or estate
                  </label>
                  <input
                    id="town"
                    className="form-control"
                    placeholder="Kilimani"
                    {...register("town")}
                  />
                  {errors.town ? <p className="form-error">{errors.town.message}</p> : null}
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="zone">
                    Delivery zone
                  </label>
                  <select
                    id="zone"
                    className="form-select"
                    {...register("zone", {
                      onChange: (event) => setZone(event.target.value),
                    })}
                  >
                    {DELIVERY_ZONES.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.label}
                      </option>
                    ))}
                  </select>
                  {errors.zone ? <p className="form-error">{errors.zone.message}</p> : null}
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="deliveryDate">
                    Preferred delivery date
                  </label>
                  <input
                    id="deliveryDate"
                    type="date"
                    className="form-control"
                    min={minDate}
                    {...register("deliveryDate")}
                  />
                  {errors.deliveryDate ? (
                    <p className="form-error">{errors.deliveryDate.message}</p>
                  ) : null}
                </div>
                <div className="col-12">
                  <div className="toggle-row">
                    <div>
                      <strong>Assembly requested</strong>
                      <small>
                        Included on beds, wardrobes, dining sets and large sofas. Our team
                        confirms timing by WhatsApp.
                      </small>
                    </div>
                    <label className="switch">
                      <input type="checkbox" {...register("assembly")} aria-label="Request assembly" />
                      <span aria-hidden="true" />
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="instructions">
                    Special instructions (optional)
                  </label>
                  <textarea
                    id="instructions"
                    className="form-control"
                    rows={3}
                    placeholder="Gate code, floor, or where to leave the pieces."
                    {...register("instructions")}
                  />
                  {errors.instructions ? (
                    <p className="form-error">{errors.instructions.message}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="form-card">
              <div className="form-card-title">
                <span>02</span>
                <h2>Payment</h2>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className={`pay-option${payment === "mpesa" ? " is-selected" : ""}`}>
                    <input type="radio" value="mpesa" {...register("payment")} />
                    <div>
                      <strong>
                        <i className="bi bi-phone me-2" aria-hidden="true" />
                        M-Pesa
                      </strong>
                      <small>
                        We send an STK prompt to your phone after you place the order.
                      </small>
                    </div>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className={`pay-option${payment === "card" ? " is-selected" : ""}`}>
                    <input type="radio" value="card" {...register("payment")} />
                    <div>
                      <strong>
                        <i className="bi bi-credit-card me-2" aria-hidden="true" />
                        Card
                      </strong>
                      <small>
                        A secure payment link is sent by our team once the order is confirmed.
                      </small>
                    </div>
                  </label>
                </div>
              </div>
              {errors.payment ? <p className="form-error">{errors.payment.message}</p> : null}

              <p className="text-muted mt-3 mb-0" style={{ fontSize: "0.76rem" }}>
                This shop does not store card numbers. Payment is completed with our team over
                a secure link or an M-Pesa prompt.
              </p>
            </div>

            {fallbackV2 ? (
              <div className="form-card">
                <RecaptchaFallback onToken={setV2Token} />
              </div>
            ) : null}

            {serverError ? (
              <div
                className="mt-3 p-3"
                role="alert"
                style={{ border: "1px solid #d9b3aa", background: "#fbf3f1", fontSize: "0.85rem" }}
              >
                {serverError}
              </div>
            ) : null}

            <p className="text-muted mt-4" style={{ fontSize: "0.74rem" }}>
              By placing this order you agree to our{" "}
              <Link href="/legal/terms" className="hover-underline">
                terms of sale
              </Link>{" "}
              and{" "}
              <Link href="/legal/privacy-policy" className="hover-underline">
                privacy policy
              </Link>
              . Protected by Google reCAPTCHA v3.
            </p>
          </div>

          <div className="col-lg-5">
            <div className="summary-card" style={{ position: "sticky", top: "100px" }}>
              <h2>Order summary</h2>

              {items.map((line) => (
                <div className="summary-line-item" key={line.key}>
                  <img src={line.image} alt={line.name} />
                  <div className="flex-grow-1">
                    <h3>{line.name}</h3>
                    <small>
                      {line.colour} · Qty {line.quantity}
                    </small>
                  </div>
                  <span className="mono" style={{ fontSize: "0.82rem" }}>
                    {formatKes(line.price * line.quantity)}
                  </span>
                </div>
              ))}

              <div className="summary-row mt-3">
                <span>Subtotal ({count} items)</span>
                <strong className="mono">{formatKes(subtotal)}</strong>
              </div>
              <div className="summary-row">
                <span>Delivery, {selectedZone.label}</span>
                <strong className="mono">
                  {deliveryFee === 0 ? "Free" : formatKes(deliveryFee)}
                </strong>
              </div>
              <div className="summary-row">
                <span>Assembly</span>
                <strong className="mono">{assembly ? "Included" : "Not requested"}</strong>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span className="mono">{formatKes(total)}</span>
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3" disabled={isSubmitting}>
                {isSubmitting ? "Placing order" : "Place order"}
                {!isSubmitting ? <i className="bi bi-arrow-right ms-2" aria-hidden="true" /> : null}
              </button>

              <p className="text-muted mt-3 mb-0" style={{ fontSize: "0.72rem" }}>
                Need help? WhatsApp {SITE.phoneDisplay}. We reply during working hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
