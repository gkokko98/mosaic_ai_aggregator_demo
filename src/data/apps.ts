import type { App } from "./types";

/**
 * @fileoverview This array (together with sibling mock data `news.ts` and
 * `categories.ts`) IS the entire "backend" for mosAIc — there's no API layer,
 * so every app tile, card, and detail page anywhere in the UI reads from
 * this single source of truth.
 */

// `image` is a CSS gradient placeholder standing in for real Figma artwork/photography.
export const apps: App[] = [
  {
    id: "pulsechat",
    name: "PulseChat",
    tagline: "Chat, create, and build with leading AI",
    category: "ai-tools",
    image: "linear-gradient(135deg, #ff6ec7 0%, #7873f5 50%, #4ade80 100%)",
    icon: "P",
    iconBg: "#f5c518",
    price: "€0.99/day",
    rating: 5,
    ratingsCount: 1042,
    description:
      "Chat with advanced AI models, generate content, and build custom workflows — all from one sleek assistant that adapts to how you work and create every day.",
    featured: true,
    renewalDate: "21 Jul 2026",
  },
  {
    id: "ufitini",
    name: "Ufitini",
    tagline: "Where fitness meets AI intelligence",
    category: "health",
    image: "linear-gradient(135deg, #7f1d1d 0%, #78350f 100%)",
    icon: "U",
    iconBg: "linear-gradient(135deg, #f472b6, #60a5fa)",
    price: "€2.99/week",
    rating: 4,
    ratingsCount: 224,
    description:
      "Your AI-powered fitness companion. Choose your trainer, follow personalised workout plans, fuel your body with healthy recipes, and find your zen with yoga all in one app.",
    featured: true,
    renewalDate: "24 Jul 2026",
  },
  {
    id: "moonkid",
    name: "Moonkid",
    tagline: "Sleep stories crafted for little dreamers",
    category: "kids",
    image: "linear-gradient(135deg, #1e3a5f 0%, #0f2942 100%)",
    icon: "M",
    iconBg: "#38bdf8",
    price: "€1.49/week",
    rating: 5,
    ratingsCount: 389,
    description:
      "Gentle AI-narrated bedtime stories crafted for little dreamers, with calming soundscapes and nightly routines that help kids drift off happy and relaxed.",
    featured: true,
    renewalDate: "23 Jul 2026",
  },
  {
    id: "magicbite",
    name: "MagicBite",
    tagline: "Scan your food, own your nutrition",
    category: "health",
    image: "linear-gradient(135deg, #365314 0%, #1a2e05 100%)",
    icon: "M",
    iconBg: "#4d7c0f",
    price: "€4.99/month",
    rating: 4.5,
    ratingsCount: 567,
    description:
      "Scan any meal with your camera and get instant nutrition breakdowns, smart recipe swaps, and personalised tips to help you eat better every single day.",
    featured: true,
    renewalDate: "18 Jun 2026",
  },
  {
    id: "aipix",
    name: "AIPix",
    tagline: "Turn your ideas into stunning visuals",
    category: "ai-tools",
    image: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    icon: "✦",
    iconBg: "linear-gradient(135deg, #a855f7, #ec4899)",
    price: "€1.49/day",
    rating: 3.5,
    ratingsCount: 134,
    description:
      "Turn simple prompts into stunning AI-generated art, illustrations, and visuals in seconds — perfect for social posts, moodboards, and creative projects.",
    renewalDate: "19 Jul 2026",
  },
  {
    id: "uwisely",
    name: "Uwisely",
    tagline: "Learn languages the smart way",
    category: "education",
    image: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
    icon: "●",
    iconBg: "#2563eb",
    price: "€3.99/month",
    rating: 3.5,
    ratingsCount: 98,
    description:
      "Learn any language the smart way with adaptive AI lessons, real conversation practice, and bite-sized daily drills that fit whenever you have a spare minute.",
    renewalDate: "10 Aug 2026",
  },
  {
    id: "mygrowth",
    name: "MyGrowth",
    tagline: "Personal growth, powered by AI coaching",
    category: "education",
    image: "linear-gradient(135deg, #facc15 0%, #4ade80 100%)",
    icon: "☄",
    iconBg: "#f8fafc",
    price: "€1.99/week",
    rating: 5,
    ratingsCount: 621,
    description:
      "Personal growth powered by AI coaching — set goals, track habits, and get daily guidance tailored to your mindset, routines, and long-term ambitions.",
    renewalDate: "24 Jul 2026",
  },
  {
    id: "uplingo",
    name: "Uplingo",
    tagline: "Master new skills in bite-sized lessons",
    category: "education",
    image: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)",
    icon: "✈",
    iconBg: "#0ea5e9",
    price: "€2.99/week",
    rating: 4,
    ratingsCount: 275,
    description:
      "Master new skills in bite-sized lessons, powered by adaptive AI that adjusts pace and difficulty to how you learn best, one quick session at a time.",
    renewalDate: "25 Jul 2026",
  },
];

/** Derived rather than a separate array: Home's carousel only needs this featured subset, and deriving it keeps the two lists from drifting out of sync. */
export const featuredApps = apps.filter((app) => app.featured);
