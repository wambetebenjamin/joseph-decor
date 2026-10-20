import Link from "next/link";
import { SITE, WHATSAPP_LINK } from "@/lib/site";

export default function LegalSidebar({ updated }: { updated: string }) {
  return (
    <aside className="col-lg-4">
      <div className="form-card" style={{ background: "var(--jd-canvas)" }}>
        <h2 className="h6 mb-3">Questions about this policy?</h2>
        <p className="text-muted" style={{ fontSize: "0.84rem" }}>
          Write to us and we will respond within seven working days, as required by the Kenya
          Data Protection Act 2019.
        </p>
        <div className="footer-links" style={{ gap: "0.75rem" }}>
          <a href={`mailto:${SITE.email}`} style={{ color: "var(--jd-ink)" }}>
            {SITE.email}
          </a>
          <a href={WHATSAPP_LINK} style={{ color: "var(--jd-ink)" }} target="_blank" rel="noopener noreferrer">
            WhatsApp {SITE.phoneDisplay}
          </a>
          <span>{SITE.address}</span>
        </div>
        <hr className="divider my-3" />
        <span className="micro-label d-block mb-2">Last updated</span>
        <span style={{ fontSize: "0.84rem" }}>{updated}</span>
        <hr className="divider my-3" />
        <div className="d-flex flex-column gap-2" style={{ fontSize: "0.82rem" }}>
          <Link href="/legal/privacy-policy" className="hover-underline">
            Privacy policy
          </Link>
          <Link href="/legal/terms" className="hover-underline">
            Terms of sale
          </Link>
          <Link href="/legal/cookie-policy" className="hover-underline">
            Cookie policy
          </Link>
        </div>
      </div>
    </aside>
  );
}
