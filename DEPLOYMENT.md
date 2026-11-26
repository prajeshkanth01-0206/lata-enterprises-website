# Lata Enterprises — Deployment Guide & Verification Report

Production website for **Lata Enterprises** (bag manufacturer, Erode,
Tamil Nadu). Next.js 16.4.6 (App Router) + TypeScript + Tailwind CSS v4 +
GSAP ScrollTrigger. Static/server-rendered, no backend, no API routes,
no forms, no cookies, no database.

---

## 1. Deploy to Vercel (exact steps)

### A. Put the project on GitHub

```bash
cd lata-enterprises-nextjs
git init
git add .
git commit -m "Lata Enterprises production website"
# Create an empty repository on GitHub (e.g. lata-enterprises-website),
# then:
git remote add origin https://github.com/<your-account>/lata-enterprises-website.git
git branch -M main
git push -u origin main
```

Do **not** commit `node_modules/` or `.next/` — both are already in
`.gitignore`. Never commit any secret: this project has no environment
variables and no API keys at all.

### B. Import into Vercel

1. Go to https://vercel.com/new and choose **Import Git Repository**.
2. Select the GitHub repository.
3. Framework preset: **Next.js** (auto-detected; `vercel.json` also declares it).
4. Build command: `npm run build` (default).
5. Output directory: default (`.next`).
6. Install command: `npm install` (default).
7. Environment variables: **none needed** — leave empty.
8. Click **Deploy**.

### C. Test the preview deployment first

1. Vercel gives a preview URL (e.g. `lata-enterprises-website-xyz.vercel.app`).
2. Open it on a phone and a laptop. Check: hero video plays, Introducing
   video plays, Temple and Craftsmanship videos show their full frame,
   the 30 counts 0 → 30, Collections show 2 per row on mobile, the
   catalogue lightbox opens, all CALL FOR PRICE buttons dial
   +91 98944 88870, and the Contact section animates in.
3. Fix any issue in the repo and redeploy; repeat until the preview is clean.

### D. Connect the production domain www.thelata.com

1. In the Vercel project: **Settings → Domains → Add** `www.thelata.com`
   (and add the apex `thelata.com` too, so both work).
2. Vercel will show the DNS records to add at your domain registrar:
   - For `www`: a **CNAME** record pointing to `cname.vercel-dns.com`.
   - For the apex: an **A** record to the IP Vercel shows (or use Vercel
     nameservers if you prefer).
3. Wait for DNS to propagate (usually minutes, sometimes up to 24 hours).
4. Vercel issues the HTTPS certificate automatically. Confirm the site
   opens at `https://www.thelata.com` with a valid padlock.
5. In **Settings → Domains**, set `www.thelata.com` as the production
   domain and redirect the apex to it (or the reverse — pick one
   canonical version and redirect the other).

### E. After going live

- Submit the sitemap in Google Search Console:
  `https://www.thelata.com/sitemap.xml`.
- Check `https://www.thelata.com/robots.txt` loads.
- Run Lighthouse / PageSpeed Insights on the live URL (see §4).

---

## 2. Vercel plan — read this before choosing

**Do not assume the free Hobby plan is suitable.** Vercel's Hobby plan is
intended for personal, non-commercial projects. This is a paid commercial
business website, so use a paid plan that permits commercial use:

- **Pro** (about **$20 per user per month** at the time of writing —
  confirm the current price at https://vercel.com/pricing) permits
  commercial use, gives 1 TB of bandwidth, longer serverless execution,
  and more build minutes than Hobby.
- Hobby's free tier has lower bandwidth and build limits and is not the
  right plan for a commercial site.

If traffic grows, Vercel bills overages on Pro; monitor usage in the
Vercel dashboard (**Usage** tab) and upgrade before limits are hit. The
site is fully static, so its cost is mostly bandwidth for the three
videos (about 20 MB total) and the images.

---

## 3. Security — what is implemented

- HTTPS enforced by Vercel (HSTS header included).
- Security headers on every response (set in `next.config.ts`):
  Content-Security-Policy, Strict-Transport-Security
  (`max-age=63072000; includeSubDomains; preload`),
  X-Content-Type-Options (`nosniff`), X-Frame-Options (`DENY`),
  Referrer-Policy (`strict-origin-when-cross-origin`),
  Permissions-Policy (camera/microphone/geolocation/payment disabled).
- CSP note: `unsafe-inline` is kept for scripts and styles because
  Next.js needs inline scripts for hydration. There is no user input,
  no dynamic code execution, no third-party script and no form on this
  site, so the practical attack surface is minimal. No external scripts
  are loaded at all.
- No environment variables, no secrets, no API routes, no database, no
  cookies, no user input to validate — there is nothing sensitive to leak.
  Verified 2026-11-24: no `route.ts` files exist, no `process.env` or
  `NEXT_PUBLIC` references in the code, no `.env` files in the project.
- **Dependency vulnerability scan (2026-11-24)**: `npm audit` is blocked
  in this build environment — the npm registry's audit endpoint returns
  403 (`policy_denied`, "POST /-/npm/v1/security/audits/quick not
  permitted by policy"), so `npm audit` / `npm audit fix` cannot run
  here. Instead, all **428 packages in `package-lock.json`** were
  checked against the OSV vulnerability database (api.osv.dev, the same
  GHSA advisory data npm audit uses): **0 vulnerable packages, 0
  advisories**. The scanner was control-tested against a known
  vulnerable package (lodash 4.17.20 → 4 advisories found), so the
  clean result is real, not a silent failure. No fixes were needed and
  nothing was changed. Re-run `npm audit` on a machine where the
  registry permits it (or after deployment) as a second check.
- No website can be guaranteed 100% non-hackable. These measures
  minimise the attack surface; keep dependencies updated
  (`npm audit` / `npm update`) and review Vercel's deployment logs.

---

## 4. Verification report — what was tested, what was NOT

Tested on 2026-11-24 in this build environment (Node 24, npm 10),
against the production build (`npm run build` + `next start`):

### Passed

- **Production build**: `npm run build` succeeds — Next.js 16.4.6,
  TypeScript clean, all routes prerendered as static content
  (`/`, `/about`, `/founder`, `/robots.txt`); `/sitemap.xml` dynamic.
- **Pages serve**: `/` → 200, `/about` → 200, `/founder` → 200,
  `/robots.txt` → 200, `/sitemap.xml` → 200 (lists all three pages),
  unknown URL → 404 with the custom 404 page.
- **Security headers**: CSP, HSTS, X-Content-Type-Options,
  X-Frame-Options, Referrer-Policy and Permissions-Policy all present
  on served responses — re-verified 2026-11-24 on the production build
  (`next start`) for `/`, `/about` and `/founder`.
- **Content checks (served HTML)**:
  - Hero headline, all 6 collections (Temple, Jute Fancy, Corporate,
    Educational and Other Bags, Wedding Celebration Bags, Customised
    Return Gift Bags), "Also available: Apparel Bags", all 6 catalogue
    items (Bag Collection 01–06), Temple headline, Craftsmanship
    headline, all 8 "Why Choose" items, "The Lata Group" with LK
    Apparel / Lata Enterprises / Lata Textile and their exact
    descriptions, Keerthana profile, "Thirty Years Strong".
  - Founder page (re-verified 2026-11-24 after the 2026-11-24 evening
    content change): opening headline, timeline 1990 / 1998 / 2000 /
    2013, "trained 200 people", both verified awards, and the doctorate
    as **one timeline point only** ("Latha C. recently received a
    doctorate — an important milestone in her journey.") with no
    invented institution, degree, field or date. The separate Doctorate
    achievement section and the closing "More Than a Business. A Legacy
    of Determination." section were **removed** — verified absent from
    the served page, along with the sentence "The awarding institution,
    exact title, field of recognition and ceremony details will be added
    here once they are confirmed." (0 matches anywhere on the page).
  - "Bhavani" appears in visible text **only** inside the full address
    ("Bhavani, Erode – 638 301"); in the machine-readable JSON-LD it
    appears as `addressLocality` of that same address.
  - No email address and no `mailto:` link anywhere on the site.
  - No founder photograph on the About page.
  - Phone buttons: `tel:+919894488870` throughout.
- **Assets**: all three videos and the founder portrait serve with
  HTTP 200; fonts are self-hosted (11 woff2 files, no Google Fonts
  request at runtime).
- **Founder photo crop**: verified visually — tight crop with a small
  margin above her head, bottom trimmed, face and shoulders fully
  visible, head never cut.
- **Videos**: all three confirmed 1080×1920 (9:16); the hero, Temple
  and Craftsmanship frames are sized at exactly 9:16 so the picture is
  never cropped.
- **Clean-room rebuild from the shipped zip**: the zip was extracted to
  a fresh directory under `~/workspace`, `npm ci` (exit 0) and
  `npm run build` succeeded with all routes static — the delivered zip
  is self-contained and builds cleanly from scratch. This was re-run
  2026-11-24 evening after the founder-page content change, and the
  served clean-room build was also checked: `/` → 200, `/about` → 200,
  `/founder` → 200, removed doctorate/closing text absent (0 matches),
  new doctorate timeline point present. (An earlier attempt of this
  test failed only because `/tmp` on this machine is a 512 MB tmpfs
  that filled up during install; the test was rerun under `~/workspace`
  and passed.)

### NOT tested — do not treat these as done

- **No headless-browser check**: the Chromium installed in this
  environment is a managed build that refuses to start headless
  ("Hatch WebGL domain policy is required for browser startup"), so
  no browser console-error check and no screenshots were possible
  here. **Run the site in a real browser (phone + laptop) on the
  Vercel preview and confirm there are no console errors.**
- **No Lighthouse / PageSpeed run** in this environment (needs a
  browser). Run Lighthouse on the Vercel preview URL before going live.
- **No load test was run** — no 100 / 250 / 500 concurrent-visitor test
  (k6, Playwright or equivalent) was performed. **Do not claim the site
  handles 500 concurrent visitors until a real load test is run.**
  The site is fully static and served from Vercel's CDN, which is the
  right architecture for traffic spikes, but capacity is unverified.
- **No uptime monitoring is configured.** No 100% uptime is claimed.
  After launch, set up Vercel's built-in monitoring and consider an
  external uptime check (e.g. UptimeRobot) for www.thelata.com.
- **No actual Vercel deployment was attempted** — no Vercel account
  access exists in this environment. The project + this guide is the
  deliverable; deployment is the owner's step.

---

## 5. Production-readiness audit — 2026-11-25

Full audit of the final project (Node 24.22.1, npm 10.9.4), run against
the production build (`npm run build` + `next start`) before the final
ZIP was made. Numbers are the audit's own counts.

### What changed in this audit

- **Business email added**: `thelataerode@gmail.com` is now in the
  Contact section (Email Us, `mailto:` link), the footer (Reach Us) and
  the JSON-LD structured data. Phone is `tel:+919894488870` throughout.
- **Videos compressed**: all three videos re-encoded (H.264, CRF 28,
  `preset slow`, `faststart`, audio copied untouched) — still 1080×1920,
  24 fps, 7.93 s each, frames visually verified identical:
  temple-1 5.95 MB → 1.80 MB, temple-2 6.48 MB → 1.71 MB,
  pothys 7.21 MB → 1.32 MB. Total video payload 19.6 MB → 4.83 MB
  (−75%). Originals are kept outside the project as a backup.
- **ESLint errors fixed (7 → 0)**: six in-page anchor links
  (`/#collections`, `/#catalogue`, `/#contact`, `/#top`) changed from
  plain `<a>` to Next.js `<Link>` (same instant-jump behaviour —
  `scroll-behavior: auto` in CSS), and the Counter's reduced-motion
  branch now defers its state update to a `requestAnimationFrame`
  callback instead of calling `setState` synchronously in the effect.
- **Removed 5 unused files**: `public/file.svg`, `globe.svg`,
  `next.svg`, `vercel.svg`, `window.svg` (default Next.js scaffolding,
  referenced nowhere).

### 1. Routes and 404 audit — 3 routes checked, 0 errors

- `/` → 200, `/about` → 200, `/founder` → 200, `/robots.txt` → 200,
  `/sitemap.xml` → 200 (lists all three pages), `/favicon.ico` → 200.
- Unknown URL → 404 with the custom branded 404 page (Lata branding,
  "This page does not exist.", working "Back to Home" button, full nav
  and footer). **0 404 errors found, 0 fixed** — there were none.
- **10 internal links checked, 0 broken**: `/`, `/#top`,
  `/#collections`, `/#catalogue`, `/#contact`, `/about`, `/founder`,
  `/favicon.ico` and the two `_next/static` chunk/CSS links in the HTML
  — all return 200. (Collections and the catalogue are sections of the
  home page, not separate routes — that is the approved design, not a
  missing page.)
- **All 16 files in `public/assets/` return 200** (6 bag photos,
  founder portrait, 3 logos, 3 posters, 3 videos) with correct
  content types; video range requests return 206 (seeking works).
- **All 14 `_next/static` assets return 200** (JS chunks, CSS,
  woff2 fonts).
- **0 broken links found, 0 fixed.**

### 2. Security audit — performed, no issues found

Checks actually run (2026-11-25):

- No `.env` files anywhere in the project; no `process.env` /
  `NEXT_PUBLIC` references in source; no API keys, secrets, hardcoded
  credentials or tokens (grep over all source files — 0 hits).
- No `route.ts` files — there are no public API endpoints at all.
- No database exists, so no SQL injection surface. No forms and no
  user input, so no XSS/CSRF input surface; the only
  `dangerouslySetInnerHTML` is the JSON-LD block, which renders
  `JSON.stringify()` of a static object (no user data).
- No `eval`, `innerHTML` or `document.write`; no open redirects
  (no code reads a redirect target from a URL); no path traversal
  (no file handling from user input); no debugging code and no
  `console.log`/`debugger` in the code (only `console.error` in the
  error boundary, which logs to the owner's console).
- External URLs in the code are only the expected ones: Instagram,
  Facebook, Google Maps search, `thelata.com` and `schema.org`.
- **Security headers verified live** on the served production build
  for `/`, `/about` and `/founder` (18 checks, all present):
  Content-Security-Policy, Strict-Transport-Security
  (`max-age=63072000; includeSubDomains; preload`),
  X-Content-Type-Options (`nosniff`), X-Frame-Options (`DENY`),
  Referrer-Policy (`strict-origin-when-cross-origin`),
  Permissions-Policy (camera/microphone/geolocation/payment disabled).
- HTTPS is enforced by Vercel in production (HSTS header included).
  No cookies are used, so no cookie settings apply.
- **Dependency vulnerability scan**: `npm audit` is blocked in this
  build environment — the npm registry returns 403 (`policy_denied`)
  for the audit endpoint, so `npm audit` / `npm audit fix` cannot run
  here (retried 2026-11-25, same result). Instead, all **282 unique
  package@version pairs in `package-lock.json`** were checked against
  the OSV vulnerability database (api.osv.dev, the same GHSA advisory
  data npm audit uses): **0 vulnerable packages, 0 advisories**. The
  scanner was control-tested against a known-vulnerable package
  (lodash 4.17.20 → 4 advisories found), so the clean result is real.
  Re-run `npm audit` on a machine where the registry permits it as a
  second check.
- No website can be guaranteed 100% non-hackable. These measures
  minimise the attack surface; keep dependencies updated and review
  Vercel's deployment logs.

### 3. Dependency and code audit

- **TypeScript**: `npx tsc --noEmit` — **clean, 0 errors**.
- **ESLint**: `npm run lint` — **clean, 0 errors, 0 warnings**
  (7 errors fixed in this audit, see above).
- **Production build**: `npm run build` — **succeeds** (Next.js 16.4.6,
  Turbopack; 6 routes: `/`, `/_not-found`, `/about`, `/founder`,
  `/robots.txt` static; `/sitemap.xml` dynamic).
- **Unused dependencies**: none. Every dependency is used — `next`,
  `react`, `react-dom` (Next.js peer), `gsap` (scroll animations),
  `tailwindcss` + `@tailwindcss/turbopack`, `typescript`, `eslint` +
  `eslint-config-next`, `@types/*`.
- **No broken imports**: the build and the served pages prove every
  import resolves (a broken import fails the build).
- **Runtime errors on the served build**: none in the server log
  (`next start` ready, no errors while serving all routes and assets).

### 4. Functionality — verified on the served build

76 automated checks ran; 75 passed and 1 was a faulty check pattern
(the counter text "30 Years of Craftsmanship" is split across two
elements in the HTML, so the literal string never appears) — that one
was re-verified directly against the served markup ("Years of
Craftsmanship" present, Counter renders `0` initially and counts to
30 client-side) and confirmed present, so there were 0 real failures.

- All nav links (desktop + mobile menu items) point to real routes or
  home-page sections; all call buttons use `tel:+919894488870`;
  email is `thelataerode@gmail.com` with `mailto:` in Contact and
  footer (verified on `/`, `/about` and `/founder`); Instagram and
  Facebook links are the exact URLs.
- All 6 collections and all 6 catalogue items present; catalogue
  images all load (200); lightbox code verified by inspection
  (open/close, previous/next, Escape and arrow keys, scroll lock,
  click-outside to close) — it could not be clicked in a browser here
  (see "not tested" below).
- All three videos are valid 1080×1920 H.264 + AAC, serve 200 with
  `video/mp4` and byte-range support; the hero video is eager, the
  other two load only when scrolled near (IntersectionObserver,
  500 px margin) with poster frames as fallback; a failed video shows
  its poster instead of a blank box.
- Founder page: full timeline (1990 / 1998 / 2000 / 2013, 200 people
  trained, both awards), doctorate as **one timeline point only**,
  no "details will be added" sentence anywhere, no closing
  "More Than a Business" section. Keerthana profile is text-only
  with no image, as required.
- Counter renders `0` in the server HTML and counts 0 → 30 in ~1 s
  on scroll into view (code verified; animation itself needs a real
  browser check on the Vercel preview).
- Scroll animations: GSAP is dynamically imported, content is never
  hidden by CSS, and everything stays visible if GSAP fails or the
  user prefers reduced motion.

### 5. Performance

- **Videos**: 19.6 MB → 4.83 MB total (see above).
- **Images**: JPEGs 65–238 KB each; Next.js serves AVIF/WebP
  automatically (`next/image`, `formats: ["image/avif", "image/webp"]`).
- **Fonts**: self-hosted via `next/font` (11 woff2 files, no Google
  Fonts request at runtime).
- **JavaScript**: GSAP dynamically imported (never blocks first
  paint); total `.next/static` output 1.1 MB, largest chunk 224 KB.
- **Lazy loading**: only the hero video is eager; the other two videos
  and all below-fold images load on scroll.
- **Local response times** (same-machine, indicative only): TTFB
  2–4 ms; home HTML 124 KB, About 38 KB, Founder 43 KB.
- **Lighthouse: NOT run** — no headless browser is available in this
  environment (the installed Chromium is a managed build that refuses
  to start: "Hatch WebGL domain policy is required for browser
  startup"). **Run Lighthouse / PageSpeed Insights on the Vercel
  preview URL before going live and record the real scores there.**
  No Lighthouse scores are claimed here.

### 6. Error handling and stability

- Custom branded 404 page (verified live), error boundary with
  "Try Again" + Call buttons, loading/fallback states in the video
  component (poster fallback on error), images served by `next/image`
  with `alt` text, no unhandled runtime errors in the server log,
  no blank screens on any route. A missing image or video cannot crash
  the site — videos fall back to their poster, and the build fails
  loudly on a missing import.

### 7. Mobile and responsive

Verified by CSS inspection (no screenshots possible without a
browser — see below): `overflow-x: hidden` on `body`; no fixed
pixel widths that could overflow a 360 px screen; all headings use
responsive sizes (mobile `text-3xl`/`text-4xl`, larger on desktop);
Collections and catalogue are 2-per-row on mobile; the hero video is
full-bleed on mobile and a framed 9:16 panel on laptop; the sticky
Call Now button is mobile-only; the mobile menu is a three-dot button
with a full-width panel. **Screenshots on real iPhone/Android/tablet
screens were not possible here — check the Vercel preview on a real
phone before going live.**

### 8. Final build and clean-room check

- Final ZIP extracted to a fresh directory under `~/workspace`,
  `npm ci` (exit 0), `npm run build` succeeded, `next start` served
  `/` → 200, `/about` → 200, `/founder` → 200, and the email
  `thelataerode@gmail.com` is present in the served Contact section.
  The shipped ZIP is the one that was verified.

### Remaining issues

- **None found in the code or the served build.** The remaining items
  are checks that need a real browser or the live environment, not
  code fixes: Lighthouse scores, browser console-error check,
  lightbox/counter/animation click-through on a real phone and laptop,
  real-device screenshots, and a load test (none run — **do not claim
  500 concurrent visitors**). All of these belong on the Vercel
  preview before launch.
- **No load test was run** and **no uptime monitoring is configured**.
  No 100% uptime is claimed.

---

## 7. Update — 2026-11-26 (v2)

### What changed

- **Bag Collection images** (home page catalogue): positions 1, 3, 4,
  5, 6 replaced with the new product photos sent 2026-11-26
  (jute floral, **Saree Bags** at position 3, bottle bags,
  red-border jute, block-print tote). Position 2 unchanged. Cards,
  layout, captions, lightbox and CALL FOR PRICE buttons unchanged;
  alt text and descriptions updated to describe the new photos.
  The produce-bags photo sent the same day is kept in the project
  (`public/assets/bag-produce.jpg`) for a future swap — see
  `QA-REPORT.md` §1.
- **Business address**: `373, Keerthi Illam, …` →
  `101E, Keerthi Illam, N.M.S. Street, Kalingarayanpalayam, Bhavani
  Erode – 638 301, Tamil Nadu, India` — updated in `lib/site.ts`
  (address, short address, Maps link), JSON-LD, the Contact section
  and the footer. Verified: 0 occurrences of "373" in the source or
  in any served page.
- **New page `/gifting`** (Gifting Services): in the nav (desktop +
  mobile), footer and sitemap. Photos only for Saree Bags, Bottle
  Bags and Jute Fancy Bags; Temple, Corporate, Wedding, Customised
  and Educational categories are text only, using the site's own
  existing copy. No stock images.
- **Canonical redirect**: `next.config.ts` now permanently redirects
  `thelata.com/*` → `https://www.thelata.com/*` (308, host-matched).
  Verified locally with a `Host: thelata.com` request.

### Re-verified 2026-11-26 (local production build)

- `npm ci` exit 0; `npm run build` succeeds (7 routes, `/gifting`
  static); TypeScript 0 errors; ESLint 0 errors, 0 warnings.
- Routes: `/`, `/about`, `/founder`, `/gifting`, `/robots.txt`,
  `/sitemap.xml` (now lists `/gifting`), `/favicon.ico` → 200;
  unknown URL → 404 branded page.
- All 22 files in `public/assets/` → 200; all six security headers
  present on `/gifting`.
- OSV dependency scan: 415 package@version pairs, **0 vulnerable**
  (`npm audit` still blocked here, 403).
- Full check table, image mapping and honest NOT RUN items are in
  **`QA-REPORT.md`**.

### Domain status — the blocker

**`www.thelata.com` is still a GoDaddy parked "for sale" page as of
2026-11-26 morning.** The domain does not point at Vercel, so the
site cannot go live on it and **HTTPS cannot be verified** until the
domain is owned and its DNS is pointed at Vercel. The QR code set
delivered 2026-11-25 points at the same domain and will land on the
parked page until then — do not print it yet. See `QA-REPORT.md` §5.

### Maintenance notes (v2)

- **Produce-bags photo**: `public/assets/bag-produce.jpg` is in the
  project but not shown anywhere. To use it in the catalogue, change
  one entry in `lib/site.ts` (`CATALOGUE`) and redeploy.
- **Gifting page copy**: all category text comes from the existing
  Collections copy in `lib/site.ts`. If a category's wording changes
  on the home page, update `app/gifting/page.tsx` to match.

---

## 6. Maintenance notes

- **Founder's doctorate details**: the Founder page lists the doctorate
  only as one timeline point with no institution, degree title, field
  or date, because none were supplied. When the verified details
  arrive, expand that timeline point in `app/founder/page.tsx` and
  redeploy. Do not add a separate doctorate section or a "details will
  be added" note unless the owner asks for it.
- **Keerthana's photo**: none was supplied, so her profile is text-only
  by design. If a photo is supplied later, add it in `app/page.tsx`
  (Operations section).
- **Email**: the business email is **thelataerode@gmail.com** (added
  2026-11-25 to the Contact section, the footer and the JSON-LD
  structured data). It lives in one place, `lib/site.ts` (`EMAIL` /
  `EMAIL_MAILTO`), so a future change only needs one edit.
- **Paper Bags / Other Sustainable Bag Varieties**: the Materials section
  shows clearly marked "Product photo coming soon" placeholders for
  these two — replace them with real product photos when available.
- **Dependencies**: run `npm audit` periodically and `npm update`
  for security fixes; rebuild and redeploy after updates.
