const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(amount: number): string {
  return inr.format(amount);
}

// Empty input = not yet specified, so we default to showing the standard
// Ludhiana delivery fee rather than an unresolved "TBD".
export function isLudhianaLocality(locality: string): boolean {
  const trimmed = locality.trim().toLowerCase();
  if (trimmed.length === 0) return true;
  return trimmed.includes("ludhiana");
}
