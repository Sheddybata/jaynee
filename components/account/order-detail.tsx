"use client";

import { Container, SectionHeading } from "@/components/ui/container";
import { formatNaira } from "@/lib/format";
import { useRecords } from "@/lib/store/records";

export function OrderDetail({ id }: { id: string }) {
  const { orders } = useRecords();
  const order = orders.find((item) => item.id === id);
  if (!order) return <Container className="py-20">Order not found on this device.</Container>;
  return (
    <Container className="py-16">
      <SectionHeading title={order.reference} eyebrow={order.status.replaceAll("_", " ")} />
      <ul className="mt-8 space-y-3 text-sm">
        {order.items.map((item) => (
          <li key={`${item.productId}-${item.size}`} className="flex justify-between border-b border-line py-2">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{formatNaira(item.unitPrice * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm">Total {formatNaira(order.total)}</p>
      <p className="mt-2 text-sm text-muted">
        {order.address.line1}, {order.address.city}, {order.address.state}
      </p>
    </Container>
  );
}
