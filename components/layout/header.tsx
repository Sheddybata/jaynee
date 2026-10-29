"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand/logo";
import { useUI } from "@/lib/store/ui";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Lookbook" },
  { href: "/custom-tailoring", label: "Custom Tailoring" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { setMenuOpen } = useUI();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/92 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-1 px-3 py-2 sm:gap-2 sm:px-8 sm:py-3 lg:flex lg:justify-between lg:gap-4 lg:px-8 lg:py-4">
        <button
          type="button"
          className="grid h-11 w-11 place-items-center lg:hidden"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>

        <BrandLogo className="justify-self-center lg:mx-0 lg:justify-self-start" heightClass="h-9 sm:h-12 lg:h-14" />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[11px] uppercase tracking-[0.2em] transition-colors",
                  active ? "text-burgundy" : "text-ink-soft hover:text-burgundy",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <span className="inline-block h-11 w-11 lg:hidden" aria-hidden />
      </div>
    </header>
  );
}

export { nav as primaryNav };
