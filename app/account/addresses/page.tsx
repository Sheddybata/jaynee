"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/ui/container";
import { Field, inputClass } from "@/components/ui/field";
import { NIGERIAN_STATES } from "@/lib/nigerian-states";
import { useRecords } from "@/lib/store/records";
import { uniqueId } from "@/lib/utils";

export default function AddressesPage() {
  const { addresses, saveAddress, deleteAddress } = useRecords();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Lagos");

  return (
    <Container className="grid gap-10 py-16 lg:grid-cols-2">
      <div>
        <SectionHeading eyebrow="Account" title="Addresses" />
        <ul className="mt-8 space-y-3">
          {addresses.map((item) => (
            <li key={item.id} className="border border-line p-4 text-sm">
              <p>{item.fullName}</p>
              <p className="text-muted">
                {item.line1}, {item.city}, {item.state}
              </p>
              <button type="button" className="mt-2 text-xs underline" onClick={() => deleteAddress(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          saveAddress({
            id: uniqueId("addr"),
            fullName,
            phone,
            line1,
            city,
            state,
            country: "Nigeria",
            isDefault: addresses.length === 0,
          });
          setFullName("");
          setPhone("");
          setLine1("");
          setCity("");
        }}
      >
        <Field label="Name">
          <input className={inputClass()} value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </Field>
        <Field label="Phone">
          <input className={inputClass()} value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Field>
        <Field label="Street">
          <input className={inputClass()} value={line1} onChange={(e) => setLine1(e.target.value)} />
        </Field>
        <Field label="State">
          <select className={inputClass()} value={state} onChange={(e) => setState(e.target.value)}>
            {NIGERIAN_STATES.map((item) => (
              <option key={item.code}>{item.name}</option>
            ))}
          </select>
        </Field>
        <Field label="City">
          <input className={inputClass()} value={city} onChange={(e) => setCity(e.target.value)} />
        </Field>
        <Button type="submit">Save address</Button>
      </form>
    </Container>
  );
}
