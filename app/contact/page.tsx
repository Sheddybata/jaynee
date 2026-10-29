import { ContactPage } from "@/components/contact/contact-page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description: "Contact jaynee.ng — write, call, or WhatsApp the studio in Lagos, Nigeria.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
