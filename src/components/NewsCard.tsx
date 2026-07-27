import { Link } from "react-router-dom";
import type { NewsItem } from "@/data/types";
import { CategoryBadge } from "./CategoryBadge";

/** Props for {@link NewsCard}. */
interface NewsCardProps {
  /** The article this card teases — supplies its hero image, category, title, and date. */
  item: NewsItem;
  /**
   * Class override for the card's sizing, so callers embedding it in
   * differently-shaped layouts (Home's horizontal preview row vs. the full
   * News list) aren't stuck with one fixed width.
   */
  className?: string;
}

/**
 * Clickable teaser card for a news article, reused on both Home's News
 * preview row and the full `News` list. Purely presentational — all data
 * comes from `item` — it just links through to the article's full page.
 */
export function NewsCard({ item, className = "w-56 shrink-0 sm:w-64" }: NewsCardProps) {
  return (
    <Link
      to={`/news/${item.id}`}
      className={`relative flex h-40 flex-col justify-end overflow-hidden rounded-2xl drop-shadow-[0_0_5px_rgba(15,16,21,0.6)] ${className}`}
      style={{ backgroundImage: item.image, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute left-2.5 top-2.5">
        <CategoryBadge category={item.category} />
      </div>
      <div className="flex flex-col gap-2 rounded-b-2xl border-t border-[rgba(30,56,70,0.4)] bg-[rgba(11,35,44,0.4)] px-2.5 pb-3 pt-2 backdrop-blur-[2px]">
        <h3 className="text-base font-bold leading-snug text-white [text-shadow:0_0_10px_rgba(15,16,21,0.6)]">
          {item.title}
        </h3>
        <p className="text-xs text-white/80 [text-shadow:0_0_10px_rgba(15,16,21,0.6)]">{item.date}</p>
      </div>
    </Link>
  );
}
