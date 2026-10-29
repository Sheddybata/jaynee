import { LoginForm } from "@/components/account/auth-forms";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Sign in",
  description: "Sign in to your jaynee.ng account.",
  path: "/account/login",
  noIndex: true,
});

export default function Page() {
  return <LoginForm />;
}
