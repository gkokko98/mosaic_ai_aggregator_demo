import { Link } from "react-router-dom";
import type { App } from "@/data/types";
import { CategoryBadge } from "./CategoryBadge";

export function FeaturedAppCard({ app }: { app: App }) {
  return (
    <Link
      to={`/app/${app.id}`}
      state={{ from: "Home" }}
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
    </Link>
  );
}
