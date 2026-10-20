"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";

type Preferences = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
  version: number;
};

const DEFAULT_PREFS: Preferences = {
  necessary: true,
  functional: true,
  analytics: true,
  marketing: false,
  updatedAt: "",
  version: 1,
};

const STORAGE_KEY = SITE.consentKey;

export default function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prefs, setPrefs] = useState<Preferences>(DEFAULT_PREFS);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as Preferences;
        setPrefs({ ...DEFAULT_PREFS, ...stored, necessary: true });
        setShowBanner(false);
      } else {
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const open = showBanner || showModal;
    document.body.classList.toggle("consent-open", open);
    return () => document.body.classList.remove("consent-open");
  }, [ready, showBanner, showModal]);

  useEffect(() => {
    const handler = () => {
      setShowModal(true);
      setShowBanner(false);
    };
    window.addEventListener("jd:open-consent", handler);
    return () => window.removeEventListener("jd:open-consent", handler);
  }, []);

  const save = useCallback((next: Preferences) => {
    const payload: Preferences = {
      ...next,
      necessary: true,
      updatedAt: new Date().toISOString(),
      version: 1,
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Storage can be blocked. Consent still applies for this session.
    }
    setPrefs(payload);
    setShowBanner(false);
    setShowModal(false);
    window.dispatchEvent(new CustomEvent("jd:consent-changed"));
  }, []);

  if (!ready) return null;

  return (
    <>
      {showBanner ? (
        <section className="consent-banner" aria-label="Cookie consent">
          <div className="container">
            <div className="consent-inner">
              <p className="consent-copy mb-0">
                <strong>Your privacy matters.</strong> We use cookies to keep your cart working,
                remember your preferences and understand how the shop is used. Under the Kenya
                Data Protection Act 2019 you can choose what we store. Read our{" "}
                <Link href="/legal/cookie-policy" className="hover-underline">
                  cookie policy
                </Link>
                .
              </p>
              <div className="consent-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => save({ ...DEFAULT_PREFS, functional: true, analytics: true, marketing: true })}
                >
                  Accept all
                </button>
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => {
                    setShowModal(true);
                    setShowBanner(false);
                  }}
                >
                  Manage preferences
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {showModal ? (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setShowModal(false);
          }}
        >
          <div
            className="consent-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consent-title"
          >
            <h2 id="consent-title">Manage cookie preferences</h2>
            <p className="text-muted" style={{ fontSize: "0.84rem" }}>
              Choose what Joseph Decor may store on this device. You can change this any time
              from the cookie settings link in the footer.
            </p>

            <div className="consent-pref">
              <div>
                <h3>Necessary</h3>
                <p>Cart contents, session security and your privacy choices. Always on.</p>
              </div>
              <span className="locked">Always on</span>
            </div>

            <div className="consent-pref">
              <div>
                <h3>Functional</h3>
                <p>Remembers your wishlist, delivery zone and recent searches.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={prefs.functional}
                  onChange={(event) =>
                    setPrefs((current) => ({ ...current, functional: event.target.checked }))
                  }
                  aria-label="Allow functional cookies"
                />
                <span aria-hidden="true" />
              </label>
            </div>

            <div className="consent-pref">
              <div>
                <h3>Analytics</h3>
                <p>Aggregated page and product performance data to improve the shop.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(event) =>
                    setPrefs((current) => ({ ...current, analytics: event.target.checked }))
                  }
                  aria-label="Allow analytics cookies"
                />
                <span aria-hidden="true" />
              </label>
            </div>

            <div className="consent-pref">
              <div>
                <h3>Marketing</h3>
                <p>Lets us measure campaigns. Off by default.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(event) =>
                    setPrefs((current) => ({ ...current, marketing: event.target.checked }))
                  }
                  aria-label="Allow marketing cookies"
                />
                <span aria-hidden="true" />
              </label>
            </div>

            <div className="d-flex flex-wrap gap-2 justify-content-end mt-4">
              <button
                type="button"
                className="btn btn-outline-dark btn-sm"
                onClick={() => save({ ...DEFAULT_PREFS, functional: false, analytics: false, marketing: false })}
              >
                Necessary only
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => save(prefs)}
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
