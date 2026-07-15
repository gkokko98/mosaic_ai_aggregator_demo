import { StarIcon } from "./icons";

interface RatingStarsProps {
  rating: number;
}

export function RatingStars({ rating }: RatingStarsProps) {
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
