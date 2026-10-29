"use client";

import { AdminShell } from "@/components/admin/shell";
import { useRecords } from "@/lib/store/records";

export default function AdminCustomersPage() {
  const { orders, tailoring, appointments } = useRecords();
  const emails = new Map<string, { name: string; phone?: string; source: string }>();
  orders.forEach((item) => emails.set(item.customer.email, { ...item.customer, source: "order" }));
  tailoring.forEach((item) => emails.set(item.customer.email, { ...item.customer, source: "tailoring" }));
  appointments.forEach((item) => emails.set(item.customer.email, { ...item.customer, source: "appointment" }));
  const rows = Array.from(emails.entries());
  return (
    <AdminShell>
      <h1 className="font-display text-5xl">Customers</h1>
      <p className="mt-2 text-sm text-muted">Compiled from demo orders and requests on this device.</p>
      <ul className="mt-8 divide-y border border-line bg-paper">
        {rows.map(([email, person]) => (
          <li key={email} className="px-4 py-3 text-sm">
            <p>{person.name}</p>
            <p className="text-muted">{email} · {person.phone} · {person.source}</p>
          </li>
        ))}
        {rows.length === 0 ? <li className="px-4 py-6 text-sm text-muted">No customer records yet.</li> : null}
      </ul>
    </AdminShell>
  );
}
