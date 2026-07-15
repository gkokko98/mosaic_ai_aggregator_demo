import { categories } from "@/data/categories";
import type { CategoryId } from "@/data/types";

export function CategoryBadge({ category }: { category: CategoryId }) {
  const label = categories.find((c) => c.id === category)?.label ?? category;

  return (
    <span className="inline-flex items-center rounded-full bg-accent-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent backdrop-blur-sm">
      {label}
    </span>
  );
}
