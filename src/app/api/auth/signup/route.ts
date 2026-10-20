import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/schemas";
import { createUser, getUserByEmail } from "@/lib/users";
import { verifyRecaptchaToken } from "@/lib/recaptcha";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const payload = body as {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    recaptchaToken?: string;
    recaptchaV2Token?: string;
  };

  const parsed = signupSchema.safeParse({
    name: payload.name,
    email: payload.email,
    password: payload.password,
    confirmPassword: payload.confirmPassword,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Check your details" },
      { status: 400 },
    );
  }

  const recaptcha = await verifyRecaptchaToken(
    payload.recaptchaV2Token || payload.recaptchaToken,
    payload.recaptchaV2Token ? "signup" : "signup",
  );
  if (recaptcha.mode === "verified" && !recaptcha.success) {
    return NextResponse.json(
      { error: "Security check failed. Please try again.", fallback: "v2" },
      { status: 400 },
    );
  }

  const existing = await getUserByEmail(parsed.data.email);
  if (existing) {
    return NextResponse.json(
      { error: "An account with that email already exists. Sign in instead." },
      { status: 409 },
    );
  }

  try {
    const user = await createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
    });
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "We could not create that account";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
