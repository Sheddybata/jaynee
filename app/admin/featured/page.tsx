"use client";

import { AdminShell } from "@/components/admin/shell";
import { useRecords } from "@/lib/store/records";

export default function AdminFeaturedPage() {
  const { catalogue, featuredIds, saveFeatured } = useRecords();
  const selected = featuredIds.length ? featuredIds : catalogue.filter((item) => item.featured).map((item) => item.id);
  return (
    <AdminShell>
      <h1 className="font-display text-5xl">Homepage featured</h1>
      <ul className="mt-8 space-y-2">
        {catalogue.map((item) => {
          const on = selected.includes(item.id);
          return (
            <li key={item.id}>
              <label className="flex items-center gap-3 border border-line bg-paper px-4 py-3 text-sm">
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() =>
                    saveFeatured(on ? selected.filter((id) => id !== item.id) : [...selected, item.id])
                  }
                />
                {item.name}
              </label>
            </li>
          );
        })}
      </ul>
    </AdminShell>
  );
}
