import type { NewsItem } from "./types";
import aiNutritionImage from "@/assets/news/ai-nutrition-science.jpg";
import bedtimeStoriesImage from "@/assets/news/algorithm-bedtime-stories.jpg";

/**
 * @fileoverview Mock article data — sibling to `apps.ts` in the same
 * no-backend mock layer. Powers the News list, Home's News preview row, and
 * each article's `/news/:id` page directly; there is no API layer behind it.
 */

// `image` is a CSS value used directly as `backgroundImage` — either a
// gradient placeholder standing in for real Figma artwork, or (for the two
// final articles) a `url(...)` reference to a real downloaded Figma asset.
export const news: NewsItem[] = [
  {
    id: "ai-nutrition-science",
    title: "How AI makes nutrition science accessible",
    category: "health",
    image: `url(${aiNutritionImage})`,
    date: "12 Jun 2026",
    body: [
      "For decades, precision nutrition was the preserve of elite athletes and patients with specific conditions — complex, expensive, and requiring a clinical setting. Artificial intelligence is changing that equation fundamentally.",
      "New apps now combine computer vision with vast nutritional databases to analyze a meal from a photograph in under three seconds. Models trained on millions of labelled food images can distinguish between a latte and a flat white, between basmati and jasmine rice, details that matter when you are tracking micronutrients.",
      "The most advanced platforms build adaptive meal plans that respond to real feedback loops: if you consistently skip a recommended meal, the system adjusts rather than repeating the advice. The result is a shift from generic dietary guidelines to genuinely personal nutrition, at a fraction of the cost of professional consultation, and available to anyone with a smartphone.",
    ],
  },
  {
    id: "algorithm-bedtime-stories",
    title: "Once upon an algorithm: AI stories kids actually love",
    category: "kids",
    image: `url(${bedtimeStoriesImage})`,
    date: "10 Jun 2026",
    body: [
      "The ritual of the bedtime story is one of childhood's most universal experiences, and one of the hardest for busy parents to sustain night after night. AI is stepping in not to replace that ritual but to make it infinitely sustainable.",
      "Platforms like Moonkid generate original stories on demand, calibrated to a child's age, interests, and even their emotional state that day. A child who had a difficult day at school can be offered a story about resilience; one who is excited about a birthday can hear a celebration tale.",
      "The technology pairs story generation with voice synthesis and ambient sound design, producing an experience that researchers describe as measurably calming, with children falling asleep faster than with recorded audiobooks.",
    ],
  },
];
