import Link from "next/link";
import HeroParallax from "@/components/HeroParallax";
import ProductCard from "@/components/ProductCard";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/Reveal";
import NewsletterForm from "@/components/NewsletterForm";
import { CATEGORIES, ROOMS, featuredProducts, newArrivals, productCountForCategory } from "@/lib/products";
import { pexels } from "@/lib/images";
import { SITE, TESTIMONIALS, USPS, WHATSAPP_LINK } from "@/lib/site";

export default function HomePage() {
  const featured = featuredProducts();
  const arrivals = newArrivals(8);

  return (
    <>
      <section className="hero">
        <HeroParallax
          src={pexels("4170056", 1800)}
          alt="Bright East African living room styled with a modern sofa, timber table and woven textures"
        />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="hero-content">
            <p className="hero-kicker">Furniture and home decor for Nairobi homes</p>
            <h1 className="hero-title">Your room. Your style. Delivered.</h1>
            <p className="hero-sub">
              Sofas, beds, dining sets and the finishing details, chosen for Nairobi homes.
              Locally assembled options, free delivery above KES 15,000, and a team that sets
              everything up before they leave.
            </p>
            <div className="hero-actions">
              <Link href="/shop" className="btn btn-primary btn-lg">
                Shop now
              </Link>
              <Link href="#collections" className="btn btn-outline-dark btn-lg">
                View collections
              </Link>
            </div>
            <div className="hero-meta">
              <span>
                <i className="bi bi-truck" aria-hidden="true" /> Free delivery above KES 15,000
              </span>
              <span>
                <i className="bi bi-tools" aria-hidden="true" /> Assembly included
              </span>
              <span>
                <i className="bi bi-arrow-repeat" aria-hidden="true" /> 7 day returns
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="usp-strip" aria-label="Why shop with Joseph Decor">
        <div className="container">
          <div className="row g-0">
            {USPS.map((usp, index) => (
              <div className="col-sm-6 col-lg-3" key={usp.title}>
                <div
                  className="usp-item"
                  style={{
                    borderRight: index < USPS.length - 1 ? "1px solid var(--jd-line)" : undefined,
                    paddingLeft: index === 0 ? 0 : "1.5rem",
                    paddingRight: "1.5rem",
                  }}
                >
                  <i className={`bi ${usp.icon}`} aria-hidden="true" />
                  <div>
                    <h3>{usp.title}</h3>
                    <p>{usp.copy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 py-lg-9" id="collections">
        <div className="container py-lg-4">
          <Reveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Shop by room</span>
                <h2 className="section-title mt-3">A room at a time, or the whole home.</h2>
                <p className="section-intro mb-0">
                  Start where you spend the most time. Every room edit is put together by our
                  team in Nairobi and priced in shillings.
                </p>
              </div>
              <Link href="/shop" className="link-arrow">
                All furniture
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <StaggerGrid className="row g-3 g-lg-4">
            {ROOMS.map((room) => (
              <StaggerItem className="col-6 col-lg-4" key={room.id}>
                <Link href={`/shop?room=${room.id}`} className="room-card">
                  <img src={room.image} alt={`${room.name} styled by Joseph Decor`} loading="lazy" />
                  <div className="room-card-body">
                    <span className="micro-label">{room.blurb.split(".")[0]}</span>
                    <h3>{room.name}</h3>
                    <span className="room-card-cta">
                      Shop this room
                      <i className="bi bi-arrow-right" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="py-5 py-lg-9 bg-light">
        <div className="container py-lg-4">
          <Reveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Shop by product type</span>
                <h2 className="section-title mt-3">The pieces you need, sorted.</h2>
              </div>
              <Link href="/shop" className="link-arrow">
                Browse everything
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <StaggerGrid className="row g-3 g-lg-4">
            {CATEGORIES.map((category) => (
              <StaggerItem className="col-6 col-md-4 col-lg-3" key={category.id}>
                <Link href={`/shop?category=${category.id}`} className="category-tile">
                  <div className="category-media">
                    <img src={category.image} alt={`${category.name} at Joseph Decor`} loading="lazy" />
                  </div>
                  <div className="category-body">
                    <div>
                      <h3>{category.name}</h3>
                      <small>{productCountForCategory(category.id)} pieces</small>
                    </div>
                    <i className="bi bi-arrow-right" aria-hidden="true" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="py-5 py-lg-9">
        <div className="container py-lg-4">
          <Reveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Featured pieces</span>
                <h2 className="section-title mt-3">Chosen for Nairobi living rooms and bedrooms.</h2>
              </div>
              <Link href="/shop?sort=best-selling" className="link-arrow">
                Best sellers
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <StaggerGrid className="row g-3 g-lg-4">
            {featured.map((product) => (
              <StaggerItem className="col-6 col-lg-3" key={product.slug}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="py-5 py-lg-9 bg-light">
        <div className="container py-lg-4">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <Reveal>
                <div className="position-relative">
                  <img
                    src="/images/rooms/about.jpg"
                    alt="Joseph Decor showroom with timber furniture and soft textiles"
                    className="img-fluid w-100"
                    style={{ aspectRatio: "4 / 3", objectFit: "cover" }}
                    loading="lazy"
                  />
                  <div
                    className="bg-white border p-3 p-lg-4"
                    style={{ position: "absolute", right: "-8px", bottom: "-8px", maxWidth: "240px" }}
                  >
                    <span className="micro-label d-block mb-1">Delivery</span>
                    <strong style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      Free above KES 15,000
                    </strong>
                    <p className="text-muted mb-0" style={{ fontSize: "0.76rem" }}>
                      Across Nairobi and its outskirts.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="col-lg-6">
              <Reveal delay={0.1}>
                <span className="eyebrow">Why Joseph Decor</span>
                <h2 className="section-title mt-3">
                  Furniture that arrives finished, not flat packed and forgotten.
                </h2>
                <p className="section-intro">
                  We started with one workshop on Ngong Road and a simple idea. Buy well, build
                  locally where we can, and deliver it the way we would want it delivered to our
                  own homes.
                </p>

                <div className="row g-4 mt-2">
                  {USPS.map((usp, index) => (
                    <div className="col-sm-6" key={usp.title}>
                      <span className="micro-label d-block mb-2">
                        0{index + 1} / {usp.title}
                      </span>
                      <p className="mb-0" style={{ fontSize: "0.85rem", color: "var(--jd-grey)" }}>
                        {usp.copy}
                      </p>
                    </div>
                  ))}
                </div>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow mt-4 d-inline-flex"
                >
                  Talk to a stylist on WhatsApp
                  <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 py-lg-9">
        <div className="container py-lg-4">
          <Reveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">New arrivals</span>
                <h2 className="section-title mt-3">Fresh from the workshop.</h2>
                <p className="section-intro mb-0">
                  New pieces land most weeks. When something is made in small batches, we say so.
                </p>
              </div>
              <Link href="/shop?sort=newest" className="link-arrow">
                All new arrivals
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <StaggerGrid className="row g-3 g-lg-4">
            {arrivals.map((product) => (
              <StaggerItem className="col-6 col-lg-3" key={product.slug}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="py-5 py-lg-9 bg-light">
        <div className="container py-lg-4">
          <Reveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Homeowners</span>
                <h2 className="section-title mt-3">Loved in Nairobi homes.</h2>
              </div>
            </div>
          </Reveal>
          <StaggerGrid className="row g-4">
            {TESTIMONIALS.map((testimonial) => (
              <StaggerItem className="col-md-4" key={testimonial.name}>
                <div className="quote-card">
                  <p>“{testimonial.quote}”</p>
                  <div className="quote-person">
                    <span className="avatar-initials" aria-hidden="true">
                      {testimonial.initials}
                    </span>
                    <div>
                      <h4>{testimonial.name}</h4>
                      <small>{testimonial.role}</small>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="newsletter py-5 py-lg-9">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 text-center">
              <span className="eyebrow">The Joseph Decor list</span>
              <h2 className="section-title mt-3">First look at new arrivals.</h2>
              <p className="section-intro mx-auto">
                One short email a month with new pieces, room ideas and delivery offers. No
                noise, and you can leave any time.
              </p>
              <NewsletterForm />
              <p className="text-muted mt-3 mb-0" style={{ fontSize: "0.72rem" }}>
                By subscribing you agree to our{" "}
                <Link href="/legal/privacy-policy" className="hover-underline">
                  privacy policy
                </Link>
                . This form stores nothing until you confirm.
              </p>
            </div>
          </div>
        </div>
      </section>

      <span className="visually-hidden">{SITE.tagline}</span>
    </>
  );
}
