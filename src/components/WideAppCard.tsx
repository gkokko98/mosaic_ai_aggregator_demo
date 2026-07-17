import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { App } from "@/data/types";
import { categories } from "@/data/categories";
import { getSubscriptionStatus, useSubscriptions } from "@/context/useSubscriptions";
import { RatingStars } from "./RatingStars";
import { SubscriptionConfirmationModal } from "./SubscriptionConfirmationModal";

export const OUTLINE_PILL_CLASSNAME =
  "block w-full rounded-full border border-accent py-3 text-center text-sm font-bold uppercase tracking-wide text-accent";

const SOLID_PILL_CLASSNAME =
  "w-full rounded-full bg-accent py-3 text-center text-sm font-bold uppercase tracking-wide text-app-bg";

interface WideAppCardProps {
  app: App;
  from: "Home" | "Explore" | "News" | "MyPlans";
  className?: string;
}

export function WideAppCard({ app, from, className = "" }: WideAppCardProps) {
  const navigate = useNavigate();
  const { isSubscribed, subscribe } = useSubscriptions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categoryLabel = categories.find((c) => c.id === app.category)?.label ?? app.category;

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
