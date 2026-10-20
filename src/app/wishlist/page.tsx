import type { Metadata } from "next";
import WishlistView from "@/components/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Saved furniture and decor pieces for your room at Joseph Decor.",
};

export default function WishlistPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Saved for later</span>
          <h1 className="mt-3 mb-2">Wishlist</h1>
          <p className="section-intro mb-0">
            Keep the pieces you love in one place, move them to your cart when the room is
            ready, or send the list to someone for a hint.
          </p>
        </div>
      </section>
      <WishlistView />
    </>
  );
}
