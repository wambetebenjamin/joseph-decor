import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Joseph Decor account to track orders and keep a wishlist.",
};

export default function SignInPage() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );

  return (
    <div className="auth-wrap">
      <div className="auth-visual">
        <img src="/images/auth/signin-bg.jpg" alt="A calm living room styled with Joseph Decor pieces" />
        <div className="auth-visual-caption">
          <span className="micro-label" style={{ color: "rgba(255,255,255,0.7)" }}>
            {SITE.tagline}
          </span>
          <p>
            Your saved pieces, delivery details and order updates, all in one place.
          </p>
        </div>
      </div>
      <div className="auth-form-wrap">
        <AuthForm mode="signin" googleEnabled={googleEnabled} />
      </div>
    </div>
  );
}
