import { useState } from "react";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";

import { Button } from "@/components/ui/button";

type CheckoutButtonProps = {
  amount: number;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  orderId?: string;
  onPaymentStart: (txRef: string) => void;
};

export default function PristinumDynCheckout({
  amount,
  customerEmail,
  customerName,
  customerPhone,
  orderId,
  onPaymentStart,
}: CheckoutButtonProps) {
  const [txRef] = useState(
    () => `PRISTINUM-${orderId || `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`}`,
  );
  const publicKey = import.meta.env["VITE_FLUTTERWAVE_PUBLIC_KEY"];
  const subaccountId = import.meta.env["VITE_PRISTINUM_DYN_SUBACCOUNT_ID"];

  const handleFlutterwavePayment = useFlutterwave({
    public_key: publicKey ?? "",
    tx_ref: txRef,
    amount,
    currency: "NGN",
    payment_options: "card,banktransfer,ussd",
    customer: {
      email: customerEmail,
      phone_number: customerPhone,
      name: customerName,
    },
    subaccounts: [{ id: subaccountId ?? "" }],
    customizations: {
      title: "Pristinum Dyn by Sofia Jofiel",
      description: "Payment for treatment",
      logo: "https://checkout.flutterwave.com/v3/hosted/pay/img/logo.png",
    },
  });

  function startPayment() {
    if (!publicKey || !subaccountId) {
      window.alert("Flutterwave checkout is not configured. Add the public key and Pristinum Dyn subaccount ID.");
      return;
    }

    onPaymentStart(txRef);
    let navigatedToStatusPage = false;
    const openStatusPage = (status: string, reference: string) => {
      if (navigatedToStatusPage) return;
      navigatedToStatusPage = true;
      window.location.assign(
        `/booking-success?status=${encodeURIComponent(status)}&tx_ref=${encodeURIComponent(reference)}`,
      );
    };

    handleFlutterwavePayment({
      callback: (response) => {
        closePaymentModal();
        const status = response.status || "failed";
        const reference = response.tx_ref || txRef;
        openStatusPage(status, reference);
      },
      onClose: () => {
        openStatusPage("pending", txRef);
      },
    });
  }

  return (
    <Button
      type="button"
      className="h-11 flex-1 rounded-none px-5 uppercase"
      onClick={startPayment}
    >
      Pay Now (Pristinum Dyn)
    </Button>
  );
}
