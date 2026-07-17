import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { App } from "@/data/types";
import { categories } from "@/data/categories";
import { RatingStars } from "./RatingStars";
import { SubscriptionConfirmationModal } from "./SubscriptionConfirmationModal";

interface WideAppCardProps {
  app: App;
  from: "Home" | "Explore" | "News";
  className?: string;
}

export function WideAppCard({ app, from, className = "" }: WideAppCardProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categoryLabel = categories.find((c) => c.id === app.category)?.label ?? app.category;

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

        <div className="flex items-center gap-2">
          <RatingStars rating={app.rating} />
          <span className="text-xs text-text-secondary">{app.ratingsCount} ratings</span>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="w-full rounded-full bg-accent py-3 text-center text-sm font-bold uppercase tracking-wide text-app-bg"
      >
        Subscribe now
      </button>

      <SubscriptionConfirmationModal
        open={isModalOpen}
        appName={app.name}
        price={app.price}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          navigate(`/app/${app.id}`, { state: { from, subscribed: true } });
        }}
      />
    </div>
  );
}
