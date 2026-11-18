import { createFileRoute } from "@tanstack/react-router";

import { sendConsultationNotification } from "@/lib/booking-email";
import {
  isPristinumDynPaymentReference,
  isSuccessfulFlutterwaveStatus,
  verifyFlutterwaveTransaction,
} from "@/lib/flutterwave";
import { storeVerifiedTransaction } from "@/lib/flutterwave-store";

type ConsultationDetails = {
  name: string;
  phone: string;
  email: string;
  treatment: string;
  note: string;
  service: string;
  price: string;
  amount: number;
  date: string;
  time: string;
};

export const Route = createFileRoute("/api/flutterwave/complete")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { tx_ref?: unknown; consultation?: unknown };

        try {
          body = (await request.json()) as typeof body;
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
        }

        const txRef = body.tx_ref;
        const consultation = parseConsultation(body.consultation);

        if (!isPristinumDynPaymentReference(txRef) || !consultation) {
          return Response.json(
            { ok: false, error: "A valid transaction reference and booking are required." },
            { status: 400 },
          );
        }

        let verification: Awaited<ReturnType<typeof verifyFlutterwaveTransaction>>;

        try {
          verification = await verifyFlutterwaveTransaction(txRef);
        } catch (error) {
          console.error("Could not verify Flutterwave payment.", error);
          return Response.json(
            {
              ok: false,
              error: "Payment verification is temporarily unavailable.",
              retryable: true,
            },
            { status: 502 },
          );
        }

        if (!isSuccessfulFlutterwaveStatus(verification.status)) {
          return Response.json({
            ok: true,
            verified: false,
            status: verification.status,
            retryAfterMs: 8000,
          });
        }

        if (
          verification.currency?.toUpperCase() !== "NGN" ||
          verification.amount !== consultation.amount ||
          verification.customer?.email?.toLowerCase() !== consultation.email.toLowerCase()
        ) {
          return Response.json(
            {
              ok: false,
              verified: false,
              error: "The verified payment details do not match this booking.",
              retryable: false,
            },
            { status: 422 },
          );
        }

        storeVerifiedTransaction({
          tx_ref: verification.tx_ref,
          status: verification.status,
          amount: verification.amount,
          currency: verification.currency,
          customer: verification.customer,
          ...(verification.id !== undefined ? { id: verification.id } : {}),
        });

        try {
          await sendConsultationNotification(consultation, verification.tx_ref);
        } catch (error) {
          const emailConfigurationError =
            error instanceof Error && error.message === "Resend email is not configured.";
          console.error(
            "Payment was verified, but the clinic notification could not be sent.",
            error,
          );

          return Response.json(
            {
              ok: false,
              verified: true,
              notified: false,
              error: emailConfigurationError
                ? "The booking email service is not configured."
                : "The clinic notification could not be sent yet.",
              retryable: !emailConfigurationError,
            },
            { status: emailConfigurationError ? 503 : 502 },
          );
        }

        return Response.json({
          ok: true,
          verified: true,
          notified: true,
          status: verification.status,
          tx_ref: verification.tx_ref,
        });
      },
    },
  },
});

function parseConsultation(value: unknown): ConsultationDetails | null {
  if (!value || typeof value !== "object") return null;

  const data = value as Record<string, unknown>;
  const stringFields = [
    "name",
    "phone",
    "email",
    "treatment",
    "note",
    "service",
    "price",
    "date",
    "time",
  ] as const;
  if (stringFields.some((field) => typeof data[field] !== "string")) return null;

  const details = Object.fromEntries(
    stringFields.map((field) => [field, (data[field] as string).trim().slice(0, 1000)]),
  ) as Omit<ConsultationDetails, "amount">;

  if (
    !details.name ||
    !details.phone ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email) ||
    !details.treatment ||
    !details.service ||
    !details.price ||
    !Number.isSafeInteger(data["amount"]) ||
    (data["amount"] as number) <= 0
  ) {
    return null;
  }

  const amount = data["amount"] as number;
  return {
    ...details,
    amount,
    price: new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount),
  };
}
