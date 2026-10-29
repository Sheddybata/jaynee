import { LookbookGallery } from "@/components/lookbook/gallery";
import { Container, SectionHeading } from "@/components/ui/container";
import { looks } from "@/lib/data/clothes";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Lookbook",
  description: "Studio pictures from jaynee.ng. Ask about a look on WhatsApp.",
  path: "/collections",
});

export default function CollectionsPage() {
  return (
    <Container className="py-8 sm:py-16">
      <SectionHeading
        eyebrow="Lookbook"
        title="Studio pictures"
        body={`${looks.length} photographs. Nothing is listed for sale — tap a look to send it on WhatsApp.`}
      />
      <LookbookGallery className="mt-10" />
    </Container>
  );
}
