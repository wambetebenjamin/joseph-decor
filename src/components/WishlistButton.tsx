"use client";

import { useSession } from "next-auth/react";
import { useWishlist, useToasts } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";

export default function WishlistButton({
  slug,
  name,
  className = "wish-btn",
  showLabel = false,
}: {
  slug: string;
  name: string;
  className?: string;
  showLabel?: boolean;
}) {
  const hydrated = useHydrated();
  const saved = useWishlist((state) => state.slugs.includes(slug));
  const toggle = useWishlist((state) => state.toggle);
  const push = useToasts((state) => state.push);
  const { status } = useSession();

  const active = hydrated && saved;

  return (
    <button
      type="button"
      className={`${className}${active ? " is-active" : ""}`}
      aria-label={active ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      aria-pressed={active}
      onClick={async () => {
        const added = toggle(slug);
        push(added ? `${name} saved to your wishlist` : `${name} removed from your wishlist`);
        if (status === "authenticated") {
          try {
            await fetch("/api/wishlist/toggle", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ productId: slug }),
            });
          } catch {
            // The device copy is already updated.
          }
        }
      }}
    >
      <i className={`bi ${active ? "bi-heart-fill" : "bi-heart"}`} aria-hidden="true" />
      {showLabel ? <span>{active ? "Saved to wishlist" : "Add to wishlist"}</span> : null}
    </button>
  );
}
