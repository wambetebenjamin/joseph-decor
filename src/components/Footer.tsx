import Link from "next/link";
import { CATEGORIES, ROOMS } from "@/lib/products";
import { SITE, WHATSAPP_LINK } from "@/lib/site";
import CookieSettingsButton from "./CookieSettingsButton";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4">
            <Link href="/" className="brand mb-4" aria-label={`${SITE.name} home`}>
              <span>Joseph</span>
              <span>Decor</span>
            </Link>
            <p className="footer-tagline mt-4">{SITE.tagline}</p>
            <p className="footer-contact mt-4 mb-1">{SITE.address}</p>
            <p className="footer-contact mb-1">{SITE.hours}</p>
            <a
              className="link-arrow mt-3 d-inline-flex"
              style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.4)" }}
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp {SITE.phoneDisplay}
              <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </a>
          </div>

          <div className="col-6 col-lg-2">
            <h2 className="footer-heading">Shop by room</h2>
            <ul className="footer-links">
              {ROOMS.map((room) => (
                <li key={room.id}>
                  <Link href={`/shop?room=${room.id}`}>{room.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h2 className="footer-heading">Shop by type</h2>
            <ul className="footer-links">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link href={`/shop?category=${category.id}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-3">
            <h2 className="footer-heading">Help and delivery</h2>
            <ul className="footer-links">
              <li>
                <Link href="/legal/terms">Delivery, assembly and returns</Link>
              </li>
              <li>
                <Link href="/my-orders">Track my order</Link>
              </li>
              <li>
                <Link href="/room-planner">Room planning inspiration</Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy">How we use your data</Link>
              </li>
              <li>
                <Link href="/legal/cookie-policy">Cookie policy</Link>
              </li>
            </ul>

            <NewsletterForm compact />
          </div>
        </div>

        <div className="row align-items-end g-4 mt-2">
          <div className="col-lg-7">
            <p className="footer-headline">Furniture for the way Nairobi lives.</p>
          </div>
          <div className="col-lg-5 d-flex justify-content-lg-end">
            <div className="social-row">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Joseph Decor"
              >
                <i className="bi bi-whatsapp" aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="bi bi-instagram" aria-hidden="true" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="bi bi-facebook" aria-hidden="true" />
              </a>
              <a href={`mailto:${SITE.email}`} aria-label="Email Joseph Decor">
                <i className="bi bi-envelope" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom d-flex flex-column flex-md-row justify-content-between gap-2">
          <span>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved. Nairobi, Kenya.
          </span>
          <span className="d-flex flex-wrap align-items-center">
            <Link href="/legal/privacy-policy">Privacy policy</Link>
            <Link href="/legal/terms">Terms</Link>
            <Link href="/legal/cookie-policy">Cookies</Link>
            <CookieSettingsButton />
          </span>
        </div>
      </div>
    </footer>
  );
}
