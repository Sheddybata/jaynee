import { NextResponse } from "next/server";
import { sessionCookieOptions, signSession } from "@/lib/auth/session";
import { uniqueId } from "@/lib/utils";
import { registerSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }
  const user = {
    id: uniqueId("user"),
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    role: "customer" as const,
  };
  const response = NextResponse.json({
    user,
    mock: true,
    message: "Demo account created. Connect Supabase Auth before treating this as a real registration.",
  });
  const cookie = sessionCookieOptions();
  response.cookies.set(cookie.name, signSession(user), cookie);
  return response;
}
