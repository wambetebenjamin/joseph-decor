import type { Metadata } from "next";
import Link from "next/link";
import LegalSidebar from "@/components/LegalSidebar";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "The cookies and browser storage Joseph Decor uses, why we use them, and how to change your choices.",
};

const STORAGE = [
  {
    name: "joseph_decor_consent",
    type: "Local storage, necessary",
    purpose:
      "Remembers your cookie choices so we do not ask again. Retained for 24 months or until you clear it.",
  },
  {
    name: "joseph_decor_cart",
    type: "Local storage, functional",
    purpose:
      "Keeps the items in your cart and your delivery zone on this device. Cleared when you complete an order or clear the cart.",
  },
  {
    name: "joseph_decor_wishlist",
    type: "Local storage, functional",
    purpose:
      "Stores the pieces you save on this device so your wishlist is still there when you return.",
  },
  {
    name: "next-auth.session-token",
    type: "Cookie, necessary",
    purpose:
      "Keeps you signed in and secures your account pages. Session cookies expire when you sign out or the session ends.",
  },
  {
    name: "Vercel Analytics",
    type: "Third party, analytics",
    purpose:
      "Aggregate page and performance data. Loaded only when you accept analytics cookies.",
  },
  {
    name: "Google reCAPTCHA",
    type: "Third party, necessary security",
    purpose:
      "Scores form submissions to block automated abuse. Tokens are short lived and verified on our server.",
  },
  {
    name: "WhatsApp and payment links",
    type: "External links",
    purpose:
      "Opening WhatsApp or an M-Pesa or card link takes you to another service with its own privacy and cookie rules.",
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-3 mb-2">Cookie policy</h1>
          <p className="section-intro mb-0">
            What we store in your browser, why we store it, and how to change your mind.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8 legal-body">
              <p>
                Cookies are small files a website stores in your browser. We also use browser
                local storage, which works in a similar way but is not sent to our servers on
                every request. Together they keep your cart, wishlist and sign-in working. Under
                the Kenya Data Protection Act 2019, non-essential storage needs your consent.
              </p>

              <h2>Your choices</h2>
              <p>
                When you first visit, a banner asks whether to accept all cookies or manage them
                individually. Necessary storage is always on because the shop cannot work without
                it. Functional, analytics and marketing storage are optional. You can change your
                choices at any time using the button below or the cookie settings link in the
                footer.
              </p>
              <div className="d-flex flex-wrap gap-2 my-3">
                <CookieSettingsButton />
                <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                  Opens the preferences panel.
                </span>
              </div>

              <h2>What we store</h2>
              <div className="table-responsive">
                <table className="receipt-table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STORAGE.map((item) => (
                      <tr key={item.name}>
                        <td>
                          <code>{item.name}</code>
                        </td>
                        <td style={{ minWidth: "140px" }}>{item.type}</td>
                        <td>{item.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>Categories explained</h2>
              <h3>Necessary</h3>
              <p>
                Keeps your cart and session working and protects forms from abuse. These cannot
                be switched off without breaking checkout and sign-in.
              </p>
              <h3>Functional</h3>
              <p>
                Remembers your wishlist, delivery zone and consent choices so you do not have to
                repeat yourself.
              </p>
              <h3>Analytics</h3>
              <p>
                Helps us see which rooms and products are popular using aggregated data. Loaded
                only after consent, and never used to identify you personally.
              </p>
              <h3>Marketing</h3>
              <p>
                Would let us measure campaign performance. It is off by default and no marketing
                tags are currently active on the site.
              </p>

              <h2>Managing storage in your browser</h2>
              <p>
                You can delete or block cookies and local storage in your browser settings. If
                you block necessary storage, your cart, wishlist and sign-in may stop working.
                Private browsing windows usually clear local storage when closed.
              </p>

              <h2>Third party services</h2>
              <p>
                Our hosting provider Vercel processes requests and, when you consent, aggregate
                analytics. Google reCAPTCHA processes form data to score abuse. Opening WhatsApp,
                M-Pesa or a card link takes you to services with their own terms. We do not control
                their cookies.
              </p>

              <h2>Contact</h2>
              <p>
                Questions about this policy, or a request to access or delete your data, can be
                sent to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or WhatsApp{" "}
                {SITE.phoneDisplay}. Read more in our{" "}
                <Link href="/legal/privacy-policy">privacy policy</Link>.
              </p>

              <p className="legal-note">
                Your consent choices are stored on this device under the key{" "}
                <code>joseph_decor_consent</code> and can be changed whenever you like.
              </p>
            </div>

            <LegalSidebar updated="20 October 2026" />
          </div>
        </div>
      </section>
    </>
  );
}
