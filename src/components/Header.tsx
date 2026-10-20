"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cartTotals, useCart } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/room-planner", label: "Room Planner" },
  { href: "/my-orders", label: "My Orders" },
];

export default function Header() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const items = useCart((state) => state.items);
  const openDrawer = useCart((state) => state.openDrawer);
  const { count } = cartTotals(items);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("jd-locked", menuOpen);
    return () => document.body.classList.remove("jd-locked");
  }, [menuOpen]);

  return (
    <>
      <div className="announcement">
        <div className="container">
          <div className="announcement-inner">
            <span>Free delivery on orders above KES 15,000</span>
            <div className="announcement-links">
              <span>Assembly included on large items</span>
              <Link href="/legal/terms">7 day returns</Link>
            </div>
          </div>
        </div>
      </div>

      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container">
          <div className="header-row">
            <Link href="/" className="brand" aria-label={`${SITE.name} home`}>
              <span>Joseph</span>
              <span>Decor</span>
            </Link>

            <nav aria-label="Main navigation">
              <ul className="primary-nav">
                {NAV.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={active ? "active" : undefined}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="header-actions">
              <a className="header-phone d-none d-xl-inline-flex" href={`tel:+${SITE.whatsapp}`}>
                <i className="bi bi-telephone" aria-hidden="true" />
                <span>{SITE.phoneDisplay}</span>
              </a>

              <Link href="/wishlist" className="icon-btn" aria-label="Saved items">
                <i className="bi bi-heart" aria-hidden="true" />
              </Link>
              <Link href="/cart" className="icon-btn" aria-label="Cart">
                <i className="bi bi-bag" aria-hidden="true" />
                {hydrated && count > 0 ? <span className="icon-count mono">{count}</span> : null}
              </Link>
              <button
                type="button"
                className="icon-btn d-none d-md-inline-flex"
                onClick={openDrawer}
                aria-label="Open cart drawer"
              >
                <i className="bi bi-bag-check" aria-hidden="true" />
              </button>
              <Link href="/my-orders" className="icon-btn" aria-label="Your account and orders">
                <i className="bi bi-person" aria-hidden="true" />
              </Link>
              <button
                type="button"
                className="icon-btn menu-toggle"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <i className="bi bi-list" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.div
              className="panel-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              className="mobile-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <Link href="/" className="brand">
                  <span>Joseph</span>
                  <span>Decor</span>
                </Link>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <i className="bi bi-x-lg" aria-hidden="true" />
                </button>
              </div>

              <ul className="mobile-nav">
                {NAV.concat([
                  { href: "/wishlist", label: "Wishlist" },
                  { href: "/cart", label: "Cart" },
                ]).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      {item.label}
                      <i className="bi bi-arrow-right" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <p className="micro-label mb-2">Talk to us</p>
                <a className="link-arrow" href={`https://wa.me/${SITE.whatsapp}`}>
                  WhatsApp {SITE.phoneDisplay}
                  <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </a>
                <p className="text-muted mt-4 mb-0" style={{ fontSize: "0.8rem" }}>
                  {SITE.address}
                  <br />
                  {SITE.hours}
                </p>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
