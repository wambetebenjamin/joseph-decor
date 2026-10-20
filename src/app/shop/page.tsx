import Link from "next/link";
import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import ShopFilters from "@/components/ShopFilters";
import ShopSort from "@/components/ShopSort";
import {
  CATEGORIES,
  ROOMS,
  filterProducts,
  getCategory,
  getRoom,
  type SortOption,
} from "@/lib/products";
import { normaliseQuery, shopHref, type QueryMap } from "@/lib/shopUrl";

export const metadata: Metadata = {
  title: "Shop furniture and home decor",
  description:
    "Browse sofas, beds, dining tables, office chairs, outdoor furniture, rugs and decor. Filter by room, type, material, colour and price.",
};

type SearchParams = Promise<QueryMap>;

const SORTS: SortOption[] = ["newest", "price-asc", "price-desc", "best-selling"];

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = await searchParams;
  const current = normaliseQuery(raw);

  const room = ROOMS.find((item) => item.id === current.room)?.id;
  const category = CATEGORIES.find((item) => item.id === current.category)?.id;
  const sort = SORTS.includes(current.sort as SortOption)
    ? (current.sort as SortOption)
    : "newest";
  const page = Math.max(1, Number(current.page) || 1);
  const perPage = Math.min(60, Math.max(12, Number(current.perPage) || 12));
  const min = current.min ? Number(current.min) : undefined;
  const max = current.max ? Number(current.max) : undefined;

  const result = filterProducts({
    room,
    category,
    material: current.material,
    colour: current.colour,
    minPrice: Number.isFinite(min) ? min : undefined,
    maxPrice: Number.isFinite(max) ? max : undefined,
    sort,
    page,
    perPage,
  });

  const activeRoom = room ? getRoom(room) : undefined;
  const activeCategory = category ? getCategory(category) : undefined;
  const title = activeCategory
    ? activeCategory.name
    : activeRoom
      ? activeRoom.name
      : "All furniture";

  const filterChips = [
    activeRoom ? { label: activeRoom.name, key: "room" } : null,
    activeCategory ? { label: activeCategory.name, key: "category" } : null,
    current.material ? { label: current.material, key: "material" } : null,
    current.colour ? { label: current.colour, key: "colour" } : null,
    current.min || current.max ? { label: "Price range", key: "price" } : null,
  ].filter(Boolean) as { label: string; key: string }[];

  const pageNumbers = Array.from({ length: result.totalPages }, (_, index) => index + 1).filter(
    (number) =>
      number === 1 ||
      number === result.totalPages ||
      Math.abs(number - result.page) <= 1,
  );

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              {activeRoom || activeCategory ? <li>{title}</li> : null}
            </ol>
          </nav>
          <div className="row align-items-end g-4">
            <div className="col-lg-7">
              <span className="eyebrow">The collection</span>
              <h1 className="mt-3 mb-3">{title}</h1>
              <p className="section-intro mb-0">
                {activeCategory?.blurb ??
                  activeRoom?.blurb ??
                  "Furniture and finishing pieces for Nairobi homes. Every price is in shillings and includes VAT, with delivery calculated by zone at checkout."}
              </p>
            </div>
            <div className="col-lg-5 text-lg-end">
              <span className="micro-label">{result.total} pieces in this edit</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4 g-lg-5">
            <aside className="col-lg-3">
              <ShopFilters current={current} />
            </aside>

            <div className="col-lg-9">
              <div className="sort-bar">
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <span className="results-count">
                    Showing {result.items.length === 0 ? 0 : (result.page - 1) * result.perPage + 1}
                    {" to "}
                    {(result.page - 1) * result.perPage + result.items.length} of {result.total}
                  </span>
                  {filterChips.length > 0 ? (
                    <div className="d-flex flex-wrap gap-2">
                      {filterChips.map((chip) => (
                        <Link
                          key={chip.key}
                          href={shopHref(current, {
                            [chip.key]: undefined,
                            min: chip.key === "price" ? undefined : current.min,
                            max: chip.key === "price" ? undefined : current.max,
                            page: undefined,
                          })}
                          className="text-decoration-none"
                          style={{
                            fontSize: "0.7rem",
                            border: "1px solid var(--jd-line-strong)",
                            padding: "0.3rem 0.55rem",
                            color: "var(--jd-ink)",
                          }}
                        >
                          {chip.label} <i className="bi bi-x" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
                <ShopSort current={current} />
              </div>

              {result.items.length === 0 ? (
                <div className="empty-state">
                  <i className="bi bi-search" aria-hidden="true" />
                  <h2 className="h5 mt-3">Nothing matches those filters yet.</h2>
                  <p className="text-muted mb-4" style={{ fontSize: "0.86rem" }}>
                    Try a wider price range or a different room. New pieces arrive most weeks.
                  </p>
                  <Link href="/shop" className="btn btn-primary btn-sm">
                    Clear filters
                  </Link>
                </div>
              ) : (
                <div className="row g-3 g-lg-4">
                  {result.items.map((product) => (
                    <div className="col-sm-6 col-lg-4" key={product.slug}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}

              {result.items.length > 0 ? (
                <div className="pagination-row">
                  <Link
                    href={shopHref(current, {
                      perPage: String(Math.min(60, perPage + 12)),
                      page: undefined,
                    })}
                    className="btn btn-outline-dark btn-sm"
                  >
                    Load more
                    <i className="bi bi-plus ms-2" aria-hidden="true" />
                  </Link>

                  {result.totalPages > 1 ? (
                    <nav className="pager" aria-label="Pagination">
                      {result.page > 1 ? (
                        <Link
                          href={shopHref(current, { page: String(result.page - 1) })}
                          aria-label="Previous page"
                        >
                          <i className="bi bi-arrow-left" aria-hidden="true" />
                        </Link>
                      ) : null}
                      {pageNumbers.map((number, index) => {
                        const previous = pageNumbers[index - 1];
                        const gap = previous && number - previous > 1;
                        return (
                          <span key={number} style={{ display: "contents" }}>
                            {gap ? <span style={{ border: 0 }}>...</span> : null}
                            {number === result.page ? (
                              <span className="is-current" aria-current="page">
                                {number}
                              </span>
                            ) : (
                              <Link href={shopHref(current, { page: String(number) })}>
                                {number}
                              </Link>
                            )}
                          </span>
                        );
                      })}
                      {result.page < result.totalPages ? (
                        <Link
                          href={shopHref(current, { page: String(result.page + 1) })}
                          aria-label="Next page"
                        >
                          <i className="bi bi-arrow-right" aria-hidden="true" />
                        </Link>
                      ) : null}
                    </nav>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
