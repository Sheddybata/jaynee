"use client";

import { X } from "lucide-react";
import { useToast } from "@/lib/store/toast";
import { cn } from "@/lib/utils";

export function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-80 flex w-[min(100%-2rem,360px)] flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto border bg-paper px-4 py-3 shadow-none",
            toast.tone === "error" ? "border-danger" : "border-ink/15",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium">{toast.title}</p>
              {toast.description ? (
                <p className="mt-1 text-xs leading-5 text-muted">{toast.description}</p>
              ) : null}
            </div>
            <button type="button" aria-label="Dismiss" onClick={() => dismiss(toast.id)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
