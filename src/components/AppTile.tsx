import type { App } from "@/data/types";
import { RatingStars } from "./RatingStars";

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
