import Link from "next/link";
import { cn } from "@/lib/utils";

const styles = {
  primary:
    "bg-burgundy text-ivory hover:bg-burgundy-deep border-burgundy hover:border-burgundy-deep",
  secondary:
    "bg-transparent text-ink border-ink hover:bg-burgundy hover:text-ivory hover:border-burgundy",
  gold: "bg-gold text-ivory border-gold hover:bg-gold-deep",
  ghost: "bg-transparent text-ink border-transparent hover:border-line hover:bg-ivory-deep",
  burgundy: "bg-burgundy text-ivory border-burgundy hover:bg-burgundy-deep",
};

type ButtonProps = {
  href?: string;
  variant?: keyof typeof styles;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const cls = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-none border px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 touch-manipulation disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:tracking-[0.22em]",
    styles[variant],
    className,
  );
  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    if (external) {
      return (
        <a
          href={href}
          className={cls}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
