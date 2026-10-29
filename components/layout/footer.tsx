"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getWhatsAppLink, siteConfig } from "@/lib/config";
import { useToast } from "@/lib/store/toast";
import { newsletterSchema } from "@/lib/validation";
import { newsletterMessage, openStudioWhatsApp } from "@/lib/whatsapp";
import { BrandLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { inputClass } from "@/components/ui/field";

const footerNav = [
  {
    title: "Studio",
    links: [
      { href: "/shop", label: "Lookbook" },
      { href: "/custom-tailoring", label: "Custom tailoring" },
      { href: "/measurements", label: "Body measurements" },
      { href: "/appointments", label: "Book a tailor" },
    ],
  },
  {
    title: "House",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  const { push } = useToast();
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  if (pathname?.startsWith("/admin")) return null;

  function subscribe(e: React.FormEvent) {
    e.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      push({ title: "Enter a valid email", tone: "error" });
      return;
    }
    setPending(true);
    openStudioWhatsApp(newsletterMessage(parsed.data.email));
    push({
      title: "WhatsApp opened",
      description: "Tap Send so the studio can add this email.",
      tone: "success",
    });
    setEmail("");
    setPending(false);
  }

  return (
    <footer className="mt-auto border-t border-line bg-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:gap-12 sm:px-8 sm:py-16 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <BrandLogo heightClass="h-12 sm:h-20" />
          <p className="mt-3 text-sm italic text-burgundy">{siteConfig.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
            Contemporary African fashion and made-to-measure tailoring. Orders, measurements, and
            studio notes go to WhatsApp at {siteConfig.contact.phone}.
          </p>
          <form onSubmit={subscribe} className="mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email for studio notes"
              className={inputClass("bg-paper min-h-11")}
            />
            <Button type="submit" disabled={pending} className="w-full shrink-0 sm:w-auto">
              {pending ? "Opening…" : "Join on WhatsApp"}
            </Button>
          </form>
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          {footerNav.map((group) => (
            <div key={group.title}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-gold-deep">{group.title}</p>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink-soft hover:text-burgundy">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            {siteConfig.contact.email} · {siteConfig.contact.phone} ·{" "}
            <a
              className="underline underline-offset-4"
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </p>
          <p>WhatsApp orders · Bank transfer · Card or cash if the studio confirms</p>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-[max(2rem,env(safe-area-inset-bottom))] text-xs leading-6 text-muted sm:px-8 sm:pb-8">
          <p>{siteConfig.policies.delivery}</p>
          <p className="mt-1">
            Instagram, Facebook and TikTok links are placeholders. Replace them in environment
            variables before launch.
          </p>
        </div>
      </div>
    </footer>
  );
}
