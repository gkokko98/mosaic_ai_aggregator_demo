import { useNavigate, useParams } from "react-router-dom";
import { news } from "@/data/news";
import { CategoryBadge } from "@/components/CategoryBadge";
import { ChevronLeftIcon } from "@/components/icons";

export function NewsArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = news.find((n) => n.id === id);

  if (!item) {
    return <p className="pt-16 text-center text-sm text-text-secondary">Article not found.</p>;
  }

  return (
    <div className="flex flex-col pb-2">
      <div
        className="relative -mx-4 h-64 shrink-0 bg-surface"
        style={{ backgroundImage: item.image, backgroundSize: "cover" }}
      >
        <button
          type="button"
          aria-label="Go back"
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
    </div>
  );
}
