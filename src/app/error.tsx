"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Joseph Decor error boundary", error);
  }, [error]);

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
            <span className="error-code">Something went wrong</span>
            <h1 className="mt-3 mb-3">We could not finish loading that page.</h1>
            <p className="section-intro mx-auto mb-4">
              Nothing you did caused this. Try again, or message us on WhatsApp at{" "}
              <a href="https://wa.me/254112272061" className="hover-underline">
                +254112272061
              </a>{" "}
              and we will sort it out.
            </p>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <button type="button" className="btn btn-primary" onClick={() => reset()}>
                Try again
              </button>
              <Link href="/" className="btn btn-outline-dark">
                Back home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
