"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand/logo";
import { useAuth } from "@/lib/store/auth";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/tailoring", label: "Tailoring" },
  { href: "/admin/measurements", label: "Measurements" },
  { href: "/admin/appointments", label: "Appointments" },
  { href: "/admin/delivery", label: "Delivery" },
  { href: "/admin/discounts", label: "Discounts" },
  { href: "/admin/featured", label: "Featured" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="px-6 py-24 text-center text-sm">Checking studio access…</div>}>
      <AdminShellInner>{children}</AdminShellInner>
    </Suspense>
  );
}

function AdminShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((res) => {
        if (!res.ok) throw new Error("no");
        setOk(true);
      })
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  if (!ok) return <div className="px-6 py-24 text-center text-sm">Checking studio access…</div>;

  return (
    <div className="min-h-screen bg-ivory">
      <div className="flex">
        <aside className="hidden min-h-screen w-56 border-r border-line bg-paper p-5 md:block">
          <BrandLogo heightClass="h-10" />
          <p className="mt-3 font-display text-2xl">Studio</p>
          <p className="mt-1 text-[10px] tracking-[0.18em] text-muted uppercase">{user?.email}</p>
          <nav className="mt-8 flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm",
                  pathname === link.href ? "text-burgundy" : "text-ink-soft hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="mt-10 text-xs underline"
            onClick={() => logout().then(() => router.push("/admin/login"))}
          >
            Sign out
          </button>
        </aside>
        <div className="flex-1 p-5 md:p-10">
          <nav className="mb-6 flex gap-3 overflow-x-auto text-xs uppercase tracking-[0.14em] md:hidden">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          {children}
        </div>
      </div>
    </div>
  );
}
