import { apps, featuredApps } from "@/data/apps";
import { categories } from "@/data/categories";
import { news } from "@/data/news";
import { FeaturedAppCard } from "@/components/FeaturedAppCard";
import { AppTile } from "@/components/AppTile";
import { NewsCard } from "@/components/NewsCard";
import { SectionHeader } from "@/components/SectionHeader";
import { CarouselIndicator } from "@/components/CarouselIndicator";
import { useCarouselIndex } from "@/hooks/useCarouselIndex";

/**
 * The Home route (`/`). Landing screen made of three horizontal-scroll
 * sections stacked vertically: a snap-carousel of featured apps (with dot
 * indicators driven by {@link useCarouselIndex}), a News preview row, and one
 * row per category.
 *
 * The category rows are entirely data-driven: this component maps over
 * `categories` (from `src/data/categories.ts`) and filters `apps` by
 * `category.id`, skipping any category with zero matching apps. That means
 * adding a new category to `categories.ts` automatically creates a new
 * homepage section with no changes needed here, as long as some app
 * references it — see CLAUDE.md's "Mock data" section for this intentional
 * data-driven design.
 */
export function Home() {
  const { containerRef, index, onScroll } = useCarouselIndex(featuredApps.length);

  return (
    <div className="flex flex-col gap-8 pt-2">
      <section>
        <div
          ref={containerRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-none pb-1"
        >
          {featuredApps.map((app, i) => (
            <div key={app.id} className="snap-start">
              <FeaturedAppCard app={app} isActive={i === index} />
            </div>
          ))}
        </div>
        <div className="mt-3">
          <CarouselIndicator count={featuredApps.length} activeIndex={index} />
        </div>
      </section>

      <section>
        <SectionHeader title="News" />
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {categories.map((category) => {
        const categoryApps = apps.filter((app) => app.category === category.id);
        // Skip categories with no matching apps rather than rendering an
        // empty section header — this is what makes new categories "just
        // appear" once content references them, and disappear again if that
        // content is removed.
        if (categoryApps.length === 0) return null;

        return (
          <section key={category.id}>
            <SectionHeader title={category.label} />
            <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
              {categoryApps.map((app) => (
                <AppTile key={app.id} app={app} from="Home" />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
