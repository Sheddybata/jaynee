"use client";

import { AdminShell } from "@/components/admin/shell";
import { useRecords } from "@/lib/store/records";

export default function AdminMeasurementsPage() {
  const { measurements } = useRecords();
  return (
    <AdminShell>
      <h1 className="font-display text-5xl">Measurement records</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Treat these as private. In production they must be restricted by Row Level Security.
      </p>
      <ul className="mt-8 space-y-3">
        {measurements.map((item) => (
          <li key={item.id} className="border border-line bg-paper p-4 text-sm">
            <p>{item.garment} · {item.gender} · {item.unit}</p>
            <pre className="mt-2 overflow-auto text-xs">{JSON.stringify(item.values, null, 2)}</pre>
          </li>
        ))}
        {measurements.length === 0 ? <p className="text-sm text-muted">No measurement sets saved in this browser.</p> : null}
      </ul>
    </AdminShell>
  );
}
