"use client";

import { useCallback, useSyncExternalStore } from "react";
import { readStore, writeStore } from "@/lib/mock/storage";

type Entry = {
  snapshot: unknown;
  listeners: Set<() => void>;
  hydrated: boolean;
};

const cache = new Map<string, Entry>();

function ensure<T>(key: string, fallback: T): Entry {
  let entry = cache.get(key);
  if (!entry) {
    entry = { snapshot: fallback, listeners: new Set(), hydrated: false };
    cache.set(key, entry);
  }
  return entry;
}

export function usePersisted<T>(key: string, fallback: T) {
  const subscribe = useCallback(
    (listener: () => void) => {
      const entry = ensure(key, fallback);
      entry.listeners.add(listener);
      if (typeof window !== "undefined" && !entry.hydrated) {
        queueMicrotask(() => {
          entry.snapshot = readStore(key, fallback);
          entry.hydrated = true;
          entry.listeners.forEach((item) => item());
        });
      }
      return () => {
        entry.listeners.delete(listener);
      };
    },
    [key, fallback],
  );

  const getSnapshot = useCallback(() => ensure(key, fallback).snapshot as T, [key, fallback]);
  const getServerSnapshot = useCallback(() => fallback, [fallback]);
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (next: T | ((current: T) => T)) => {
      const entry = ensure(key, fallback);
      const resolved = typeof next === "function" ? (next as (current: T) => T)(entry.snapshot as T) : next;
      entry.snapshot = resolved;
      entry.hydrated = true;
      writeStore(key, resolved);
      entry.listeners.forEach((listener) => listener());
    },
    [key, fallback],
  );

  return [value, setValue] as const;
}
