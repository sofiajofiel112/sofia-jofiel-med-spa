export type PersistedFlutterwavePayment = {
  tx_ref: string;
  status: string;
  amount?: number;
  currency?: string;
  id?: number;
  customer?: {
    email?: string;
    phone_number?: string;
    name?: string;
  };
  createdAt: string;
  updatedAt: string;
};

const verifiedTransactions = new Map<string, PersistedFlutterwavePayment>();

export function storeVerifiedTransaction(
  payment: Omit<PersistedFlutterwavePayment, "createdAt" | "updatedAt">,
): PersistedFlutterwavePayment {
  const now = new Date().toISOString();
  const storedPayment: PersistedFlutterwavePayment = {
    ...payment,
    createdAt: now,
    updatedAt: now,
  };

  verifiedTransactions.set(payment.tx_ref, storedPayment);
  return storedPayment;
}

export function getVerifiedTransaction(txRef: string): PersistedFlutterwavePayment | null {
  return verifiedTransactions.get(txRef) ?? null;
}

export function hasVerifiedTransaction(txRef: string): boolean {
  return verifiedTransactions.has(txRef);
}
