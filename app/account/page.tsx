import { AccountHome } from "@/components/account/account-home";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Account",
  description: "Your jaynee.ng account.",
  path: "/account",
  noIndex: true,
});

export default function Page() {
  return <AccountHome />;
}
