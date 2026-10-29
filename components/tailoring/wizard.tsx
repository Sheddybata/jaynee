"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/ui/container";
import { Field, inputClass } from "@/components/ui/field";
import { WhatsAppNote } from "@/components/ui/whatsapp-note";
import { budgetRanges, fabricOptions, garmentCategories, occasions } from "@/lib/data/catalog";
import { NIGERIAN_STATES, getCitiesForState } from "@/lib/nigerian-states";
import { useAuth } from "@/lib/store/auth";
import { useRecords } from "@/lib/store/records";
import { useToast } from "@/lib/store/toast";
import { uniqueId } from "@/lib/utils";
import { tailoringSchema } from "@/lib/validation";
import { openStudioWhatsApp, tailoringMessage } from "@/lib/whatsapp";

const steps = [
  "Garment",
  "Occasion",
  "Style",
  "Cloth",
  "Fit",
  "References",
  "Delivery",
  "Contact",
  "Review",
];

type FormState = {
  category: string;
  occasion: string;
  style: string;
  customDesign: string;
  fabric: string;
  colour: string;
  sizing: "standard" | "custom";
  budget: string;
  deliveryDate: string;
  deliveryState: string;
  deliveryCity: string;
  name: string;
  email: string;
  phone: string;
  instructions: string;
  referenceImages: string[];
};

const empty: FormState = {
  category: "",
  occasion: "",
  style: "",
  customDesign: "",
  fabric: "",
  colour: "",
  sizing: "standard",
  budget: "",
  deliveryDate: "",
  deliveryState: "",
  deliveryCity: "",
  name: "",
  email: "",
  phone: "",
  instructions: "",
  referenceImages: [],
};

export function TailoringWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(empty);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const { user } = useAuth();
  const { saveTailoring } = useRecords();
  const { push } = useToast();
  const router = useRouter();
  const cities = useMemo(() => getCitiesForState(form.deliveryState), [form.deliveryState]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function validateStep() {
    if (step === 0 && !form.category) return "Select a garment category.";
    if (step === 1 && !form.occasion) return "Select an occasion.";
    if (step === 2 && !form.style && !form.customDesign) return "Choose a style or describe your design.";
    if (step === 3 && (!form.fabric || !form.colour)) return "Select fabric and colour.";
    if (step === 6 && (!form.deliveryDate || !form.deliveryState || !form.deliveryCity)) {
      return "Choose a preferred date and delivery location.";
    }
    if (step === 7 && (!form.name || !form.email || !form.phone)) return "Enter your contact details.";
    return "";
  }

  function next() {
    const message = validateStep();
    if (message) {
      setError(message);
      return;
    }
    setStep((current) => Math.min(steps.length - 1, current + 1));
  }

  async function submit() {
    const parsed = tailoringSchema.safeParse({
      ...form,
      style: form.style || form.customDesign,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Please complete the form.");
      return;
    }
    setPending(true);
    try {
      const id = uniqueId("tlr");
      saveTailoring({
        id,
        createdAt: new Date().toISOString(),
        category: form.category,
        occasion: form.occasion,
        style: form.style || form.customDesign,
        customDesign: form.customDesign,
        fabric: form.fabric,
        colour: form.colour,
        sizing: form.sizing,
        budget: form.budget,
        deliveryDate: form.deliveryDate,
        deliveryState: form.deliveryState,
        deliveryCity: form.deliveryCity,
        customer: { name: form.name, email: form.email, phone: form.phone },
        instructions: form.instructions,
        referenceImages: form.referenceImages,
        status: "received",
        mock: false,
      });
      openStudioWhatsApp(
        tailoringMessage({
          category: form.category,
          occasion: form.occasion,
          style: form.style || form.customDesign,
          fabric: form.fabric,
          colour: form.colour,
          sizing: form.sizing,
          budget: form.budget,
          deliveryDate: form.deliveryDate,
          deliveryCity: form.deliveryCity,
          deliveryState: form.deliveryState,
          name: form.name,
          email: form.email,
          phone: form.phone,
          instructions: form.instructions,
          imageCount: form.referenceImages.length,
        }),
      );
      push({
        title: "WhatsApp opened",
        description: "Tap Send so the studio receives this request.",
        tone: "success",
      });
      router.push(`/custom-tailoring/confirmation?id=${id}&channel=whatsapp`);
    } catch (err) {
      push({
        title: "Could not submit request",
        description: err instanceof Error ? err.message : "Try again.",
        tone: "error",
      });
    } finally {
      setPending(false);
    }
  }

  function onFiles(files: FileList | null) {
    if (!files) return;
    const readers = Array.from(files).slice(0, 4);
    readers.forEach((file) => {
      if (file.size > 4 * 1024 * 1024) {
        setError("Each image must be under 4MB.");
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setError("Use JPG, PNG or WebP images.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        update("referenceImages", [...form.referenceImages, String(reader.result)].slice(0, 4));
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <Container className="py-8 sm:py-12">
      <SectionHeading
        eyebrow="Custom tailoring"
        title="A garment made around you"
        body="Nine short steps. You can go back without losing what you entered. The finished request opens on WhatsApp for the studio."
      />
      <ol className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2 sm:mt-10">
        {steps.map((label, index) => (
          <li key={label} className="shrink-0">
            <button
              type="button"
              onClick={() => setStep(index)}
              className={`border px-3 py-2 text-[10px] tracking-[0.16em] uppercase ${
                index === step ? "border-ink bg-ink text-ivory" : "border-line"
              }`}
            >
              {index + 1} {label}
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-10 max-w-2xl space-y-6">
        {step === 0 && (
          <div className="grid gap-2">
            {garmentCategories.map((item) => (
              <Choice key={item} active={form.category === item} onClick={() => update("category", item)}>
                {item}
              </Choice>
            ))}
          </div>
        )}
        {step === 1 && (
          <div className="grid gap-2">
            {occasions.map((item) => (
              <Choice key={item} active={form.occasion === item} onClick={() => update("occasion", item)}>
                {item}
              </Choice>
            ))}
          </div>
        )}
        {step === 2 && (
          <>
            <Field label="Preferred style">
              <input className={inputClass()} value={form.style} onChange={(e) => update("style", e.target.value)} placeholder="e.g. Fitted senator with tonal embroidery" />
            </Field>
            <Field label="Or describe a custom design" hint="Silhouette, length, embroidery, modest or dramatic.">
              <textarea className={inputClass("min-h-32")} value={form.customDesign} onChange={(e) => update("customDesign", e.target.value)} />
            </Field>
          </>
        )}
        {step === 3 && (
          <>
            <Field label="Fabric">
              <select className={inputClass()} value={form.fabric} onChange={(e) => update("fabric", e.target.value)}>
                <option value="">Select</option>
                {fabricOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>
            <Field label="Colour">
              <input className={inputClass()} value={form.colour} onChange={(e) => update("colour", e.target.value)} placeholder="Wine, ivory, gold, print reference…" />
            </Field>
            <Field label="Budget range">
              <select className={inputClass()} value={form.budget} onChange={(e) => update("budget", e.target.value)}>
                <option value="">Select</option>
                {budgetRanges.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>
          </>
        )}
        {step === 4 && (
          <div className="grid gap-2">
            <Choice active={form.sizing === "standard"} onClick={() => update("sizing", "standard")}>
              Standard sizing — I will choose from the size chart
            </Choice>
            <Choice active={form.sizing === "custom"} onClick={() => update("sizing", "custom")}>
              Custom measurements — I will submit or book a fitting
            </Choice>
            {form.sizing === "custom" ? (
              <p className="text-sm text-muted">
                Continue to contact, then use the{" "}
                <a className="underline" href="/measurements">
                  measurement page
                </a>
                . Measurements should be taken carefully and may still be confirmed by the tailor.
              </p>
            ) : null}
          </div>
        )}
        {step === 5 && (
          <Field label="Inspiration images" hint="Optional. JPG, PNG or WebP, up to 4 files, 4MB each.">
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(e) => onFiles(e.target.files)} />
            <div className="mt-3 flex gap-2">
              {form.referenceImages.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src.slice(0, 24)} src={src} alt="Design reference" className="h-20 w-20 object-cover" />
              ))}
            </div>
          </Field>
        )}
        {step === 6 && (
          <>
            <Field label="Preferred completion date">
              <input type="date" className={inputClass()} value={form.deliveryDate} onChange={(e) => update("deliveryDate", e.target.value)} />
            </Field>
            <Field label="State">
              <select className={inputClass()} value={form.deliveryState} onChange={(e) => update("deliveryState", e.target.value)}>
                <option value="">Select state</option>
                {NIGERIAN_STATES.map((state) => (
                  <option key={state.code}>{state.name}</option>
                ))}
              </select>
            </Field>
            <Field label="City">
              <input className={inputClass()} list="tailor-cities" value={form.deliveryCity} onChange={(e) => update("deliveryCity", e.target.value)} />
              <datalist id="tailor-cities">
                {cities.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </Field>
          </>
        )}
        {step === 7 && (
          <>
            <Field label="Full name">
              <input className={inputClass()} value={form.name || user?.name || ""} onChange={(e) => update("name", e.target.value)} />
            </Field>
            <Field label="Email">
              <input type="email" className={inputClass()} value={form.email} onChange={(e) => update("email", e.target.value)} />
            </Field>
            <Field label="Phone" hint="Nigerian numbers, with +234 if you like.">
              <input className={inputClass()} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+234 801 234 5678" />
            </Field>
            <Field label="Additional instructions">
              <textarea className={inputClass("min-h-28")} value={form.instructions} onChange={(e) => update("instructions", e.target.value)} />
            </Field>
          </>
        )}
        {step === 8 && (
          <div className="space-y-3 text-sm leading-7">
            <WhatsAppNote />
            <p><strong>Garment:</strong> {form.category} for {form.occasion}</p>
            <p><strong>Style:</strong> {form.style || form.customDesign}</p>
            <p><strong>Cloth:</strong> {form.fabric}, {form.colour}</p>
            <p><strong>Fit:</strong> {form.sizing}</p>
            <p><strong>Budget:</strong> {form.budget}</p>
            <p><strong>When / where:</strong> {form.deliveryDate}, {form.deliveryCity}, {form.deliveryState}</p>
            <p><strong>Contact:</strong> {form.name} · {form.email} · {form.phone}</p>
          </div>
        )}
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <div className="flex gap-3">
          {step > 0 ? (
            <Button variant="secondary" onClick={() => setStep((current) => current - 1)}>
              Back
            </Button>
          ) : null}
          {step < steps.length - 1 ? (
            <Button onClick={next}>Continue</Button>
          ) : (
            <Button onClick={submit} disabled={pending}>
              {pending ? "Opening WhatsApp…" : "Send on WhatsApp"}
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}

function Choice({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-4 py-3 text-left text-sm ${active ? "border-ink bg-ivory" : "border-line"}`}
    >
      {children}
    </button>
  );
}
