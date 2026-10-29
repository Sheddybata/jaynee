import { isBrowser } from "@/lib/utils";

export const storageKeys = {
  cart: "tc_cart",
  wishlist: "tc_wishlist",
  profile: "tc_profile",
  addresses: "tc_addresses",
  orders: "tc_orders",
  tailoring: "tc_tailoring",
  appointments: "tc_appointments",
  measurements: "tc_measurements",
  products: "tc_products_overrides",
  discounts: "tc_discounts",
  delivery: "tc_delivery",
  featured: "tc_featured",
  newsletter: "tc_newsletter",
  users: "tc_users",
  categories: "tc_categories",
} as const;

export function readStore<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: string, value: T) {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeStore(key: string) {
  if (!isBrowser()) return;
  window.localStorage.removeItem(key);
}
