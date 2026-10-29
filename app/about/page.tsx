import { Container, SectionHeading } from "@/components/ui/container";
import { PhotoBackdrop } from "@/components/media/photo-backdrop";
import { backdropLooks } from "@/lib/data/clothes";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description: "About jaynee.ng (jaynee) — a Nigerian fashion atelier for custom-made African silhouettes.",
  path: "/about",
});

const sections = [
  {
    title: "Brand story",
    body: "jaynee.ng is a modern Nigerian fashion house: style with a smile, elegance redefined. This copy is editable. It should later describe how the studio actually began, without invented awards, founding years, or staff biographies.",
  },
  {
    title: "Design philosophy",
    body: "We favour proportion over noise. Traditional silhouettes — senator, agbada, iro and buba, lace gowns — are cut so they can be worn, sat in, and remembered. Print is placed, not pasted.",
  },
  {
    title: "Tailoring craftsmanship",
    body: "Pattern, fitting, and finish are treated as one process. Structured garments may require a second fitting. Embroidery is scaled to the cloth, not to a trend cycle.",
  },
  {
    title: "Fabric selection",
    body: "Ankara, Aso-Oke, lace, brocade, linen, and tropical suiting are chosen for climate and drape. Customers may supply cloth; the studio will still advise if a fabric cannot hold a requested structure.",
  },
  {
    title: "Commitment to customers",
    body: "Clear prices in naira, honest timelines, and private handling of measurements. Replace this paragraph with the studio’s actual service promise before launch.",
  },
];

export default function AboutPage() {
  const coupleLook = backdropLooks[1] ? [backdropLooks[1]] : backdropLooks.slice(0, 1);

  return (
    <div>
      <div className="relative isolate overflow-hidden bg-ink text-ivory">
        <div className="relative h-[42svh] min-h-[14rem] sm:absolute sm:inset-0 sm:h-auto sm:min-h-[50vh]">
          <PhotoBackdrop looks={coupleLook} eager />
        </div>
        <div className="pointer-events-none absolute inset-0 hidden bg-linear-to-t from-ink via-ink/40 to-ink/15 sm:block" />
        <Container className="relative py-8 sm:flex sm:min-h-[50vh] sm:items-end sm:pb-12 sm:pt-24">
          <h1 className="max-w-3xl font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            A house for cloth and character
          </h1>
        </Container>
      </div>
      <Container className="grid gap-10 py-12 sm:gap-12 sm:py-20 lg:grid-cols-2">
        {sections.map((section) => (
          <section key={section.title}>
            <SectionHeading title={section.title} body={section.body} />
          </section>
        ))}
      </Container>
    </div>
  );
}
