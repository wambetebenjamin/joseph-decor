import type { Metadata } from "next";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Your cart",
  description: "Review the pieces in your cart, adjust quantities and choose a delivery zone.",
};

export default function CartPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Almost yours</span>
          <h1 className="mt-3 mb-2">Your cart</h1>
          <p className="section-intro mb-0">
            Check the colourways and quantities, then choose a delivery zone to see the full
            total.
          </p>
        </div>
      </section>
      <CartView />
    </>
  );
}
