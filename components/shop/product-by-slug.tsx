"use client";

import Link from "next/link";
import { ProductDetail } from "@/components/shop/product-detail";
import { Container } from "@/components/ui/container";
import { useRecords } from "@/lib/store/records";

export function ProductBySlug({ slug }: { slug: string }) {
  const { catalogue } = useRecords();
  const product = catalogue.find((item) => item.slug === slug);
  if (!product) {
    return (
      <Container className="py-24 text-center">
        <h1 className="font-display text-4xl">Piece not found</h1>
        <p className="mt-3 text-sm text-muted">It may have been archived, or the link is incorrect.</p>
        <Link href="/shop" className="mt-6 inline-block underline">
          Back to the collection
        </Link>
      </Container>
    );
  }
  return <ProductDetail product={product} />;
}
