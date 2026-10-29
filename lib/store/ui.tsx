"use client";

import { createContext, useContext, useMemo, useState } from "react";

type UIContextValue = {
  cartOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMenuOpen: (open: boolean) => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const value = useMemo(
    () => ({ cartOpen, searchOpen, menuOpen, setCartOpen, setSearchOpen, setMenuOpen }),
    [cartOpen, searchOpen, menuOpen],
  );
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
