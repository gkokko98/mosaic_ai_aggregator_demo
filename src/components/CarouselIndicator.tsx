/** Props for {@link CarouselIndicator}. */
interface CarouselIndicatorProps {
  /** Total number of dashes to render. */
  count: number;
  /** Index of the currently active dash. */
  activeIndex: number;
}

/**
 * Row of uniform-width dash indicators for a snap-scrolling carousel —
 * only color/opacity marks which one is active. Used below Home's
 * featured-apps carousel, driven by {@link useCarouselIndex}.
 */
export function CarouselIndicator({ count, activeIndex }: CarouselIndicatorProps) {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`h-1 w-8 transition-colors ${i === activeIndex ? "bg-accent" : "bg-accent/20"}`}
        />
      ))}
    </div>
  );
}
