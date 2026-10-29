"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/ui/price";
import { useToast } from "@/lib/store/toast";
import { useWishlist } from "@/lib/store/wishlist";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { has, toggle } = useWishlist();
  const { push } = useToast();
  const wished = has(product.id);

  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-ivory-deep">
        <Link href={`/shop/${product.slug}`}>
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </Link>
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "absolute top-3 right-3 grid h-9 w-9 place-items-center bg-paper/90",
            wished && "text-burgundy",
          )}
          onClick={() => {
            const added = toggle(product.id);
            push({
              title: added ? "Saved to wishlist" : "Removed from wishlist",
              description: product.name,
            });
          }}
        >
          <Heart className={cn("h-4 w-4", wished && "fill-current")} />
        </button>
        {!product.inStock ? (
          <span className="absolute bottom-3 left-3 bg-ink px-2 py-1 text-[10px] tracking-[0.16em] text-ivory uppercase">
            Waitlist
          </span>
        ) : product.compareAtPrice ? (
          <span className="absolute bottom-3 left-3 bg-burgundy px-2 py-1 text-[10px] tracking-[0.16em] text-ivory uppercase">
            Sale
          </span>
        ) : product.newArrival ? (
          <span className="absolute bottom-3 left-3 bg-paper px-2 py-1 text-[10px] tracking-[0.16em] uppercase">
            New
          </span>
        ) : null}
      </div>
      <div className="pt-4">
        <p className="text-[10px] tracking-[0.18em] text-muted uppercase">{product.category}</p>
        <Link href={`/shop/${product.slug}`} className="mt-1 block font-display text-2xl leading-tight">
          {product.name}
        </Link>
        <Price amount={product.price} compareAt={product.compareAtPrice} className="mt-2" />
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="border border-dashed border-line px-6 py-16 text-center text-sm text-muted">
        No pieces match these filters. Clear a filter or browse the full collection.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
