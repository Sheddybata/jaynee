"use client";

import { AdminShell } from "@/components/admin/shell";
import { formatNaira } from "@/lib/format";
import { useRecords } from "@/lib/store/records";
import type { OrderStatus } from "@/lib/types";

const statuses: OrderStatus[] = [
  "pending_payment",
  "awaiting_transfer",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "failed",
];

export default function AdminOrdersPage() {
  const { orders, updateOrder } = useRecords();
  return (
    <AdminShell>
      <h1 className="font-display text-5xl">Orders</h1>
      <div className="mt-8 overflow-x-auto border border-line bg-paper">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-[0.14em]">
              <th className="p-3">Ref</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-line">
                <td className="p-3">{order.reference}</td>
                <td className="p-3">{order.customer.name}</td>
                <td className="p-3">{formatNaira(order.total)}</td>
                <td className="p-3">{order.paymentStatus}</td>
                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrder(order.id, { status: e.target.value as OrderStatus })}
                    className="border border-line bg-paper px-2 py-1"
                  >
                    {statuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 ? (
              <tr>
                <td className="p-4 text-muted" colSpan={5}>
                  No orders on this browser yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
