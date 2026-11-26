# Lata Enterprises — Production Website

Premium cinematic website for **Lata Enterprises** (bag manufacturer,
Erode, Tamil Nadu) — Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
+ GSAP ScrollTrigger, ready for Vercel hosting at **www.thelata.com**.

## Pages

- `/` — Home: hero video, Introducing (0 → 30 counter), Collections,
  Bag Catalogue with lightbox preview, Temple Collection, Craftsmanship,
  Materials, Why Choose, Founder preview, Director of Operations
  (Keerthana), About preview, Our Group, Contact
- `/about` — About Us
- `/gifting` — Gifting Services (added 2026-11-26): Saree Bags,
  Bottle Bags and Jute Fancy Bags with product photos; all other
  gifting categories (Temple, Corporate, Wedding, Customised,
  Educational) as text only
- `/founder` — Founder Latha C. with the full journey timeline
  (1990 / 1998 / 2000 / 2013, 200 people trained, doctorate as one
  timeline point)

No backend, no API routes, no forms, no cookies, no database.
All phone buttons dial `+91 98944 88870` and the business email is
**thelataerode@gmail.com** (Contact section and footer).

## Required software

- **Node.js 20 or newer** (Node 24 recommended — this project was built
  and verified with Node 24.22.1)
- **npm 10 or newer** (ships with Node)

No other software is needed. No database, no CMS, no extra services.

## Install dependencies

```bash
cd lata-enterprises-nextjs
npm ci
```

`npm ci` installs exactly the versions in `package-lock.json`.
(Use `npm install` only if you intentionally want to update versions.)

## Run locally

```bash
npm run dev      # development server at http://localhost:3000
```

## Build for production

```bash
npm run build    # TypeScript check + production build
npm start        # serve the production build at http://localhost:3000
```

Other useful commands:

```bash
npm run lint     # ESLint (Next.js core-web-vitals + TypeScript rules)
npx tsc --noEmit # TypeScript check without building
```

## Environment variables

**None required.** The site has no backend, no API keys and no secrets.
See `.env.example` — it lists no variables on purpose. If a service is
ever added, add its variable name there (no values) and set the real
value only in Vercel, never in Git.

## Connect GitHub

```bash
git init
git add .
git commit -m "Lata Enterprises production website"
# Create an empty repository on GitHub (for example lata-enterprises-website), then:
git remote add origin https://github.com/<your-account>/lata-enterprises-website.git
git branch -M main
git push -u origin main
```

Do **not** commit `node_modules/` or `.next/` — both are in `.gitignore`.
Never commit a real `.env` file or any secret.

## Deploy on Vercel

1. Go to https://vercel.com/new and choose **Import Git Repository**.
2. Select the GitHub repository.
3. Framework preset: **Next.js** (auto-detected; `vercel.json` also
   declares it).
4. Build command: `npm run build` (default). Output directory: default
   (`.next`). Install command: `npm install` (default).
5. Environment variables: **none needed** — leave empty.
6. Click **Deploy**, then test the preview URL on a phone and a laptop
   before going live.

**Plan note:** do not assume the free Hobby plan is suitable — this is
a paid commercial business website. Use a paid plan that permits
commercial use (Pro, about $20/user/month at the time of writing —
confirm at https://vercel.com/pricing).

## Connect www.thelata.com

> **Important — check the domain first (2026-11-26):** `www.thelata.com`
> is currently a GoDaddy parked "for sale" page. It does **not** point
> at Vercel and the site is not live on it. Before following the steps
> below, confirm who owns `thelata.com` at the registrar. If Lata
> Enterprises owns it, set the DNS records Vercel shows. If nobody at
> Lata owns it, the domain must be bought / registered first, or a
> different domain used. HTTPS **cannot** be verified until the domain
> points at Vercel. The project already redirects the apex domain to
> www permanently (`next.config.ts`), so once both hostnames are added
> in Vercel that redirect applies automatically.

1. In the Vercel project: **Settings → Domains → Add** `www.thelata.com`
   (add the apex `thelata.com` too, so both work).
2. Vercel shows the DNS records to add at your domain registrar:
   - `www`: a **CNAME** record pointing to `cname.vercel-dns.com`.
   - Apex: an **A** record to the IP Vercel shows (or use Vercel
     nameservers).
3. Wait for DNS to propagate (minutes, sometimes up to 24 hours).
4. Vercel issues the HTTPS certificate automatically. Confirm the site
   opens at `https://www.thelata.com` with a valid padlock.
5. Set `www.thelata.com` as the production domain and redirect the apex
   to it (or the reverse — pick one canonical version).

## After going live

- Submit the sitemap in Google Search Console:
  `https://www.thelata.com/sitemap.xml`.
- Check `https://www.thelata.com/robots.txt` loads.
- Run Lighthouse / PageSpeed Insights on the live URL.
- Set up uptime monitoring (Vercel's built-in monitoring, or an
  external check such as UptimeRobot).

## Project structure

```
app/                  Home (/), About (/about), Gifting Services
                      (/gifting), Founder (/founder),
                      custom 404 (not-found.tsx), error boundary (error.tsx),
                      sitemap (sitemap.ts), robots (robots.ts), layout + SEO
components/           Nav, Footer, Catalogue (lightbox), VideoStage
                      (lazy video loading), Reveal (GSAP scroll animations),
                      Counter (0 → 30), SectionHeading
lib/site.ts           All business data in one place: phone, email, address,
                      Instagram/Facebook, collections, catalogue, materials,
                      Why Choose, Our Group
public/assets/        Real uploaded assets: logos, 3 videos + posters,
                      founder portrait (tightly cropped), 6 bag photos,
                      plus 6 new product photos (2026-11-26): 5 in the
                      Bag Collection, 1 produce-bags photo kept available
next.config.ts        Security headers (CSP, HSTS, X-Content-Type-Options,
                      X-Frame-Options, Referrer-Policy, Permissions-Policy),
                      AVIF/WebP image formats, apex → www redirect
vercel.json           Vercel framework declaration
DEPLOYMENT.md         Deployment steps + the full verification/audit report
QA-REPORT.md          QA report for the 2026-11-26 update (v2): what changed,
                      route/security/performance checks, and what is still
                      unverified (Lighthouse, load test, HTTPS on the live
                      domain)
```

## Assets

All photos and videos are real uploaded assets in `public/assets/` —
the Lata logo (original, gold and white versions), the three animation
videos with poster frames (compressed for the web, still 1080×1920),
the founder portrait (tightly cropped), the six customer bag
photographs, and the six new product photos added 2026-11-26 (five in
the Bag Collection — jute floral, saree bags, bottle bags, red-border
jute, block-print tote — plus a produce-bags photo kept available for
a future swap).

## Verification

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the deployment steps, the
Vercel plan note, and the honest verification report — including the
full production-readiness audit of 2026-11-25 (routes, 404s, links,
security, dependencies, build, TypeScript, ESLint) and what was
**not** tested here (no headless browser, so no Lighthouse and no
browser console check; no load test — do not claim 500 concurrent
visitors until a real load test is run).

See **[QA-REPORT.md](./QA-REPORT.md)** for the 2026-11-26 update (v2):
new Bag Collection images, the 101E address, the Gifting Services
page, the apex → www redirect, and the full re-check (routes, 404,
security headers, OSV dependency scan, build, TypeScript, ESLint) —
plus what is still unverified, including the parked domain and HTTPS.
