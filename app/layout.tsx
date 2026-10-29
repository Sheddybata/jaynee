import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/announcement";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CartDrawer, MobileMenu, SearchOverlay } from "@/components/layout/overlays";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { JsonLd } from "@/components/seo/json-ld";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toasts";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#b40032",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: "jaynee.ng",
  title: {
    default: `jaynee.ng | ${siteConfig.tagline}`,
    template: `%s | jaynee.ng`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "jaynee.ng", url: siteConfig.url }],
  creator: "jaynee.ng",
  publisher: "jaynee.ng",
  category: "fashion",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteConfig.url,
    siteName: "jaynee.ng",
    title: `jaynee.ng | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `jaynee.ng | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG" className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <JsonLd />
        <Providers>
          <Suspense fallback={null}>
            <AnnouncementBar />
          </Suspense>
          <Suspense fallback={<div className="h-16 border-b border-line" />}>
            <Header />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          <MobileMenu />
          <SearchOverlay />
          <CartDrawer />
          <WhatsAppFloat />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
