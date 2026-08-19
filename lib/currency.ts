export function formatPrice(amount: number, currency: string = "NGN"): string {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return `₦${new Intl.NumberFormat("en-NG", {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

export function formatPriceToUSD(amountInNGN: number, exchangeRate: number = 1550): string {
  const usdAmount = Math.round(amountInNGN / exchangeRate);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usdAmount);
}
