import { NextResponse } from "next/server";
import { mockAdmin } from "@/lib/config";
import { sessionCookieOptions, signSession } from "@/lib/auth/session";
import { loginSchema } from "@/lib/validation";
import { uniqueId } from "@/lib/utils";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }
  const { email, password } = parsed.data;
  const isAdmin =
    email.toLowerCase() === mockAdmin.email.toLowerCase() && password === mockAdmin.password;

  const user = isAdmin
    ? { id: "admin_demo", name: "Studio Admin", email, role: "admin" as const }
    : { id: uniqueId("user"), name: email.split("@")[0], email, role: "customer" as const };

  const response = NextResponse.json({
    user,
    mock: true,
    message: isAdmin
      ? "Demo admin session issued. Replace with Supabase Auth before launch."
      : "Demo customer session issued. Password is not verified against a database in mock mode.",
  });
  const cookie = sessionCookieOptions();
  response.cookies.set(cookie.name, signSession(user), cookie);
  return response;
}
