import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { ordersForEmail, trackingSteps } from "@/lib/orders";
import { formatDate, formatKes } from "@/lib/format";
import ReorderButton from "@/components/ReorderButton";

export const metadata: Metadata = {
  title: "My orders",
  description: "Track Joseph Decor deliveries, view receipts and reorder pieces.",
};

export const dynamic = "force-dynamic";

export default async function MyOrdersPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return (
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="form-card text-center">
                <i
                  className="bi bi-person-circle"
                  aria-hidden="true"
                  style={{ fontSize: "2rem", color: "var(--jd-grey-light)" }}
                />
                <h1 className="h4 mt-3">Sign in to see your orders.</h1>
                <p className="text-muted" style={{ fontSize: "0.88rem" }}>
                  Your delivery updates, receipts and past orders live in your account. Guest
                  orders can still be tracked with the reference from your confirmation page.
                </p>
                <div className="d-flex justify-content-center gap-2 flex-wrap mt-4">
                  <Link href="/auth/signin?callbackUrl=/my-orders" className="btn btn-primary btn-sm">
                    Sign in
                  </Link>
                  <Link href="/auth/signup?callbackUrl=/my-orders" className="btn btn-outline-dark btn-sm">
                    Create an account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const orders = await ordersForEmail(session.user.email);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Your account</span>
          <h1 className="mt-3 mb-2">My orders</h1>
          <p className="section-intro mb-0">
            Signed in as {session.user.email}. Track deliveries, download receipts or send the
            same pieces to your cart again.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {orders.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-box-seam" aria-hidden="true" />
              <h2 className="h4 mt-3 mb-2">No orders yet.</h2>
              <p className="text-muted mb-4">
                When you place an order it will appear here with delivery updates.
              </p>
              <Link href="/shop" className="btn btn-primary">
                Shop the collection
              </Link>
            </div>
          ) : (
            <div className="d-flex flex-column gap-4">
              {orders.map((order) => {
                const steps = trackingSteps(order);
                const current = steps.find((step) => step.current) ?? steps[0];
                return (
                  <article className="form-card" key={order.reference}>
                    <div className="d-flex flex-wrap justify-content-between gap-3 align-items-start">
                      <div>
                        <span className="micro-label d-block mb-1">Order</span>
                        <h2 className="h5 mb-1 mono">{order.reference}</h2>
                        <span className="text-muted" style={{ fontSize: "0.78rem" }}>
                          Placed {formatDate(order.createdAt)} · {order.items.length} items ·{" "}
                          {formatKes(order.total)}
                        </span>
                      </div>
                      <span className="status-pill">
                        <i className="bi bi-truck" aria-hidden="true" />
                        {current?.label ?? "Confirmed"}
                      </span>
                    </div>

                    <div className="row g-3 mt-2">
                      <div className="col-md-7">
                        <div className="d-flex flex-wrap gap-2">
                          {order.items.map((item) => (
                            <Link
                              key={`${item.slug}-${item.colour}`}
                              href={`/shop/${item.slug}`}
                              className="d-flex align-items-center gap-2 text-decoration-none"
                              style={{
                                border: "1px solid var(--jd-line)",
                                padding: "0.4rem",
                                fontSize: "0.78rem",
                                color: "var(--jd-ink)",
                              }}
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                width={38}
                                height={38}
                                style={{ objectFit: "cover" }}
                              />
                              <span>
                                {item.name}
                                <br />
                                <span className="text-muted" style={{ fontSize: "0.7rem" }}>
                                  {item.colour} · Qty {item.quantity}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="summary-row">
                          <span>Estimated delivery</span>
                          <strong>{formatDate(order.estimatedDelivery)}</strong>
                        </div>
                        <div className="summary-row">
                          <span>Delivering to</span>
                          <strong>{order.zoneLabel}</strong>
                        </div>
                        <div className="mt-3 d-flex flex-wrap gap-2">
                          <Link
                            href={`/order-confirmation?ref=${order.reference}`}
                            className="btn btn-primary btn-sm"
                          >
                            View receipt
                          </Link>
                          <ReorderButton items={order.items} />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
