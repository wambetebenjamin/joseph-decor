"use client";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render?: (
        element: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          theme?: "light" | "dark";
        },
      ) => number;
    };
  }
}

let scriptPromise: Promise<boolean> | null = null;

export function recaptchaSiteKey(): string {
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
}

export function loadRecaptcha(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  const key = recaptchaSiteKey();
  if (!key) return Promise.resolve(false);
  if (window.grecaptcha) return Promise.resolve(true);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<boolean>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-jd-recaptcha="v3"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${key}`;
    script.async = true;
    script.defer = true;
    script.dataset.jdRecaptcha = "v3";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export async function executeRecaptcha(action: string): Promise<string | null> {
  const key = recaptchaSiteKey();
  if (!key) return null;
  const ready = await loadRecaptcha();
  if (!ready || !window.grecaptcha) return null;

  try {
    return await new Promise<string>((resolve) => {
      window.grecaptcha?.ready(async () => {
        try {
          const token = await window.grecaptcha!.execute(key, { action });
          resolve(token);
        } catch {
          resolve("");
        }
      });
    });
  } catch {
    return null;
  }
}

export function loadRecaptchaV2(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  const key = recaptchaSiteKey();
  if (!key) return Promise.resolve(false);
  if (window.grecaptcha?.render) return Promise.resolve(true);

  return new Promise<boolean>((resolve) => {
    if (document.querySelector('script[data-jd-recaptcha="v2"]')) {
      resolve(Boolean(window.grecaptcha?.render));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.dataset.jdRecaptcha = "v2";
    script.onload = () => resolve(Boolean(window.grecaptcha?.render));
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}
