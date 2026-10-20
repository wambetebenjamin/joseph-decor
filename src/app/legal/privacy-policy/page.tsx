import type { Metadata } from "next";
import Link from "next/link";
import LegalSidebar from "@/components/LegalSidebar";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Joseph Decor collects, uses and protects personal data under the Kenya Data Protection Act 2019.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-3 mb-2">Privacy policy</h1>
          <p className="section-intro mb-0">
            This policy explains what Joseph Decor does with your personal data when you browse,
            save a wishlist, place an order or contact us.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8 legal-body">
              <p>
                Joseph Decor is a furniture and home decor retailer based in Nairobi, Kenya. We
                are the data controller for the personal data described in this policy. You can
                reach us on WhatsApp at {SITE.phoneDisplay} or by email at{" "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>

              <h2>1. What we collect</h2>
              <ul>
                <li>
                  <strong>Order details:</strong> your name, phone number, email address,
                  delivery address, town, preferred delivery date, assembly preference, special
                  instructions and the items you order.
                </li>
                <li>
                  <strong>Account data:</strong> your name, email address and a hashed password.
                  Passwords are salted and hashed with scrypt. We never store them in plain text.
                </li>
                <li>
                  <strong>Wishlist and cart:</strong> saved product references. For guests these
                  are kept in your browser. When you sign in they may also be linked to your
                  account.
                </li>
                <li>
                  <strong>Consent records:</strong> your cookie choices and the time you made
                  them, stored under the key <code>joseph_decor_consent</code>.
                </li>
                <li>
                  <strong>Technical data:</strong> security logs from our hosting provider and
                  the reCAPTCHA score returned by Google when you submit a form.
                </li>
                <li>
                  <strong>Messages:</strong> what you send us through forms, email or WhatsApp.
                </li>
              </ul>
              <p>
                We do not collect card numbers. Payment by card is completed through a secure
                link from our payment partner, and M-Pesa payments are initiated on your phone.
              </p>

              <h2>2. Why we use it</h2>
              <ul>
                <li>To process orders, arrange delivery and complete assembly.</li>
                <li>To confirm delivery dates and answer questions about your order.</li>
                <li>To manage returns, warranties and product support.</li>
                <li>To keep the shop secure and prevent fraudulent orders.</li>
                <li>To send marketing communications, only where you have opted in.</li>
                <li>To meet tax, accounting and consumer protection obligations in Kenya.</li>
              </ul>

              <h2>3. Lawful basis</h2>
              <p>
                Under the Kenya Data Protection Act 2019 we rely on: performance of a contract
                for order and delivery data, consent for marketing and optional cookies,
                legitimate interests for fraud prevention and service improvement, and legal
                obligation for tax and accounting records.
              </p>

              <h2>4. Cookies and local storage</h2>
              <p>
                We use a small number of cookies and browser storage keys to keep your cart,
                wishlist and sign-in working. Optional analytics and marketing storage is set
                only after you accept it in the cookie banner. Full detail is in our{" "}
                <Link href="/legal/cookie-policy">cookie policy</Link>.
              </p>

              <h2>5. Who we share data with</h2>
              <ul>
                <li>Delivery and assembly partners, limited to the details needed to deliver.</li>
                <li>Payment providers and mobile money operators, to take payment.</li>
                <li>Our hosting and database providers, including Vercel.</li>
                <li>Our email service provider, for transactional and support email.</li>
                <li>Google reCAPTCHA, to protect forms from abuse.</li>
                <li>Professional advisers and regulators, where the law requires it.</li>
              </ul>
              <p>
                We do not sell your personal data. Some providers process data outside Kenya.
                Where that happens we rely on appropriate safeguards and contractual
                protections consistent with the Act.
              </p>

              <h2>6. How long we keep it</h2>
              <ul>
                <li>Order and tax records: seven years from the end of the financial year.</li>
                <li>Account data: until you ask us to close the account.</li>
                <li>Wishlist and cart: until you clear them or remove the browser storage.</li>
                <li>Marketing consent: until withdrawn, then recorded as withdrawn.</li>
                <li>Cookie consent: 24 months, then we ask again.</li>
                <li>Support messages: two years.</li>
              </ul>

              <h2>7. Your rights</h2>
              <p>
                You have the right to be informed, to access your data, to correct inaccurate
                data, to request deletion, to restrict or object to processing, to data
                portability, and to withdraw consent at any time. You can exercise these rights
                by writing to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or messaging{" "}
                {SITE.phoneDisplay} on WhatsApp. We respond within seven working days.
              </p>
              <p>
                If you are not satisfied with our response you can complain to the Office of the
                Data Protection Commissioner in Kenya.
              </p>

              <h2>8. Security</h2>
              <p>
                Data is encrypted in transit. Passwords are hashed. Access to order data is
                limited to staff who need it to fulfil your order. If a breach affects your
                rights, we will notify you and the regulator without undue delay.
              </p>

              <h2>9. Children</h2>
              <p>
                The shop is intended for adults. We do not knowingly collect data from children
                under 18. If you believe a child has sent us data, contact us and we will delete
                it.
              </p>

              <h2>10. Changes to this policy</h2>
              <p>
                We may update this policy when our services change. The date at the top of the
                page shows the latest version, and material changes will be announced on the
                site.
              </p>

              <p className="legal-note">
                This policy is written for Joseph Decor's Nairobi operations and follows the
                Kenya Data Protection Act 2019 and the Data Protection (General) Regulations
                2021.
              </p>
            </div>

            <LegalSidebar updated="20 October 2026" />
          </div>
        </div>
      </section>
    </>
  );
}
