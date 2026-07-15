import { useRef, useState } from "react";

export function useCarouselIndex(count: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = () => {
    const el = containerRef.current;
    if (!el || count === 0) return;
    const cardWidth = el.scrollWidth / count;
    setIndex(Math.round(el.scrollLeft / cardWidth));
  };

  return { containerRef, index, onScroll };
}
