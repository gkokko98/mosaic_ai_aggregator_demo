import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apps } from "@/data/apps";
import { getSubscriptionStatus, useSubscriptions } from "@/context/useSubscriptions";
import { OUTLINE_PILL_CLASSNAME, WideAppCard } from "@/components/WideAppCard";

type PlanFilter = "all" | "active" | "expired";

const FILTERS: { id: PlanFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "expired", label: "Expired" },
];

const EMPTY_MESSAGES: Record<PlanFilter, string> = {
  all: "You haven't subscribed to any services yet.",
  active: "No active plans.",
  expired: "No expired plans.",
};

export function MyPlans() {
  const { isSubscribed } = useSubscriptions();
  const [filter, setFilter] = useState<PlanFilter>("all");

  const subscribedApps = useMemo(() => apps.filter((app) => isSubscribed(app.id)), [isSubscribed]);
  const recommendedApps = useMemo(() => apps.filter((app) => !isSubscribed(app.id)), [isSubscribed]);

  const filteredSubscribedApps = useMemo(
    () =>
      filter === "all"
        ? subscribedApps
        : subscribedApps.filter((app) => getSubscriptionStatus(app.id) === filter),
    [subscribedApps, filter],
  );

  return (
    <div className="flex flex-col gap-3 pt-2">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">My Plans</h2>
          <span className="mt-1.5 block h-1 w-8 rounded-full bg-accent" />
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium">
          {FILTERS.map((f, i) => (
            <span key={f.id} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-text-secondary">&bull;</span>}
              <button
                type="button"
                onClick={() => setFilter(f.id)}
                className={filter === f.id ? "font-semibold text-accent" : "text-text-secondary"}
              >
                {f.label}
              </button>
            </span>
          ))}
        </div>
      </div>

      {filteredSubscribedApps.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filteredSubscribedApps.map((app) => (
            <WideAppCard key={app.id} app={app} from="MyPlans" />
          ))}
        </div>
      ) : (
        <p className="py-6 text-center text-sm text-text-secondary">{EMPTY_MESSAGES[filter]}</p>
      )}

      {filter === "all" && recommendedApps.length > 0 && (
        <div className="mt-3">
          <h2 className="text-lg font-semibold text-text-primary">Recommended for you</h2>
          <span className="mt-1.5 block h-1 w-8 rounded-full bg-accent" />
          <div className="mt-3 flex flex-col gap-3">
            {recommendedApps.map((app) => (
              <WideAppCard key={app.id} app={app} from="MyPlans" />
            ))}
          </div>
        </div>
      )}

      <Link to="/explore" className={`mt-2 ${OUTLINE_PILL_CLASSNAME}`}>
        Explore more
      </Link>
    </div>
  );
}
