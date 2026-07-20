/**
 * @fileoverview Non-component half of the app's subscription state: the
 * context object, its consumer hook, and the localStorage helpers that back
 * it. Split out of `SubscriptionsContext.tsx` (which holds only the
 * `SubscriptionsProvider` component) purely so oxlint's react-refresh rule
 * (`only-export-components`) stays clean — mixing a hook/plain functions and
 * a component in one file trips that rule.
 */

import { createContext, useContext } from "react";

/** localStorage key the list of subscribed app ids is persisted under. */
export const STORAGE_KEY = "mosaic:subscribed-app-ids";

// TEMPORARY: there is no real expiry/renewal mechanism yet — MagicBite is
// hardcoded to always render as expired once subscribed, regardless of when
// or how many times it's "renewed", until a real expiry mechanism exists.
const HARDCODED_EXPIRED_APP_IDS = ["magicbite"];

/** Whether a subscribed app should currently show as live or lapsed. */
export type SubscriptionStatus = "active" | "expired";

/**
 * Reports whether a given app's subscription should render as active or
 * expired. There's no backend to track real elapsed time against
 * `App.renewalDate`, so this is a hardcoded stand-in rather than a real
 * expiry calculation — see {@link HARDCODED_EXPIRED_APP_IDS}. Intentional,
 * not a bug to silently "fix".
 *
 * @param appId - The app to check.
 * @returns `"expired"` for the hardcoded MagicBite id, `"active"` otherwise.
 */
export function getSubscriptionStatus(appId: string): SubscriptionStatus {
  return HARDCODED_EXPIRED_APP_IDS.includes(appId) ? "expired" : "active";
}

/**
 * Reads the persisted list of subscribed app ids from localStorage. Wrapped
 * in a try/catch and validated with `Array.isArray` because the value could
 * be missing, hand-edited, or written by a stale/incompatible version of this
 * app — any of which would otherwise throw or silently misbehave elsewhere.
 *
 * @returns The stored app ids, or `[]` if nothing valid is stored.
 */
export function readStoredSubscriptionIds(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Shape of the value {@link SubscriptionsContext} provides to consumers. */
interface SubscriptionsContextValue {
  /** Whether the given app id is in the subscribed set. */
  isSubscribed: (appId: string) => boolean;
  /** Adds an app id to the subscribed set (see `SubscriptionsContext.tsx`). */
  subscribe: (appId: string) => void;
}

/**
 * The raw context object. Exported (rather than kept private) so
 * `SubscriptionsContext.tsx`'s `SubscriptionsProvider` can supply its value —
 * consumers should generally prefer {@link useSubscriptions} over reading
 * this directly, since that adds the missing-provider guard below.
 */
export const SubscriptionsContext = createContext<SubscriptionsContextValue | null>(null);

/**
 * Hook for reading subscription state/actions anywhere in the tree. Throws
 * instead of silently returning `undefined` behavior if called outside
 * `SubscriptionsProvider`, so a missing provider fails loudly at the call
 * site instead of causing a confusing downstream crash.
 *
 * @returns `{ isSubscribed, subscribe }` for the current app.
 */
export function useSubscriptions() {
  const context = useContext(SubscriptionsContext);
  if (!context) {
    throw new Error("useSubscriptions must be used within a SubscriptionsProvider");
  }
  return context;
}
