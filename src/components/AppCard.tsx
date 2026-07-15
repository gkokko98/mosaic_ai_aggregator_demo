import type { App } from "@/data/types";
import { CategoryBadge } from "./CategoryBadge";
import { RatingStars } from "./RatingStars";

export function FeaturedAppCard({ app }: { app: App }) {
  return (
    <div
      className="relative flex h-56 w-40 shrink-0 flex-col justify-end overflow-hidden rounded-2xl p-4 sm:w-48"
      style={{ backgroundImage: app.image, backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div className="absolute left-3 top-3">
        <CategoryBadge category={app.category} />
      </div>
      <div className="relative">
        <h3 className="text-base font-semibold text-text-primary">{app.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-text-secondary">{app.tagline}</p>
      </div>
    </div>
  );
}

export function AppTile({ app }: { app: App }) {
  return (
    <article className="flex w-36 shrink-0 flex-col gap-2 rounded-2xl bg-surface p-3 sm:w-40">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl text-base font-bold text-app-bg"
        style={{ background: app.iconBg }}
      >
        {app.icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-text-primary">{app.name}</p>
        <p className="text-xs text-accent">{app.price}</p>
      </div>
      <RatingStars rating={app.rating} />
    </article>
  );
}
