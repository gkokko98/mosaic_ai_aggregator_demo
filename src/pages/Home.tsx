import { apps, featuredApps } from "@/data/apps";
import { categories } from "@/data/categories";
import { news } from "@/data/news";
import { FeaturedAppCard } from "@/components/FeaturedAppCard";
import { AppTile } from "@/components/AppTile";
import { NewsCard } from "@/components/NewsCard";
import { SectionHeader } from "@/components/SectionHeader";
import { useCarouselIndex } from "@/hooks/useCarouselIndex";

export function Home() {
  const { containerRef, index, onScroll } = useCarouselIndex(featuredApps.length);

  return (
    <div className="flex flex-col gap-8 pt-2">
      <section>
        <div
          ref={containerRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scrollbar-none pb-1"
        >
          {featuredApps.map((app) => (
            <div key={app.id} className="snap-start">
              <FeaturedAppCard app={app} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          {featuredApps.map((app, i) => (
            <span
              key={app.id}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-accent" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
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
        if (categoryApps.length === 0) return null;

        return (
          <section key={category.id}>
            <SectionHeader title={category.label} />
            <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
              {categoryApps.map((app) => (
                <AppTile key={app.id} app={app} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
