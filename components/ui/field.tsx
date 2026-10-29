import { cn } from "@/lib/utils";

export function Field({
  label,
  error,
  hint,
  children,
  className,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block space-y-2", className)}>
      <span className="block text-[11px] uppercase tracking-[0.18em] text-muted">{label}</span>
      {children}
      {hint && !error ? <span className="block text-xs text-muted">{hint}</span> : null}
      {error ? <span className="block text-xs text-danger">{error}</span> : null}
    </label>
  );
}

const controlClass =
  "w-full rounded-none border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-burgundy";

export function inputClass(extra?: string) {
  return cn(controlClass, extra);
}
