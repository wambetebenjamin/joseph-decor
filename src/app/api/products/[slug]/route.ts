import { NextResponse } from "next/server";
import { getProduct, relatedProducts } from "@/lib/products";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({
    product,
    related: relatedProducts(product, 4).map((item) => item.slug),
  });
}
