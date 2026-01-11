import crypto from "crypto";

export function generateSecureHash(
  payload,
  secretKey
) {
  const hashText =
    payload.addlParam1 +
    payload.addlParam2 +
    payload.aggregatorID +
    payload.amount +
    payload.currencyCode +
    payload.customerEmailID +
    payload.customerMobileNo +
    payload.customerName +
    payload.merchantId +
    payload.merchantTxnNo +
    payload.payType +
    payload.returnURL +
    payload.transactionType +
    payload.txnDate;

  return crypto
    .createHmac("sha256", secretKey)
    .update(hashText, "utf8")
    .digest("hex")
    .toLowerCase();
}
