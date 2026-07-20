import type { Category } from "./types";

/**
 * Drives homepage/Explore section rendering: `Home.tsx` maps over this list
 * and filters `apps` by each category's `id`, so adding a category here (plus
 * having at least one app/news item reference it) is all it takes to create
 * a new homepage section — no component changes needed.
 */
export const categories: Category[] = [
  { id: "ai-tools", label: "AI Tools" },
  { id: "health", label: "Health" },
  { id: "education", label: "Education" },
  { id: "kids", label: "Kids" },
];
