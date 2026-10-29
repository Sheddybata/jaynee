"use client";

import { AdminShell } from "@/components/admin/shell";
import { categories } from "@/lib/data/catalog";
import { useRecords } from "@/lib/store/records";

export default function AdminCategoriesPage() {
  const { catalogue } = useRecords();
  return (
    <AdminShell>
      <h1 className="font-display text-5xl">Categories</h1>
      <ul className="mt-8 divide-y border border-line bg-paper">
        {categories.map((item) => (
          <li key={item.slug} className="flex justify-between px-4 py-3 text-sm">
            <span>{item.name}</span>
            <span className="text-muted">
              {catalogue.filter((product) => product.category === item.slug).length} pieces
            </span>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
