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
   * aren't stuck with one fixed width. `aspect-square` is baked into the
   * default so the tile always renders as Figma's square card regardless of
   * the width a caller gives it.
   */
  className?: string;
}

/**
 * Compact clickable tile used for an app in Home's category rows and
 * Explore's grid. Purely presentational — all data comes from `app`, no
 * local state or side effects — it just links through to the app's detail page.
 */
export function AppTile({ app, from, className = "w-36 aspect-square shrink-0 sm:w-40" }: AppTileProps) {
  return (
    <Link
      to={`/app/${app.id}`}
      state={{ from }}
      className={`flex flex-col items-center justify-between rounded-2xl border border-nav-border bg-nav-bg p-4 drop-shadow-[0_0_5px_rgba(15,16,21,0.6)] ${className}`}
    >
      <img src={app.logo} alt="" className="h-10 w-10 object-contain" />
      <div className="flex w-full flex-col items-start gap-1 text-center">
        <p className="w-full text-base font-bold text-text-primary [text-shadow:0_0_10px_rgba(15,16,21,0.6)]">
          {app.name}
        </p>
        <p className="w-full text-xs text-accent-dark">{app.price}</p>
      </div>
      <RatingStars rating={app.rating} size="md" />
    </Link>
  );
}
