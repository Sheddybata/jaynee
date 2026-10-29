import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export function pageMeta({
  title,
  description,
  path,
  image,
  noIndex,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  const ogImage = image || `${siteConfig.url}/opengraph-image.png`;
  return {
    title,
    description,
    keywords: siteConfig.keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_NG",
      type: "website",
      images: [{ url: ogImage, alt: `${siteConfig.name} — ${siteConfig.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
  };
}
