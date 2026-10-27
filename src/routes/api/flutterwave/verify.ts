import { createFileRoute } from "@tanstack/react-router";

import { storeVerifiedTransaction } from "@/lib/flutterwave-store";
import {
  isSuccessfulFlutterwaveStatus,
  verifyFlutterwaveTransaction,
} from "@/lib/flutterwave";

export const Route = createFileRoute("/api/flutterwave/verify")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const txRef = new URL(request.url).searchParams.get("tx_ref");
        return verifyTxRef(txRef);
      },
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { tx_ref?: string };
          return verifyTxRef(body.tx_ref ?? "");
        } catch {
          return Response.json(
            {
              ok: false,
              error: "Missing or invalid JSON body.",
            },
            { status: 400 },
          );
        }
      },
    },
  },
});

async function verifyTxRef(txRef: string | null) {
  if (!txRef) {
    return Response.json(
      {
        ok: false,
        error: "Missing tx_ref query parameter.",
      },
      { status: 400 },
    );
  }

  try {
    const verification = await verifyFlutterwaveTransaction(txRef);
    const verified = isSuccessfulFlutterwaveStatus(verification.status);

    if (verified) {
      storeVerifiedTransaction({
        tx_ref: verification.tx_ref,
        status: verification.status,
        amount: verification.amount,
        currency: verification.currency,
        id: verification.id,
        customer: verification.customer,
      });
    }

    return Response.json({
      ok: true,
      verified,
      status: verification.status,
      tx_ref: verification.tx_ref,
      amount: verification.amount,
      currency: verification.currency,
      id: verification.id,
      customer: verification.customer,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Flutterwave verification failed.";

    return Response.json(
      {
        ok: false,
        error: message,
      },
      { status: 502 },
    );
  }
}
