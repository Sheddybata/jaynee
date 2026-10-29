import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  heightClass = "h-12 sm:h-14",
}: {
  className?: string;
  heightClass?: string;
  priority?: boolean;
}) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center", className)} aria-label={`${siteConfig.name} home`}>
      {/* Local brand mark — a static img keeps SSR and the client identical. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={siteConfig.logo} alt={siteConfig.name} className={cn("max-w-[42vw] w-auto object-contain sm:max-w-none", heightClass)} />
    </Link>
  );
}
