/**
 * @fileoverview Parses `App.price`'s billing-cadence suffix out of its
 * formatted display string, so Explore's filter sheet can group apps by
 * cadence without a separate structured field on `App`.
 */

/** The billing cadence an app's price is charged on. */
export type PriceScheme = "day" | "week" | "month";

/**
 * Extracts the billing cadence from a formatted price string by checking its
 * suffix, since `App.price` stores one display string (e.g. "€0.99/day")
 * rather than amount and cadence as separate fields.
 *
 * @param price - A formatted price string, e.g. "€0.99/day".
 * @returns The matched cadence, or `null` if the string doesn't end in one of
 * the recognized suffixes (malformed or unrecognized input) — callers treat
 * `null` as "unfiltered/unknown" rather than throwing.
 */
export function getPriceScheme(price: string): PriceScheme | null {
  if (price.endsWith("/day")) return "day";
  if (price.endsWith("/week")) return "week";
  if (price.endsWith("/month")) return "month";
  return null;
}
