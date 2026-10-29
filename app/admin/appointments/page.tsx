"use client";

import { AdminShell } from "@/components/admin/shell";
import { formatDate } from "@/lib/format";
import { useRecords } from "@/lib/store/records";

export default function AdminAppointmentsPage() {
  const { appointments } = useRecords();
  return (
    <AdminShell>
      <h1 className="font-display text-5xl">Appointment requests</h1>
      <ul className="mt-8 space-y-3">
        {appointments.map((item) => (
          <li key={item.id} className="border border-line bg-paper p-4 text-sm">
            <p>{item.customer.name} · {item.type.replaceAll("_", " ")}</p>
            <p className="text-muted">
              Preferred {formatDate(item.preferredDate)} at {item.preferredTime} · request only
            </p>
          </li>
        ))}
        {appointments.length === 0 ? <p className="text-sm text-muted">No appointment requests yet.</p> : null}
      </ul>
    </AdminShell>
  );
}
