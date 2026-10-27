import { createFileRoute } from "@tanstack/react-router";

import { storeVerifiedTransaction } from "@/lib/flutterwave-store";
import {
  getFlutterwaveSignatureHeader,
  isSuccessfulFlutterwaveStatus,
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

        if (!verifyFlutterwaveWebhookSignature(rawBody, signature)) {
          return new Response("Invalid Flutterwave signature.", { status: 401 });
        }

        let payload: Record<string, unknown>;

        try {
          payload = JSON.parse(rawBody) as Record<string, unknown>;
        } catch {
          return new Response("Invalid JSON payload.", { status: 400 });
        }

        const event = typeof payload.event === "string" ? payload.event : "";
        const data = payload.data && typeof payload.data === "object" ? (payload.data as Record<string, unknown>) : {};
        const txRef =
          typeof data.tx_ref === "string"
            ? data.tx_ref
            : typeof data.txRef === "string"
              ? data.txRef
              : typeof data.transaction === "object" && data.transaction && "tx_ref" in data.transaction
                ? String((data.transaction as { tx_ref?: string }).tx_ref ?? "")
                : "";
        const status = typeof data.status === "string" ? data.status : "unknown";

        if (txRef && isSuccessfulFlutterwaveStatus(status)) {
          storeVerifiedTransaction({
            tx_ref: txRef,
            status,
            amount: typeof data.amount === "number" ? data.amount : undefined,
            currency: typeof data.currency === "string" ? data.currency : undefined,
            id: typeof data.id === "number" ? data.id : undefined,
            customer:
              data.customer && typeof data.customer === "object"
                ? (data.customer as {
                    email?: string;
                    phone_number?: string;
                    name?: string;
                  })
                : undefined,
          });
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
