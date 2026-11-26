import type { Metadata, Viewport } from "next";
import { Jost, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RevealInit } from "@/components/Reveal";
import { PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Lata Enterprises — Premium Bags, Jute Bags & Customised Return Gifts | Erode",
    template: "%s | Lata Enterprises",
  },
  description:
    "Lata Enterprises, Erode — 30 years of craftsmanship in fancy bags, jute bags, customised bags and return-gift bags for weddings, temples, corporate and celebrations. Call +91 98944 88870.",
  keywords: [
    "Lata Enterprises",
    "jute bags Erode",
    "customised return gift bags",
    "temple return gift bags",
    "Manjal Pai bags",
    "wedding return gift bags",
    "corporate gift bags",
    "bag manufacturer Tamil Nadu",
  ],
  authors: [{ name: "Lata Enterprises" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Lata Enterprises",
    title: "Lata Enterprises — Crafting Tradition. Creating Sustainable Futures.",
    description:
      "Thoughtfully crafted bags for celebrations, businesses and meaningful moments. 30 years of craftsmanship from Erode, Tamil Nadu.",
    images: [
      {
        url: "/assets/poster-hero.jpg",
        width: 1080,
        height: 1920,
        alt: "Lata Enterprises jute bag with the company logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lata Enterprises — Crafting Tradition. Creating Sustainable Futures.",
    description:
      "Thoughtfully crafted bags for celebrations, businesses and meaningful moments.",
    images: ["/assets/poster-hero.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#142D59",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Lata Enterprises",
  url: SITE_URL,
  telephone: PHONE_DISPLAY,
  email: "thelataerode@gmail.com",
  founder: { "@type": "Person", name: "Latha C." },
  address: {
    "@type": "PostalAddress",
    streetAddress: "101E, Keerthi Illam, N.M.S. Street, Kalingarayanpalayam",
    addressLocality: "Bhavani",
    addressRegion: "Erode, Tamil Nadu",
    postalCode: "638301",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/the_lata_erode/",
    "https://www.facebook.com/share/1Fd47KAmmG/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ivory font-body text-navy">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <RevealInit />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Sticky Call Now on mobile */}
        <a
          href={PHONE_TEL}
          className="fixed right-4 bottom-4 z-50 rounded-full bg-gold px-6 py-3 text-sm font-semibold tracking-[0.14em] text-white uppercase shadow-[0_6px_24px_rgba(20,45,89,0.35)] transition-colors hover:bg-navy md:hidden"
          aria-label={`Call Lata Enterprises now on ${PHONE_DISPLAY}`}
        >
          Call Now
        </a>
      </body>
    </html>
  );
}
