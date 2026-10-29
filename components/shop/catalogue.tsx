import { LookbookGallery } from "@/components/lookbook/gallery";
import { Container, SectionHeading } from "@/components/ui/container";
import { looks } from "@/lib/data/clothes";

export function Catalogue() {
  return (
    <Container className="py-8 sm:py-12">
      <SectionHeading
        eyebrow="Lookbook"
        title="Studio pictures"
        body={`${looks.length} looks from the atelier. Nothing is listed for sale. Tap a photo to ask about it on WhatsApp.`}
      />
      <LookbookGallery className="mt-10" />
    </Container>
  );
}
