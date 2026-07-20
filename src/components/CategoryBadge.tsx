import { categories } from "@/data/categories";
import type { CategoryId } from "@/data/types";

/**
 * Small pill that displays a category's human-readable label, looked up from
 * `categories.ts` by id. Centralizing the lookup here (rather than having
 * each card/page resolve labels itself) means every place a category is
 * shown — Home sections, News chips, badges on cards — stays in sync if a
 * category's display label ever changes in one place.
 *
 * @param category The category id to resolve. Falls back to rendering the
 * raw id itself if it isn't found in `categories.ts`, so an unrecognized or
 * stale id degrades to something visible rather than throwing or rendering blank.
 */
export function CategoryBadge({ category }: { category: CategoryId }) {
  const label = categories.find((c) => c.id === category)?.label ?? category;

  return (
    <span className="inline-flex items-center rounded-full bg-accent-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent backdrop-blur-sm">
      {label}
    </span>
  );
}
