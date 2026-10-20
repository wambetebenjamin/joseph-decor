import type { Metadata } from "next";
import Link from "next/link";
import LegalSidebar from "@/components/LegalSidebar";
import { DELIVERY_ZONES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of sale",
  description:
    "Delivery, assembly, returns and payment terms for furniture ordered from Joseph Decor in Nairobi, Kenya.",
};

export default function TermsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-3 mb-2">Terms of sale</h1>
          <p className="section-intro mb-0">
            The rules that apply when you order furniture or home decor from Joseph Decor.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8 legal-body">
              <p>
                These terms apply to every order placed through this website or by WhatsApp with
                Joseph Decor, Nairobi, Kenya. By placing an order you accept them. If anything is
                unclear, message us before you order.
              </p>

              <h2>1. Orders</h2>
              <p>
                An order becomes binding when we confirm it on WhatsApp or email. We may decline
                an order where a piece is out of stock, a price was listed in error, delivery is
                not possible, or we cannot verify the security check.
              </p>
              <p>
                Measurements shown on product pages are in centimetres and are approximate within
                2 cm. Please measure your doorway, stairwell and lift before ordering large
                pieces.
              </p>

              <h2>2. Prices and payment</h2>
              <ul>
                <li>All prices are in Kenya Shillings and include VAT where applicable.</li>
                <li>
                  Delivery is charged by zone and is free on orders above KES{" "}
                  {SITE.freeDeliveryThreshold.toLocaleString("en-KE")}.
                </li>
                <li>
                  Payment is by M-Pesa or by a secure card link sent after your order is
                  confirmed. We do not store card numbers.
                </li>
                <li>
                  Where a price error is obvious, we will contact you before charging and you may
                  cancel without penalty.
                </li>
              </ul>

              <h2>3. Delivery</h2>
              <p>Delivery zones and indicative timelines:</p>
              <ul>
                {DELIVERY_ZONES.map((zone) => (
                  <li key={zone.id}>
                    <strong>{zone.label}:</strong> {zone.detail}, usually {zone.days} working
                    days. Fee KES {zone.fee.toLocaleString("en-KE")}, free above KES{" "}
                    {SITE.freeDeliveryThreshold.toLocaleString("en-KE")}.
                  </li>
                ))}
              </ul>
              <p>
                Timelines start from payment confirmation and may change during peak periods or
                bad weather. Our team calls before arrival. Someone over 18 must receive the
                pieces. If nobody is available, a re-delivery fee may apply.
              </p>

              <h2>4. Assembly</h2>
              <p>
                Assembly is included on beds, wardrobes, dining sets, large sofas and other items
                marked as assembly included. Where assembly is not included, the product page
                says so. Please clear the room and remove packaging safely if children or pets
                are present.
              </p>

              <h2>5. Returns and refunds</h2>
              <p>
                You may return unused items within seven days of delivery for a refund or
                exchange. The item must be unused, in original packaging and in a re-saleable
                condition. Please send photos if there is damage.
              </p>
              <ul>
                <li>
                  Collection can be arranged within Nairobi. Return transport outside Nairobi may
                  be charged.
                </li>
                <li>We do not refund gift cards, delivery fees already incurred or clearance items.</li>
                <li>
                  Custom and made to order pieces cannot be returned unless they are faulty.
                </li>
                <li>Refunds are processed within 14 days of a successful inspection.</li>
              </ul>
              <p>
                This is in addition to your rights under the Consumer Protection Act 2012. Faulty
                items are repaired, replaced or refunded regardless of the seven day period.
              </p>

              <h2>6. Warranty</h2>
              <p>
                Frames and structural components carry a twelve month warranty against
                manufacturing defects. Fabric, leather and cushion wear from normal use is not
                covered. Keep your receipt and the order reference for claims.
              </p>

              <h2>7. Products and colours</h2>
              <p>
                Timber grain and fabric colours vary between batches, and screens show colour
                differently. We can send fabric swatches before you order. Natural timber will
                move slightly with changes in humidity, which is part of the material.
              </p>

              <h2>8. Liability</h2>
              <p>
                We are not liable for indirect or consequential loss, including loss of wages or
                alternative accommodation, except where the law does not allow us to exclude it.
                Our maximum liability for any order is the amount you paid for it.
              </p>

              <h2>9. Intellectual property</h2>
              <p>
                The Joseph Decor name, site design and photography are our property. Site images
                from Pexels are used under the Pexels license and credited in our image credits.
                Do not reproduce our catalogue copy without written permission.
              </p>

              <h2>10. Governing law</h2>
              <p>
                These terms are governed by the laws of Kenya. Disputes will first be discussed
                in good faith, then referred to the Kenyan courts. Consumer complaints may also
                be raised with the Competition Authority of Kenya.
              </p>

              <h2>11. Contact</h2>
              <p>
                Joseph Decor, {SITE.address}. WhatsApp or call {SITE.phoneDisplay}. Email{" "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Read our{" "}
                <Link href="/legal/privacy-policy">privacy policy</Link> and{" "}
                <Link href="/legal/cookie-policy">cookie policy</Link>.
              </p>

              <p className="legal-note">
                Nothing in these terms removes rights you have under the Consumer Protection Act
                2012 or the Kenya Data Protection Act 2019.
              </p>
            </div>

            <LegalSidebar updated="20 October 2026" />
          </div>
        </div>
      </section>
    </>
  );
}
