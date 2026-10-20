# Image credits

Joseph Decor uses two kinds of imagery: stock photography streamed from Pexels, and local files served from `/public/images/`. Both are covered below. Every image on the site is either a Pexels free-license photograph or a crop of a photograph supplied inside the uploaded `furnish-v1.0.0.zip` template bundle.

License note for all Pexels entries: the [Pexels License](https://www.pexels.com/license/) grants free use, including commercial use, with no attribution required. Attribution is provided here anyway, as a courtesy to the photographers. No Pexels image carries a watermark, and none is AI generated.

## Remote Pexels photography

These are referenced by URL through the `pexels()` helper in `src/lib/images.ts` and the `images.remotePatterns` entry for `images.pexels.com` in `next.config.ts`. The file column links to the source photo page, where the free license and the photographer's name can be checked.

| Pexels photo | Subject | Photographer | License | Uses in site |
| --- | --- | --- | --- | --- |
| [4170056](https://www.pexels.com/photo/an-interior-of-a-house-4170056/) | Interior of a living and dining area | Engin Akyurt | Pexels Free | 9 |
| [6903157](https://www.pexels.com/photo/stylish-bedroom-with-unmade-bed-near-window-with-curtains-6903157/) | Bedroom with unmade bed near a window | Max Vakhtbovych | Pexels Free | 9 |
| [6758245](https://www.pexels.com/photo/couch-with-cushions-in-living-room-6758245/) | Couch with cushions in a living room | Max Vakhtbovych | Pexels Free | 8 |
| [11295890](https://www.pexels.com/photo/brown-and-white-throw-pillow-on-the-couch-11295890/) | Throw pillows on a grey sofa | Vidal Balielo Jr. | Pexels Free | 8 |
| [36123565](https://www.pexels.com/photo/modern-workspace-with-laptop-and-books-on-desk-36123565/) | Modern workspace with laptop and books | Leticia Alvares | Pexels Free | 8 |
| [2995012](https://www.pexels.com/photo/empty-white-chairs-beside-table-2995012/) | Round dining table with white chairs | Tiana | Pexels Free | 7 |
| [10922370](https://www.pexels.com/photo/a-lamp-on-a-computer-desk-10922370/) | Lamp on a computer desk | Elena Golovchenko | Pexels Free | 7 |
| [12715508](https://www.pexels.com/photo/brown-chairs-beside-white-sofa-12715508/) | Outdoor seating by the pool | Keegan Checks | Pexels Free | 6 |
| [32736387](https://www.pexels.com/photo/warm-minimalist-art-on-bamboo-shelf-decor-32736387/) | Art and decor on a bamboo shelf | Daniel Salvador | Pexels Free | 6 |
| [4857775](https://www.pexels.com/photo/cozy-sofa-and-bed-in-contemporary-studio-apartment-4857775/) | Cozy sofa and bed in a studio apartment | Rachel Claire | Pexels Free | 5 |
| [6444973](https://www.pexels.com/photo/bedroom-interior-with-pillows-and-blanket-on-bed-6444973/) | Bedroom interior with pillows and blanket | Max Vakhtbovych | Pexels Free | 5 |
| [7538106](https://www.pexels.com/photo/brown-wooden-table-with-chairs-7538106/) | Wooden table with chairs | Ganinph | Pexels Free | 5 |
| [241520](https://www.pexels.com/photo/dining-set-inside-room-241520/) | Dining set inside a room | Mali | Pexels Free | 5 |
| [3063047](https://www.pexels.com/photo/round-table-near-green-metal-chair-3063047/) | Round patio table and chair | Alexis Bahl | Pexels Free | 5 |
| [4221413](https://www.pexels.com/photo/brown-wooden-bunk-bed-4221413/) | Wooden bunk bed in a children's bedroom | Curtis Adams | Pexels Free | 5 |
| [6670652](https://www.pexels.com/photo/photo-of-a-bedroom-6670652/) | Children's bedroom with desk | Huy Quang Nguyen | Pexels Free | 5 |
| [8135118](https://www.pexels.com/photo/brown-throw-pillows-on-white-bed-8135118/) | Throw pillows on a white bed | Max Vakhtbovych | Pexels Free | 4 |
| [7045947](https://www.pexels.com/photo/modern-bedroom-interior-with-door-and-furniture-at-home-7045947/) | Bedroom with built in wardrobe and toys | Max Vakhtbovych | Pexels Free | 4 |
| [3629622](https://www.pexels.com/photo/brown-chairs-and-table-3629622/) | Lounge chairs on an outdoor deck | Chris Jong | Pexels Free | 4 |
## Local files in `/public/images/`

Photographs from the uploaded template bundle, cropped and re-encoded for the storefront. No image was downloaded from the internet: outbound HTTPS to `images.pexels.com` was blocked inside the build sandbox, so the local files are crops of the template's own photographs rather than fresh Pexels downloads. They are reproduced here because the brief requires building on the uploaded template without redesigning its visual language.

| Local file | Dimensions | Source | Used on |
| --- | --- | --- | --- |
| `public/images/products/sofa.jpg` | 1200 x 900 | Crop of `src/assets/images/couch-with-cushions-glass-table.jpg` (template bundle) | Nairobi Three-Seater Sofa, product cards |
| `public/images/products/navy-chair.jpg` | 900 x 900 | Crop of `src/assets/images/product-img-1.jpg` (template bundle) | Karen Navy Accent Chair |
| `public/images/products/floor-lamp.jpg` | 900 x 900 | Crop of `src/assets/images/product-img-2.jpg` (template bundle) | Floor lamps |
| `public/images/products/lounge-chair.jpg` | 900 x 900 | Crop of `src/assets/images/product-img-3.jpg` (template bundle) | Lounge chairs |
| `public/images/products/tub-chair.jpg` | 900 x 900 | Crop of `src/assets/images/product-img-4.jpg` (template bundle) | Muthaiga Sage Tub Chair |
| `public/images/products/office-chair.jpg` | 900 x 900 | Crop of `src/assets/images/product-img-5.jpg` (template bundle) | Office chairs |
| `public/images/products/wall-clock.jpg` | 900 x 900 | Crop of `src/assets/images/product-img-6.jpg` (template bundle) | Wall clocks |
| `public/images/products/side-table.jpg` | 900 x 900 | Crop of `src/assets/images/product-img-7.jpg` (template bundle) | Side tables |
| `public/images/products/planter.jpg` | 900 x 900 | Crop of `src/assets/images/product-img-8.jpg` (template bundle) | Planters, decor accessories |
| `public/images/rooms/living.jpg` | 1600 x 1067 | Crop of `src/assets/images/couch-with-cushions-glass-table.jpg` (template bundle) | Sign-up page, room cards |
| `public/images/rooms/about.jpg` | 1200 x 750 | Crop of `src/assets/images/about.jpg` (template bundle) | Home page story panel |
| `public/images/auth/signin-bg.jpg` | 1100 x 646 | Crop of `src/assets/images/login-bg.jpg` (template bundle) | Sign-in page |

## What to replace before launch

The local crops above are placeholders inherited from the template. For a production launch, replace each one with a licensed photograph of the actual Joseph Decor stock, keeping the same filename and aspect ratio so no layout work is needed. If Pexels photography is used for the replacement, add the new photo page URL, photographer and license line to the table at the top of this file.

## Icons and fonts

- Interface icons: [Lucide](https://lucide.dev) (ISC license) and [Bootstrap Icons](https://icons.getbootstrap.com) (MIT license).
- Typeface: Poppins, served from Google Fonts under the [SIL Open Font License 1.1](https://openfontlicense.org). The exact `@import` in `src/assets/scss/style.scss` is preserved from the template and mirrored with a preconnected `<link>` in `src/app/layout.tsx`.
