type ConsultationDetails = {
  name: string;
  phone: string;
  email: string;
  treatment: string;
  note: string;
  service: string;
  price: string;
  date: string;
  time: string;
};

function getResendConfiguration() {
  const apiKey = process.env["RESEND_API_KEY"];
  const from = process.env["RESEND_FROM_EMAIL"];

  if (!apiKey || !from) {
    throw new Error("Resend email is not configured.");
  }

  return { apiKey, from };
}

export async function sendConsultationNotification(details: ConsultationDetails, txRef: string) {
  const { apiKey, from } = getResendConfiguration();
  const text = [
    "New paid consultation request",
    "",
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `Email: ${details.email}`,
    `Treatment interest: ${details.treatment}`,
    `Note: ${details.note || "None"}`,
    `Selected service: ${details.service}`,
    `Price: ${details.price}`,
    `Preferred date: ${details.date}`,
    `Preferred time: ${details.time}`,
    `Flutterwave transaction reference: ${txRef}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `consultation-${txRef}`,
    },
    body: JSON.stringify({
      from,
      to: ["info@sofiajofielmedspa.com"],
      reply_to: details.email,
      subject: `Paid consultation request — ${details.name}`,
      text,
    }),
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(error?.message || "Resend could not send the consultation email.");
  }
}
