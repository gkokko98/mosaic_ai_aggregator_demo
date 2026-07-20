import { StarIcon } from "./icons";

/** Props for {@link RatingStars}. */
interface RatingStarsProps {
  /** The rating value out of 5 — may be fractional (e.g. 3.5) to render a partial star. */
  rating: number;
}

/**
 * Renders a 0–5 star rating, including fractional/half-star values, without
 * needing a dedicated half-star icon. It layers two identical rows of star
 * icons — a dim background row and a bright foreground row clipped to the
 * rating's percentage width via `overflow-hidden` — so a fraction like 3.5
 * shows as three full stars plus one star exactly half-colored, driven
 * purely by CSS width rather than swapping in different icon variants.
 */
export function RatingStars({ rating }: RatingStarsProps) {
  // Clamp to 0–5 then convert to a 0–100% width: this percentage is what
  // gets applied to the foreground row's clipping container below, so a
  // rating of 3.5 produces a 70%-wide window that visually cuts the 4th
  // star in half rather than rendering a distinct half-star glyph.
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <div className="relative inline-flex" aria-label={`${rating} out of 5 stars`}>
      <div className="flex gap-0.5 text-white/15">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className="h-3 w-3" />
        ))}
      </div>
      <div
        className="absolute inset-0 flex gap-0.5 overflow-hidden text-star"
        style={{ width: `${percent}%` }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className="h-3 w-3 shrink-0" />
        ))}
      </div>
    </div>
  );
}
