import { useMemo, useState } from "react";
import { apps } from "@/data/apps";
import type { CategoryId } from "@/data/types";
import { getPriceScheme, type PriceScheme } from "@/lib/priceScheme";
import { AppTile } from "@/components/AppTile";
import { ExploreFilterSheet } from "@/components/ExploreFilterSheet";
import { FilterIcon } from "@/components/icons";

/**
 * The Explore route (`/explore`). Renders the full app catalog as a
 * 2-column grid, filterable by category and price scheme via
 * {@link ExploreFilterSheet}.
 */
export function Explore() {
  // "Applied" filters (below) are what the grid actually reads. They're
  // deliberately separate from ExploreFilterSheet's own internal draft
  // state, which tracks whatever the user is currently toggling inside the
  // still-open sheet. That split lets the user freely change selections
  // without the grid re-filtering on every tap — the grid only updates once
  // the user commits via Apply (see `onApply` below), and a Cancel/dismiss
  // leaves the grid showing whatever was last applied.
  const [appliedCategories, setAppliedCategories] = useState<CategoryId[]>([]);
  const [appliedScheme, setAppliedScheme] = useState<PriceScheme | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesCategory =
        appliedCategories.length === 0 || appliedCategories.includes(app.category);
      const matchesScheme = appliedScheme === null || getPriceScheme(app.price) === appliedScheme;
      return matchesCategory && matchesScheme;
    });
  }, [appliedCategories, appliedScheme]);

  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Explore</h2>
          <span className="mt-1.5 block h-1 w-8 rounded-full bg-accent" />
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm font-medium text-accent"
          onClick={() => setSheetOpen(true)}
        >
          <FilterIcon className="h-4 w-4" />
          Filters
        </button>
      </div>

      {filteredApps.length === 0 ? (
        <p className="py-16 text-center text-sm text-text-secondary">
          No apps match your filters.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredApps.map((app) => (
            <AppTile key={app.id} app={app} className="w-full" from="Explore" />
          ))}
        </div>
      )}

      <ExploreFilterSheet
        open={sheetOpen}
        selectedCategories={appliedCategories}
        priceScheme={appliedScheme}
        onApply={(categoriesFilter, scheme) => {
          // Committing the sheet's draft selections into "applied" state is
          // the one moment the grid's filters actually change.
          setAppliedCategories(categoriesFilter);
          setAppliedScheme(scheme);
          setSheetOpen(false);
        }}
        onClose={() => setSheetOpen(false)}
      />
    </div>
  );
}
