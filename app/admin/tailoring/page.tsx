"use client";

import { AdminShell } from "@/components/admin/shell";
import { useRecords } from "@/lib/store/records";

export default function AdminTailoringPage() {
  const { tailoring, updateTailoring } = useRecords();
  return (
    <AdminShell>
      <h1 className="font-display text-5xl">Tailoring requests</h1>
      <ul className="mt-8 space-y-3">
        {tailoring.map((item) => (
          <li key={item.id} className="border border-line bg-paper p-4 text-sm">
            <p className="font-medium">{item.category} · {item.customer.name}</p>
            <p className="text-muted">{item.fabric} · {item.colour} · {item.budget}</p>
            <select
              className="mt-2 border border-line px-2 py-1"
              value={item.status}
              onChange={(e) => updateTailoring(item.id, { status: e.target.value as typeof item.status })}
            >
              <option value="demo_submitted">demo_submitted</option>
              <option value="received">received</option>
              <option value="in_review">in_review</option>
            </select>
          </li>
        ))}
        {tailoring.length === 0 ? <p className="text-sm text-muted">No requests on this device.</p> : null}
      </ul>
    </AdminShell>
  );
}
