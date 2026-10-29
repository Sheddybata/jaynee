import { Button } from "@/components/ui/button";
import { Container, EmptyState, SectionHeading } from "@/components/ui/container";

export default function WishlistPage() {
  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Wishlist" title="Saved pieces" />
      <div className="mt-10">
        <EmptyState
          title="Nothing is listed for sale"
          body="Browse the lookbook and ask about a photograph on WhatsApp."
          action={<Button href="/shop">View the lookbook</Button>}
        />
      </div>
    </Container>
  );
}
