import { RegisterForm } from "@/components/account/auth-forms";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Register",
  description: "Create a jaynee.ng account.",
  path: "/account/register",
  noIndex: true,
});

export default function Page() {
  return <RegisterForm />;
}
