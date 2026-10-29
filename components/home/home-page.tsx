import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/ui/container";
import { LookbookGallery } from "@/components/lookbook/gallery";
import { PhotoBackdrop } from "@/components/media/photo-backdrop";
import { StudioPages } from "@/components/home/studio-pages";
import { looks, backdropLooks } from "@/lib/data/clothes";
import { howItWorks } from "@/lib/data/catalog";
import { getWhatsAppLink, siteConfig } from "@/lib/config";

export function HomePage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-ink text-ivory sm:min-h-[78vh]">
        <div className="relative h-[58svh] min-h-[17.5rem] sm:absolute sm:inset-0 sm:h-auto sm:min-h-0">
          <PhotoBackdrop looks={backdropLooks} eager />
        </div>
        <div className="pointer-events-none absolute inset-0 hidden bg-linear-to-t from-ink via-ink/45 to-ink/15 sm:block" />
        <Container className="relative py-8 sm:flex sm:min-h-[78vh] sm:flex-col sm:justify-end sm:pb-16 sm:pt-24">
          <p className="text-[10px] tracking-[0.22em] uppercase sm:text-[11px] sm:tracking-[0.32em]">
            Nigerian atelier · jaynee.ng
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[2.05rem] leading-[1.08] sm:mt-4 sm:text-6xl lg:text-7xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-ivory/85 sm:mt-5 sm:text-base sm:leading-7">
            An atelier for African silhouettes — custom-made, quietly considered.
          </p>
          <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button href="/shop" className="w-full bg-ivory text-burgundy border-ivory hover:bg-paper sm:w-auto">
              View the lookbook
            </Button>
            <Button
              href="/appointments"
              variant="secondary"
              className="w-full border-ivory text-ivory hover:bg-ivory hover:text-ink sm:w-auto"
            >
              Book a tailor
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-16">
        <Container>
          <SectionHeading eyebrow="Lookbook" title="A few studio pictures" />
          <LookbookGallery className="mt-8 sm:mt-10" limit={6} />
          <div className="mt-8 flex justify-center">
            <Button href="/shop" variant="secondary" className="w-full sm:w-auto">
              View all {looks.length} pictures
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-10 sm:py-16">
        <Container>
          <SectionHeading eyebrow="The studio" title="What you can do here" />
          <StudioPages className="mt-8 sm:mt-10" />
        </Container>
      </section>

      <section className="bg-ivory py-10 sm:py-16">
        <Container>
          <SectionHeading eyebrow="How it works" title="From a look to a garment" />
          <div className="mt-10 grid gap-8 sm:mt-12 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item) => (
              <div key={item.step} className="border-t border-ink pt-5 sm:pt-6">
                <p className="text-[11px] tracking-[0.2em] text-gold-deep">{item.step}</p>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden border-t border-line text-ivory">
        <div className="relative h-48 sm:absolute sm:inset-0 sm:h-auto">
          <PhotoBackdrop looks={backdropLooks.slice(2, 3)} />
        </div>
        <div className="absolute inset-0 hidden bg-burgundy-deep/78 sm:block" />
        <div className="relative bg-burgundy-deep sm:bg-transparent">
          <Container className="flex flex-col items-start justify-between gap-6 py-10 sm:py-16 md:flex-row md:items-center">
            <div>
              <p className="text-[11px] tracking-[0.24em] uppercase text-sand">Custom desk</p>
              <h2 className="mt-2 max-w-xl font-display text-3xl leading-tight sm:text-4xl">
                Made around you, confirmed on WhatsApp.
              </h2>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <Button href="/custom-tailoring" className="w-full bg-ivory text-burgundy border-ivory hover:bg-paper sm:w-auto">
                Start a request
              </Button>
              <Button
                href={getWhatsAppLink()}
                className="w-full border-ivory bg-transparent text-ivory hover:bg-ivory hover:text-burgundy sm:w-auto"
              >
                Message us
              </Button>
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
}
