/**
 * @fileoverview Shared type contract for the mock data layer. Since there's
 * no backend, `App`/`NewsItem`/`Category` here are the actual schema the
 * whole UI is built against — every component reading `src/data/*.ts` relies
 * on these shapes staying accurate.
 */

/** Closed union (not a plain `string`) so `categories.ts`/`apps.ts`/`news.ts` can only reference categories that actually exist — a typo fails to compile instead of silently rendering nothing. */
export type CategoryId = "ai-tools" | "health" | "education" | "kids";

/** A homepage/Explore section grouping. Kept separate from `CategoryId` so a category can carry a human-readable `label` without every app/news item duplicating it. */
export interface Category {
  /** Matches a `CategoryId` value — the join key `App.category`/`NewsItem.category` filter on. */
  id: CategoryId;
  /** Display text for section headings and filter chips (the `id` itself is just a machine key). */
  label: string;
}

/** A single mock marketplace app/service — the full record backing its tile, card, and detail page. */
export interface App {
  /** Stable slug used as the route param in `/app/:id` and as the localStorage subscription key. */
  id: string;
  name: string;
  /** Short one-line pitch shown under the name on cards/tiles. */
  tagline: string;
  /** Which homepage/Explore section this app is filtered into. */
  category: CategoryId;
  /** CSS gradient string (not a URL) used directly as a `backgroundImage` — stand-in until real artwork exists. */
  image: string;
  /** Single glyph/letter rendered inside the app's icon badge, kept separate from `image` since the icon appears at small sizes where a full hero image wouldn't read. */
  icon: string;
  /** Background color/gradient for the icon badge — separate from `icon` so the glyph and its backdrop can be styled/swapped independently. */
  iconBg: string;
  /** Real per-app logo image (Figma-sourced), used by AppTile's icon badge. */
  logo: string;
  /** Formatted price string including its billing cadence suffix (e.g. "€0.99/day") — parsed by `getPriceScheme` rather than storing cadence as a separate field. */
  price: string;
  /** Average star rating (supports halves) driving `RatingStars`. */
  rating: number;
  /** Count of ratings backing the `rating` average — shown alongside it so a 5-star average from 3 reviews reads differently than one from 1000. */
  ratingsCount: number;
  /** Longer copy shown on the ServiceDetails page (the `tagline` is too short for that context). */
  description: string;
  /** Optional: only set on the subset of apps Home's featured carousel should surface, so most apps simply omit it rather than every app needing an explicit `featured: false`. */
  featured?: boolean;
  // Static display date for MyPlans' "Renews {date}" / "Expired {date}" line —
  // not a real subscribe timestamp, since there's no backend to record one.
  renewalDate: string;
}

/** A single mock news article — teaser fields plus the full body for its article page. */
export interface NewsItem {
  /** Stable slug used as the route param in `/news/:id`. */
  id: string;
  title: string;
  /** Which category this article is grouped/filtered under, and what drives its "Recommended for you" app matches on the article page. */
  category: CategoryId;
  /** CSS gradient string (not a URL) used directly as a `backgroundImage` — stand-in until real artwork exists. */
  image: string;
  /** Display date string shown on the teaser card and article header. */
  date: string;
  /** Article body split into paragraphs (rather than one block string) so it can be mapped straight into separate `<p>` elements. */
  body: string[];
}
