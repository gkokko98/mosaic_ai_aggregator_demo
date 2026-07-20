import { useEffect, useState } from "react";
import { categories } from "@/data/categories";
import type { CategoryId } from "@/data/types";
import type { PriceScheme } from "@/lib/priceScheme";
import { FilterChip } from "./FilterChip";

// Fixed list of price-scheme filter options, in display order. Kept as a
// module-level const (rather than deriving it from data) since these three
// suffixes are the only ones `getPriceScheme()` ever parses out of `App.price`.
const PRICE_SCHEMES: { id: PriceScheme; label: string }[] = [
  { id: "day", label: "Daily" },
  { id: "week", label: "Weekly" },
  { id: "month", label: "Monthly" },
];

/** Props for {@link ExploreFilterSheet}. */
interface ExploreFilterSheetProps {
  /** Whether the sheet is shown. */
  open: boolean;
  /** Currently-applied category filters (empty = no category filter), owned by Explore.tsx. */
  selectedCategories: CategoryId[];
  /** Currently-applied price-scheme filter, or null for "any". */
  priceScheme: PriceScheme | null;
  /** Called with the draft selections when the user taps "Apply filters". */
  onApply: (categories: CategoryId[], priceScheme: PriceScheme | null) => void;
  /** Called on any dismissal path (backdrop click) without applying the draft. */
  onClose: () => void;
}

export function ExploreFilterSheet({
  open,
  selectedCategories,
  priceScheme,
  onApply,
  onClose,
}: ExploreFilterSheetProps) {
  // Local "draft" state lets the user toggle chips freely while the sheet is
  // open without affecting Explore's actual applied filters until they tap
  // "Apply filters" — closing via the backdrop discards the draft.
  const [draftCategories, setDraftCategories] = useState(selectedCategories);
  const [draftScheme, setDraftScheme] = useState(priceScheme);

  // Resyncs the draft from the applied props every time the sheet opens, so
  // reopening it always shows the last-APPLIED filters rather than whatever
  // draft was left over from a previous open-then-cancel.
  useEffect(() => {
    if (open) {
      setDraftCategories(selectedCategories);
      setDraftScheme(priceScheme);
    }
  }, [open, selectedCategories, priceScheme]);

  if (!open) return null;

  // Toggles one category chip in/out of the draft selection.
  const toggleCategory = (id: CategoryId) => {
    setDraftCategories((current) =>
      current.includes(id) ? current.filter((c) => c !== id) : [...current, id],
    );
  };

  // Resets both draft filters to their "no filter" state; the user still
  // has to tap "Apply filters" to commit this back to Explore.
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
