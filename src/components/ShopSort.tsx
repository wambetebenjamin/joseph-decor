"use client";

import { useRouter } from "next/navigation";
import type { SortOption } from "@/lib/products";
import { shopHref } from "@/lib/shopUrl";

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "best-selling", label: "Best selling" },
];

export default function ShopSort({ current }: { current: Record<string, string> }) {
  const router = useRouter();
  const value = current.sort ?? "newest";

  return (
    <div className="d-flex align-items-center gap-2">
      <label htmlFor="sort" className="micro-label mb-0">
        Sort
      </label>
      <select
        id="sort"
        className="form-select form-select-sm"
        style={{ minWidth: "190px" }}
        value={value}
        onChange={(event) => {
          router.push(shopHref(current, { sort: event.target.value, page: undefined }));
        }}
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
