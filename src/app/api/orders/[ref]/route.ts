import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getOrder } from "@/lib/orders";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ref: string }> },
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Sign in to view this order" }, { status: 401 });
  }

  const { ref } = await params;
  const order = await getOrder(ref);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (!order.email || order.email.toLowerCase() !== session.user.email.toLowerCase()) {
    return NextResponse.json({ error: "This order belongs to another account" }, { status: 403 });
  }

  return NextResponse.json({ order });
}
