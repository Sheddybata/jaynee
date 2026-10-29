import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/shop", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/custom-tailoring", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/appointments", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/measurements", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  return staticPaths.map((item) => ({
    url: `${siteConfig.url}${item.path}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));
}
