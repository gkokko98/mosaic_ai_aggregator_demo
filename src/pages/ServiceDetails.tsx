import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { apps } from "@/data/apps";
import { categories } from "@/data/categories";
import { RatingStars } from "@/components/RatingStars";
import { SubscriptionConfirmationModal } from "@/components/SubscriptionConfirmationModal";
import { getSubscriptionStatus, useSubscriptions } from "@/context/useSubscriptions";
import { ChevronLeftIcon } from "@/components/icons";

/** Every page that can link into ServiceDetails, used to render its breadcrumb. */
type From = "Home" | "Explore" | "News" | "MyPlans";

/**
 * Maps a breadcrumb origin to the route it should link back to. Kept as a
 * lookup table (rather than inline `if`/`switch`) so the breadcrumb's target
 * path can't drift out of sync with `From`'s members — adding a new origin
 * forces a corresponding path here via the `Record` type.
 */
const FROM_PATHS: Record<From, string> = {
  Home: "/",
  Explore: "/explore",
  News: "/news",
  MyPlans: "/my-plans",
};

/**
 * The App/Service Details route (`/app/:id`). Shows one app's full detail
 * view — hero, breadcrumb, rating, a Subscribe/Renew/Launch CTA, description,
 * and a screenshots carousel (real images where `app.screenshots` is set,
 * placeholder boxes otherwise) — and drives the subscribe/renew confirmation
 * flow shared with {@link WideAppCard}.
 */
export function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const app = apps.find((a) => a.id === id);
  const { isSubscribed, subscribe } = useSubscriptions();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!app) {
    return <p className="pt-16 text-center text-sm text-text-secondary">App not found.</p>;
  }

  const categoryLabel = categories.find((c) => c.id === app.category)?.label ?? app.category;
  // Router state is the only place `from` can arrive from (there's no query
  // param/URL segment for it), so it's read defensively and defaults to
  // "Explore" for any direct visit/reload that has no navigation state at all.
  const from = (location.state as { from?: From } | null)?.from ?? "Explore";
  const fromPath = FROM_PATHS[from];

  // Same three-way status derivation as WideAppCard.tsx (duplicated rather
  // than shared, since each site is the only consumer of its own status
  // value and there's no shared hook for it yet): not subscribed at all →
  // "subscribe"; subscribed but the mock backend reports it expired →
  // "renew"; subscribed and active → "launch".
  const status = !isSubscribed(app.id)
    ? "subscribe"
    : getSubscriptionStatus(app.id) === "expired"
      ? "renew"
      : "launch";

  return (
    <div className="flex flex-col pb-2">
      <div
        className="relative -mx-4 h-60 shrink-0 bg-surface"
        style={{ backgroundImage: app.image, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <button
          type="button"
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-accent-dark bg-accent-dark/60 text-white shadow-[0_0_10px_3px_rgba(15,16,21,0.6)] backdrop-blur-sm"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <span className="absolute bottom-6 right-6 rounded-full border border-accent-dark bg-accent-dark/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-[0_0_10px_3px_rgba(15,16,21,0.6)] backdrop-blur-sm">
          {app.price}
        </span>
      </div>

      <nav aria-label="Breadcrumb" className="mt-4 flex items-center justify-center text-xs text-text-secondary">
        <Link to={fromPath} className="hover:text-text-primary">
          {from}
        </Link>
        <span>&gt;</span>
        <span>{categoryLabel}</span>
        <span>&gt;</span>
        <span className="font-semibold text-text-primary">{app.name}</span>
      </nav>

      <div className="mt-3">
        <h1 className="text-center text-2xl font-bold text-text-primary">{app.name}</h1>
        <span className="mt-2 flex items-center justify-center gap-2">
          <span className="h-1 w-8 rounded-full bg-accent" />
          <span className="h-1 w-1 rounded-full bg-accent" />
        </span>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1">
        <RatingStars rating={app.rating} />
        <span className="text-xs text-text-secondary">{app.ratingsCount} ratings</span>
      </div>

      <button
        type="button"
        onClick={() => {
          // "Launch" has no confirmation step — the modal is only for the
          // subscribe/renew commitment, not for re-entering an app you already pay for.
          if (status !== "launch") setIsModalOpen(true);
        }}
        className="mt-5 w-full rounded-full border border-accent-dark bg-accent-dark/60 py-3 text-base font-bold uppercase tracking-wide text-white"
      >
        {status === "subscribe" ? "Subscribe" : status === "renew" ? "Renew" : "Launch"}
      </button>

      <p className="mt-2 text-center text-sm text-text-secondary">{app.description}</p>

      <div className="mt-6 flex gap-4 overflow-x-auto scrollbar-none pb-1">
        {app.screenshots ? (
          app.screenshots.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${app.name} screenshot ${i + 1}`}
              className="h-[320px] w-[180px] shrink-0 rounded-2xl border border-nav-border object-cover shadow-[0_0_10px_3px_rgba(15,16,21,0.6)]"
            />
          ))
        ) : (
          // Placeholder boxes standing in for real screenshot images — no
          // screenshot assets exist yet for this app (see CLAUDE.md's design-fidelity gaps).
          [0, 1, 2].map((i) => <div key={i} className="h-[320px] w-[180px] shrink-0 rounded-2xl bg-surface" />)
        )}
      </div>

      <SubscriptionConfirmationModal
        open={isModalOpen}
        appName={app.name}
        price={app.price}
        mode={status === "renew" ? "renew" : "subscribe"}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          subscribe(app.id);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
