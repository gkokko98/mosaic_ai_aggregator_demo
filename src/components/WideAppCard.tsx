import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { App } from "@/data/types";
import { categories } from "@/data/categories";
import { getSubscriptionStatus, useSubscriptions } from "@/context/useSubscriptions";
import { RatingStars } from "./RatingStars";
import { SubscriptionConfirmationModal } from "./SubscriptionConfirmationModal";

/**
 * Muted/bordered pill style for the "Launch" state. Exported (rather than
 * kept private) because MyPlans.tsx's "Explore more" link reuses this exact
 * class string to stay visually consistent with WideAppCard's own outline
 * pill, even though that link has nothing to do with subscription status.
 */
export const OUTLINE_PILL_CLASSNAME =
  "block w-full rounded-full border border-accent py-3 text-center text-sm font-bold uppercase tracking-wide text-accent";

// Solid pill style for the "Subscribe now"/"Renew now" states. Not exported —
// unlike OUTLINE_PILL_CLASSNAME, nothing outside this component needs it.
const SOLID_PILL_CLASSNAME =
  "w-full rounded-full bg-accent py-3 text-center text-sm font-bold uppercase tracking-wide text-app-bg";

/** Props for {@link WideAppCard}. */
interface WideAppCardProps {
  /** The app this card represents — supplies icon, name, category, price, rating. */
  app: App;
  /**
   * The page this card was rendered from. Threaded into the router's `state`
   * so ServiceDetails' breadcrumb can link back to the correct origin page.
   */
  from: "Home" | "Explore" | "News" | "MyPlans";
  /** Class override for callers (MyPlans, NewsArticle) embedding this in different list layouts. */
  className?: string;
}

/**
 * Wider card reused on NewsArticle's "Recommended for you" list and
 * MyPlans' subscription list. Unlike AppTile, it reads subscription state
 * itself via `useSubscriptions()`/`getSubscriptionStatus()` and renders
 * whichever of three states applies (subscribe / renew / launch), so parent
 * pages don't need to compute or pass that down.
 */
export function WideAppCard({ app, from, className = "" }: WideAppCardProps) {
  const navigate = useNavigate();
  const { isSubscribed, subscribe } = useSubscriptions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categoryLabel = categories.find((c) => c.id === app.category)?.label ?? app.category;

  // Same three-way status derivation as ServiceDetails.tsx (duplicated
  // rather than shared, since each site is the only consumer of its own
  // status value and there's no shared hook for it yet): not subscribed at
  // all → "subscribe"; subscribed but the mock backend reports it expired →
  // "renew"; subscribed and active → "launch".
  const status = !isSubscribed(app.id)
    ? "subscribe"
    : getSubscriptionStatus(app.id) === "expired"
      ? "renew"
      : "launch";

  return (
    <div className={`flex flex-col gap-3 rounded-2xl bg-surface p-4 ${className}`}>
      <Link to={`/app/${app.id}`} state={{ from }} className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-bold text-app-bg"
            style={{ background: app.iconBg }}
          >
            {app.icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">{app.name}</p>
            <p className="text-xs text-accent">
              {categoryLabel} &bull; {app.price}
            </p>
          </div>
        </div>

        {status === "subscribe" ? (
          <div className="flex items-center gap-2">
            <RatingStars rating={app.rating} />
            <span className="text-xs text-text-secondary">{app.ratingsCount} ratings</span>
          </div>
        ) : (
          <p className="text-xs text-text-secondary">
            {status === "renew" ? "Expired" : "Renews"} {app.renewalDate}
          </p>
        )}
      </Link>

      {status === "launch" ? (
        <Link to={`/app/${app.id}`} state={{ from }} className={OUTLINE_PILL_CLASSNAME}>
          Launch
        </Link>
      ) : (
        <button type="button" onClick={() => setIsModalOpen(true)} className={SOLID_PILL_CLASSNAME}>
          {status === "renew" ? "Renew now" : "Subscribe now"}
        </button>
      )}

      <SubscriptionConfirmationModal
        open={isModalOpen}
        appName={app.name}
        price={app.price}
        mode={status === "renew" ? "renew" : "subscribe"}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          subscribe(app.id);
          navigate(`/app/${app.id}`, { state: { from } });
        }}
      />
    </div>
  );
}
