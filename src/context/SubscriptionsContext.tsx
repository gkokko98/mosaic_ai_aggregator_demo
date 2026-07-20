/**
 * @fileoverview Component half of the app's subscription state: holds only
 * the `SubscriptionsProvider` component itself. Split out from
 * `useSubscriptions.ts` (which holds the context object, the consumer hook,
 * and the localStorage helpers) purely so oxlint's react-refresh rule
 * (`only-export-components`) stays clean — mixing a hook/plain-function
 * module and a component in one file trips that rule.
 */

import { useState, type ReactNode } from "react";
import { readStoredSubscriptionIds, STORAGE_KEY, SubscriptionsContext } from "./useSubscriptions";

/**
 * Owns the app's subscription state and supplies it to the tree via
 * {@link SubscriptionsContext}. This is the app's stand-in for a real
 * backend — there's no server to persist "who's subscribed to what", so this
 * component keeps that state in memory and mirrors it to localStorage itself.
 * Mounted once in `main.tsx`, wrapping `<App />`, so the same subscribed-ids
 * list is visible everywhere (Home, Explore, ServiceDetails, MyPlans, etc.)
 * without prop drilling.
 *
 * @param children - The app tree that should have access to subscription
 * state via {@link useSubscriptions}.
 */
export function SubscriptionsProvider({ children }: { children: ReactNode }) {
  const [subscribedIds, setSubscribedIds] = useState<string[]>(() => readStoredSubscriptionIds());

  const subscribe = (appId: string) => {
    setSubscribedIds((current) => {
      // Already subscribed: bail out with the existing array before touching
      // localStorage at all, so re-subscribing to the same app is a no-op
      // rather than a redundant (if harmless) write on every call.
      if (current.includes(appId)) return current;
      const next = [...current, appId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isSubscribed = (appId: string) => subscribedIds.includes(appId);

  return (
    <SubscriptionsContext.Provider value={{ isSubscribed, subscribe }}>
      {children}
    </SubscriptionsContext.Provider>
  );
}
