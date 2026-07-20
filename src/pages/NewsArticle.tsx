import { useNavigate, useParams } from "react-router-dom";
import { news } from "@/data/news";
import { apps } from "@/data/apps";
import { CategoryBadge } from "@/components/CategoryBadge";
import { WideAppCard } from "@/components/WideAppCard";
import { ChevronLeftIcon } from "@/components/icons";

/**
 * The News Article route (`/news/:id`). Single-article view: hero image
 * with back button and category badge, title/date, body paragraphs, and a
 * "Recommended for you" list of apps sharing the article's category.
 */
export function NewsArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = news.find((n) => n.id === id);

  // Same not-found fallback pattern as ServiceDetails.tsx: a static id that
  // doesn't resolve (bad link, stale bookmark) renders a plain message
  // instead of crashing on `item.title` etc.
  if (!item) {
    return <p className="pt-16 text-center text-sm text-text-secondary">Article not found.</p>;
  }

  // Recommends apps from the same category as the article being read, so
  // the suggestions stay relevant to what's currently on screen rather than
  // being generic/unrelated picks.
  const recommendedApps = apps.filter((app) => app.category === item.category);

  return (
    <div className="flex flex-col pb-2">
      <div
        className="relative -mx-4 h-64 shrink-0 bg-surface"
        style={{ backgroundImage: item.image, backgroundSize: "cover" }}
      >
        <button
          type="button"
          aria-label="Go back"
          // Goes back through actual browser history rather than a fixed
          // route: unlike ServiceDetails (which needs a specific known
          // origin for its breadcrumb, since an app can be reached from
          // several different pages), an article is reached from wherever
          // the user happened to be, so returning to that exact spot is the
          // more natural default here.
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/80 text-app-bg backdrop-blur-sm"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <div className="absolute bottom-4 right-4">
          <CategoryBadge category={item.category} />
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-2xl font-bold text-text-primary">{item.title}</h1>
        <span className="mt-1.5 block h-1 w-8 rounded-full bg-accent" />
        <p className="mt-2 text-xs text-text-secondary">{item.date}</p>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        {item.body.map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed text-text-secondary">
            {paragraph}
          </p>
        ))}
      </div>

      {recommendedApps.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-text-primary">Recommended for you</h2>
          <span className="mt-1.5 block h-1 w-8 rounded-full bg-accent" />
          <div className="mt-3 flex flex-col gap-3">
            {recommendedApps.map((app) => (
              <WideAppCard key={app.id} app={app} from="News" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
