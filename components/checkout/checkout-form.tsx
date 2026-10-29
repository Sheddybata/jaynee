"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container, EmptyState, SectionHeading } from "@/components/ui/container";
import { Field, inputClass } from "@/components/ui/field";
import { QuantitySelector } from "@/components/ui/quantity";
import { WhatsAppNote } from "@/components/ui/whatsapp-note";
import { siteConfig } from "@/lib/config";
import { formatNaira } from "@/lib/format";
import { NIGERIAN_STATES, getCitiesForState } from "@/lib/nigerian-states";
import { applyDiscount, cartSubtotal, deliveryFeeForState } from "@/lib/commerce";
import { useCart } from "@/lib/store/cart";
import { useRecords } from "@/lib/store/records";
import { useToast } from "@/lib/store/toast";
import { uniqueId } from "@/lib/utils";
import { checkoutSchema } from "@/lib/validation";
import { checkoutMessage, openStudioWhatsApp } from "@/lib/whatsapp";
import type { PaymentMethod } from "@/lib/types";
import Image from "next/image";

export function CheckoutForm() {
  const { items, updateQty, removeItem, clear } = useCart();
  const { saveOrder, delivery, discounts } = useRecords();
  const { push } = useToast();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [state, setState] = useState("Lagos");
  const [city, setCity] = useState("Lekki");
  const [notes, setNotes] = useState("");
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("bank_transfer");
  const [pending, setPending] = useState(false);
  const cities = useMemo(() => getCitiesForState(state), [state]);

  const subtotal = cartSubtotal(items);
  const discountResult = applyDiscount(applied, subtotal);
  const deliveryFee = deliveryFeeForState(state, subtotal - discountResult.discount, delivery);
  const total = Math.max(0, subtotal - discountResult.discount + deliveryFee);

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    const parsed = checkoutSchema.safeParse({
      name,
      email,
      phone,
      line1,
      line2,
      state,
      city,
      notes,
      paymentMethod: method,
      discountCode: applied,
    });
    if (!parsed.success) {
      push({ title: "Check your details", description: parsed.error.issues[0]?.message, tone: "error" });
      return;
    }
    setPending(true);
    try {
      const reference = uniqueId("TC");
      const order = {
        id: uniqueId("ord"),
        reference,
        createdAt: new Date().toISOString(),
        customer: { name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone },
        address: {
          fullName: parsed.data.name,
          phone: parsed.data.phone,
          line1: parsed.data.line1,
          line2: parsed.data.line2,
          city: parsed.data.city,
          state: parsed.data.state,
          country: "Nigeria" as const,
        },
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          slug: item.slug,
          image: item.image,
          quantity: item.quantity,
          unitPrice: item.price,
          color: item.color,
          size: item.size,
          fit: item.fit,
        })),
        subtotal,
        deliveryFee,
        discount: discountResult.discount,
        discountCode: applied || undefined,
        total,
        notes: parsed.data.notes,
        paymentMethod: parsed.data.paymentMethod,
        paymentStatus: "unpaid" as const,
        status: "pending_payment" as const,
        mock: false,
      };
      saveOrder(order);
      openStudioWhatsApp(
        checkoutMessage({
          reference,
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          line1: parsed.data.line1,
          line2: parsed.data.line2,
          city: parsed.data.city,
          state: parsed.data.state,
          notes: parsed.data.notes,
          paymentMethod: parsed.data.paymentMethod,
          items,
          subtotal,
          discount: discountResult.discount,
          discountCode: applied || undefined,
          delivery: deliveryFee,
          total,
        }),
      );
      push({
        title: "WhatsApp opened",
        description: "Tap Send so the studio receives this order.",
        tone: "success",
      });
      router.push(`/checkout/confirmation?ref=${reference}&channel=whatsapp`);
      clear();
    } catch (error) {
      push({
        title: "Checkout could not complete",
        description: error instanceof Error ? error.message : "Try again.",
        tone: "error",
      });
    } finally {
      setPending(false);
    }
  }

  if (items.length === 0) {
    return (
      <Container className="py-20">
        <EmptyState title="Nothing to check out" body="Add a piece to your bag first." action={<Button href="/shop">Shop</Button>} />
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="Checkout"
        title="Delivery details"
        body="Your order summary will open on WhatsApp. The studio confirms availability, total, and payment from that chat."
      />
      <form onSubmit={placeOrder} className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          <Field label="Full name">
            <input className={inputClass()} value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Email">
            <input type="email" className={inputClass()} value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label="Phone">
            <input className={inputClass()} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 801 234 5678" />
          </Field>
          <Field label="Street address">
            <input className={inputClass()} value={line1} onChange={(e) => setLine1(e.target.value)} />
          </Field>
          <Field label="Apartment / landmark">
            <input className={inputClass()} value={line2} onChange={(e) => setLine2(e.target.value)} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="State">
              <select className={inputClass()} value={state} onChange={(e) => setState(e.target.value)}>
                {NIGERIAN_STATES.map((item) => (
                  <option key={item.code}>{item.name}</option>
                ))}
              </select>
            </Field>
            <Field label="City">
              <input className={inputClass()} list="cities" value={city} onChange={(e) => setCity(e.target.value)} />
              <datalist id="cities">
                {cities.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </Field>
          </div>
          <Field label="Order notes">
            <textarea className={inputClass("min-h-24")} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Field>
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-muted">Preferred payment</p>
            {(
              [
                ["bank_transfer", "Bank transfer"],
                ["cash_on_delivery", "Cash on delivery"],
                ["paystack", "Card / Paystack"],
                ["flutterwave", "Card / Flutterwave"],
              ] as const
            ).map(([value, label]) => (
              <label key={value} className="mb-2 flex items-center gap-3 border border-line px-4 py-3 text-sm">
                <input type="radio" name="pay" checked={method === value} onChange={() => setMethod(value)} />
                {label}
              </label>
            ))}
            {method === "bank_transfer" ? (
              <div className="mt-3 border border-line bg-ivory p-4 text-sm leading-7">
                <p>Bank: {siteConfig.bank.name}</p>
                <p>Account name: {siteConfig.bank.accountName}</p>
                <p>Account number: {siteConfig.bank.accountNumber}</p>
                <p className="text-muted">Placeholder details. Do not send money until the studio confirms them.</p>
              </div>
            ) : null}
          </div>
        </div>
        <aside className="h-fit border border-line p-5">
          <p className="text-[11px] uppercase tracking-[0.18em]">Order summary</p>
          <ul className="mt-4 space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3">
                <Image src={item.image} alt={item.name} width={64} height={80} className="h-20 w-16 object-cover" />
                <div className="flex-1 text-sm">
                  <p>{item.name}</p>
                  <p className="text-xs text-muted">
                    {item.color} · {item.size}
                  </p>
                  <QuantitySelector value={item.quantity} onChange={(qty) => updateQty(item.id, qty)} />
                  <button type="button" className="mt-1 text-xs underline" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
                <span className="text-sm">{formatNaira(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <input className={inputClass()} value={code} onChange={(e) => setCode(e.target.value)} placeholder="Discount code" />
            <Button
              variant="secondary"
              className="px-3"
              onClick={() => {
                const result = applyDiscount(code, subtotal);
                if (result.error) push({ title: result.error, tone: "error" });
                else {
                  setApplied(result.code || "");
                  push({ title: "Code applied", description: result.code });
                }
              }}
            >
              Apply
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted">Demo codes: {discounts.map((item) => item.code).join(", ")}</p>
          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatNaira(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Discount</dt><dd>-{formatNaira(discountResult.discount)}</dd></div>
            <div className="flex justify-between"><dt>Delivery</dt><dd>{formatNaira(deliveryFee)}</dd></div>
            <div className="flex justify-between border-t border-line pt-2 text-base"><dt>Total</dt><dd>{formatNaira(total)}</dd></div>
          </dl>
          <WhatsAppNote className="mt-4" />
          <Button type="submit" className="mt-4 w-full" disabled={pending}>
            {pending ? "Opening WhatsApp…" : "Send order on WhatsApp"}
          </Button>
        </aside>
      </form>
    </Container>
  );
}
