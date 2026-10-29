"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { storageKeys } from "@/lib/mock/storage";
import { usePersisted } from "@/lib/mock/use-persisted";

const emptyIds: string[] = [];

type WishlistContextValue = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = usePersisted<string[]>(storageKeys.wishlist, emptyIds);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: string) => {
      const added = !ids.includes(id);
      setIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
      return added;
    },
    [ids, setIds],
  );

  const value = useMemo(() => ({ ids, has, toggle }), [ids, has, toggle]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
