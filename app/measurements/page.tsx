import { MeasurementGuide } from "@/components/measurements/guide";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Body measurements",
  description: "A mobile-friendly measurement guide for men's and women's tailoring, in centimetres or inches.",
  path: "/measurements",
});

export default function MeasurementsPage() {
  return <MeasurementGuide />;
}
