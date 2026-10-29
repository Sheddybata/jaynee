import { LookbookGallery } from "@/components/lookbook/gallery";
import { Container, SectionHeading } from "@/components/ui/container";

export function SearchResults() {
  return (
    <Container className="py-8 sm:py-16">
      <SectionHeading
        eyebrow="Lookbook"
        title="Studio pictures"
        body="Nothing is listed for sale. Browse the gallery and ask on WhatsApp."
      />
      <LookbookGallery className="mt-10" />
    </Container>
  );
}
