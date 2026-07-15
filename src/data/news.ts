import type { NewsItem } from "./types";

// `image` is a CSS gradient placeholder standing in for real Figma artwork/photography.
export const news: NewsItem[] = [
  {
    id: "ai-nutrition-science",
    title: "How AI makes nutrition science accessible",
    category: "health",
    image: "linear-gradient(135deg, #92400e 0%, #451a03 100%)",
    date: "12 Jun 2026",
  },
  {
    id: "algorithm-bedtime-stories",
    title: "Once upon an algorithm: AI stories kids actually love",
    category: "kids",
    image: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)",
    date: "10 Jun 2026",
  },
  {
    id: "ai-tutors-classroom",
    title: "Why AI tutors are showing up in every classroom",
    category: "education",
    image: "linear-gradient(135deg, #164e63 0%, #0e7490 100%)",
    date: "6 Jun 2026",
  },
  {
    id: "generative-tools-creators",
    title: "The generative tools creators can't stop using",
    category: "ai-tools",
    image: "linear-gradient(135deg, #6d28d9 0%, #db2777 100%)",
    date: "2 Jun 2026",
  },
];
