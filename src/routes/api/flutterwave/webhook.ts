import { createFileRoute } from "@tanstack/react-router";

import { storeVerifiedTransaction } from "@/lib/flutterwave-store";
import {
  getFlutterwaveSignatureHeader,
  isPristinumDynPaymentReference,
  isSuccessfulFlutterwaveStatus,
  verifyFlutterwaveTransaction,
  verifyFlutterwaveWebhookSignature,
} from "@/lib/flutterwave";

export const Route = createFileRoute("/api/flutterwave/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawBody = await request.text();
        const signature = getFlutterwaveSignatureHeader(request.headers);

        if (!signature) {
          return new Response("Missing Flutterwave signature header.", { status: 401 });
        }

        if (!verifyFlutterwaveWebhookSignature(signature)) {
          return new Response("Invalid Flutterwave signature.", { status: 401 });
        }

        let payload: Record<string, unknown>;

        try {
          payload = JSON.parse(rawBody) as Record<string, unknown>;
        } catch {
          return new Response("Invalid JSON payload.", { status: 400 });
        }

        const event = typeof payload.event === "string" ? payload.event : "";
        const data =
          payload.data && typeof payload.data === "object"
            ? (payload.data as Record<string, unknown>)
            : {};
        const txRef =
          typeof data.tx_ref === "string"
            ? data.tx_ref
            : typeof data.txRef === "string"
              ? data.txRef
              : typeof data.transaction === "object" &&
                  data.transaction &&
                  "tx_ref" in data.transaction
                ? String((data.transaction as { tx_ref?: string }).tx_ref ?? "")
                : "";
        const status = typeof data.status === "string" ? data.status : "unknown";

        if (
          event === "charge.completed" &&
          isPristinumDynPaymentReference(txRef) &&
          isSuccessfulFlutterwaveStatus(status)
        ) {
          try {
            const verification = await verifyFlutterwaveTransaction(txRef);
            if (!isSuccessfulFlutterwaveStatus(verification.status)) {
              return Response.json(
                { ok: false, error: "Flutterwave has not confirmed this payment yet." },
                { status: 502 },
              );
            }

            storeVerifiedTransaction({
              tx_ref: verification.tx_ref,
              status: verification.status,
              amount: verification.amount,
              currency: verification.currency,
              id: verification.id,
              customer: verification.customer,
            });
          } catch (error) {
            console.error("Could not verify Pristinum Dyn webhook payment.", error);
            return Response.json(
              { ok: false, error: "Flutterwave payment verification is temporarily unavailable." },
              { status: 502 },
            );
          }
        }

        return Response.json({
          ok: true,
          received: true,
          event,
          tx_ref: txRef || null,
          status,
        });
      },
    },
  },
});
