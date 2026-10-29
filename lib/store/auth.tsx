"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { storageKeys } from "@/lib/mock/storage";
import { usePersisted } from "@/lib/mock/use-persisted";
import type { SessionUser } from "@/lib/types";

type AuthContextValue = {
  user: SessionUser | null;
  ready: boolean;
  setUser: (user: SessionUser | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = usePersisted<SessionUser | null>(storageKeys.profile, null);

  const setUser = useCallback(
    (next: SessionUser | null) => {
      setUserState(next);
    },
    [setUserState],
  );

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, [setUser]);

  const value = useMemo(
    () => ({ user, ready: true, setUser, logout }),
    [user, setUser, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
