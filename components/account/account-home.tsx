"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container, MockBanner, SectionHeading } from "@/components/ui/container";
import { formatDate, formatNaira } from "@/lib/format";
import { useAuth } from "@/lib/store/auth";
import { useRecords } from "@/lib/store/records";
import { useWishlist } from "@/lib/store/wishlist";

const links = [
  { href: "/account/orders", label: "Orders" },
  { href: "/account/measurements", label: "Measurements" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/account/tailoring", label: "Tailoring requests" },
  { href: "/account/appointments", label: "Appointment requests" },
];

export function AccountHome() {
  const { user, ready, logout } = useAuth();
  const { orders, measurements, tailoring, appointments } = useRecords();
  const { ids } = useWishlist();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace("/account/login");
  }, [ready, user, router]);

  if (!user) return <div className="px-5 py-24 text-center text-sm">Loading account…</div>;

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Account" title={`Hello, ${user.name}`} />
      <MockBanner>
        This account area is running in demo mode. Sign-in is a signed cookie, not production
        authentication. Connect Supabase Auth before launch.
      </MockBanner>
      <div className="mt-8 flex flex-wrap gap-3">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="border border-line px-4 py-2 text-xs tracking-[0.16em] uppercase">
            {link.label}
          </Link>
        ))}
        <Button variant="secondary" onClick={() => logout().then(() => router.push("/"))}>
          Sign out
        </Button>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Stat label="Orders" value={String(orders.length)} />
        <Stat label="Saved measurements" value={String(measurements.length)} />
        <Stat label="Wishlist" value={String(ids.length)} />
      </div>
      <div className="mt-10">
        <h2 className="font-display text-3xl">Recent orders</h2>
        <ul className="mt-4 divide-y border border-line">
          {orders.slice(0, 3).map((order) => (
            <li key={order.id} className="flex justify-between px-4 py-3 text-sm">
              <span>{order.reference}</span>
              <span>{formatNaira(order.total)}</span>
              <span className="text-muted">{order.status.replaceAll("_", " ")}</span>
            </li>
          ))}
          {orders.length === 0 ? <li className="px-4 py-6 text-sm text-muted">No orders on this device yet.</li> : null}
        </ul>
      </div>
      <p className="mt-6 text-xs text-muted">
        Latest measurement saved {measurements[0] ? formatDate(measurements[0].createdAt) : "—"} ·
        Tailoring {tailoring.length} · Appointments {appointments.length}
      </p>
    </Container>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line p-5">
      <p className="text-[11px] tracking-[0.18em] text-muted uppercase">{label}</p>
      <p className="mt-2 font-sans text-4xl font-light tracking-tight">{value}</p>
    </div>
  );
}
