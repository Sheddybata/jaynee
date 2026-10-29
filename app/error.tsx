"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-24 text-center">
      <h1 className="font-display text-5xl">Something snagged on the machine</h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-muted">{error.message || "Please try again."}</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="secondary">
          Home
        </Button>
      </div>
    </Container>
  );
}
