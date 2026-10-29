"use client";

import { AdminShell } from "@/components/admin/shell";
import { Button } from "@/components/ui/button";
import { inputClass } from "@/components/ui/field";
import { useRecords } from "@/lib/store/records";

export default function AdminDiscountsPage() {
  const { discounts, saveDiscounts } = useRecords();
  return (
    <AdminShell>
      <h1 className="font-display text-5xl">Discount codes</h1>
      <ul className="mt-8 space-y-4">
        {discounts.map((item, index) => (
          <li key={item.code} className="grid gap-2 border border-line bg-paper p-4 md:grid-cols-4">
            <input
              className={inputClass()}
              value={item.code}
              onChange={(e) => {
                const next = discounts.map((row, i) => (i === index ? { ...row, code: e.target.value } : row));
                saveDiscounts(next);
              }}
            />
            <input
              type="number"
              className={inputClass()}
              value={item.value}
              onChange={(e) => {
                const next = discounts.map((row, i) => (i === index ? { ...row, value: Number(e.target.value) } : row));
                saveDiscounts(next);
              }}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={item.active}
                onChange={(e) => {
                  const next = discounts.map((row, i) => (i === index ? { ...row, active: e.target.checked } : row));
                  saveDiscounts(next);
                }}
              />
              Active
            </label>
            <p className="text-xs text-muted">{item.description}</p>
          </li>
        ))}
      </ul>
      <Button
        className="mt-4"
        onClick={() =>
          saveDiscounts([
            ...discounts,
            { code: "NEWCODE", type: "percent", value: 5, active: false, description: "New demo code" },
          ])
        }
      >
        Add code
      </Button>
    </AdminShell>
  );
}
