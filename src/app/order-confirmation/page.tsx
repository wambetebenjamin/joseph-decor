import type { Metadata } from "next";
import OrderConfirmationView from "@/components/OrderConfirmationView";

export const metadata: Metadata = {
  title: "Order confirmation",
  description: "Your Joseph Decor order reference, items, delivery estimate and receipt.",
  robots: { index: false, follow: false },
};

export default function OrderConfirmationPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Thank you</span>
          <h1 className="mt-3 mb-2">Your order is in.</h1>
          <p className="section-intro mb-0">
            Keep this page for your records, or download the PDF receipt for your files.
          </p>
        </div>
      </section>
      <OrderConfirmationView />
    </>
  );
}
