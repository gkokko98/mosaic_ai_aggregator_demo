import { useState, type ReactNode } from "react";
import { readStoredSubscriptionIds, STORAGE_KEY, SubscriptionsContext } from "./useSubscriptions";

export function SubscriptionsProvider({ children }: { children: ReactNode }) {
  const [subscribedIds, setSubscribedIds] = useState<string[]>(() => readStoredSubscriptionIds());

  const subscribe = (appId: string) => {
    setSubscribedIds((current) => {
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
