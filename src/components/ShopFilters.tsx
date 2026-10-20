"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CATEGORIES,
  ROOMS,
  colourOptions,
  materialOptions,
  productCountForCategory,
  productCountForRoom,
} from "@/lib/products";
import { shopHref } from "@/lib/shopUrl";

const PRICE_RANGES = [
  { label: "Under KES 20,000", min: "0", max: "20000" },
  { label: "KES 20,000 to 50,000", min: "20000", max: "50000" },
  { label: "KES 50,000 to 100,000", min: "50000", max: "100000" },
  { label: "Above KES 100,000", min: "100000", max: "" },
];

export default function ShopFilters({ current }: { current: Record<string, string> }) {
  const [open, setOpen] = useState(false);
  const [showAllMaterials, setShowAllMaterials] = useState(false);
  const materials = materialOptions();
  const colours = colourOptions();
  const materialPreview = materials.slice(0, 8);
  const visibleMaterials =
    showAllMaterials || !current.material || materialPreview.includes(current.material)
      ? materials.slice(0, showAllMaterials ? materials.length : 8)
      : [...materialPreview, current.material];
  const activeCount = ["room", "category", "material", "colour", "min", "max"].filter(
    (key) => current[key],
  ).length;

  const panel = (
    <div className="filter-panel">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <span className="filter-title mb-0">Filters{activeCount ? ` (${activeCount})` : ""}</span>
        {activeCount ? (
          <Link
            href="/shop"
            className="link-quiet"
            style={{ textDecoration: "underline" }}
          >
            Clear all
          </Link>
        ) : null}
      </div>

      <div className="filter-group">
        <span className="filter-title">Room</span>
        <div className="filter-scroll">
          {ROOMS.map((room) => {
            const active = current.room === room.id;
            return (
              <Link
                key={room.id}
                href={shopHref(current, {
                  room: active ? undefined : room.id,
                  page: undefined,
                })}
                className="filter-option text-decoration-none"
              >
                <input
                  type="checkbox"
                  checked={active}
                  readOnly
                  tabIndex={-1}
                  aria-hidden="true"
                />
                <span>{room.name}</span>
                <span className="ms-auto text-muted" style={{ fontSize: "0.72rem" }}>
                  {productCountForRoom(room.id)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-title">Product type</span>
        <div className="filter-scroll">
          {CATEGORIES.map((category) => {
            const active = current.category === category.id;
            return (
              <Link
                key={category.id}
                href={shopHref(current, {
                  category: active ? undefined : category.id,
                  page: undefined,
                })}
                className="filter-option text-decoration-none"
              >
                <input
                  type="checkbox"
                  checked={active}
                  readOnly
                  tabIndex={-1}
                  aria-hidden="true"
                />
                <span>{category.name}</span>
                <span className="ms-auto text-muted" style={{ fontSize: "0.72rem" }}>
                  {productCountForCategory(category.id)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-title">Material</span>
        <div className={showAllMaterials ? "filter-scroll" : undefined}>
          {visibleMaterials.map((material) => {
            const active = current.material === material;
            return (
              <Link
                key={material}
                href={shopHref(current, {
                  material: active ? undefined : material,
                  page: undefined,
                })}
                className="filter-option text-decoration-none"
              >
                <input
                  type="checkbox"
                  checked={active}
                  readOnly
                  tabIndex={-1}
                  aria-hidden="true"
                />
                <span>{material}</span>
              </Link>
            );
          })}
        </div>
        {materials.length > 8 ? (
          <button
            type="button"
            className="link-quiet filter-more"
            onClick={() => setShowAllMaterials((value) => !value)}
            aria-expanded={showAllMaterials}
          >
            {showAllMaterials ? "Show fewer materials" : `Show all ${materials.length} materials`}
          </button>
        ) : null}
      </div>

      <div className="filter-group">
        <span className="filter-title">Colour</span>
        <div className="filter-scroll">
          {colours.map((colour) => {
            const active = current.colour === colour.name;
            return (
              <Link
                key={colour.name}
                href={shopHref(current, {
                  colour: active ? undefined : colour.name,
                  page: undefined,
                })}
                className="filter-option text-decoration-none"
              >
                <span
                  className="swatch-dot"
                  style={{ backgroundColor: colour.hex }}
                  aria-hidden="true"
                />
                <span>{colour.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-title">Price</span>
        <div>
          {PRICE_RANGES.map((range) => {
            const active =
              (current.min ?? "") === range.min && (current.max ?? "") === range.max;
            return (
              <Link
                key={range.label}
                href={shopHref(current, {
                  min: active ? undefined : range.min,
                  max: active ? undefined : range.max,
                  page: undefined,
                })}
                className="filter-option text-decoration-none"
              >
                <input
                  type="checkbox"
                  checked={active}
                  readOnly
                  tabIndex={-1}
                  aria-hidden="true"
                />
                <span>{range.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="d-lg-none mb-3">
        <button
          type="button"
          className="btn btn-outline-dark w-100"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="shop-filter-panel"
        >
          <i className="bi bi-sliders me-2" aria-hidden="true" />
          {open ? "Hide filters" : `Filters${activeCount ? ` (${activeCount})` : ""}`}
        </button>
      </div>
      <div id="shop-filter-panel" className={open ? "d-block" : "d-none d-lg-block"}>
        {panel}
      </div>
    </>
  );
}
