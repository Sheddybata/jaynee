import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { uniqueId } from "@/lib/utils";
import { appointmentSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }
  const id = uniqueId("apt");
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.from("appointment_requests").insert({
        id,
        ...parsed.data,
        status: "request_received",
      });
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json({ ok: true, id, mock: false });
    }
  }
  return NextResponse.json({
    ok: true,
    id,
    mock: true,
    message: "This is a request, not a confirmed booking.",
  });
}
