import { NextResponse } from "next/server";
import { verifyRecaptchaToken } from "@/lib/recaptcha";

export async function POST(request: Request) {
  let body: { token?: string; action?: string };
  try {
    body = (await request.json()) as { token?: string; action?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = await verifyRecaptchaToken(body.token, body.action);
  const fallbackRequired = result.score !== null && result.score < 0.5;

  return NextResponse.json(
    {
      success: result.success,
      score: result.score,
      action: result.action,
      mode: result.mode,
      fallbackRequired,
      errorCodes: result.errorCodes,
    },
    { status: result.success || result.mode === "unconfigured" ? 200 : 400 },
  );
}
