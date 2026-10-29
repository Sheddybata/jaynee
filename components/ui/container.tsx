import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-8", className)}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center")}>
      {eyebrow ? (
        <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-gold-deep">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">{title}</h2>
      {body ? <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:mt-4 sm:text-base sm:leading-7">{body}</p> : null}
    </div>
  );
}

export function MockBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-gold/50 bg-ivory px-4 py-3 text-sm text-ink-soft">
      <span className="mr-2 text-[10px] uppercase tracking-[0.2em] text-gold-deep">Demo</span>
      {children}
    </div>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="border border-dashed border-line px-6 py-16 text-center">
      <h3 className="font-display text-3xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted">{body}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
