import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function WhatsAppNote({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs leading-6 text-muted", className)}>
      WhatsApp will open with your summary to {siteConfig.contact.phone}. Tap Send in WhatsApp so
      the studio receives it.
    </p>
  );
}
