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
        className="relative -mx-4 h-60 shrink-0 overflow-hidden rounded-b-2xl bg-surface shadow-[0_0_10px_3px_rgba(15,16,21,0.6)]"
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
          className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-accent-dark bg-accent-dark/60 text-white shadow-[0_0_10px_3px_rgba(15,16,21,0.6)] backdrop-blur-sm"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <div className="absolute bottom-6 right-6">
          <CategoryBadge category={item.category} />
        </div>
      </div>

      <div className="-mx-4 px-6">
        <div className="mt-4">
          <h1 className="text-[22px] font-bold text-text-primary">{item.title}</h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="h-1 w-8 bg-accent" />
            <span className="h-1 w-1 bg-accent" />
          </div>
          <p className="mt-4 text-xs text-text-secondary">{item.date}</p>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          {item.body.map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed text-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>

        {recommendedApps.length > 0 && (
          <div className="mt-10">
            <h2 className="text-base font-bold text-text-primary">Recommended for you</h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-1 w-8 bg-accent" />
              <span className="h-1 w-1 bg-accent" />
            </div>
            <div className="mt-4 flex flex-col gap-4">
              {recommendedApps.map((app) => (
                <WideAppCard key={app.id} app={app} from="News" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
