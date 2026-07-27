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
      <div className="relative mx-auto flex w-full max-w-md flex-col gap-8 rounded-t-2xl border border-nav-border bg-app-gradient px-6 pt-3 pb-8 shadow-[0_0_10px_3px_rgba(15,16,21,0.6)]">
        <div className="flex flex-col gap-5">
          <span className="mx-auto block h-1 w-11 rounded-full bg-accent/20" />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white">Filters</h2>
                <button type="button" className="text-sm font-bold text-accent-dark" onClick={clearAll}>
                  Clear all
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1 w-8 bg-accent" />
                <span className="h-1 w-1 bg-accent" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm text-white/80">Category</p>
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

            <div className="flex flex-col gap-3">
              <p className="text-sm text-white/80">Price scheme</p>
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
          </div>
        </div>

        <button
          type="button"
          className="self-center rounded-full border border-accent-dark bg-accent-dark/60 px-6 py-3 text-base font-bold uppercase text-white shadow-[0_0_10px_3px_rgba(15,16,21,0.6)]"
          onClick={() => onApply(draftCategories, draftScheme)}
        >
          Apply filters
        </button>
      </div>
    </div>
  );
}
