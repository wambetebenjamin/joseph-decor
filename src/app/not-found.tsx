import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "This room does not exist",
};

export default function NotFound() {
  return (
    <section className="error-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <svg
              className="error-icon"
              viewBox="0 0 168 128"
              role="img"
              aria-label="Armchair outline"
            >
              <path d="M34 58V44c0-8 6-14 14-14h72c8 0 14 6 14 14v14" />
              <path d="M26 58h116v38H26z" />
              <path d="M26 96h116v12H26z" />
              <path d="M36 108v14M128 108v14" />
              <path d="M46 58v38M122 58v38" />
            </svg>
            <span className="error-code">404</span>
            <h1 className="mt-3 mb-3">This room does not exist.</h1>
            <p className="section-intro mx-auto mb-4">
              The page may have moved, or the piece you were looking for has sold out. The shop
              is still open.
            </p>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <Link href="/shop" className="btn btn-primary">
                Back to shop
              </Link>
              <Link href="/" className="btn btn-outline-dark">
                Go home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
