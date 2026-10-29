"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";

export function AnnouncementBar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || !siteConfig.announcement) return null;
  return (
    <div className="bg-burgundy-deep text-center text-[10px] leading-4 tracking-[0.08em] text-ivory uppercase sm:text-[11px] sm:tracking-[0.22em]">
      <p className="px-3 py-2 sm:px-4 sm:py-2.5">{siteConfig.announcement}</p>
    </div>
  );
}
