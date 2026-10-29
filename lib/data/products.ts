import type { Product } from "@/lib/types";

export const products: Product[] = [];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getRelatedProducts(_product: Product, _limit = 4) {
  return [] as Product[];
}

export function getFeaturedProducts() {
  return [] as Product[];
}

export function getBestsellers() {
  return [] as Product[];
}

export function getNewArrivals() {
  return [] as Product[];
}

export function searchProducts(_query: string) {
  return [] as Product[];
}
