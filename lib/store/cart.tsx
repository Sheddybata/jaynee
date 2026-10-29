"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { usePersisted } from "@/lib/mock/use-persisted";
import { storageKeys } from "@/lib/mock/storage";
import type { CartItem } from "@/lib/types";
import { uniqueId } from "@/lib/utils";

const emptyCart: CartItem[] = [];

type AddInput = Omit<CartItem, "id">;

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (item: AddInput) => void;
  updateQty: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = usePersisted<CartItem[]>(storageKeys.cart, emptyCart);

  const addItem = useCallback(
    (item: AddInput) => {
      setItems((current) => {
        const match = current.find(
          (row) =>
            row.productId === item.productId &&
            row.color === item.color &&
            row.size === item.size &&
            row.fit === item.fit,
        );
        if (match) {
          return current.map((row) =>
            row.id === match.id ? { ...row, quantity: row.quantity + item.quantity } : row,
          );
        }
        return [...current, { ...item, id: uniqueId("cart") }];
      });
    },
    [setItems],
  );

  const updateQty = useCallback(
    (id: string, quantity: number) => {
      setItems((current) =>
        current
          .map((row) => (row.id === id ? { ...row, quantity } : row))
          .filter((row) => row.quantity > 0),
      );
    },
    [setItems],
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((current) => current.filter((row) => row.id !== id));
    },
    [setItems],
  );

  const clear = useCallback(() => setItems(emptyCart), [setItems]);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      addItem,
      updateQty,
      removeItem,
      clear,
    }),
    [items, addItem, updateQty, removeItem, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
