"use client";

import { AdminShell } from "@/components/admin/shell";
import { formatNaira } from "@/lib/format";
import { useRecords } from "@/lib/store/records";

export default function AdminHomePage() {
  const { orders, tailoring, appointments, catalogue } = useRecords();
  const revenue = orders
    .filter((item) => item.paymentStatus === "paid" || item.paymentStatus === "mock")
    .reduce((sum, item) => sum + item.total, 0);
  return (
    <AdminShell>
      <h1 className="font-display text-5xl">Overview</h1>
      <p className="mt-2 text-sm text-muted">
        Demo figures from this browser. Connect Supabase for a real studio database.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <Card label="Catalogue" value={String(catalogue.length)} />
        <Card label="Orders" value={String(orders.length)} />
        <Card label="Recorded totals" value={formatNaira(revenue)} />
        <Card label="Open requests" value={String(tailoring.length + appointments.length)} />
      </div>
    </AdminShell>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line bg-paper p-5">
      <p className="text-[11px] tracking-[0.16em] text-muted uppercase">{label}</p>
      <p className="mt-2 font-sans text-3xl font-light tracking-tight">{value}</p>
    </div>
  );
}
