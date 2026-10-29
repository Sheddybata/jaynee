import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/server";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ user: admin });
}
