import { useMemo, useState } from "react";
import { news } from "@/data/news";
import { categories } from "@/data/categories";
import type { CategoryId } from "@/data/types";
import { NewsCard } from "@/components/NewsCard";
import { FilterChip } from "@/components/FilterChip";

/**
 * The News route (`/news`). The full article list, filterable by category
 * via a row of toggleable {@link FilterChip}s (multi-select, in addition to
 * an "All" chip that clears the selection).
 */
export function News() {
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>([]);

  // Toggles a single category in/out of the selection array: drop it if
  // already selected, otherwise append it.
  const toggleCategory = (id: CategoryId) => {
    setSelectedCategories((current) =>
      current.includes(id) ? current.filter((c) => c !== id) : [...current, id],
    );
  };

  const filteredNews = useMemo(
    () =>
      selectedCategories.length === 0
        ? news
        : news.filter((item) => selectedCategories.includes(item.category)),
    [selectedCategories],
  );

  return (
    <div className="-mx-4 flex flex-col gap-4 px-6 pt-2">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-[22px] font-bold text-text-primary">News</h2>
        <div className="flex items-center gap-2">
          <span className="h-1 w-8 bg-accent" />
          <span className="h-1 w-1 bg-accent" />
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        <FilterChip
          label="All"
          active={selectedCategories.length === 0}
          onClick={() => setSelectedCategories([])}
        />
        {categories.map((category) => (
          <FilterChip
            key={category.id}
            label={category.label}
            active={selectedCategories.includes(category.id)}
            onClick={() => toggleCategory(category.id)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {filteredNews.map((item) => (
          <NewsCard key={item.id} item={item} className="w-full" />
        ))}
      </div>
    </div>
  );
}
