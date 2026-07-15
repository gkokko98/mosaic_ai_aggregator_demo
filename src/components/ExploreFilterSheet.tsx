import { useEffect, useState } from "react";
import { categories } from "@/data/categories";
import type { CategoryId } from "@/data/types";
import type { PriceScheme } from "@/lib/priceScheme";
import { FilterChip } from "./FilterChip";

const PRICE_SCHEMES: { id: PriceScheme; label: string }[] = [
  { id: "day", label: "Daily" },
  { id: "week", label: "Weekly" },
  { id: "month", label: "Monthly" },
];

interface ExploreFilterSheetProps {
  open: boolean;
  selectedCategories: CategoryId[];
  priceScheme: PriceScheme | null;
  onApply: (categories: CategoryId[], priceScheme: PriceScheme | null) => void;
  onClose: () => void;
}

export function ExploreFilterSheet({
  open,
  selectedCategories,
  priceScheme,
  onApply,
  onClose,
}: ExploreFilterSheetProps) {
  const [draftCategories, setDraftCategories] = useState(selectedCategories);
  const [draftScheme, setDraftScheme] = useState(priceScheme);

  useEffect(() => {
    if (open) {
      setDraftCategories(selectedCategories);
      setDraftScheme(priceScheme);
    }
  }, [open, selectedCategories, priceScheme]);

  if (!open) return null;

  const toggleCategory = (id: CategoryId) => {
    setDraftCategories((current) =>
      current.includes(id) ? current.filter((c) => c !== id) : [...current, id],
    );
  };

  const clearAll = () => {
    setDraftCategories([]);
    setDraftScheme(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close filters"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div className="relative mx-auto w-full max-w-md rounded-t-3xl bg-surface-alt p-5 pb-6">
        <span className="mx-auto mb-4 block h-1 w-10 rounded-full bg-white/20" />

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
          <button type="button" className="text-sm font-medium text-accent" onClick={clearAll}>
            Clear all
          </button>
        </div>

        <div className="mb-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip label="All" active={draftCategories.length === 0} onClick={() => setDraftCategories([])} />
            {categories.map((category) => (
              <FilterChip
                key={category.id}
                label={category.label}
                active={draftCategories.includes(category.id)}
                onClick={() => toggleCategory(category.id)}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
            Price scheme
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip label="Any" active={draftScheme === null} onClick={() => setDraftScheme(null)} />
            {PRICE_SCHEMES.map((scheme) => (
              <FilterChip
                key={scheme.id}
                label={scheme.label}
                active={draftScheme === scheme.id}
                onClick={() => setDraftScheme(scheme.id)}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-app-bg"
          onClick={() => onApply(draftCategories, draftScheme)}
        >
          Apply filters
        </button>
      </div>
    </div>
  );
}
