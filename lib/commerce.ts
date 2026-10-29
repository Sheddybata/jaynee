import { defaultDeliveryConfig, demoDiscountCodes } from "@/lib/config";
import { getStateByName } from "@/lib/nigerian-states";
import { readStore, storageKeys } from "@/lib/mock/storage";
import type { CartItem, DeliveryConfig, DiscountCode } from "@/lib/types";

export function getDeliveryConfig(): DeliveryConfig {
  return readStore<DeliveryConfig>(storageKeys.delivery, defaultDeliveryConfig);
}

export function getDiscountCodes(): DiscountCode[] {
  return readStore<DiscountCode[]>(storageKeys.discounts, demoDiscountCodes);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function deliveryFeeForState(state: string, subtotal: number, config?: DeliveryConfig) {
  const cfg = config ?? getDeliveryConfig();
  if (subtotal >= cfg.freeOver) return 0;
  const match = cfg.rules.find((rule) => rule.states.includes(state));
  if (match) return match.fee;
  const zone = getStateByName(state)?.zone;
  if (zone === "lagos") return 3500;
  if (zone === "fct") return 5000;
  return cfg.defaultFee;
}

export function applyDiscount(code: string | undefined, subtotal: number) {
  if (!code) return { discount: 0, code: undefined as string | undefined, error: undefined as string | undefined };
  const found = getDiscountCodes().find(
    (item) => item.active && item.code.toUpperCase() === code.trim().toUpperCase(),
  );
  if (!found) return { discount: 0, code: undefined, error: "This code is not recognised." };
  if (found.minSubtotal && subtotal < found.minSubtotal) {
    return {
      discount: 0,
      code: undefined,
      error: `This code applies to orders from ₦${found.minSubtotal.toLocaleString("en-NG")}.`,
    };
  }
  const discount =
    found.type === "percent" ? Math.round((subtotal * found.value) / 100) : found.value;
  return { discount: Math.min(discount, subtotal), code: found.code, error: undefined };
}

export function cartTotals(items: CartItem[], state?: string, discountCode?: string) {
  const subtotal = cartSubtotal(items);
  const { discount, code, error } = applyDiscount(discountCode, subtotal);
  const delivery = state ? deliveryFeeForState(state, subtotal - discount) : 0;
  return {
    subtotal,
    discount,
    discountCode: code,
    discountError: error,
    delivery,
    total: Math.max(0, subtotal - discount + delivery),
  };
}
