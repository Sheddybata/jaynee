"use client";

import { AdminShell } from "@/components/admin/shell";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";
import { useRecords } from "@/lib/store/records";

export default function AdminDeliveryPage() {
  const { delivery, saveDelivery } = useRecords();
  return (
    <AdminShell>
      <h1 className="font-display text-5xl">Delivery</h1>
      <p className="mt-2 text-sm text-muted">{delivery.note}</p>
      <div className="mt-8 max-w-md space-y-4">
        <Field label="Free over (NGN)">
          <input
            type="number"
            className={inputClass()}
            value={delivery.freeOver}
            onChange={(e) => saveDelivery({ ...delivery, freeOver: Number(e.target.value) })}
          />
        </Field>
        <Field label="Default fee (NGN)">
          <input
            type="number"
            className={inputClass()}
            value={delivery.defaultFee}
            onChange={(e) => saveDelivery({ ...delivery, defaultFee: Number(e.target.value) })}
          />
        </Field>
        {delivery.rules.map((rule, index) => (
          <Field key={rule.id} label={rule.label}>
            <input
              type="number"
              className={inputClass()}
              value={rule.fee}
              onChange={(e) => {
                const rules = delivery.rules.map((item, i) =>
                  i === index ? { ...item, fee: Number(e.target.value) } : item,
                );
                saveDelivery({ ...delivery, rules });
              }}
            />
          </Field>
        ))}
        <Button onClick={() => saveDelivery(delivery)}>Saved locally</Button>
      </div>
    </AdminShell>
  );
}
