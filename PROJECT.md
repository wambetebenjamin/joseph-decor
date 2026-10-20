# Joseph Decor storefront

Online furniture and home decor store for Nairobi, Kenya. Tagline: "Your room. Your style. Delivered."

Next.js 16 App Router build on top of the uploaded `furnish-v1.0.0.zip` template. The template's HTML, SCSS and JavaScript are kept in `src/` untouched as the source of the visual layer; everything new is additive.

## Stack

Next.js 16.4.2, React 19.2.0, TypeScript 5.8.3, Tailwind CSS 4.1.10, Bootstrap 5.3.8 with the template SCSS, Framer Motion 12.18.0, GSAP 3.12.7, Lenis 1.3.4, Zustand 5.0.6, NextAuth 5 beta, Zod 3.25.67, Nodemailer, jsPDF with html2canvas.

Dependency versions are pinned exactly, with no carets or tildes, and `overrides` fix `postcss`, `sharp` and `sprintf-js`. `motion-dom` and `motion-utils` are pinned to the versions Framer Motion 12.18.0 was built against; do not bump them without rebuilding.

## Run locally

```bash
npm install      # .npmrc sets legacy-peer-deps; npm ci is not used
npm run dev      # http://localhost:3000
npm run build && npm start
```

Node 24 is expected (`.nvmrc`, `engines`). Node 22 also runs the build, with an `EBADENGINE` warning.

## Environment variables

Copy `.env.example` to `.env.local`. Every integration degrades gracefully when its variables are missing:

| Variable | Purpose | Missing behaviour |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL | Falls back to `http://localhost:3000` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number, defaults to `254112272061` | Built-in number used |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key | Forms submit without a token, server reports `mode: "unconfigured"` |
| `RECAPTCHA_SECRET_KEY` | Server-side reCAPTCHA verification, never sent to the browser | Same as above |
| `NEXTAUTH_SECRET`, `NEXTAUTH_URL` | Session signing | Random development secret |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google sign-in | Button hidden |
| `PEXELS_API_KEY` | Reserved for image search tooling | Images are served as fixed URLs |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Users, orders and wishlists | In-memory store, reset on restart |
| `BLOB_READ_WRITE_TOKEN` | Reserved for receipt storage | Not used at runtime |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | Contact form delivery | Message is logged, the form still reports success |

## Routes

Pages: `/`, `/shop`, `/shop/[slug]`, `/cart`, `/checkout`, `/order-confirmation`, `/wishlist`, `/my-orders`, `/room-planner`, `/auth/signin`, `/auth/signup`, `/legal/privacy-policy`, `/legal/terms`, `/legal/cookie-policy`, plus `not-found` and `error`.

APIs: `/api/products`, `/api/products/[slug]`, `/api/cart/add`, `/api/orders/create`, `/api/orders/[ref]`, `/api/wishlist/toggle`, `/api/contact`, `/api/recaptcha/verify`, `/api/auth/[...nextauth]`, `/api/auth/signup`.

## Storage

- Cart and wishlist live in `localStorage` through Zustand persist, so a guest can shop without an account.
- Signed-in users get their wishlist and orders from Vercel KV, with an in-memory fallback for local development.
- The last order snapshot is written to `sessionStorage` as `joseph_decor_last_order` so the confirmation page can render before the API responds.
- Cookie consent is stored under `joseph_decor_consent` with per-category toggles.

## Deploy

`vercel.json` pins the framework, the `cdg1` region and five security headers. Set the environment variables in the Vercel project, then deploy. `images.remotePatterns` already allows `images.pexels.com`.

## Known deviations

- `@vercel/blob` is pinned to `0.27.3`: the requested `0.29.4` does not exist on npm. Later versions are installed instead, which also clears the audit advisories.
- `next-auth`, `nodemailer`, `jspdf`, `swiper` and `sass` were moved to their patched releases so `npm audit --audit-level=high` reports zero vulnerabilities.
- Local images under `public/images/` are crops of the template's own photographs, because outbound HTTPS to Pexels was blocked inside the build sandbox. See `image-credits.md` for the full inventory and for what to replace before launch.
