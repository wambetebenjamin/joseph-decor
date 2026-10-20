"use client";

import { useRouter } from "next/navigation";
import { useCart, useToasts } from "@/lib/store";

export default function ReorderButton({
  items,
}: {
  items: { slug: string; name: string; price: number; quantity: number; colour: string; image: string }[];
}) {
  const add = useCart((state) => state.add);
  const push = useToasts((state) => state.push);
  const router = useRouter();

  return (
    <button
      type="button"
      className="btn btn-outline-dark btn-sm"
      onClick={() => {
        items.forEach((item) =>
          add(
            {
              slug: item.slug,
              name: item.name,
              price: item.price,
              image: item.image,
              colour: item.colour,
            },
            item.quantity,
          ),
        );
        push("Order items added to your cart");
        router.push("/cart");
      }}
    >
      <i className="bi bi-arrow-repeat me-1" aria-hidden="true" />
      Reorder
    </button>
  );
}
