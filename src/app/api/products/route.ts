import { NextResponse } from "next/server";
import { filterProducts, type SortOption } from "@/lib/products";

const SORTS: SortOption[] = ["newest", "price-asc", "price-desc", "best-selling"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sortParam = searchParams.get("sort") ?? "newest";
  const page = Number(searchParams.get("page") ?? "1");
  const perPage = Number(searchParams.get("perPage") ?? "12");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const result = filterProducts({
    room: searchParams.get("room") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    material: searchParams.get("material") ?? undefined,
    colour: searchParams.get("colour") ?? undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sort: SORTS.includes(sortParam as SortOption) ? (sortParam as SortOption) : "newest",
    page: Number.isFinite(page) ? page : 1,
    perPage: Number.isFinite(perPage) ? Math.min(60, Math.max(1, perPage)) : 12,
  });

  return NextResponse.json({
    ...result,
    filters: {
      room: searchParams.get("room"),
      category: searchParams.get("category"),
      material: searchParams.get("material"),
      colour: searchParams.get("colour"),
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
      sort: sortParam,
    },
  });
}
