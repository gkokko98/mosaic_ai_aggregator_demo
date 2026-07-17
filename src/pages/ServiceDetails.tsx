import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { apps } from "@/data/apps";
import { categories } from "@/data/categories";
import { RatingStars } from "@/components/RatingStars";
import { SubscriptionConfirmationModal } from "@/components/SubscriptionConfirmationModal";
import { ChevronLeftIcon } from "@/components/icons";

export function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const app = apps.find((a) => a.id === id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const state = location.state as { from?: "Home" | "Explore" | "News"; subscribed?: boolean } | null;
  // TEMPORARY: local-only state, resets on refresh by design (no persistence yet).
  // Remove this note once MyPlans introduces persisted subscription state.
  // `subscribed` can arrive pre-set via WideAppCard's own confirm flow, not just this page's.
  const [isSubscribed, setIsSubscribed] = useState(() => Boolean(state?.subscribed));

  if (!app) {
    return <p className="pt-16 text-center text-sm text-text-secondary">App not found.</p>;
  }

  const categoryLabel = categories.find((c) => c.id === app.category)?.label ?? app.category;
  const from = state?.from ?? "Explore";
  const fromPath = from === "Home" ? "/" : from === "News" ? "/news" : "/explore";

  return (
    <div className="flex flex-col pb-2">
      <div className="relative -mx-4 h-64 shrink-0 bg-surface">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/80 text-app-bg backdrop-blur-sm"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <span className="absolute bottom-4 right-4 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-app-bg">
          {app.price}
        </span>
      </div>

      <nav aria-label="Breadcrumb" className="mt-4 flex items-center gap-1.5 text-xs text-text-secondary">
        <Link to={fromPath} className="hover:text-text-primary">
          {from}
        </Link>
        <span>&gt;</span>
        <span>{categoryLabel}</span>
        <span>&gt;</span>
        <span className="font-semibold text-text-primary">{app.name}</span>
      </nav>

      <div className="mt-3">
        <h1 className="text-2xl font-bold text-text-primary">{app.name}</h1>
        <span className="mt-1.5 block h-1 w-8 rounded-full bg-accent" />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <RatingStars rating={app.rating} />
        <span className="text-xs text-text-secondary">{app.ratingsCount} ratings</span>
      </div>

      <button
        type="button"
        onClick={() => {
          if (!isSubscribed) setIsModalOpen(true);
        }}
        className="mt-5 w-full rounded-full bg-accent py-3.5 text-sm font-bold uppercase tracking-wide text-app-bg"
      >
        {isSubscribed ? "Launch" : "Subscribe"}
      </button>

      <p className="mt-5 text-center text-sm text-text-secondary">{app.description}</p>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-text-primary">Screenshots</h2>
        <span className="mt-1.5 block h-1 w-8 rounded-full bg-accent" />
        <div className="mt-3 flex gap-3 overflow-x-auto scrollbar-none pb-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-40 w-28 shrink-0 rounded-2xl bg-surface" />
          ))}
        </div>
      </div>

      <SubscriptionConfirmationModal
        open={isModalOpen}
        appName={app.name}
        price={app.price}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsSubscribed(true);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
