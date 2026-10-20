import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { cartAddSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = cartAddSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid cart item" },
      { status: 400 },
    );
  }

  const product = getProduct(parsed.data.productId);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const colour = product.colors.some((option) => option.name === parsed.data.colourOption)
    ? parsed.data.colourOption
    : product.colors[0]?.name ?? "Default";

  return NextResponse.json({
    line: {
      key: `${product.slug}::${colour}`,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0].src,
      colour,
      quantity: Math.min(10, parsed.data.quantity),
    },
    stock: { inStock: true, maxPerOrder: 10 },
  });
}
