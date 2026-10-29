import { Suspense } from "react";
import { OrderDetail } from "@/components/account/order-detail";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="px-5 py-24 text-center text-sm">Loading order…</div>}>
      <OrderDetail id={id} />
    </Suspense>
  );
}
