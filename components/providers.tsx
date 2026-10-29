"use client";

import { AuthProvider } from "@/lib/store/auth";
import { CartProvider } from "@/lib/store/cart";
import { RecordsProvider } from "@/lib/store/records";
import { ToastProvider } from "@/lib/store/toast";
import { UIProvider } from "@/lib/store/ui";
import { WishlistProvider } from "@/lib/store/wishlist";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <UIProvider>
        <AuthProvider>
          <RecordsProvider>
            <CartProvider>
              <WishlistProvider>{children}</WishlistProvider>
            </CartProvider>
          </RecordsProvider>
        </AuthProvider>
      </UIProvider>
    </ToastProvider>
  );
}
