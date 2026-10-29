import { isFlutterwaveConfigured, isPaystackConfigured } from "@/lib/config";
import { nairaToKobo } from "@/lib/format";
import { uniqueId } from "@/lib/utils";
import type { PaymentMethod } from "@/lib/types";

export type PaymentInitInput = {
  email: string;
  amount: number;
  reference: string;
  callbackUrl: string;
  metadata: Record<string, string>;
  method: PaymentMethod;
};

export type PaymentInitResult = {
  provider: PaymentMethod | "mock";
  authorizationUrl?: string;
  reference: string;
  mock: boolean;
  message: string;
};

export async function initializePayment(input: PaymentInitInput): Promise<PaymentInitResult> {
  if (input.method === "bank_transfer" || input.method === "cash_on_delivery") {
    return {
      provider: input.method,
      reference: input.reference,
      mock: true,
      message:
        input.method === "bank_transfer"
          ? "Bank transfer selected. The order is awaiting a manually confirmed payment."
          : "Cash on delivery selected. Payment will be collected if the studio enables this method.",
    };
  }

  if (input.method === "paystack" && isPaystackConfigured()) {
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: input.email,
        amount: nairaToKobo(input.amount),
        reference: input.reference,
        callback_url: input.callbackUrl,
        metadata: input.metadata,
      }),
    });
    const json = (await res.json()) as {
      status: boolean;
      message: string;
      data?: { authorization_url: string; reference: string };
    };
    if (!json.status || !json.data) {
      throw new Error(json.message || "Paystack could not start this payment.");
    }
    return {
      provider: "paystack",
      authorizationUrl: json.data.authorization_url,
      reference: json.data.reference,
      mock: false,
      message: "Redirecting to Paystack.",
    };
  }

  if (input.method === "flutterwave" && isFlutterwaveConfigured()) {
    const res = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref: input.reference,
        amount: input.amount,
        currency: "NGN",
        redirect_url: input.callbackUrl,
        customer: { email: input.email },
        customizations: { title: "jaynee.ng" },
        meta: input.metadata,
      }),
    });
    const json = (await res.json()) as {
      status: string;
      message: string;
      data?: { link: string };
    };
    if (json.status !== "success" || !json.data?.link) {
      throw new Error(json.message || "Flutterwave could not start this payment.");
    }
    return {
      provider: "flutterwave",
      authorizationUrl: json.data.link,
      reference: input.reference,
      mock: false,
      message: "Redirecting to Flutterwave.",
    };
  }

  return {
    provider: "mock",
    authorizationUrl: `/checkout/mock-pay?ref=${encodeURIComponent(input.reference)}&method=${input.method}`,
    reference: input.reference || uniqueId("pay"),
    mock: true,
    message: "Payment credentials are not configured. Using labelled demo checkout.",
  };
}

export async function verifyPaystack(reference: string) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return { verified: false, mock: true, status: "mock" as const };
  const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${secret}` },
  });
  const json = (await res.json()) as { status: boolean; data?: { status: string; reference: string } };
  const ok = Boolean(json.status && json.data?.status === "success");
  return { verified: ok, mock: false, status: json.data?.status ?? "failed" };
}

export async function verifyFlutterwave(idOrRef: string) {
  const secret = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!secret) return { verified: false, mock: true, status: "mock" as const };
  const res = await fetch(`https://api.flutterwave.com/v3/transactions/${idOrRef}/verify`, {
    headers: { Authorization: `Bearer ${secret}` },
  });
  const json = (await res.json()) as { status: string; data?: { status: string; tx_ref: string } };
  const ok = json.status === "success" && json.data?.status === "successful";
  return { verified: ok, mock: false, status: json.data?.status ?? "failed" };
}
