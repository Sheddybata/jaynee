"use client";

import { Container, EmptyState, SectionHeading } from "@/components/ui/container";
import { formatDate } from "@/lib/format";
import { useRecords } from "@/lib/store/records";

export default function AccountAppointmentsPage() {
  const { appointments } = useRecords();
  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Account" title="Appointment requests" />
      <div className="mt-8">
        {appointments.length === 0 ? (
          <EmptyState title="No requests yet" body="Booking requests from this browser are listed here. They are not confirmed slots." />
        ) : (
          <ul className="space-y-3">
            {appointments.map((item) => (
              <li key={item.id} className="border border-line p-4 text-sm">
                <p>{item.type.replaceAll("_", " ")}</p>
                <p className="text-muted">
                  Preferred {formatDate(item.preferredDate)} at {item.preferredTime}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}
