import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createOrder, type OrderItem } from "@/lib/orders";
import { orderCreateSchema } from "@/lib/schemas";
import { getProduct } from "@/lib/products";
import { verifyRecaptchaToken } from "@/lib/recaptcha";
import { DELIVERY_ZONES } from "@/lib/site";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = orderCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Check your order details" },
      { status: 400 },
    );
  }

  const zoneValid = DELIVERY_ZONES.some((zone) => zone.id === parsed.data.customer.zone);
  if (!zoneValid) {
    return NextResponse.json({ error: "Choose a valid delivery zone" }, { status: 400 });
  }

  const items: OrderItem[] = [];
  for (const item of parsed.data.items) {
    const product = getProduct(item.slug);
    if (!product) {
      return NextResponse.json(
        { error: `We no longer stock ${item.name}. Please remove it and try again.` },
        { status: 400 },
      );
    }
    const colour = product.colors.some((option) => option.name === item.colour)
      ? item.colour
      : product.colors[0]?.name ?? "Default";

    items.push({
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity: Math.min(10, Math.max(1, item.quantity)),
      colour,
      image: product.images[0].src,
    });
  }

  const verification = parsed.data.recaptchaV2Token
    ? await verifyRecaptchaToken(parsed.data.recaptchaV2Token, "checkout")
    : await verifyRecaptchaToken(parsed.data.recaptchaToken, "checkout");

  if (verification.mode === "verified" && !verification.success) {
    return NextResponse.json(
      {
        error: "The security check did not pass. Please complete the fallback check.",
        fallback: "v2",
      },
      { status: 400 },
    );
  }

  const session = await auth();
  const email = session?.user?.email ?? parsed.data.customer.email ?? null;

  try {
    const order = await createOrder({
      customer: parsed.data.customer,
      items,
      email: email || null,
    });

    return NextResponse.json({
      reference: order.reference,
      order: {
        reference: order.reference,
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        total: order.total,
        estimatedDelivery: order.estimatedDelivery,
        zoneLabel: order.zoneLabel,
        createdAt: order.createdAt,
        status: order.status,
      },
    });
  } catch (error) {
    console.error("Order creation failed", error);
    return NextResponse.json(
      { error: "We could not save that order. Please try again or message us on WhatsApp." },
      { status: 500 },
    );
  }
}
