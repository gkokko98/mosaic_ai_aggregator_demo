import { Link } from "react-router-dom";
import type { App } from "@/data/types";
import { categories } from "@/data/categories";

/** Props for {@link FeaturedAppCard}. */
interface FeaturedAppCardProps {
  /** The featured app to showcase — supplies its background image, category label, name, and tagline. */
  app: App;
  /**
   * Whether this is the carousel's currently-snapped card. Non-active cards
   * render at Figma's 60%-opacity dimmed state; defaults to true so a card
   * rendered outside carousel-scroll context isn't unexpectedly dimmed.
   */
  isActive?: boolean;
}

/**
 * Large hero-style card for Home's featured-apps snap carousel. Unlike the
 * compact `AppTile`, this always links back with `from: "Home"` — it only
 * ever appears on Home, so there's no need for a caller-supplied `from` prop
 * the way `AppTile` needs one to support multiple origin pages.
 */
export function FeaturedAppCard({ app, isActive = true }: FeaturedAppCardProps) {
  // Inline lookup (matching the pattern WideAppCard.tsx already uses) rather
  // than the shared CategoryBadge component — this card's label treatment
  // (translucent cyan fill, border, blur, its own shadow) is visually
  // distinct from CategoryBadge's muted-pill style used elsewhere.
  const categoryLabel = categories.find((c) => c.id === app.category)?.label ?? app.category;

  return (
    <Link
      to={`/app/${app.id}`}
      state={{ from: "Home" }}
      className={`relative flex h-60 w-[180px] shrink-0 flex-col justify-end overflow-hidden rounded-2xl drop-shadow-[0_0_5px_rgba(15,16,21,0.6)] ${isActive ? "" : "opacity-60"}`}
      style={{ backgroundImage: app.image, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute left-2.5 top-2.5 flex items-center rounded-full border border-[#069fbd] bg-[rgba(6,159,189,0.6)] px-3 py-1 shadow-[0_0_10px_0_rgba(15,16,21,0.6)] backdrop-blur-[2px]">
        <span className="text-[11px] font-semibold uppercase text-white">{categoryLabel}</span>
      </div>
      <div className="flex flex-col rounded-b-2xl border-t border-[rgba(30,56,70,0.4)] bg-[rgba(11,35,44,0.4)] px-2.5 pb-3 pt-2 backdrop-blur-[2px]">
        <h3 className="text-[22px] font-bold text-white [text-shadow:0_0_10px_rgba(15,16,21,0.6)]">{app.name}</h3>
        <p className="text-sm font-normal text-white/80">{app.tagline}</p>
      </div>
    </Link>
  );
}
