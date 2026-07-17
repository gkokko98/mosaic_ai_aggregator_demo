import { Link } from "react-router-dom";
import type { NewsItem } from "@/data/types";
import { CategoryBadge } from "./CategoryBadge";

interface NewsCardProps {
  item: NewsItem;
  className?: string;
}

export function NewsCard({ item, className = "w-56 shrink-0 sm:w-64" }: NewsCardProps) {
  return (
    <Link
      to={`/news/${item.id}`}
      className={`relative flex h-40 flex-col justify-end overflow-hidden rounded-2xl p-4 ${className}`}
      style={{ backgroundImage: item.image, backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div className="absolute left-3 top-3">
        <CategoryBadge category={item.category} />
      </div>
      <div className="relative">
        <h3 className="text-sm font-semibold leading-snug text-text-primary">{item.title}</h3>
        <p className="mt-1 text-xs text-text-secondary">{item.date}</p>
      </div>
    </Link>
  );
}
