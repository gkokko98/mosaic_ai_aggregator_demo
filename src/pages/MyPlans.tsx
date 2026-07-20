import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apps } from "@/data/apps";
import { getSubscriptionStatus, useSubscriptions } from "@/context/useSubscriptions";
// OUTLINE_PILL_CLASSNAME is exported from WideAppCard.tsx precisely so its
// "Launch" pill style can be reused here for "Explore more" without
// duplicating the class string — see the matching note in WideAppCard.tsx.
import { OUTLINE_PILL_CLASSNAME, WideAppCard } from "@/components/WideAppCard";

/** The subscription-status tabs MyPlans can filter its list by. */
type PlanFilter = "all" | "active" | "expired";

/** Drives the filter tab row; kept as data so the tabs render from one list
 * rather than three hand-written buttons. */
const FILTERS: { id: PlanFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "expired", label: "Expired" },
];

/**
 * Per-filter empty-state copy. A single generic message ("nothing here")
 * would read oddly for every tab, so each filter gets wording specific to
 * what's actually missing — no subscriptions at all vs. no active plans vs.
 * no expired plans.
 */
const EMPTY_MESSAGES: Record<PlanFilter, string> = {
  all: "You haven't subscribed to any services yet.",
  active: "No active plans.",
  expired: "No expired plans.",
};

/**
 * The My Plans route (`/my-plans`). The subscription hub: the user's
 * subscribed apps filterable by All/Active/Expired, plus a "Recommended for
 * you" list of apps they haven't subscribed to yet (shown only under "All",
 * since it's meant as a discovery nudge, not something to sift through per
 * status tab).
 */
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
