import type { App } from "./types";
import pulsechatImage from "@/assets/apps/pulsechat.png";
import mygrowthImage from "@/assets/apps/mygrowth.jpg";
import aipixImage from "@/assets/apps/aipix.jpg";
import uplingoImage from "@/assets/apps/uplingo.jpg";
import magicbiteImage from "@/assets/apps/magicbite.png";
import ufitiniHeroImage from "@/assets/apps/ufitini-hero.jpg";
import ufitiniScreenshot1 from "@/assets/apps/ufitini-screenshot-1.jpg";
import ufitiniScreenshot2 from "@/assets/apps/ufitini-screenshot-2.jpg";
import ufitiniScreenshot3 from "@/assets/apps/ufitini-screenshot-3.jpg";
import pulsechatLogo from "@/assets/icons/apps/pulsechat.svg";
import mygrowthLogo from "@/assets/icons/apps/mygrowth.svg";
import aipixLogo from "@/assets/icons/apps/aipix.svg";
import uplingoLogo from "@/assets/icons/apps/uplingo.svg";
import magicbiteLogo from "@/assets/icons/apps/magicbite.svg";
import ufitiniLogo from "@/assets/icons/apps/ufitini.svg";
import moonkidLogo from "@/assets/icons/apps/moonkid.svg";
import uwiselyLogo from "@/assets/icons/apps/uwisely.svg";

/**
 * @fileoverview This array (together with sibling mock data `news.ts` and
 * `categories.ts`) IS the entire "backend" for mosAIc — there's no API layer,
 * so every app tile, card, and detail page anywhere in the UI reads from
 * this single source of truth.
 */

// `image` is a CSS value used directly as `backgroundImage` — either a
// gradient placeholder standing in for real Figma artwork, or (for the 5
// featured carousel apps) a `url(...)` reference to a real downloaded asset.
export const apps: App[] = [
  {
    id: "pulsechat",
    name: "PulseChat",
    tagline: "Chat, create, and build with leading AI",
    category: "ai-tools",
    image: `url(${pulsechatImage})`,
    icon: "P",
    iconBg: "#f5c518",
    logo: pulsechatLogo,
    price: "€0.99/day",
    rating: 5,
    ratingsCount: 1042,
    description:
      "Chat with advanced AI models, generate content, and build custom workflows — all from one sleek assistant that adapts to how you work and create every day.",
    featured: true,
    renewalDate: "21 Jul 2026",
  },
  {
    id: "mygrowth",
    name: "MyGrowth",
    tagline: "Daily AI lessons for a better you",
    category: "education",
    image: `url(${mygrowthImage})`,
    icon: "☄",
    iconBg: "#f8fafc",
    logo: mygrowthLogo,
    price: "€1.99/week",
    rating: 5,
    ratingsCount: 621,
    description:
      "Personal growth powered by AI coaching — set goals, track habits, and get daily guidance tailored to your mindset, routines, and long-term ambitions.",
    featured: true,
    renewalDate: "24 Jul 2026",
  },
  {
    id: "aipix",
    name: "AIPix",
    tagline: "Your AI expert across any field",
    category: "ai-tools",
    image: `url(${aipixImage})`,
    icon: "✦",
    iconBg: "linear-gradient(135deg, #a855f7, #ec4899)",
    logo: aipixLogo,
    price: "€1.49/day",
    rating: 3.5,
    ratingsCount: 134,
    description:
      "Turn simple prompts into stunning AI-generated art, illustrations, and visuals in seconds — perfect for social posts, moodboards, and creative projects.",
    featured: true,
    renewalDate: "19 Jul 2026",
  },
  {
    id: "uplingo",
    name: "Uplingo",
    tagline: "Master any language with AI conversation",
    category: "education",
    image: `url(${uplingoImage})`,
    icon: "✈",
    iconBg: "#0ea5e9",
    logo: uplingoLogo,
    price: "€2.99/week",
    rating: 4,
    ratingsCount: 275,
    description:
      "Master new skills in bite-sized lessons, powered by adaptive AI that adjusts pace and difficulty to how you learn best, one quick session at a time.",
    featured: true,
    renewalDate: "25 Jul 2026",
  },
  {
    id: "magicbite",
    name: "MagicBite",
    tagline: "Scan your food, own your nutrition",
    category: "health",
    image: `url(${magicbiteImage})`,
    icon: "M",
    iconBg: "#4d7c0f",
    logo: magicbiteLogo,
    price: "€4.99/month",
    rating: 4.5,
    ratingsCount: 567,
    description:
      "Scan any meal with your camera and get instant nutrition breakdowns, smart recipe swaps, and personalised tips to help you eat better every single day.",
    featured: true,
    renewalDate: "18 Jun 2026",
  },
  {
    id: "ufitini",
    name: "Ufitini",
    tagline: "Where fitness meets AI intelligence",
    category: "health",
    image: `url(${ufitiniHeroImage})`,
    icon: "U",
    iconBg: "linear-gradient(135deg, #f472b6, #60a5fa)",
    logo: ufitiniLogo,
    price: "€2.99/week",
    rating: 4,
    ratingsCount: 224,
    description:
      "Your AI-powered fitness companion. Choose your trainer, follow personalised workout plans, fuel your body with healthy recipes, and find your zen with yoga all in one app.",
    renewalDate: "24 Jul 2026",
    screenshots: [ufitiniScreenshot1, ufitiniScreenshot2, ufitiniScreenshot3],
  },
  {
    id: "moonkid",
    name: "Moonkid",
    tagline: "Sleep stories crafted for little dreamers",
    category: "kids",
    image: "linear-gradient(135deg, #1e3a5f 0%, #0f2942 100%)",
    icon: "M",
    iconBg: "#38bdf8",
    logo: moonkidLogo,
    price: "€1.49/week",
    rating: 5,
    ratingsCount: 389,
    description:
      "Gentle AI-narrated bedtime stories crafted for little dreamers, with calming soundscapes and nightly routines that help kids drift off happy and relaxed.",
    renewalDate: "23 Jul 2026",
  },
  {
    id: "uwisely",
    name: "Uwisely",
    tagline: "Learn languages the smart way",
    category: "education",
    image: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
    icon: "●",
    iconBg: "#2563eb",
    logo: uwiselyLogo,
    price: "€3.99/month",
    rating: 3.5,
    ratingsCount: 98,
    description:
      "Learn any language the smart way with adaptive AI lessons, real conversation practice, and bite-sized daily drills that fit whenever you have a spare minute.",
    renewalDate: "10 Aug 2026",
  },
];

/** Derived rather than a separate array: Home's carousel only needs this featured subset, and deriving it keeps the two lists from drifting out of sync. */
export const featuredApps = apps.filter((app) => app.featured);
