import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-[11px] tracking-[0.22em] uppercase text-muted">404</p>
      <h1 className="mt-3 font-display text-6xl">This page has left the atelier</h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-muted">
        The piece or page you asked for is not on the rail. Return to the collection or write to the studio.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/shop">Shop</Button>
        <Button href="/contact" variant="secondary">
          Contact
        </Button>
      </div>
    </Container>
  );
}
