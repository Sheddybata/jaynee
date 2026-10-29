import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { newsletterSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.from("newsletter_subscribers").insert({
        email: parsed.data.email,
      });
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json({ ok: true, mock: false, message: "You are on the list." });
    }
  }
  return NextResponse.json({
    ok: true,
    mock: true,
    message: "Saved as a demo subscription. Connect Supabase to store this email.",
  });
}
