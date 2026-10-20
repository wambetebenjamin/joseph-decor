type VerifyResult = {
  success: boolean;
  score: number | null;
  action?: string;
  mode: "verified" | "unconfigured" | "failed";
  errorCodes?: string[];
};

export async function verifyRecaptchaToken(
  token: string | undefined,
  expectedAction?: string,
): Promise<VerifyResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      return {
        success: false,
        score: null,
        mode: "unconfigured",
        errorCodes: ["missing-secret"],
      };
    }
    return { success: true, score: null, mode: "unconfigured" };
  }

  if (!token) {
    return { success: false, score: null, mode: "failed", errorCodes: ["missing-token"] };
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }).toString(),
      cache: "no-store",
    });
    const data = (await response.json()) as {
      success: boolean;
      score?: number;
      action?: string;
      "error-codes"?: string[];
    };
    const score = typeof data.score === "number" ? data.score : null;
    const actionMatches = expectedAction
      ? !data.action || data.action === expectedAction
      : true;
    return {
      success: Boolean(data.success) && actionMatches && (score === null || score >= 0.5),
      score,
      action: data.action,
      mode: "verified",
      errorCodes: data["error-codes"],
    };
  } catch (error) {
    console.error("reCAPTCHA verification failed", error);
    return { success: false, score: null, mode: "failed" };
  }
}

export function recaptchaConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
}
