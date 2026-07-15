import { news } from "@/data/news";
import { NewsCard } from "@/components/NewsCard";

export function News() {
  return (
    <div className="flex flex-col gap-3 pt-2">
      <h2 className="text-lg font-semibold text-text-primary">News</h2>
      <div className="flex flex-col gap-3">
        {news.map((item) => (
          <NewsCard key={item.id} item={item} className="w-full" />
        ))}
      </div>
    </div>
  );
}
