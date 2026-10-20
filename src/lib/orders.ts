import { addWorkingDays, orderReference } from "./format";
import { kvGet, kvSet } from "./kv";
import { DELIVERY_ZONES, getZone } from "./site";
import type { CheckoutInput } from "./schemas";

export type OrderItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  colour: string;
  image: string;
};

export type Order = {
  reference: string;
  email: string | null;
  customer: Omit<CheckoutInput, "email"> & { email?: string };
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  zoneLabel: string;
  referenceDate: string;
  estimatedDelivery: string;
  status: "confirmed" | "packed" | "out-for-delivery" | "delivered";
  createdAt: string;
};

const MAX_ORDERS_PER_USER = 40;

export async function createOrder(input: {
  customer: CheckoutInput;
  items: OrderItem[];
  email: string | null;
}): Promise<Order> {
  const subtotal = input.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const zone = getZone(input.customer.zone);
  const deliveryFee = subtotal >= 15000 ? 0 : zone.fee;
  const now = new Date();
  const order: Order = {
    reference: orderReference(),
    email: input.email,
    customer: input.customer,
    items: input.items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    zoneLabel: zone.label,
    referenceDate: now.toISOString(),
    estimatedDelivery: addWorkingDays(now, zone.days).toISOString(),
    status: "confirmed",
    createdAt: now.toISOString(),
  };

  await kvSet(`order:${order.reference}`, order);

  if (input.email) {
    const key = `orders:${input.email.toLowerCase()}`;
    const existing = (await kvGet<string[]>(key)) ?? [];
    await kvSet(key, [order.reference, ...existing].slice(0, MAX_ORDERS_PER_USER));
  }

  return order;
}

export async function getOrder(reference: string): Promise<Order | null> {
  return kvGet<Order>(`order:${reference.toUpperCase()}`);
}

export async function ordersForEmail(email: string): Promise<Order[]> {
  const refs = (await kvGet<string[]>(`orders:${email.toLowerCase()}`)) ?? [];
  const orders = await Promise.all(refs.map((ref) => getOrder(ref)));
  return orders.filter((order): order is Order => Boolean(order));
}

export type TrackingStep = {
  label: string;
  detail: string;
  date: Date;
  done: boolean;
  current: boolean;
};

export function trackingSteps(order: Order): TrackingStep[] {
  const created = new Date(order.createdAt);
  const estimated = new Date(order.estimatedDelivery);
  const totalMs = Math.max(estimated.getTime() - created.getTime(), 86400000);
  const packedAt = new Date(created.getTime() + totalMs * 0.33);
  const dispatchedAt = new Date(created.getTime() + totalMs * 0.75);
  const now = Date.now();

  const steps = [
    {
      label: "Order confirmed",
      detail: "We received your order and reserved your pieces.",
      date: created,
    },
    {
      label: "Packed and checked",
      detail: "Our team inspected and wrapped your items.",
      date: packedAt,
    },
    {
      label: "Out for delivery",
      detail: `On the way to ${order.zoneLabel}.`,
      date: dispatchedAt,
    },
    {
      label: "Delivered",
      detail: order.customer.assembly
        ? "Assembly included at your door."
        : "Delivered to your address.",
      date: estimated,
    },
  ];

  return steps.map((step, index) => {
    const done = step.date.getTime() <= now;
    const next = steps[index + 1];
    const current = done && (!next || next.date.getTime() > now);
    return { ...step, done, current };
  });
}

export function zoneOptions() {
  return DELIVERY_ZONES.map((zone) => ({
    value: zone.id,
    label: `${zone.label} (KES ${zone.fee.toLocaleString("en-KE")})`,
    days: zone.days,
  }));
}
