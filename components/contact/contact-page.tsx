"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/ui/container";
import { Field, inputClass } from "@/components/ui/field";
import { WhatsAppNote } from "@/components/ui/whatsapp-note";
import { faqs } from "@/lib/data/catalog";
import { getWhatsAppLink, siteConfig } from "@/lib/config";
import { useToast } from "@/lib/store/toast";
import { contactSchema } from "@/lib/validation";
import { contactMessage, openStudioWhatsApp } from "@/lib/whatsapp";

export function ContactPage() {
  const [pending, setPending] = useState(false);
  const { push } = useToast();

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse(Object.fromEntries(form.entries()));
    if (!parsed.success) {
      push({ title: "Check the form", description: parsed.error.issues[0]?.message, tone: "error" });
      return;
    }
    setPending(true);
    openStudioWhatsApp(contactMessage(parsed.data));
    push({
      title: "WhatsApp opened",
      description: "Tap Send so the studio receives this message.",
      tone: "success",
    });
    e.currentTarget.reset();
    setPending(false);
  }

  return (
    <Container className="grid gap-10 py-8 sm:gap-16 sm:py-16 lg:grid-cols-2">
      <div>
        <SectionHeading
          eyebrow="Contact"
          title="Write, call, or WhatsApp"
          body="Messages from this page open WhatsApp with your details. Tap Send so the studio receives them."
        />
        <dl className="mt-10 space-y-4 text-sm leading-7">
          <div>
            <dt className="text-[11px] tracking-[0.18em] text-muted uppercase">Studio</dt>
            <dd>{siteConfig.contact.address}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.18em] text-muted uppercase">Hours</dt>
            <dd>{siteConfig.contact.hours}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.18em] text-muted uppercase">Email</dt>
            <dd>
              <a className="underline" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.18em] text-muted uppercase">Phone</dt>
            <dd>{siteConfig.contact.phone}</dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={getWhatsAppLink("Hello jaynee.ng, I have a question about an outfit.")}>
            WhatsApp
          </Button>
          <Button href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} variant="secondary">
            Call
          </Button>
        </div>
        <div className="mt-12 space-y-4">
          <h2 className="font-display text-3xl">Questions</h2>
          {faqs.map((item) => (
            <details key={item.q} className="border-b border-line py-3">
              <summary className="cursor-pointer text-sm">{item.q}</summary>
              <p className="mt-2 text-sm leading-7 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <form onSubmit={submit} className="space-y-4">
        <Field label="Name">
          <input name="name" required className={inputClass()} />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required className={inputClass()} />
        </Field>
        <Field label="Phone">
          <input name="phone" required className={inputClass()} placeholder="+234 801 234 5678" />
        </Field>
        <Field label="Subject">
          <input name="subject" required className={inputClass()} />
        </Field>
        <Field label="Message">
          <textarea name="message" required className={inputClass("min-h-36")} />
        </Field>
        <WhatsAppNote />
        <Button type="submit" disabled={pending}>
          {pending ? "Opening WhatsApp…" : "Send on WhatsApp"}
        </Button>
      </form>
    </Container>
  );
}
