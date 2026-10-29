import { cookies } from "next/headers";
import { sessionCookieName, verifySession } from "@/lib/auth/session";

export async function getSession() {
  const jar = await cookies();
  return verifySession(jar.get(sessionCookieName())?.value);
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return null;
  }
  return session;
}
