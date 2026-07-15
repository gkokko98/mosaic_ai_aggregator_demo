import type { App } from "@/data/types";
import { RatingStars } from "./RatingStars";

interface AppTileProps {
  app: App;
  className?: string;
}

export function AppTile({ app, className = "w-36 shrink-0 sm:w-40" }: AppTileProps) {
  return (
    <article className={`flex flex-col gap-2 rounded-2xl bg-surface p-3 ${className}`}>
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
