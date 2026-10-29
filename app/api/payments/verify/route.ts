import { NextResponse } from "next/server";
import { isFlutterwaveConfigured, isPaystackConfigured } from "@/lib/config";
import { verifyFlutterwave, verifyPaystack } from "@/lib/payments";

const processed = new Set<string>();

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const reference = String(body?.reference || "");
  const provider = String(body?.provider || "");
  if (!reference) {
    return NextResponse.json({ error: "Missing payment reference." }, { status: 400 });
  }
  if (processed.has(reference)) {
    return NextResponse.json({ verified: true, duplicate: true, status: "already_processed" });
  }

  if (provider === "paystack" && isPaystackConfigured()) {
    const result = await verifyPaystack(reference);
    if (result.verified) processed.add(reference);
    return NextResponse.json(result);
  }
  if (provider === "flutterwave" && isFlutterwaveConfigured()) {
    const result = await verifyFlutterwave(reference);
    if (result.verified) processed.add(reference);
    return NextResponse.json(result);
  }

  if (body?.mockResult === "success") {
    processed.add(reference);
    return NextResponse.json({
      verified: false,
      mock: true,
      status: "mock_success",
      message: "Demo payment marked successful. This is not a real charge.",
    });
  }
  if (body?.mockResult === "failure") {
    return NextResponse.json({
      verified: false,
      mock: true,
      status: "mock_failed",
      message: "Demo payment marked failed.",
    });
  }

  return NextResponse.json({
    verified: false,
    mock: true,
    status: "pending",
    message: "No live payment credentials. Use the demo payment screen.",
  });
}
