export type PriceScheme = "day" | "week" | "month";

export function getPriceScheme(price: string): PriceScheme | null {
  if (price.endsWith("/day")) return "day";
  if (price.endsWith("/week")) return "week";
  if (price.endsWith("/month")) return "month";
  return null;
}
