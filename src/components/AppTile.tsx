import { Link } from "react-router-dom";
import type { App } from "@/data/types";
import { RatingStars } from "./RatingStars";

/** Props for {@link AppTile}. */
interface AppTileProps {
  /** The app this tile represents — supplies its icon, name, price, and rating. */
  app: App;
  /**
   * The page this tile was rendered from. Threaded into the router's `state`
   * so ServiceDetails' breadcrumb can link back to the correct origin page
   * instead of always assuming one fixed parent screen.
   */
  from: "Home" | "Explore";
  /**
   * Class override for the tile's sizing, so callers embedding it in a
   * differently-shaped row/grid (Home's horizontal rows vs. Explore's grid)
   * aren't stuck with one fixed width.
   */
  className?: string;
}

/**
 * Compact clickable tile used for an app in Home's category rows and
 * Explore's grid. Purely presentational — all data comes from `app`, no
 * local state or side effects — it just links through to the app's detail page.
 */
export function AppTile({ app, from, className = "w-36 shrink-0 sm:w-40" }: AppTileProps) {
  return (
    <Link
      to={`/app/${app.id}`}
      state={{ from }}
      className={`flex flex-col gap-2 rounded-2xl bg-surface p-3 ${className}`}
    >
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
    </Link>
  );
}
