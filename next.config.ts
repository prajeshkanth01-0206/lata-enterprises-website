import type { NextConfig } from "next";

/**
 * Lata Enterprises — production configuration.
 *
 * Security headers (applied to every response):
 * - Content-Security-Policy: tight allow-list. `unsafe-inline` is kept for
 *   scripts/styles because Next.js needs inline scripts for hydration and
 *   inline styles for its runtime; there is no user input, no dynamic code
 *   execution and no third-party script on this site, so the residual risk
 *   is minimal. No external scripts are loaded at all.
 * - Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options,
 *   Referrer-Policy, Permissions-Policy.
 * - No environment variables, secrets or API routes exist in this project.
 */
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  /**
   * Canonical hostname is www.thelata.com. The apex domain (thelata.com)
   * redirects permanently to www. HTTP to HTTPS is automatic on Vercel.
   * This rule only fires for the apex host, so Vercel preview URLs are
   * unaffected. It takes effect once thelata.com is added as a domain in
   * Vercel and its DNS points at Vercel — until then the live domain is
   * still parked at the registrar and HTTPS cannot be verified.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "thelata.com" }],
        destination: "https://www.thelata.com/:path*",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob:",
      "media-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; ");
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
