"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/ui/container";
import { Field, inputClass } from "@/components/ui/field";
import { WhatsAppNote } from "@/components/ui/whatsapp-note";
import { appointmentTypes } from "@/lib/data/catalog";
import { useRecords } from "@/lib/store/records";
import { useToast } from "@/lib/store/toast";
import type { AppointmentType } from "@/lib/types";
import { uniqueId } from "@/lib/utils";
import { appointmentSchema } from "@/lib/validation";
import { appointmentMessage, openStudioWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

function monthDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const days = new Date(year, month + 1, 0).getDate();
  const pad = first.getDay();
  return { pad, days };
}

export function AppointmentBooking() {
  const [today] = useState(() => new Date());
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("11:00");
  const [type, setType] = useState<AppointmentType>("style_consultation");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState<string>();
  const { saveAppointment } = useRecords();
  const { push } = useToast();
  const { pad, days } = useMemo(
    () => monthDays(cursor.getFullYear(), cursor.getMonth()),
    [cursor],
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = appointmentSchema.safeParse({
      type,
      preferredDate: date,
      preferredTime: time,
      name,
      email,
      phone,
      notes,
    });
    if (!parsed.success) {
      push({ title: "Check the form", description: parsed.error.issues[0]?.message, tone: "error" });
      return;
    }
    const id = uniqueId("apt");
    saveAppointment({
      id,
      createdAt: new Date().toISOString(),
      type,
      preferredDate: date,
      preferredTime: time,
      customer: { name, email, phone },
      notes,
      status: "request_received",
      mock: false,
    });
    openStudioWhatsApp(
      appointmentMessage({
        type,
        preferredDate: date,
        preferredTime: time,
        name,
        email,
        phone,
        notes,
      }),
    );
    push({
      title: "WhatsApp opened",
      description: "Tap Send so the studio receives this request.",
      tone: "success",
    });
    setDone(id);
  }

  if (done) {
    return (
      <Container className="py-20">
        <SectionHeading title="Appointment request ready" eyebrow="WhatsApp" />
        <div className="mt-8 max-w-xl space-y-4">
          <WhatsAppNote />
          <p className="text-sm leading-7 text-muted">
            This is a request, not a confirmed booking. The studio will confirm if the time is
            available after you tap Send.
          </p>
          <p className="text-sm">Reference {done}</p>
          <Button href="/">Back home</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="Appointments"
        title="Request time with a tailor"
        body="Choose a preferred date. This sends a request on WhatsApp rather than confirming a slot. Availability is never invented."
      />
      <form onSubmit={submit} className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="font-display text-3xl">
              {cursor.toLocaleString("en-NG", { month: "long", year: "numeric" })}
            </p>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="px-3"
                onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
              >
                Prev
              </Button>
              <Button
                variant="secondary"
                className="px-3"
                onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
              >
                Next
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] tracking-[0.16em] uppercase text-muted">
            {"SMTWTFS".split("").map((d, i) => (
              <span key={`${d}-${i}`}>{d}</span>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {Array.from({ length: pad }).map((_, i) => (
              <span key={`pad-${i}`} />
            ))}
            {Array.from({ length: days }).map((_, i) => {
              const day = i + 1;
              const iso = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const past = new Date(iso) < new Date(today.toDateString());
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={past}
                  onClick={() => setDate(iso)}
                  className={cn(
                    "aspect-square border text-sm disabled:opacity-30",
                    date === iso ? "border-ink bg-ink text-ivory" : "border-line",
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted">Greyed dates are in the past. Remaining dates are preferences only.</p>
        </div>
        <div className="space-y-4">
          <Field label="Appointment type">
            <select className={inputClass()} value={type} onChange={(e) => setType(e.target.value as AppointmentType)}>
              {appointmentTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Preferred time">
            <select className={inputClass()} value={time} onChange={(e) => setTime(e.target.value)}>
              {["10:00", "11:00", "12:30", "14:00", "15:30", "17:00"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Name">
            <input className={inputClass()} value={name} onChange={(e) => setName(e.target.value)} required />
          </Field>
          <Field label="Email">
            <input type="email" className={inputClass()} value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <Field label="Phone">
            <input className={inputClass()} value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+234 801 234 5678" />
          </Field>
          <Field label="Notes">
            <textarea className={inputClass("min-h-24")} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Field>
          <WhatsAppNote />
          <Button type="submit">Send request on WhatsApp</Button>
        </div>
      </form>
    </Container>
  );
}
