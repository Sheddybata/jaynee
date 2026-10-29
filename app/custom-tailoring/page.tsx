import { TailoringWizard } from "@/components/tailoring/wizard";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Custom Tailoring",
  description: "Request a made-to-measure outfit from jaynee.ng — from senator sets to bridal.",
  path: "/custom-tailoring",
});

export default function CustomTailoringPage() {
  return <TailoringWizard />;
}
