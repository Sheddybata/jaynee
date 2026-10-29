import { LoginForm } from "@/components/account/auth-forms";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Studio sign in",
  description: "Protected studio access.",
  path: "/admin/login",
  noIndex: true,
});

export default function AdminLoginPage() {
  return <LoginForm nextPath="/admin" />;
}
