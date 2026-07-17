import { createContext, useContext } from "react";

export const STORAGE_KEY = "mosaic:subscribed-app-ids";

// TEMPORARY: there is no real expiry/renewal mechanism yet — MagicBite is
// hardcoded to always render as expired once subscribed, regardless of when
// or how many times it's "renewed", until a real expiry mechanism exists.
const HARDCODED_EXPIRED_APP_IDS = ["magicbite"];

export type SubscriptionStatus = "active" | "expired";

export function getSubscriptionStatus(appId: string): SubscriptionStatus {
  return HARDCODED_EXPIRED_APP_IDS.includes(appId) ? "expired" : "active";
}

export function readStoredSubscriptionIds(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

interface SubscriptionsContextValue {
  isSubscribed: (appId: string) => boolean;
  subscribe: (appId: string) => void;
}

export const SubscriptionsContext = createContext<SubscriptionsContextValue | null>(null);

export function useSubscriptions() {
  const context = useContext(SubscriptionsContext);
  if (!context) {
    throw new Error("useSubscriptions must be used within a SubscriptionsProvider");
  }
  return context;
}
