import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/booking-success")({
  component: BookingSuccessPage,
});

function BookingSuccessPage() {
  const [message, setMessage] = useState("Processing your payment and confirming your request...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    const txRef = params.get("tx_ref");
    const stored = sessionStorage.getItem("pendingConsultation");

    async function verifyPayment() {
      if (status !== "successful" || !txRef) {
        if (status === "successful") {
          setMessage("Payment was successful, but no pending request was found. Please contact the clinic directly.");
          return;
        }

        setMessage("Payment was not completed. Your consultation request remains saved in the booking flow if you want to try again.");
        return;
      }

      try {
        const response = await fetch(`/api/flutterwave/verify?tx_ref=${encodeURIComponent(txRef)}`);
        const payload = await response.json();

        if (!response.ok || payload.verified === false) {
          setMessage("Payment verification is still pending. Please contact the clinic if this does not clear shortly.");
          return;
        }

        if (stored) {
          const consultation = JSON.parse(stored);
          const subject = encodeURIComponent("New consultation request");
          const body = encodeURIComponent([
            "New consultation request",
            "",
            `Name: ${consultation.name ?? ""}`,
            `Phone: ${consultation.phone ?? ""}`,
            `Email: ${consultation.email ?? ""}`,
            `Treatment: ${consultation.treatment ?? ""}`,
            `Note: ${consultation.note ?? ""}`,
            `Selected service: ${consultation.service ?? ""}`,
            `Price: ${consultation.price ?? ""}`,
            `Preferred date: ${consultation.date ?? ""}`,
            `Preferred time: ${consultation.time ?? ""}`,
            `Flutterwave tx_ref: ${payload.tx_ref ?? txRef}`,
          ].join("\n"));

          sessionStorage.removeItem("pendingConsultation");
          window.location.href = `mailto:info@sofiajofielmedspa.com?subject=${subject}&body=${body}`;
          setMessage("Your payment was successful. Your request is being sent to the clinic.");
          return;
        }

        setMessage("Payment was successful, but no pending request was found. Please contact the clinic directly.");
      } catch (error) {
        console.error("Payment verification request failed.", error);
        setMessage("Payment confirmation is being checked. Please contact the clinic if this page does not resolve shortly.");
      }
    }

    void verifyPayment();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090909] px-6 py-12 text-white">
      <div className="w-full max-w-xl border border-gold/40 bg-[#111111] p-8 text-center shadow-[0_0_30px_rgba(201,170,85,0.12)]">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-gold/15 text-gold">
          <CheckCircle2 className="size-9" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-normal">Payment status</h1>
        <p className="mt-4 text-base leading-7 text-white/75">{message}</p>
        <a href="/" className="mt-8 inline-flex items-center justify-center border border-gold bg-gold px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-[#111111] transition hover:brightness-110">
          Return home
        </a>
      </div>
    </main>
  );
}
