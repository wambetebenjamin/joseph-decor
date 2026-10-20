"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { signinSchema, signupSchema } from "@/lib/schemas";
import { executeRecaptcha } from "@/lib/recaptchaClient";
import RecaptchaFallback from "./RecaptchaFallback";

type Values = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function AuthForm({
  mode,
  googleEnabled,
}: {
  mode: "signin" | "signup";
  googleEnabled: boolean;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("/my-orders");
  const [fallbackV2, setFallbackV2] = useState(false);
  const [v2Token, setV2Token] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const target = params.get("callbackUrl");
    if (target && target.startsWith("/")) setCallbackUrl(target);
  }, []);

  const onSubmit = async (values: Values) => {
    setMessage("");
    const parsed =
      mode === "signup"
        ? signupSchema.safeParse(values)
        : signinSchema.safeParse({ email: values.email, password: values.password });

    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof Values;
        if (field) setError(field, { type: "manual", message: issue.message });
      });
      return;
    }

    try {
      const token = await executeRecaptcha(mode);

      if (mode === "signup") {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            recaptchaToken: token ?? undefined,
            recaptchaV2Token: v2Token || undefined,
          }),
        });
        const data = (await response.json()) as { error?: string; fallback?: string };
        if (!response.ok) {
          if (data.fallback === "v2") setFallbackV2(true);
          setMessage(data.error ?? "We could not create that account.");
          return;
        }
      }

      const signinToken = await executeRecaptcha("signin");
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        recaptchaToken: v2Token || signinToken || "",
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setMessage(
          mode === "signup"
            ? "Your account was created, but the automatic sign in failed. Try signing in."
            : "Those details did not match an account. Check your email and password.",
        );
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setMessage("Something went wrong on the network. Please try again.");
    }
  };

  return (
    <div className="auth-card">
      <span className="eyebrow">{mode === "signin" ? "Welcome back" : "Join Joseph Decor"}</span>
      <h1 className="mt-3">{mode === "signin" ? "Sign in" : "Create your account"}</h1>
      <p className="text-muted" style={{ fontSize: "0.9rem" }}>
        {mode === "signin"
          ? "Track deliveries, keep a wishlist and check out faster next time."
          : "Save your wishlist, follow orders and keep your delivery details in one place."}
      </p>

      {googleEnabled ? (
        <button
          type="button"
          className="btn btn-outline-dark w-100 mt-4"
          onClick={() => signIn("google", { callbackUrl })}
        >
          <i className="bi bi-google me-2" aria-hidden="true" />
          Continue with Google
        </button>
      ) : null}

      {googleEnabled ? <div className="divider-text">or</div> : null}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className={googleEnabled ? "" : "mt-4"}>
        {mode === "signup" ? (
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              className="form-control"
              autoComplete="name"
              placeholder="Jane Wanjiku"
              {...register("name")}
            />
            {errors.name ? <p className="form-error">{errors.name.message}</p> : null}
          </div>
        ) : null}

        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            autoComplete="email"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email ? <p className="form-error">{errors.email.message}</p> : null}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            placeholder={mode === "signin" ? "Your password" : "At least 8 characters"}
            {...register("password")}
          />
          {errors.password ? <p className="form-error">{errors.password.message}</p> : null}
        </div>

        {mode === "signup" ? (
          <div className="mb-3">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="form-control"
              autoComplete="new-password"
              placeholder="Repeat your password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword ? (
              <p className="form-error">{errors.confirmPassword.message}</p>
            ) : null}
          </div>
        ) : null}

        {fallbackV2 ? <RecaptchaFallback onToken={setV2Token} /> : null}

        {message ? (
          <p
            className="mt-3 mb-0 p-3"
            role="alert"
            style={{ border: "1px solid #d9b3aa", background: "#fbf3f1", fontSize: "0.84rem" }}
          >
            {message}
          </p>
        ) : null}

        <button type="submit" className="btn btn-primary w-100 mt-4" disabled={isSubmitting}>
          {isSubmitting
            ? "Please wait"
            : mode === "signin"
              ? "Sign in"
              : "Create account"}
        </button>
        <input type="hidden" value={v2Token} readOnly />
      </form>

      <p className="text-muted mt-4 mb-0" style={{ fontSize: "0.82rem" }}>
        {mode === "signin" ? (
          <>
            New here?{" "}
            <Link href={`/auth/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="hover-underline">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href={`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="hover-underline">
              Sign in
            </Link>
          </>
        )}
      </p>
      <p className="text-muted mt-2 mb-0" style={{ fontSize: "0.72rem" }}>
        Protected by Google reCAPTCHA. By continuing you agree to our{" "}
        <Link href="/legal/terms" className="hover-underline">
          terms
        </Link>{" "}
        and{" "}
        <Link href="/legal/privacy-policy" className="hover-underline">
          privacy policy
        </Link>
        .
      </p>
    </div>
  );
}
