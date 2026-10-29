import { createHmac, timingSafeEqual } from "crypto";
import type { SessionUser } from "@/lib/types";

const COOKIE = "tc_session";

function secret() {
  return process.env.AUTH_SECRET || "dev-only-mock-secret-change-me";
}

export function sessionCookieName() {
  return COOKIE;
}

export function signSession(user: SessionUser) {
  const data = Buffer.from(JSON.stringify(user)).toString("base64url");
  const sig = createHmac("sha256", secret()).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function verifySession(token: string | undefined | null): SessionUser | null {
  if (!token) return null;
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = createHmac("sha256", secret()).update(data).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as SessionUser;
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    name: COOKIE,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  };
}
