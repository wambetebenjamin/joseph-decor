import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Confirm your delivery details, choose M-Pesa or card, and add assembly for your furniture order.",
};

export default function CheckoutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Delivery and payment</span>
          <h1 className="mt-3 mb-2">Checkout</h1>
          <p className="section-intro mb-0">
            Tell us where the pieces are going and how you would like to pay. Delivery is
            confirmed on WhatsApp within one working day.
          </p>
        </div>
      </section>
      <CheckoutForm />
    </>
  );
}
