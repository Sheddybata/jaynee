import { NextResponse } from "next/server";
import { verifyFlutterwave } from "@/lib/payments";

const processed = new Set<string>();

export async function POST(request: Request) {
  const secret = process.env.FLUTTERWAVE_SECRET_HASH || process.env.FLUTTERWAVE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Flutterwave is not configured. Webhook ignored." },
      { status: 503 },
    );
  }
  const signature = request.headers.get("verif-hash") || "";
  if (signature !== process.env.FLUTTERWAVE_SECRET_HASH) {
    return NextResponse.json({ error: "Invalid webhook hash." }, { status: 401 });
  }
  const body = (await request.json()) as {
    event?: string;
    data?: { id?: number; tx_ref?: string; status?: string };
  };
  const txRef = body.data?.tx_ref;
  if (!txRef) return NextResponse.json({ ok: true, ignored: true });
  if (processed.has(txRef)) return NextResponse.json({ ok: true, duplicate: true });
  if (body.data?.id) {
    const verified = await verifyFlutterwave(String(body.data.id));
    if (!verified.verified) {
      return NextResponse.json({ ok: true, verified: false });
    }
  }
  processed.add(txRef);
  return NextResponse.json({ ok: true, paid: true, reference: txRef });
}
