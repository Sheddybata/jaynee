"use client";

import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand/logo";
import { primaryNav } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/container";
import { QuantitySelector } from "@/components/ui/quantity";
import { getWhatsAppLink } from "@/lib/config";
import { formatNaira } from "@/lib/format";
import { useCart } from "@/lib/store/cart";
import { useUI } from "@/lib/store/ui";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useUI();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <div
      className={cn(
        "fixed inset-0 z-70 lg:hidden",
        menuOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        type="button"
        aria-label="Close menu"
        className={cn(
          "absolute inset-0 bg-ink/40 transition-opacity",
          menuOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={() => setMenuOpen(false)}
      />
      <aside
        className={cn(
          "absolute top-0 left-0 flex h-full w-[min(88vw,360px)] flex-col bg-paper px-5 pb-8 pt-[max(1.25rem,env(safe-area-inset-top))] transition-transform duration-300",
          menuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <BrandLogo heightClass="h-9" />
          <button type="button" aria-label="Close" className="grid h-11 w-11 place-items-center" onClick={() => setMenuOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="mt-8 flex flex-col gap-1">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2.5 font-display text-2xl sm:text-3xl"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/appointments" className="text-sm uppercase tracking-[0.18em]" onClick={() => setMenuOpen(false)}>
            Book a tailor
          </Link>
          <Link href="/measurements" className="text-sm uppercase tracking-[0.18em]" onClick={() => setMenuOpen(false)}>
            Measurements
          </Link>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm uppercase tracking-[0.18em]"
            onClick={() => setMenuOpen(false)}
          >
            WhatsApp the studio
          </a>
        </nav>
      </aside>
    </div>
  );
}

export function SearchOverlay() {
  return null;
}

export function CartDrawer() {
  const pathname = usePathname();
  const { cartOpen, setCartOpen } = useUI();
  const { items, updateQty, removeItem } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className={cn("fixed inset-0 z-70", cartOpen ? "pointer-events-auto" : "pointer-events-none")}>
      <button
        type="button"
        aria-label="Close bag"
        className={cn("absolute inset-0 bg-ink/40 transition-opacity", cartOpen ? "opacity-100" : "opacity-0")}
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={cn(
          "absolute top-0 right-0 flex h-full w-[min(92vw,420px)] flex-col bg-paper transition-transform duration-300",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <p className="text-[11px] uppercase tracking-[0.22em]">Shopping bag</p>
          <button type="button" aria-label="Close" onClick={() => setCartOpen(false)}>
            <X />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {items.length === 0 ? (
            <EmptyState
              title="Your bag is empty"
              body="Nothing is listed for sale. Browse the lookbook or start a custom request."
              action={
                <Button href="/shop" onClick={() => setCartOpen(false)}>
                  View the lookbook
                </Button>
              }
            />
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <Image src={item.image} alt={item.name} width={80} height={100} className="h-[100px] w-20 object-cover" />
                  <div className="flex-1">
                    <p className="text-sm">{item.name}</p>
                    <p className="mt-1 text-xs text-muted">
                      {item.color} · {item.size} · {item.fit === "custom" ? "Custom fit" : "Standard"}
                    </p>
                    <p className="mt-2 text-sm">{formatNaira(item.price)}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <QuantitySelector value={item.quantity} onChange={(qty) => updateQty(item.id, qty)} />
                      <button type="button" className="text-xs underline" onClick={() => removeItem(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 ? (
          <div className="border-t border-line p-5">
            <div className="mb-4 flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatNaira(subtotal)}</span>
            </div>
            <Button href="/checkout" className="w-full" onClick={() => setCartOpen(false)}>
              Checkout on WhatsApp
            </Button>
            <Button href="/cart" variant="secondary" className="mt-2 w-full" onClick={() => setCartOpen(false)}>
              View bag
            </Button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

export function NewsletterBar() {
  return null;
}

