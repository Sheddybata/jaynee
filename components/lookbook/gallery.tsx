"use client";

import Image from "next/image";
import { looks } from "@/lib/data/clothes";
import { lookMessage, openStudioWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function LookbookGallery({
  className,
  limit,
}: {
  className?: string;
  limit?: number;
}) {
  const items = [...looks].reverse();
  const shown = limit ? items.slice(0, limit) : items;
  const preview = Boolean(limit);

  return (
    <div
      className={cn(
        "-mx-4 grid grid-cols-2 gap-px sm:mx-0 sm:gap-2",
        preview ? "md:grid-cols-3" : "md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {shown.map((look) => (
        <button
          key={look.id}
          type="button"
          aria-label={`Ask about ${look.alt} on WhatsApp`}
          className="group relative aspect-[3/4] overflow-hidden bg-ivory-deep touch-manipulation"
          onClick={() => openStudioWhatsApp(lookMessage())}
        >
          <Image
            src={look.src}
            alt={look.alt}
            fill
            sizes={preview ? "(max-width: 768px) 50vw, 33vw" : "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-ink/60 px-2 py-1.5 text-[9px] tracking-[0.14em] text-ivory uppercase sm:px-3 sm:py-2 sm:text-[10px] sm:tracking-[0.16em] md:opacity-0 md:group-hover:opacity-100">
            Ask on WhatsApp
          </span>
        </button>
      ))}
    </div>
  );
}
