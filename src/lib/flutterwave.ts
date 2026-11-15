import { timingSafeEqual } from "node:crypto";

const FLUTTERWAVE_BASE_URL = "https://api.flutterwave.com/v3";

function getFlutterwaveSecretKey() {
  return process.env.FLUTTERWAVE_SECRET_KEY || "";
}

function getFlutterwaveWebhookSecret() {
  return process.env.FLUTTERWAVE_WEBHOOK_SECRET || "";
}

export function isSuccessfulFlutterwaveStatus(status: string) {
  return ["successful", "completed", "succeeded"].includes(status.toLowerCase());
}

export function isFlutterwaveWebhookHashValid(
  configuredHash: string,
  receivedHash: string | undefined,
) {
  if (!configuredHash || !receivedHash) {
    return false;
  }

  const expected = Buffer.from(configuredHash);
  const received = Buffer.from(receivedHash);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export function isPristinumDynPaymentReference(reference: unknown): reference is string {
  return typeof reference === "string" && reference.startsWith("PRISTINUM-");
}

export function getFlutterwaveSignatureHeader(headers: Headers): string {
  const candidates = ["verif-hash", "x-flutterwave-signature", "flutterwave-signature"];

  for (const key of candidates) {
    const value = headers.get(key);
    if (value) {
      return value;
    }
  }

  return "";
}

export async function verifyFlutterwaveTransaction(txRef: string) {
  const secretKey = getFlutterwaveSecretKey();
  if (!secretKey) {
    throw new Error("FLUTTERWAVE_SECRET_KEY is not configured.");
  }

  const response = await fetch(
    `${FLUTTERWAVE_BASE_URL}/transactions/verify_by_reference?tx_ref=${encodeURIComponent(txRef)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    },
  );

  const payload = (await response.json()) as {
    status?: string;
    message?: string;
    data?: {
      id?: number;
      tx_ref?: string;
      status?: string;
      amount?: number;
      currency?: string;
      customer?: { email?: string; phone_number?: string; name?: string };
    };
  };

  if (!response.ok) {
    throw new Error(payload.message || "Flutterwave verification failed.");
  }

  const verifiedTxRef = payload.data?.tx_ref;
  if (!verifiedTxRef || verifiedTxRef !== txRef) {
    throw new Error(
      "Flutterwave verification returned a different or missing transaction reference.",
    );
  }

  return {
    status: payload.data?.status || payload.status || "pending",
    tx_ref: verifiedTxRef,
    amount: payload.data?.amount,
    currency: payload.data?.currency,
    id: payload.data?.id,
    customer: payload.data?.customer,
    payload,
  };
}

export function verifyFlutterwaveWebhookSignature(signature: string) {
  return isFlutterwaveWebhookHashValid(getFlutterwaveWebhookSecret(), signature);
}
