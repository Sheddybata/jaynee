import { Suspense } from "react";
import { AppointmentBooking } from "@/components/appointments/booking";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Book a tailor",
  description: "Request a measurement, consultation, or bridal fitting. Requests are not confirmed bookings until the studio replies.",
  path: "/appointments",
});

export default function AppointmentsPage() {
  return (
    <Suspense fallback={<div className="px-5 py-24 text-center text-sm text-muted">Loading the calendar…</div>}>
      <AppointmentBooking />
    </Suspense>
  );
}
