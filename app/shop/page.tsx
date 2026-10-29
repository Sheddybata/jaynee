import { Catalogue } from "@/components/shop/catalogue";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Lookbook",
  description: "jaynee.ng lookbook — studio pictures from the Nigerian fashion atelier. Ask about a look on WhatsApp.",
  path: "/shop",
});

export default function ShopPage() {
  return <Catalogue />;
}
