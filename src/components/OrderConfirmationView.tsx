"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, useReducedMotion } from "framer-motion";
import { formatDate, formatKes } from "@/lib/format";
import { SITE } from "@/lib/site";
import { useToasts } from "@/lib/store";

type ViewOrder = {
  reference: string;
  items: {
    slug: string;
    name: string;
    price: number;
    quantity: number;
    colour: string;
    image: string;
  }[];
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    town: string;
    zone: string;
    deliveryDate: string;
    assembly: boolean;
    instructions?: string;
    payment: "mpesa" | "card";
  };
  subtotal: number;
  deliveryFee: number;
  total: number;
  estimatedDelivery: string;
  zoneLabel: string;
  createdAt: string;
};

export default function OrderConfirmationView() {
  const receiptRef = useRef<HTMLDivElement>(null);
  const push = useToasts((state) => state.push);
  const reduced = useReducedMotion();
  const { status } = useSession();
  const [reference, setReference] = useState("");
  const [order, setOrder] = useState<ViewOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [qr, setQr] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = (params.get("ref") ?? "").toUpperCase();
    setReference(ref);

    try {
      const raw = window.sessionStorage.getItem("joseph_decor_last_order");
      if (raw) {
        const snapshot = JSON.parse(raw) as ViewOrder;
        if (!ref || snapshot.reference === ref) setOrder(snapshot);
      }
    } catch {
      // ignore corrupted snapshots
    }

    if (!ref) setLoading(false);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      setLoading(false);
      return;
    }
    if (status !== "authenticated" || !reference) return;
    let cancelled = false;
    fetch(`/api/orders/${reference}`)
      .then(async (response) => {
        if (!response.ok) return null;
        const data = (await response.json()) as { order?: ViewOrder };
        return data.order ?? null;
      })
      .then((data) => {
        if (!cancelled && data) setOrder(data);
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [status, reference]);

  useEffect(() => {
    if (!order) return;
    if (!reference) return;
    let mounted = true;
    import("qrcode")
      .then((QRCode) =>
        QRCode.toDataURL(`${SITE.url}/order-confirmation?ref=${order.reference}`, {
          width: 220,
          margin: 1,
          color: { dark: "#211f1c", light: "#ffffff" },
        }),
      )
      .then((url) => {
        if (mounted) setQr(url);
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, [order, reference]);

  const downloadPdf = async () => {
    if (!receiptRef.current || !order) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const image = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pageWidth = 190;
      const imageHeight = (canvas.height * pageWidth) / canvas.width;
      pdf.addImage(image, "PNG", 10, 10, pageWidth, imageHeight);
      pdf.save(`Joseph-Decor-${order.reference}.pdf`);
      push("Receipt downloaded.");
    } catch {
      push("The receipt could not be generated. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading && !order) {
    return (
      <div className="container py-5">
        <p className="text-muted">Loading your order.</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5">
        <div className="empty-state">
          <i className="bi bi-receipt" aria-hidden="true" />
          <h2 className="h4 mt-3 mb-2">We could not find that order on this device.</h2>
          <p className="text-muted mb-4">
            {reference
              ? `Your reference is ${reference}. Sign in with the account you ordered from, or message us and we will resend the receipt.`
              : "Open the confirmation link from your order, or check My Orders if you have an account."}
          </p>
          <div className="d-flex justify-content-center gap-2 flex-wrap">
            <Link href="/my-orders" className="btn btn-primary btn-sm">
              My orders
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              className="btn btn-outline-dark btn-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
    );
  }

  const shareText = `My Joseph Decor order ${order.reference} is confirmed. Estimated delivery ${formatDate(
    order.estimatedDelivery,
  )}. Total ${formatKes(order.total)}.`;

  return (
    <div className="container py-5">
      <div className="row g-4 g-lg-5">
        <div className="col-lg-7">
          <motion.div
            className="receipt-card"
            ref={receiptRef}
            initial={reduced ? undefined : { opacity: 0, scale: 0.97 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="receipt-head">
              <div>
                <span className="micro-label d-block mb-2">Joseph Decor</span>
                <h1 className="h4 mb-1">Order receipt</h1>
                <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                  Placed {formatDate(order.createdAt)}
                </span>
              </div>
              <div className="text-lg-end">
                <span className="micro-label d-block mb-2">Reference</span>
                <span className="receipt-ref mono">{order.reference}</span>
              </div>
            </div>

            <table className="receipt-table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Qty</th>
                  <th scope="col" className="text-end">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={`${item.slug}-${item.colour}`}>
                    <td>
                      {item.name}
                      <br />
                      <span className="text-muted" style={{ fontSize: "0.76rem" }}>
                        {item.colour}
                      </span>
                    </td>
                    <td>{item.quantity}</td>
                    <td className="text-end mono">{formatKes(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="row g-4 mt-3">
              <div className="col-sm-6">
                <span className="micro-label d-block mb-1">Deliver to</span>
                <p className="mb-0" style={{ fontSize: "0.84rem", lineHeight: 1.7 }}>
                  {order.customer.name}
                  <br />
                  {order.customer.address}
                  <br />
                  {order.customer.town}, {order.zoneLabel}
                  <br />
                  {order.customer.phone}
                </p>
              </div>
              <div className="col-sm-6">
                <span className="micro-label d-block mb-1">Delivery and payment</span>
                <p className="mb-0" style={{ fontSize: "0.84rem", lineHeight: 1.7 }}>
                  Estimated {formatDate(order.estimatedDelivery)}
                  <br />
                  Payment: {order.customer.payment === "mpesa" ? "M-Pesa" : "Card link"}
                  <br />
                  Assembly: {order.customer.assembly ? "Requested" : "Not requested"}
                </p>
              </div>
            </div>

            {order.customer.instructions ? (
              <div className="mt-3">
                <span className="micro-label d-block mb-1">Instructions</span>
                <p className="mb-0" style={{ fontSize: "0.82rem" }}>
                  {order.customer.instructions}
                </p>
              </div>
            ) : null}

            <div className="mt-4">
              <div className="summary-row">
                <span>Subtotal</span>
                <span className="mono">{formatKes(order.subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className="mono">
                  {order.deliveryFee === 0 ? "Free" : formatKes(order.deliveryFee)}
                </span>
              </div>
              <div className="summary-row summary-total">
                <span>Total paid</span>
                <span className="mono">{formatKes(order.total)}</span>
              </div>
            </div>

            <div className="d-flex align-items-end justify-content-between gap-3 mt-4">
              <p className="text-muted mb-0" style={{ fontSize: "0.72rem" }}>
                Joseph Decor, {SITE.address}
                <br />
                {SITE.email} · {SITE.phoneDisplay}
              </p>
              {qr ? (
                <div className="text-center">
                  <img src={qr} alt="QR code to track this order" width={82} height={82} />
                  <span className="d-block text-muted" style={{ fontSize: "0.62rem" }}>
                    Scan to track
                  </span>
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>

        <div className="col-lg-5">
          <div className="form-card">
            <div className="d-flex align-items-center gap-2 mb-3">
              <i className="bi bi-check2-circle" aria-hidden="true" style={{ fontSize: "1.3rem" }} />
              <h2 className="h5 mb-0">Order confirmed</h2>
            </div>
            <p className="text-muted" style={{ fontSize: "0.86rem" }}>
              Thank you. Our team will confirm your delivery window on WhatsApp within one
              working day, and we will send an M-Pesa prompt or a secure card link if payment
              is still open.
            </p>

            <div className="summary-row">
              <span>Estimated delivery</span>
              <strong>{formatDate(order.estimatedDelivery)}</strong>
            </div>
            <div className="summary-row">
              <span>Delivering to</span>
              <strong>{order.zoneLabel}</strong>
            </div>

            <div className="d-grid gap-2 mt-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={downloadPdf}
                disabled={downloading}
              >
                <i className="bi bi-download me-2" aria-hidden="true" />
                {downloading ? "Preparing PDF" : "Download PDF receipt"}
              </button>
              <a
                className="btn btn-outline-dark"
                href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-whatsapp me-2" aria-hidden="true" />
                Share on WhatsApp
              </a>
              <Link href="/my-orders" className="btn btn-outline-dark">
                Track this order
              </Link>
              <Link href="/shop" className="btn-link text-center mt-2">
                Continue shopping
              </Link>
            </div>
          </div>

          <div className="form-card">
            <h2 className="h5 mb-3">What happens next</h2>
            <ul className="track">
              <li className="done current">
                <h3>Order confirmed</h3>
                <p>We have your order and will confirm the delivery date.</p>
                <time>{formatDate(order.createdAt)}</time>
              </li>
              <li>
                <h3>Packed and checked</h3>
                <p>Your pieces are inspected and wrapped in our Nairobi workshop.</p>
              </li>
              <li>
                <h3>Out for delivery</h3>
                <p>Our team calls before arriving, and assembly is done on site.</p>
              </li>
            </ul>
            {status !== "authenticated" ? (
              <p className="text-muted mt-3 mb-0" style={{ fontSize: "0.76rem" }}>
                <Link href="/auth/signin" className="hover-underline">
                  Sign in
                </Link>{" "}
                to keep this order in your account and track it later.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
