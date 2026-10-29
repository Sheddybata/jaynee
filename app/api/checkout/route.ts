import { NextResponse } from "next/server";
import { defaultDeliveryConfig, demoDiscountCodes, isSupabaseConfigured } from "@/lib/config";
import { initializePayment } from "@/lib/payments";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { uniqueId } from "@/lib/utils";
import { checkoutSchema } from "@/lib/validation";
import type { CartItem, Order } from "@/lib/types";
import { siteConfig } from "@/lib/config";

function totalsFromItems(
  items: CartItem[],
  state: string,
  discountCode?: string,
) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const code = demoDiscountCodes.find(
    (item) => item.active && item.code.toUpperCase() === (discountCode || "").toUpperCase(),
  );
  let discount = 0;
  if (code) {
    if (!code.minSubtotal || subtotal >= code.minSubtotal) {
      discount = code.type === "percent" ? Math.round((subtotal * code.value) / 100) : code.value;
    }
  }
  discount = Math.min(discount, subtotal);
  const rule = defaultDeliveryConfig.rules.find((item) => item.states.includes(state));
  const delivery =
    subtotal - discount >= defaultDeliveryConfig.freeOver
      ? 0
      : (rule?.fee ?? defaultDeliveryConfig.defaultFee);
  return {
    subtotal,
    discount,
    delivery,
    total: Math.max(0, subtotal - discount + delivery),
    discountCode: code?.code,
  };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }
  const items = (body.items ?? []) as CartItem[];
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }
  const safeItems = items.map((item) => ({
    productId: item.productId,
    name: item.name,
    slug: item.slug,
    image: item.image,
    quantity: Math.max(1, Number(item.quantity) || 1),
    unitPrice: Number(item.price),
    color: item.color,
    size: item.size,
    fit: item.fit === "custom" ? ("custom" as const) : ("standard" as const),
  }));
  if (safeItems.some((item) => !item.name || Number.isNaN(item.unitPrice))) {
    return NextResponse.json({ error: "One of the bag items is invalid." }, { status: 400 });
  }

  const cartForTotals: CartItem[] = safeItems.map((item, index) => ({
    id: `line_${index}`,
    productId: item.productId,
    slug: item.slug,
    name: item.name,
    image: item.image,
    price: item.unitPrice,
    quantity: item.quantity,
    color: item.color,
    size: item.size,
    fit: item.fit,
  }));
  const totals = totalsFromItems(cartForTotals, parsed.data.state, parsed.data.discountCode);
  const reference = uniqueId("ord");
  const order: Order = {
    id: reference,
    reference,
    createdAt: new Date().toISOString(),
    customer: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
    },
    address: {
      fullName: parsed.data.name,
      phone: parsed.data.phone,
      line1: parsed.data.line1,
      line2: parsed.data.line2,
      city: parsed.data.city,
      state: parsed.data.state,
      country: "Nigeria",
    },
    items: safeItems,
    subtotal: totals.subtotal,
    deliveryFee: totals.delivery,
    discount: totals.discount,
    discountCode: totals.discountCode,
    total: totals.total,
    notes: parsed.data.notes,
    paymentMethod: parsed.data.paymentMethod,
    paymentStatus:
      parsed.data.paymentMethod === "cash_on_delivery"
        ? "unpaid"
        : parsed.data.paymentMethod === "bank_transfer"
          ? "pending"
          : "pending",
    status:
      parsed.data.paymentMethod === "cash_on_delivery"
        ? "processing"
        : parsed.data.paymentMethod === "bank_transfer"
          ? "awaiting_transfer"
          : "pending_payment",
    mock: true,
  };

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.from("orders").insert({
        id: order.id,
        reference: order.reference,
        payload: order,
        payment_status: order.paymentStatus,
        status: order.status,
      });
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  if (
    parsed.data.paymentMethod === "paystack" ||
    parsed.data.paymentMethod === "flutterwave"
  ) {
    const payment = await initializePayment({
      email: parsed.data.email,
      amount: totals.total,
      reference,
      callbackUrl: `${siteConfig.url}/checkout/confirmation?ref=${reference}`,
      metadata: { orderId: order.id },
      method: parsed.data.paymentMethod,
    });
    order.mock = payment.mock;
    return NextResponse.json({
      order,
      authorizationUrl: payment.authorizationUrl,
      mock: payment.mock,
      message: payment.message,
    });
  }

  return NextResponse.json({ order, mock: true });
}
