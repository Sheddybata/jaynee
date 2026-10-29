"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/ui/container";
import { Field, inputClass } from "@/components/ui/field";
import { WhatsAppNote } from "@/components/ui/whatsapp-note";
import { garmentCategories, mensMeasurements, womensMeasurements } from "@/lib/data/catalog";
import { useRecords } from "@/lib/store/records";
import { useToast } from "@/lib/store/toast";
import { uniqueId } from "@/lib/utils";
import { measurementMessage, openStudioWhatsApp } from "@/lib/whatsapp";

export function MeasurementGuide() {
  const [gender, setGender] = useState<"men" | "women">("women");
  const [garment, setGarment] = useState(garmentCategories[0]);
  const [unit, setUnit] = useState<"cm" | "in">("in");
  const [values, setValues] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState("");
  const [review, setReview] = useState(false);
  const { saveMeasurement } = useRecords();
  const { push } = useToast();

  const fields = gender === "men" ? mensMeasurements : womensMeasurements;
  const required = useMemo(
    () => fields.filter((field) => field.requiredFor.includes(garment) || field.requiredFor.length === 0),
    [fields, garment],
  );

  function save() {
    const missing = required.filter((field) => !values[field.key]);
    if (missing.length) {
      push({
        title: "Missing measurements",
        description: missing.map((item) => item.label).join(", "),
        tone: "error",
      });
      return;
    }
    saveMeasurement({
      id: uniqueId("msr"),
      createdAt: new Date().toISOString(),
      gender,
      garment,
      unit,
      values,
      notes,
    });
    const labels = Object.fromEntries(fields.map((field) => [field.key, field.label]));
    openStudioWhatsApp(
      measurementMessage({
        gender,
        garment,
        unit,
        values,
        labels,
        notes,
      }),
    );
    push({
      title: "WhatsApp opened",
      description: "Measurements are saved on this device. Tap Send so the studio receives them.",
      tone: "success",
    });
  }

  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="Measurements"
        title="A quiet, careful guide"
        body="Tape should sit snug, not tight. Stand naturally. Ask someone to help with back measurements. Saving also opens WhatsApp so the studio has the same numbers. The tailor may still confirm them before cutting."
      />
      <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <Field label="Wardrobe">
            <select className={inputClass()} value={gender} onChange={(e) => setGender(e.target.value as "men" | "women")}>
              <option value="women">Women</option>
              <option value="men">Men</option>
            </select>
          </Field>
          <Field label="Garment">
            <select className={inputClass()} value={garment} onChange={(e) => setGarment(e.target.value)}>
              {garmentCategories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Unit">
            <select className={inputClass()} value={unit} onChange={(e) => setUnit(e.target.value as "cm" | "in")}>
              <option value="in">Inches</option>
              <option value="cm">Centimetres</option>
            </select>
          </Field>
          <p className="text-xs leading-6 text-muted">
            Fields marked required are the ones this garment typically needs. Optional fields still help the cutter.
          </p>
        </aside>
        <div>
          {!review ? (
            <div className="space-y-5">
              {fields.map((field) => {
                const needed = required.some((item) => item.key === field.key);
                return (
                  <Field
                    key={field.key}
                    label={`${field.label} (${unit})${needed ? " · required" : ""}`}
                    hint={field.hint}
                  >
                    <input
                      type="number"
                      min={0}
                      step="0.1"
                      className={inputClass()}
                      value={values[field.key] ?? ""}
                      onChange={(e) =>
                        setValues((current) => ({ ...current, [field.key]: Number(e.target.value) }))
                      }
                    />
                  </Field>
                );
              })}
              <Field label="Notes for the tailor">
                <textarea className={inputClass("min-h-24")} value={notes} onChange={(e) => setNotes(e.target.value)} />
              </Field>
              <Button onClick={() => setReview(true)}>Review</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-display text-3xl">Review</h3>
              <p className="text-sm text-muted">
                {gender} · {garment} · {unit}
              </p>
              <ul className="divide-y border border-line">
                {Object.entries(values).map(([key, value]) => (
                  <li key={key} className="flex justify-between px-4 py-2 text-sm">
                    <span>{fields.find((item) => item.key === key)?.label ?? key}</span>
                    <span>
                      {value} {unit}
                    </span>
                  </li>
                ))}
              </ul>
              <WhatsAppNote />
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setReview(false)}>
                  Edit
                </Button>
                <Button onClick={save}>Send measurements on WhatsApp</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
