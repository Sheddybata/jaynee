"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container, EmptyState, SectionHeading } from "@/components/ui/container";
import { QuantitySelector } from "@/components/ui/quantity";
import { formatNaira } from "@/lib/format";
import { useCart } from "@/lib/store/cart";

export default function CartPage() {
  const { items, updateQty, removeItem } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Bag" title="Your shopping bag" />
      {items.length === 0 ? (
        <div className="mt-10">
          <EmptyState title="The bag is empty" body="Nothing is listed for sale. Browse the lookbook or start a custom request." action={<Button href="/shop">View the lookbook</Button>} />
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          <ul className="space-y-6">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4 border-b border-line pb-6">
                <Image src={item.image} alt={item.name} width={96} height={120} className="h-[120px] w-24 object-cover" />
                <div className="flex-1">
                  <a href={`/shop/${item.slug}`} className="font-display text-2xl">
                    {item.name}
                  </a>
                  <p className="mt-1 text-sm text-muted">
                    {item.color} · {item.size} · {item.fit}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <QuantitySelector value={item.quantity} onChange={(qty) => updateQty(item.id, qty)} />
                    <button type="button" className="text-xs underline" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
                <p>{formatNaira(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>
          <aside className="h-fit border border-line p-5">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatNaira(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs text-muted">
              Delivery is calculated at checkout. The finished order opens on WhatsApp.
            </p>
            <Button href="/checkout" className="mt-5 w-full">
              Checkout on WhatsApp
            </Button>
          </aside>
        </div>
      )}
    </Container>
  );
}
