import { useRef, useState } from "react";

/**
 * Tracks which card of a horizontally-scrolling, snap-aligned carousel is
 * currently active, purely from `scrollLeft`/`scrollWidth` — no per-card
 * refs or IntersectionObserver bookkeeping needed. Used by Home's
 * featured-apps carousel to drive its dot indicators.
 *
 * NOTE: the index math below assumes every card is the same width (it
 * derives a single `cardWidth` by dividing total scrollable width by
 * `count`). A carousel with unevenly-sized cards would misreport the index —
 * this hook isn't safe to reuse for that case as-is.
 *
 * @param count - Total number of cards, used to derive each card's width
 * from the container's total scrollable width. Also doubles as the
 * divide-by-zero guard when there are no cards yet.
 * @returns `containerRef` — attach to the scrollable container element.
 * `index` — the currently active card index, for rendering dot indicators.
 * `onScroll` — attach to the container's `onScroll` handler to keep `index`
 * up to date as the user scrolls.
 */
export function useCarouselIndex(count: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = () => {
    const el = containerRef.current;
    // Bail if the ref isn't attached yet, or if there are no cards — the
    // latter would otherwise divide by zero when deriving cardWidth below.
    if (!el || count === 0) return;
    // Assumes uniform card width: total scrollable width split evenly across
    // `count` cards. Holds for this carousel's fixed-width cards, but would
    // misreport the index for cards of varying widths.
    const cardWidth = el.scrollWidth / count;
    setIndex(Math.round(el.scrollLeft / cardWidth));
  };

  return { containerRef, index, onScroll };
}
