import { CheckoutForm } from "@/components/checkout/checkout-form";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Checkout",
  description: "Send your jaynee.ng order to the studio on WhatsApp.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return <CheckoutForm />;
}
