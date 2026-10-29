"use client";

import Link from "next/link";
import { Container, EmptyState, SectionHeading } from "@/components/ui/container";
import { formatDate, formatNaira } from "@/lib/format";
import { useRecords } from "@/lib/store/records";

export default function OrdersPage() {
  const { orders } = useRecords();
  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Account" title="Orders" />
      <div className="mt-8">
        {orders.length === 0 ? (
          <EmptyState title="No orders yet" body="Orders placed on this browser in demo mode will appear here." />
        ) : (
          <ul className="divide-y border border-line">
            {orders.map((order) => (
              <li key={order.id} className="grid gap-2 px-4 py-4 text-sm md:grid-cols-4">
                <Link href={`/account/orders/${order.id}`} className="underline">
                  {order.reference}
                </Link>
                <span>{formatDate(order.createdAt)}</span>
                <span>{formatNaira(order.total)}</span>
                <span className="text-muted">{order.status.replaceAll("_", " ")} · {order.paymentStatus}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}
