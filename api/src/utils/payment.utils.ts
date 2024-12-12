export const generateTransactionId = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 15);
  return `TXN_${timestamp}_${random}`;
};
