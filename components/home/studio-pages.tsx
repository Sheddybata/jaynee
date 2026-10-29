import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { looks } from "@/lib/data/clothes";
import { cn } from "@/lib/utils";

function lookSrc(id: string) {
  return looks.find((look) => look.src.includes(id))?.src ?? looks[0]?.src ?? "";
}

const pages = [
  {
    href: "/shop",
    title: "Lookbook",
    body: "Every studio picture. Tap a look to ask on WhatsApp.",
    src: lookSrc("855339880_1439326501595590_3011904088364220498_n"),
  },
  {
    href: "/custom-tailoring",
    title: "Custom tailoring",
    body: "A garment made around you — from senator to bridal.",
    src: lookSrc("482227708_982158610645717_6911603094881759079_n"),
  },
  {
    href: "/appointments",
    title: "Book a tailor",
    body: "Request a fitting, consultation, or bridal appointment.",
    src: lookSrc("825281515_1053137100820925_8630197399959844981_n"),
  },
  {
    href: "/measurements",
    title: "Measurements",
    body: "A simple guide for men and women, in centimetres or inches.",
    src: lookSrc("488222892_999886572206254_7002148493139574113_n"),
  },
  {
    href: "/about",
    title: "About",
    body: "The house, the cloth, and how jaynee.ng works.",
    src: lookSrc("836512558_1429355239259383_5503205216986706979_n"),
  },
  {
    href: "/contact",
    title: "Contact",
    body: "Write, call, or WhatsApp the studio.",
    src: lookSrc("790434553_1031135816354387_1146495081779371951_n"),
  },
];

export function StudioPages({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "-mx-4 grid grid-cols-1 gap-px sm:mx-0 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3",
        className,
      )}
    >
      {pages.map((page) => (
        <Link
          key={page.href}
          href={page.href}
          className="group relative flex min-h-44 overflow-hidden bg-ivory-deep sm:min-h-56"
        >
          <Image
            src={page.src}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/45 to-ink/10" />
          <div className="relative mt-auto flex w-full items-end justify-between gap-3 p-5 text-ivory">
            <div>
              <h3 className="font-display text-2xl leading-tight sm:text-3xl">{page.title}</h3>
              <p className="mt-1.5 max-w-xs text-sm leading-6 text-ivory/80">{page.body}</p>
            </div>
            <ArrowUpRight className="mb-1 h-5 w-5 shrink-0" aria-hidden />
          </div>
        </Link>
      ))}
    </div>
  );
}
