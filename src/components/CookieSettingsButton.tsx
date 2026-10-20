"use client";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="cookie-settings-link"
      onClick={() => {
        window.dispatchEvent(new CustomEvent("jd:open-consent"));
      }}
    >
      Cookie settings
    </button>
  );
}
