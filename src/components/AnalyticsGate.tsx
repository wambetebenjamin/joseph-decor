"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE } from "@/lib/site";

export default function AnalyticsGate() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        const raw = window.localStorage.getItem(SITE.consentKey);
        if (!raw) {
          setAllowed(false);
          return;
        }
        const prefs = JSON.parse(raw) as { analytics?: boolean };
        setAllowed(Boolean(prefs.analytics));
      } catch {
        setAllowed(false);
      }
    };
    read();
    window.addEventListener("jd:consent-changed", read);
    return () => window.removeEventListener("jd:consent-changed", read);
  }, []);

  if (!allowed) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
