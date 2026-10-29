"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/shell";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";
import { formatNaira } from "@/lib/format";
import { heroLook } from "@/lib/data/clothes";
import { useRecords } from "@/lib/store/records";
import { uniqueId } from "@/lib/utils";
import type { Product } from "@/lib/types";

export default function AdminProductsPage() {
  const { catalogue, saveProduct, deleteProduct } = useRecords();
  const [editing, setEditing] = useState<Product | null>(null);

  return (
    <AdminShell>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-5xl">Products</h1>
        <Button
          onClick={() =>
            setEditing({
              id: uniqueId("prd"),
              slug: "new-piece",
              sku: "TC-NEW",
              name: "New piece",
              shortDescription: "Describe this garment.",
              description: "Full description.",
              price: 50000,
              category: "ready-to-wear",
              collection: "studio",
              gender: "unisex",
              fabrics: ["Cotton"],
              care: ["Dry clean"],
              colors: [{ name: "Ivory", hex: "#f6f1e8" }],
              sizes: ["M"],
              images: [{ src: heroLook.src, alt: "New product" }],
              tags: [],
              featured: false,
              bestseller: false,
              newArrival: true,
              inStock: true,
              stockCount: 5,
              allowsCustom: true,
              createdAt: new Date().toISOString().slice(0, 10),
            })
          }
        >
          Add product
        </Button>
      </div>
      <div className="mt-8 overflow-x-auto border border-line bg-paper">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[11px] tracking-[0.16em] uppercase">
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {catalogue.map((item) => (
              <tr key={item.id} className="border-b border-line">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{formatNaira(item.price)}</td>
                <td className="p-3">{item.stockCount}</td>
                <td className="p-3 text-right">
                  <button type="button" className="mr-3 underline" onClick={() => setEditing(item)}>
                    Edit
                  </button>
                  <button type="button" className="underline" onClick={() => deleteProduct(item.id)}>
                    Archive
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editing ? (
        <form
          className="mt-8 grid gap-4 border border-line bg-paper p-5 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            saveProduct(editing);
            setEditing(null);
          }}
        >
          <Field label="Name">
            <input className={inputClass()} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} />
          </Field>
          <Field label="Price (NGN)">
            <input type="number" className={inputClass()} value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
          </Field>
          <Field label="Category">
            <input className={inputClass()} value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
          </Field>
          <Field label="Stock">
            <input type="number" className={inputClass()} value={editing.stockCount} onChange={(e) => setEditing({ ...editing, stockCount: Number(e.target.value), inStock: Number(e.target.value) > 0 })} />
          </Field>
          <Field label="Image URL" className="md:col-span-2">
            <input className={inputClass()} value={editing.images[0]?.src} onChange={(e) => setEditing({ ...editing, images: [{ src: e.target.value, alt: editing.name }] })} />
          </Field>
          <Field label="Description" className="md:col-span-2">
            <textarea className={inputClass("min-h-24")} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          </Field>
          <div className="flex gap-3 md:col-span-2">
            <Button type="submit">Save</Button>
            <Button variant="secondary" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : null}
    </AdminShell>
  );
}
