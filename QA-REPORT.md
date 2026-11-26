# Lata Enterprises — QA Report (v2 update, 2026-11-26)

Production website for **Lata Enterprises** (bag manufacturer, Erode,
Tamil Nadu). Next.js 16.4.6 (App Router) + TypeScript + Tailwind CSS v4 +
GSAP ScrollTrigger. No backend, no API routes, no forms, no cookies,
no database. Node 24.22.1, npm 10.9.4.

This report covers the v2 update of 2026-11-26 only. The earlier audit
(2026-11-25) is in `DEPLOYMENT.md` §5 and still stands for everything
it covered; nothing in it was changed except where this report says so.

---

## 1. What changed in v2

### Bag Collection images (home page catalogue, positions 1 / 3 / 4 / 5 / 6)

Position 2 was **not** modified. The cards, layout, spacing, captions
("Bag Collection 01"–"06"), lightbox, animations and CALL FOR PRICE
buttons are unchanged — only the image, alt text and description of
each replaced item changed, so the description matches the new photo.

| Position | New image file | What the photo shows |
|---|---|---|
| 1 | `bag-collection-01-jute-floral.jpg` | Natural jute bag with a floral printed panel in maroon and pink |
| 2 | *(unchanged)* `bag-joyalukkas.jpg` | Cream canvas tote with a wide maroon band print |
| 3 | `bag-collection-03-saree.jpg` | **Saree Bags** — cream cotton saree bags with zip and mesh window |
| 4 | `bag-collection-04-bottle.jpg` | Natural jute bottle bags in four styles |
| 5 | `bag-collection-05-jute-red-border.jpg` | Natural jute bag with a red border trim |
| 6 | `bag-collection-06-jute-blockprint.jpg` | Grey jute tote with a green and red block-printed floral pattern |

The mapping follows the order the images were sent, with the Saree Bag
image (sent separately at 11:09 IST) placed at position 3 as instructed.
The fifth image sent (white cotton produce bags with vegetables) was
**not** placed in the collection — it was the position-3 candidate
replaced by the Saree Bag image. It is saved in the project as
`public/assets/bag-produce.jpg` (optimised, 64 KB) so it can be swapped
into any position with a one-line change in `lib/site.ts` if that was
the intended mapping.

The old bag photos (`bag-skv-academy.jpg`, `bag-rm-hospital.jpg`,
`bag-joy-mart.jpg`, `bag-kalyan-silks.jpg`, `bag-kovai-textiles.jpg`)
were **kept** in `public/assets/` — the Collections section and the
Materials section still use some of them, so deleting them would have
broken other parts of the site.

### Business address (373 → 101E)

New address, used **everywhere** the old one appeared:

> 101E, Keerthi Illam, N.M.S. Street, Kalingarayanpalayam, Bhavani Erode
> – 638 301, Tamil Nadu, India.

- `lib/site.ts` — `ADDRESS`, `ADDRESS_SHORT`, `MAPS_URL` (Google Maps
  search link now queries the new address).
- `app/layout.tsx` — JSON-LD `streetAddress`
  ("101E, Keerthi Illam, N.M.S. Street, Kalingarayanpalayam").
- Home page Contact section — full address and the short line under
  "Find Us on the Map" ("Bhavani Erode – 638 301, Tamil Nadu, India").
- Footer — uses `ADDRESS`, updated automatically.

Verified: **0 occurrences of "373"** remain in the source or in any
served page (`/`, `/about`, `/founder`, `/gifting`). Phone
(+91 98944 88870) and email (thelataerode@gmail.com) are unchanged.

### New page: Gifting Services (`/gifting`)

- Added to the main navigation (desktop and mobile menu), the footer
  "Explore" links, and `sitemap.xml`. Same typography, fonts, colours,
  spacing and card styles as the rest of the site; scroll-triggered
  `Reveal` animations, including reduced-motion support.
- **Photographs only for:** Saree Bags, Bottle Bags, Jute Fancy Bags
  (the same three new product photos used in the catalogue).
- **Text only, no photos, no stock images, no illustrations for:**
  Temple Return Gift Bags – Manjal Pai, Corporate Return Gift Bags,
  Wedding Celebration Bags, Customised Return Gift Bags, Educational
  and Other Bags. Their headings and descriptions are the site's own
  existing Collections copy — no new product claims were invented.
- "Also available: Apparel Bags" line and a closing Call for Price
  button, matching the home page.

### Canonical hostname redirect

`next.config.ts` now permanently redirects the apex domain to www:
`thelata.com/*` → `https://www.thelata.com/*` (308, host-matched, so
Vercel preview URLs are unaffected). HTTP → HTTPS is automatic on
Vercel. **HTTPS itself is NOT yet verified** — see §5.

### Images optimised

All six new photos were resized to a maximum dimension of 1200 px and
saved as progressive JPEG quality 82 (EXIF orientation corrected):
62 KB, 34 KB, 80 KB, 267 KB, 98 KB, 64 KB. `next/image` serves
AVIF/WebP variants automatically at runtime. Display size and cropping
behaviour are unchanged (3:4 cards, `object-cover`).

---

## 2. Files changed

**Modified**

- `lib/site.ts` — new address, new Maps URL, catalogue entries
  01 / 03 / 04 / 05 / 06 (image, alt, description).
- `app/layout.tsx` — JSON-LD street address.
- `app/page.tsx` — short address line under "Find Us on the Map".
- `components/Nav.tsx` — "Gifting Services" link added.
- `components/Footer.tsx` — "Gifting Services" link added.
- `app/sitemap.ts` — `/gifting` added.
- `next.config.ts` — apex → www permanent redirect.
- `README.md`, `DEPLOYMENT.md` — this update documented.
- `QA-REPORT.md` — this file (new).

**Added**

- `app/gifting/page.tsx` — Gifting Services page.
- `public/assets/bag-collection-01-jute-floral.jpg`
- `public/assets/bag-collection-03-saree.jpg`
- `public/assets/bag-collection-04-bottle.jpg`
- `public/assets/bag-collection-05-jute-red-border.jpg`
- `public/assets/bag-collection-06-jute-blockprint.jpg`
- `public/assets/bag-produce.jpg` (kept available, not used in the
  collection — see §1).

**Not changed**: homepage design, Founder page, About page, Contact
section design, Collections layout, logo and brand identity, footer
design, animations, the founder photograph (still full-width,
1194×970, no width caps, no zoom-crop), Keerthana text-only profile,
the doctorate as one timeline point only.

---

## 3. Route and 404 checks — PASS

Tested on the local production build (`npm run build` + `next start`),
2026-11-26:

| Route | Result |
|---|---|
| `/` | 200 |
| `/about` | 200 |
| `/founder` | 200 |
| `/gifting` | 200 (new) |
| `/robots.txt` | 200 |
| `/sitemap.xml` | 200 (lists `/`, `/gifting`, `/about`, `/founder`) |
| `/favicon.ico` | 200 |
| `/nonexistent-page` | **404** with the branded 404 page ("This page does not exist.", working "Back to Home" button, nav and footer) |
| `/about/` and `/gifting/` | 308 to the canonical path (standard Next.js trailing-slash redirect, not an error) |

- Direct URL access works for every page (direct access is the same
  as a refresh for this site — no SPA fallback is needed or used).
- All 22 files in `public/assets/` return 200, including all six new
  images. All `_next/static` chunks/CSS/fonts referenced by the pages
  return 200.
- Served HTML contains: the new address (0 × "373" on any page), all
  five new catalogue images, the unchanged position-2 image
  (`bag-joyalukkas.jpg`), all eight Gifting categories, the
  `/gifting` nav and footer links, and the canonical
  `https://www.thelata.com/gifting`.
- No external resources are loaded by the pages (no third-party
  scripts, no external fonts — fonts are self-hosted). The only
  external URLs in the code are the intended ones: Instagram,
  Facebook, Google Maps search, `thelata.com`, `schema.org`.
- The apex redirect was verified locally with a `Host: thelata.com`
  request: **308 → https://www.thelata.com/**. A `Host:
  www.thelata.com` request is **not** redirected (200).

---

## 4. Security checks — PASS

- **Secrets**: 0 hits for `process.env`, API keys, secrets, tokens,
  passwords across all source files. No `.env` file exists; only
  `.env.example`, which correctly states that no variables are needed.
- **No API routes**: no `route.ts` files; no public endpoints; no
  database; no forms; no user input; no cookies.
- **Security headers verified live** on the served production build
  (`/gifting`, and previously on `/`, `/about`, `/founder`): all six
  present — Content-Security-Policy, Strict-Transport-Security
  (`max-age=63072000; includeSubDomains; preload`),
  X-Content-Type-Options (`nosniff`), X-Frame-Options (`DENY`),
  Referrer-Policy (`strict-origin-when-cross-origin`),
  Permissions-Policy (camera/microphone/geolocation/payment disabled).
  The CSP was not changed — the new page uses the same images, fonts
  and videos as the rest of the site, so it stays within the existing
  allow-list.
- **No source maps** are emitted in the production build (no `.map`
  files under `.next/static`), so no source code is exposed.
- **Dependency vulnerability scan**: `npm audit` is blocked in this
  build environment (npm registry returns 403 `policy_denied` for the
  audit endpoint). Instead, all **415 unique package@version pairs**
  in `package-lock.json` were checked against the OSV vulnerability
  database (api.osv.dev — the same GHSA advisory data npm audit uses):
  **0 vulnerable packages, 0 advisories**. The scanner was
  control-tested against a known-vulnerable package (lodash 4.17.20 →
  4 advisories found), so the clean result is real. Re-run `npm audit`
  on a machine where the registry permits it as a second check.
- No website can be guaranteed 100% non-hackable. These measures
  minimise the attack surface; keep dependencies updated.

---

## 5. Domain and HTTPS — NOT VERIFIED (blocked, not a code issue)

**Status on 2026-11-26 morning: `www.thelata.com` is still a GoDaddy
parked "for sale" page** (the domain serves a 114-byte page that
redirects to `/lander`, which links to
`forsale.godaddy.com/forsale/www.thelata.com`). It does **not** point
at Vercel and the site is **not** live on the domain.

What this means:

- The project is ready to deploy, but the domain itself must be
  sorted first: confirm who owns `thelata.com` at the registrar. If
  Lata Enterprises owns it, set the DNS records Vercel shows
  (`www` CNAME → `cname.vercel-dns.com`; apex A record → the IP
  Vercel shows). If nobody at Lata owns it, the domain must be bought
  / registered first, or a different domain used.
- **HTTPS cannot be verified until the domain points at Vercel.**
  Vercel issues the certificate automatically once the domain is
  added and DNS resolves; then confirm `https://www.thelata.com`
  opens with a valid padlock. Do **not** claim HTTPS works until that
  check is done on the live domain.
- The apex → www redirect is already in the code (`next.config.ts`),
  so once both hostnames are added in Vercel it will apply.
- The QR code set delivered on 2026-11-25 points to
  `https://www.thelata.com` and will land on the parked page until
  the domain is sorted — do not print it on cards or packaging until
  the live site is confirmed.

---

## 6. Performance

- **Build**: `npm run build` succeeds (Next.js 16.4.6, Turbopack).
  7 routes: `/`, `/_not-found`, `/about`, `/founder`, `/gifting`,
  `/robots.txt` prerendered as static content; `/sitemap.xml` dynamic.
- **TypeScript**: 0 errors. **ESLint**: 0 errors, 0 warnings.
- **Images**: new photos 34–267 KB; `next/image` serves AVIF/WebP
  automatically; below-fold images use `loading="lazy"`; the image
  optimiser was verified live (200 for an optimised variant).
- **Videos**: unchanged, still 4.83 MB total (1.80 + 1.71 + 1.32 MB),
  1080×1920, lazy-loaded except the hero.
- **Fonts**: self-hosted via `next/font` (no Google Fonts request).
- **Caching**: `_next/static` assets serve `Cache-Control: public,
  max-age=31536000, immutable` (verified live).
- **JavaScript**: GSAP dynamically imported; `.next/static` total
  1.1 MB. Home HTML 125 KB, Gifting HTML 49 KB (local build).
- **Lighthouse: NOT RUN** — no headless browser is available in this
  environment. Run Lighthouse / PageSpeed Insights on the Vercel
  preview URL and record the real scores there. No scores are claimed.
- **Load test (500 concurrent visitors): NOT RUN** — no staging
  deployment exists to test against, and the live domain is parked.
  **Do not claim the site handles 500 concurrent visitors** until a
  controlled load test is run against a preview/staging deployment.
  The architecture is right for it (fully static pages on Vercel's
  CDN), but capacity is unverified.

---

## 7. SEO and accessibility

- **Titles**: every page has a unique title (`Gifting Services |
  Lata Enterprises` via the shared `%s | Lata Enterprises` template;
  a duplicated "| Lata Enterprises | Lata Enterprises" title on the
  new page was caught and fixed before delivery).
- **Meta descriptions**: unique per page, including the new
  `/gifting` page.
- **Canonicals**: `https://www.thelata.com/gifting` on the new page;
  existing canonicals unchanged.
- **Open Graph / Twitter**: unchanged from the home page (site-wide
  defaults in `app/layout.tsx`).
- **Sitemap**: `/gifting` added (priority 0.8, monthly).
  **Robots**: unchanged (`Allow: /`, sitemap listed).
- **Alt text**: every new image has a descriptive alt text that
  describes only what the photo shows.
- **Headings**: one `h1` per page; the Gifting page uses `h2` section
  titles and `h3` category titles in order.
- **Contrast / focus / keyboard**: unchanged from the existing design
  (navy on ivory, gold accents, visible focus via native browser
  outlines, lightbox closes with Escape and arrow keys).
- **Reduced motion**: respected — `RevealInit` skips animations when
  the user prefers reduced motion, and content is never hidden by CSS.

---

## 8. Technical checklist (the 22 checks)

| # | Check | Result |
|---|---|---|
| 1 | Clean dependency installation (`npm ci`) | **PASS** — exit 0, 368 packages |
| 2 | Production build | **PASS** — succeeds, 7 routes |
| 3 | TypeScript checks | **PASS** — 0 errors |
| 4 | Lint checks | **PASS** — 0 errors, 0 warnings |
| 5 | Automated tests, if available | **NOT RUN** — no tests exist in the project |
| 6 | Dependency vulnerability audit | **PASS** — OSV, 415 pairs, 0 vulnerable (`npm audit` blocked, 403) |
| 7 | Broken-link checks | **PASS** — all internal links, nav/footer links and assets 200 |
| 8 | All route checks | **PASS** — 4 pages + robots + sitemap + favicon 200 |
| 9 | Direct page-refresh checks | **PASS** — direct URL access 200 on every route |
| 10 | 404 page checks | **PASS** — branded 404, working Back to Home |
| 11 | Missing image and asset checks | **PASS** — 22/22 assets 200 |
| 12 | Browser console checks | **NOT RUN** — no headless browser available |
| 13 | Network request checks | **NOT RUN** in a browser; server-side, all referenced assets and chunks return 200 |
| 14 | HTTPS and SSL verification | **NOT RUN** — domain is parked; cannot verify until DNS points at Vercel (§5) |
| 15 | Security-header verification | **PASS** — all 6 headers verified live |
| 16 | Exposed-secret checks | **PASS** — 0 hits, no `.env`, no API routes |
| 17 | Performance audit (Lighthouse) | **NOT RUN** — needs a browser; run on the Vercel preview |
| 18 | Mobile responsiveness checks | **NOT RUN** in a real browser; verified by code review (2-per-row on mobile, no fixed widths, responsive type) |
| 19 | Tablet responsiveness checks | **NOT RUN** in a real browser; same code-review basis as 18 |
| 20 | Desktop responsiveness checks | **NOT RUN** in a real browser; same code-review basis as 18 |
| 21 | Browser compatibility checks | **NOT RUN** — no browser available |
| 22 | Controlled load testing | **NOT RUN** — no staging deployment; do not claim 500 concurrent visitors |

Nothing marked PASS was untested. Items marked NOT RUN are real
gaps to close on the Vercel preview / live domain, not code defects.

---

## 9. What the owner still needs to do

1. **Domain first**: confirm ownership of `thelata.com`; if it is not
   owned, buy/register it (or choose another domain). Point its DNS
   at Vercel (see `README.md` / `DEPLOYMENT.md` §1D).
2. Deploy this project to Vercel from GitHub (steps in `README.md`).
3. Test the **preview URL on a real phone and laptop**: videos play
   full-frame, the 30 counts 0 → 30, Collections 2 per row on mobile,
   the catalogue lightbox opens (including the five new images),
   the Gifting page shows its three photos and five text-only
   categories, CALL FOR PRICE dials +91 98944 88870, no console
   errors, no horizontal scrolling.
4. Run Lighthouse / PageSpeed on the preview URL and record the scores.
5. Add `www.thelata.com` in Vercel, set it as the production domain,
   confirm the padlock at `https://www.thelata.com`, then submit the
   sitemap in Google Search Console.
6. Only after step 5: print the QR code (it points to
   `https://www.thelata.com`).
7. Optional: if the produce-bags photo should replace one of the
   catalogue images, say which position — the file is already in the
   project (`public/assets/bag-produce.jpg`).
