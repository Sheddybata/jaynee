import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    absolute: `jaynee.ng | ${siteConfig.tagline}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: { canonical: siteConfig.url },
};

export default function Page() {
  return <HomePage />;
}
