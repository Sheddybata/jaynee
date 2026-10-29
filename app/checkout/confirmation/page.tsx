"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/ui/container";
import { WhatsAppNote } from "@/components/ui/whatsapp-note";
import { formatNaira } from "@/lib/format";
import { getWhatsAppLink } from "@/lib/config";
import { useRecords } from "@/lib/store/records";

function ConfirmationInner() {
  const params = useSearchParams();
  const ref = params.get("ref") || "";
  const { orders } = useRecords();
  const order = orders.find((item) => item.reference === ref || item.id === ref);

  return (
    <Container className="py-20">
      <SectionHeading
        eyebrow="Order"
        title="Send this order on WhatsApp"
        body={`Reference ${ref || "pending"}`}
      />
      <div className="mt-8 max-w-xl space-y-4">
        <WhatsAppNote />
        <p className="text-sm leading-7 text-muted">
          The studio has not received this order until you tap Send in WhatsApp. Payment is
          confirmed in that chat, not on this page.
        </p>
        {order ? (
          <p className="text-sm">
            Total {formatNaira(order.total)} · {order.address.city}, {order.address.state}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <Button href={getWhatsAppLink()}>Open WhatsApp again</Button>
          <Button href="/shop" variant="secondary">
            Continue shopping
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="px-5 py-24 text-center">Loading order…</div>}>
      <ConfirmationInner />
    </Suspense>
  );
}
