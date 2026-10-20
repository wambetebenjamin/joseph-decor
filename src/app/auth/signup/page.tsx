import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create a Joseph Decor account to save furniture and follow your deliveries.",
};

export default function SignUpPage() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );

  return (
    <div className="auth-wrap">
      <div className="auth-visual">
        <img src="/images/rooms/living.jpg" alt="A Joseph Decor living room with layered soft furnishings" />
        <div className="auth-visual-caption">
          <span className="micro-label" style={{ color: "rgba(255,255,255,0.7)" }}>
            {SITE.tagline}
          </span>
          <p>
            Save the pieces you love, then come back when the room is ready.
          </p>
        </div>
      </div>
      <div className="auth-form-wrap">
        <AuthForm mode="signup" googleEnabled={googleEnabled} />
      </div>
    </div>
  );
}
