import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { uniqueId } from "@/lib/utils";
import { tailoringSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = tailoringSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }
  const id = uniqueId("tailor");
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.from("tailoring_requests").insert({
        id,
        payload: parsed.data,
        status: "received",
      });
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json({ ok: true, id, mock: false });
    }
  }
  return NextResponse.json({
    ok: true,
    id,
    mock: true,
    message: "Demo tailoring request stored in the browser after this response.",
  });
}
