import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/ui/container";
import { WhatsAppNote } from "@/components/ui/whatsapp-note";
import { getWhatsAppLink } from "@/lib/config";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Request ready",
  description: "Your custom tailoring request is ready to send on WhatsApp.",
  path: "/custom-tailoring/confirmation",
  noIndex: true,
});

export default function TailoringConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  return (
    <Suspense fallback={<div className="px-5 py-24 text-center text-sm">Loading confirmation…</div>}>
      <ConfirmationInner searchParams={searchParams} />
    </Suspense>
  );
}

async function ConfirmationInner({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  return (
    <Container className="py-20">
      <SectionHeading eyebrow="Custom desk" title="Send this request on WhatsApp" />
      <div className="mt-8 max-w-xl space-y-5">
        <WhatsAppNote />
        <p className="text-sm leading-7 text-muted">
          If inspiration images were attached, send those photos in the same WhatsApp chat after
          you tap Send.
        </p>
        <p className="text-sm text-muted">Reference {id || "pending"}</p>
        <div className="flex flex-wrap gap-3">
          <Button href={getWhatsAppLink()}>Open WhatsApp again</Button>
          <Button href="/measurements" variant="secondary">
            Add measurements
          </Button>
          <Button href="/appointments" variant="ghost">
            Book a fitting
          </Button>
        </div>
      </div>
    </Container>
  );
}
