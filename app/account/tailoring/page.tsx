"use client";

import { Container, EmptyState, SectionHeading } from "@/components/ui/container";
import { formatDate } from "@/lib/format";
import { useRecords } from "@/lib/store/records";

export default function AccountTailoringPage() {
  const { tailoring } = useRecords();
  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Account" title="Tailoring requests" />
      <div className="mt-8">
        {tailoring.length === 0 ? (
          <EmptyState title="No requests yet" body="Custom requests submitted on this browser will appear here." />
        ) : (
          <ul className="space-y-3">
            {tailoring.map((item) => (
              <li key={item.id} className="border border-line p-4 text-sm">
                <p className="font-medium">{item.category} · {item.occasion}</p>
                <p className="text-muted">{item.status.replaceAll("_", " ")} · {formatDate(item.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}
