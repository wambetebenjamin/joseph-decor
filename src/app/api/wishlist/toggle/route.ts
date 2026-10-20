import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { kvGet, kvSet } from "@/lib/kv";
import { getProduct } from "@/lib/products";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Sign in to save a wishlist" }, { status: 401 });
  }

  let body: { productId?: string };
  try {
    body = (await request.json()) as { productId?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const product = body.productId ? getProduct(body.productId) : undefined;
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const key = `wishlist:${session.user.email.toLowerCase()}`;
  const current = (await kvGet<string[]>(key)) ?? [];
  const exists = current.includes(product.slug);
  const wishlist = exists
    ? current.filter((slug) => slug !== product.slug)
    : [...current, product.slug];

  await kvSet(key, wishlist);

  return NextResponse.json({
    wishlist,
    added: !exists,
    product: { slug: product.slug, name: product.name, price: product.price },
  });
}
