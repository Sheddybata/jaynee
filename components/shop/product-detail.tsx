"use client";

import { Heart, MessageCircle, Truck, Undo2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Price } from "@/components/ui/price";
import { QuantitySelector } from "@/components/ui/quantity";
import { siteConfig } from "@/lib/config";
import { openStudioWhatsApp, productOrderMessage } from "@/lib/whatsapp";
import { useCart } from "@/lib/store/cart";
import { useRecords } from "@/lib/store/records";
import { useToast } from "@/lib/store/toast";
import { useUI } from "@/lib/store/ui";
import { useWishlist } from "@/lib/store/wishlist";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductDetail({ product }: { product: Product }) {
  const { catalogue } = useRecords();
  const related = catalogue
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);
  const { addItem } = useCart();
  const { setCartOpen } = useUI();
  const { push } = useToast();
  const { has, toggle } = useWishlist();
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name);
  const [size, setSize] = useState<string>();
  const [fit, setFit] = useState<"standard" | "custom">("standard");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  function selectedOptions() {
    if (!product.inStock) {
      setError("This piece is currently on waitlist.");
      return false;
    }
    if (product.colors.length && !color) {
      setError("Select a colour.");
      return false;
    }
    if (product.sizes.length && !size) {
      setError("Select a size, or choose custom measurements.");
      return false;
    }
    if (fit === "custom" && size !== "Made to measure" && !size) {
      setError("Choose custom measurements to continue.");
      return false;
    }
    setError("");
    return true;
  }

  function addToCart() {
    if (!selectedOptions()) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0].src,
      price: product.price,
      quantity: qty,
      color,
      size,
      fit,
      customNote: fit === "custom" ? "Customer will submit measurements" : undefined,
    });
    push({ title: "Added to bag", description: product.name, tone: "success" });
    setCartOpen(true);
  }

  function orderOnWhatsApp() {
    if (!selectedOptions()) return;
    openStudioWhatsApp(
      productOrderMessage({
        name: product.name,
        price: product.price,
        color,
        size,
        fit,
        quantity: qty,
        slug: product.slug,
      }),
    );
    push({
      title: "WhatsApp opened",
      description: "Tap Send so the studio receives this order.",
      tone: "success",
    });
  }

  return (
    <Container className="py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep">
            <Image
              src={product.images[active].src}
              alt={product.images[active].alt}
              fill
              priority
              suppressHydrationWarning
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={cn("relative aspect-square overflow-hidden", active === index && "ring-1 ring-ink")}
                onClick={() => setActive(index)}
              >
                <Image src={image.src} alt={image.alt} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">{product.category}</p>
          <h1 className="mt-2 font-display text-5xl">{product.name}</h1>
          <Price amount={product.price} compareAt={product.compareAtPrice} className="mt-4 text-lg" />
          <p className="mt-5 max-w-lg text-sm leading-7 text-muted">{product.description}</p>

          {product.colors.length ? (
            <div className="mt-8">
              <p className="text-[11px] tracking-[0.18em] uppercase">Colour · {color}</p>
              <div className="mt-3 flex gap-2">
                {product.colors.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-label={item.name}
                    className={cn("h-8 w-8 border", color === item.name ? "border-ink" : "border-transparent")}
                    style={{ background: item.hex }}
                    onClick={() => setColor(item.name)}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {product.sizes.length ? (
            <div className="mt-6">
              <p className="text-[11px] tracking-[0.18em] uppercase">Size</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={cn(
                      "border px-3 py-2 text-xs",
                      size === item ? "border-ink bg-ink text-ivory" : "border-line",
                    )}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {product.allowsCustom ? (
            <div className="mt-6">
              <p className="text-[11px] tracking-[0.18em] uppercase">Fit</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(["standard", "custom"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={cn(
                      "border px-3 py-3 text-left text-sm",
                      fit === item ? "border-ink" : "border-line",
                    )}
                    onClick={() => {
                      setFit(item);
                      if (item === "custom") setSize("Made to measure");
                    }}
                  >
                    <span className="block text-[11px] tracking-[0.16em] uppercase">
                      {item === "standard" ? "Standard sizing" : "Custom measurements"}
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      {item === "custom"
                        ? "Submit measurements after checkout, or book a fitting."
                        : "Use the size chart on the garment."}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <QuantitySelector value={qty} onChange={setQty} />
            <Button onClick={orderOnWhatsApp} disabled={!product.inStock}>
              <MessageCircle className="h-4 w-4" />
              Order on WhatsApp
            </Button>
            <Button variant="secondary" onClick={addToCart} disabled={!product.inStock}>
              Add to bag
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                const added = toggle(product.id);
                push({ title: added ? "Saved to wishlist" : "Removed from wishlist" });
              }}
            >
              <Heart className={cn("h-4 w-4", has(product.id) && "fill-current")} />
              Wishlist
            </Button>
          </div>
          {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
          <p className="mt-3 text-xs leading-6 text-muted">
            WhatsApp opens with this piece, colour, size, and quantity. Tap Send so the studio receives it.
          </p>
          {fit === "custom" ? (
            <p className="mt-4 text-sm">
              <a className="underline underline-offset-4" href="/measurements">
                Open the measurement guide
              </a>
            </p>
          ) : null}

          <div className="mt-10 space-y-4 border-t border-line pt-8 text-sm leading-7 text-muted">
            <p>
              <strong className="text-ink">Fabric.</strong> {product.fabrics.join(" · ")}
            </p>
            <p>
              <strong className="text-ink">Care.</strong> {product.care.join(" · ")}
            </p>
            <p className="flex gap-2">
              <Truck className="mt-1 h-4 w-4" />
              {siteConfig.policies.delivery}
            </p>
            <p className="flex gap-2">
              <Undo2 className="mt-1 h-4 w-4" />
              {siteConfig.policies.returns}
            </p>
          </div>
        </div>
      </div>
      {related.length ? (
        <div className="mt-20">
          <h2 className="font-display text-4xl">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      ) : null}
    </Container>
  );
}
