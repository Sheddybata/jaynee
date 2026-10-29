import Image from "next/image";
import type { Look } from "@/lib/data/clothes";
import { cn } from "@/lib/utils";

export function PhotoBackdrop({
  looks,
  eager = false,
  className,
}: {
  looks: Look[];
  eager?: boolean;
  className?: string;
}) {
  if (looks.length === 0) return null;

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-ink", className)} aria-hidden>
      {looks.map((look, index) => (
        <Image
          key={look.src}
          src={look.src}
          alt=""
          fill
          loading={eager && index === 0 ? "eager" : "lazy"}
          fetchPriority={eager && index === 0 ? "high" : "auto"}
          sizes="100vw"
          className={cn(
            "object-cover object-[center_18%] sm:object-[center_22%]",
            looks.length > 1 && `hero-slide hero-slide-${index}`,
          )}
        />
      ))}
    </div>
  );
}
