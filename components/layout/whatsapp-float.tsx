"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { getWhatsAppLink } from "@/lib/config";

export function WhatsAppFloat() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-60 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 hover:bg-[#1ebe5d] focus-visible:outline-offset-4 sm:right-6"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
