import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

const processed = new Set<string>();

export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Paystack is not configured. Webhook ignored." },
      { status: 503 },
    );
  }
  const signature = request.headers.get("x-paystack-signature") || "";
  const raw = await request.text();
  const expected = createHmac("sha512", secret).update(raw).digest("hex");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }
  const event = JSON.parse(raw) as {
    event?: string;
    data?: { reference?: string; status?: string };
  };
  const reference = event.data?.reference;
  if (event.event === "charge.success" && reference && event.data?.status === "success") {
    if (processed.has(reference)) {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    processed.add(reference);
    return NextResponse.json({ ok: true, reference, paid: true });
  }
  return NextResponse.json({ ok: true, ignored: true });
}
