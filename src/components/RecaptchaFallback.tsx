"use client";

import { useEffect, useRef, useState } from "react";
import { loadRecaptchaV2, recaptchaSiteKey } from "@/lib/recaptchaClient";

export default function RecaptchaFallback({
  onToken,
}: {
  onToken: (token: string) => void;
}) {
  const holder = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const key = recaptchaSiteKey();

  useEffect(() => {
    let cancelled = false;
    if (!key) {
      setStatus("unavailable");
      return;
    }
    loadRecaptchaV2().then(() => {
      if (cancelled || !holder.current || !window.grecaptcha?.render) {
        setStatus("unavailable");
        return;
      }
      try {
        window.grecaptcha.render(holder.current, {
          sitekey: key,
          theme: "light",
          callback: onToken,
        });
        setStatus("ready");
      } catch {
        setStatus("unavailable");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [key, onToken]);

  return (
    <div className="mt-3">
      <p className="micro-label mb-2">One more check</p>
      <div ref={holder} />
      {status === "unavailable" ? (
        <p className="text-muted mb-0" style={{ fontSize: "0.78rem" }}>
          The security check could not load. You can still send your order or message on
          WhatsApp and we will complete it with you.
        </p>
      ) : null}
    </div>
  );
}
