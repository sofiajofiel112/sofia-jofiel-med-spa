import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, CircleAlert, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

type BookingStatus = "checking" | "confirmed" | "not-completed" | "needs-attention";

type CompletionResponse = {
  ok?: boolean;
  verified?: boolean;
  notified?: boolean;
  status?: string;
  retryAfterMs?: number;
  retryable?: boolean;
  error?: string;
};

type StoredConsultation = {
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

const MAX_VERIFICATION_TIME_MS = 3 * 60 * 1000;

export const Route = createFileRoute("/booking-success")({
  component: BookingSuccessPage,
});

function BookingSuccessPage() {
  const [status, setStatus] = useState<BookingStatus>("checking");
  const [message, setMessage] = useState(
    "We’re confirming your payment and sending your request to the clinic.",
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const txRef = params.get("tx_ref");
    const stored = sessionStorage.getItem("pendingConsultation");

    if (!txRef?.startsWith("PRISTINUM-") || !stored) {
      setStatus("needs-attention");
      setMessage(
        "We couldn’t find the booking details for this payment. Please contact the clinic so we can assist.",
      );
      return;
    }

    let consultation: StoredConsultation;
    try {
      const parsed: unknown = JSON.parse(stored);
      if (!isStoredConsultation(parsed)) {
        throw new Error("Saved consultation details are incomplete.");
      }
      consultation = parsed;
    } catch (error) {
      console.error("Saved consultation details could not be read.", error);
      setStatus("needs-attention");
      setMessage(
        `We couldn’t read the booking details. Please contact the clinic with transaction reference ${txRef}.`,
      );
      return;
    }

    let cancelled = false;
    const startedAt = Date.now();

    async function verifyAndNotify() {
      if (cancelled) return;

      if (Date.now() - startedAt >= MAX_VERIFICATION_TIME_MS) {
        setStatus("needs-attention");
        setMessage(
          `Your payment may still be processing. Please contact the clinic with transaction reference ${txRef}; we have not marked this request as unsuccessful.`,
        );
        return;
      }

      try {
        const response = await fetch("/api/flutterwave/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tx_ref: txRef,
            consultation: {
              name: consultation.name,
              phone: consultation.phone,
              email: consultation.email,
              treatment: consultation.treatment,
              note: consultation.note ?? "",
              service: consultation.service,
              price: consultation.price,
              amount: consultation.amount,
              date: consultation.date,
              time: consultation.time,
            },
          }),
        });
        const result = (await response.json()) as CompletionResponse;

        if (cancelled) return;

        if (response.ok && result.verified && result.notified) {
          sessionStorage.removeItem("pendingConsultation");
          setStatus("confirmed");
          setMessage(
            "Your payment is confirmed and your request has been sent to our clinic. Our concierge will review your details and contact you to confirm your appointment.",
          );
          return;
        }

        if (response.ok && result.verified === false && isFinalPaymentFailure(result.status)) {
          setStatus("not-completed");
          setMessage(
            "Flutterwave could not confirm this payment. Your appointment has not been booked. If you believe you were charged, contact the clinic with your transaction reference.",
          );
          return;
        }

        if (!response.ok && result.retryable === false) {
          setStatus("needs-attention");
          setMessage(
            result.verified
              ? `Your payment is verified, but we couldn’t send your request to the clinic automatically. Please contact the clinic with transaction reference ${txRef}.`
              : `We couldn’t match the payment to this booking. Please contact the clinic with transaction reference ${txRef}.`,
          );
          return;
        }
      } catch (error) {
        console.error("Payment confirmation or clinic notification request failed.", error);
      }

      if (!cancelled) {
        window.setTimeout(() => void verifyAndNotify(), 8000);
      }
    }

    void verifyAndNotify();

    return () => {
      cancelled = true;
    };
  }, []);

  const confirmed = status === "confirmed";
  const notCompleted = status === "not-completed";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090909] px-6 py-12 text-white">
      <div className="w-full max-w-xl border border-gold/40 bg-[#111111] p-8 text-center shadow-[0_0_30px_rgba(201,170,85,0.12)] sm:p-12">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-gold/15 text-gold">
          {status === "checking" ? (
            <LoaderCircle className="size-9 animate-spin" />
          ) : notCompleted || status === "needs-attention" ? (
            <CircleAlert className="size-9" />
          ) : (
            <CheckCircle2 className="size-9" />
          )}
        </div>
        <h1 className="mt-6 font-display text-4xl font-normal">
          {confirmed
            ? "Request confirmed"
            : notCompleted
              ? "Payment not completed"
              : status === "checking"
                ? "Confirming your payment"
                : "We’re checking your request"}
        </h1>
        <p aria-live="polite" className="mt-4 text-base leading-7 text-white/75">
          {message}
        </p>
        {confirmed && (
          <p className="mt-4 text-sm leading-6 text-white/60">
            Please keep an eye on your email and phone. Our team will be in touch to confirm your
            preferred appointment details.
          </p>
        )}
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center border border-gold bg-gold px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-[#111111] transition hover:brightness-110"
        >
          Return home
        </a>
      </div>
    </main>
  );
}

function isFinalPaymentFailure(status: string | undefined) {
  return ["failed", "cancelled", "canceled", "error", "reversed"].includes(
    status?.toLowerCase() ?? "",
  );
}

function isStoredConsultation(value: unknown): value is StoredConsultation {
  if (!value || typeof value !== "object") return false;

  const details = value as Record<string, unknown>;
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
  return (
    stringFields.every((field) => typeof details[field] === "string") &&
    Number.isSafeInteger(details["amount"]) &&
    (details["amount"] as number) > 0
  );
}
