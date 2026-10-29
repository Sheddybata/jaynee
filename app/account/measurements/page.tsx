"use client";

import { Button } from "@/components/ui/button";
import { Container, EmptyState, SectionHeading } from "@/components/ui/container";
import { formatDate } from "@/lib/format";
import { useRecords } from "@/lib/store/records";

export default function AccountMeasurementsPage() {
  const { measurements, deleteMeasurement } = useRecords();
  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Account" title="Saved measurements" />
      <div className="mt-8 space-y-4">
        {measurements.length === 0 ? (
          <EmptyState title="No saved sets" body="Use the measurement guide to record a set on this device." action={<Button href="/measurements">Open guide</Button>} />
        ) : (
          measurements.map((item) => (
            <article key={item.id} className="border border-line p-5">
              <p className="font-display text-2xl">{item.garment}</p>
              <p className="text-xs text-muted">
                {item.gender} · {item.unit} · {formatDate(item.createdAt)}
              </p>
              <pre className="mt-3 overflow-auto text-xs">{JSON.stringify(item.values, null, 2)}</pre>
              <button type="button" className="mt-3 text-xs underline" onClick={() => deleteMeasurement(item.id)}>
                Delete
              </button>
            </article>
          ))
        )}
      </div>
    </Container>
  );
}
