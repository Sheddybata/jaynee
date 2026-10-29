"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Container, MockBanner, SectionHeading } from "@/components/ui/container";
import { useCart } from "@/lib/store/cart";
import { useRecords } from "@/lib/store/records";

function MockPayInner() {
  const params = useSearchParams();
  const router = useRouter();
  const ref = params.get("ref") || "";
  const { updateOrder } = useRecords();
  const { clear } = useCart();

  async function finish(result: "success" | "failure") {
    await fetch("/api/payments/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference: ref, mockResult: result }),
    });
    if (result === "success") {
      updateOrder(ref, { paymentStatus: "mock", status: "processing" });
      clear();
    }
    router.push(`/checkout/confirmation?ref=${ref}&mock=${result}`);
  }

  return (
    <Container className="py-20">
      <SectionHeading eyebrow="Payments" title="Demo checkout" />
      <div className="mt-8 max-w-lg space-y-5">
        <MockBanner>
          Paystack and Flutterwave secret keys are not configured. This screen simulates a
          payment. It does not charge a card, collect card numbers, or mark a live order as paid.
        </MockBanner>
        <p className="text-sm">Reference {ref}</p>
        <div className="flex gap-3">
          <Button onClick={() => finish("success")}>Simulate success</Button>
          <Button variant="secondary" onClick={() => finish("failure")}>
            Simulate failure
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default function MockPayPage() {
  return (
    <Suspense fallback={<div className="px-5 py-24 text-center">Loading demo payment…</div>}>
      <MockPayInner />
    </Suspense>
  );
}
