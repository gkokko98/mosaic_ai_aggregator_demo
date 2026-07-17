# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

mosAIc ("Your AI world, connected.") is a front-end-only React app — a marketplace/hub for AI-powered apps across categories (AI Tools, Health, Education, Kids). There is no backend: all content is served from a mock data layer in `src/data/`.

Design source of truth is a Figma file: <https://www.figma.com/design/3w572EHRed5lUQQHde0fAI/AI-Super-App--mosAIc->. Reference screenshots are saved in `design_screenshots/`.

**Status: v1 is functionally complete.** All six screens — Home, Explore, News, News Article, Service Details, My Plans — are implemented and wired together end-to-end (see the Pages section below). What's *not* done yet is visual fidelity: colors, spacing, shadows, border radii, and alignment throughout were approximated by eye from static screenshots, not sampled from Figma's Inspect panel. That gap is the explicit target of the next phase.

## Next phase: design-fidelity pass

The plan is to use a Figma MCP integration to pull exact per-component specs (spacing, color, shadow, typography) directly from the Figma file above, verify them against the current implementation one screen/component at a time, and correct the Tailwind classes and `src/index.css` tokens accordingly. This is meant to be a **styling pass, not a refactor** — component structure, data flow, and behavior (routing, the subscription context, filtering logic, etc.) should stay as-is unless a visual requirement genuinely can't be met without changing them.

Known visual gaps to start from:

- All color tokens in `src/index.css` are approximated from screenshots (already flagged there) — spacing, shadow, and border-radius values hardcoded throughout components are equally approximate and haven't been cross-checked against Figma at all.
- `App.image`/`NewsItem.image` are CSS gradient strings standing in for real artwork — no real image assets exist yet.
- `ServiceDetails.tsx`'s "Screenshots" gallery is three bare `bg-surface` placeholder boxes, no real images.
- `SectionHeader.tsx`'s "View all" button always renders, even when no `onViewAll` handler is passed — a minor existing inconsistency worth resolving in this pass.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`tsc -b`) then production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run oxlint

There is no test runner configured yet.

## Architecture

**Stack**: React 19 + TypeScript, Vite, Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`), React Router v7, mock data only (no fetch/API layer).

**Design tokens** live in `src/index.css` under `@theme` — colors (`--color-app-bg`, `--color-surface`, `--color-surface-alt`, `--color-accent`, `--color-accent-muted`, `--color-star`, `--color-text-primary/secondary`), and `--font-sans` (Sora, loaded via `@fontsource/sora`). These generate Tailwind utilities directly (e.g. `--color-accent` → `bg-accent`/`text-accent`). **Treat every value here, and every hardcoded spacing/shadow/radius value in components, as a first-draft approximation** — refine them against Figma's Inspect panel during the design-fidelity pass, in one place (`src/index.css`) for colors rather than hardcoding them in components.

A custom `scrollbar-none` utility is defined via `@utility` in the same file for the horizontal-scroll card rows.

**Routing** (`src/App.tsx`): a single `AppLayout` route wraps all pages with `<Outlet />`. Routes: `/` (Home), `/explore` (Explore), `/news` (News), `/news/:id` (NewsArticle), `/my-plans` (MyPlans), `/app/:id` (ServiceDetails). The layout (`src/components/layout/AppLayout.tsx`) constrains content to `max-w-md` (mobile-first — the Figma designs are phone-width; wider viewports get a centered mobile-width column rather than a distinct desktop layout) and conditionally hides the generic `Header` via `useMatch` for `/app/:id` and `/news/:id`, since both of those pages render their own hero image + back button instead.

**Mock data** (`src/data/`): `types.ts` defines `App`, `NewsItem`, `Category`. `categories.ts` is the list of categories driving section rendering — `Home.tsx` maps over `categories` and filters `apps` by `category.id`, so **adding a new category to `categories.ts` automatically gets a new section on the homepage** as long as some app/news item references it. `apps.ts` and `news.ts` are the content arrays. `App` carries `description`, `ratingsCount`, `renewalDate` (a static display date for MyPlans' "Renews {date}"/"Expired {date}" line — not a real subscribe timestamp), and an optional `featured` flag; `NewsItem` carries `body: string[]` (paragraphs) for the full article text.

Since there are no real image assets yet, `App.image`/`NewsItem.image` hold CSS gradient strings (used directly as `backgroundImage` inline styles) rather than image URLs — swap these for real asset paths per-item as artwork becomes available, no component changes needed.

**Subscription state** (`src/context/`): this is the app's answer to having no backend. `useSubscriptions.ts` is a pure hook module exporting the raw `SubscriptionsContext`, the `useSubscriptions()` hook (`{ isSubscribed(appId), subscribe(appId) }`), and `getSubscriptionStatus(appId): "active" | "expired"`. `SubscriptionsContext.tsx` exports only the `SubscriptionsProvider` component — split into two files specifically so oxlint's Fast-Refresh rule (`only-export-components`) stays clean, since mixing a hook and a component in one file trips it. State is backed by `localStorage` (key `"mosaic:subscribed-app-ids"`), written synchronously inside the `subscribe()` setter, and the Provider is mounted once in `main.tsx` wrapping `<App />`. `getSubscriptionStatus` hardcodes MagicBite (`"magicbite"`) as permanently `"expired"` regardless of subscribe/renew actions — there's no real expiry-timer mechanism yet, so **this is intentional, not a bug** to silently "fix" during the styling pass.

**Components** (`src/components/`): see the dedicated Pages/Components sections below for the full inventory.

`src/lib/priceScheme.ts` exports `getPriceScheme()`, which parses `App.price`'s suffix (`/day`, `/week`, `/month`) into a `PriceScheme`, used by Explore's filter sheet.

`src/hooks/useCarouselIndex.ts` tracks the active dot for a horizontally-scrolling snap carousel from `scrollLeft`/`scrollWidth` — used by the featured-apps carousel on Home.

Path alias `@/*` → `src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).

## Pages

- **`Home.tsx`** (`/`) — landing screen: featured-apps snap carousel, a horizontal News preview row, and one horizontal-scroll row per category.
- **`Explore.tsx`** (`/explore`) — full app catalog as a 2-column grid, with a category + price-scheme filter bottom sheet (`ExploreFilterSheet`).
- **`News.tsx`** (`/news`) — full article list with category filter chips.
- **`NewsArticle.tsx`** (`/news/:id`) — single article: hero image with back button and category chip, title/date, body paragraphs, and a "Recommended for you" list of `WideAppCard`s for apps sharing the article's category.
- **`ServiceDetails.tsx`** (`/app/:id`) — single app's detail page: hero with back button and price chip, a breadcrumb aware of which page the user arrived from, rating, a Subscribe/Launch/Renew CTA backed by `SubscriptionConfirmationModal`, a description, and a placeholder screenshots gallery.
- **`MyPlans.tsx`** (`/my-plans`) — the subscription hub: an All/Active/Expired filter over the user's subscribed apps (via `WideAppCard`), a "Recommended for you" list of not-yet-subscribed apps (shown only under "All"), and an "Explore more" link back to `/explore`.

## Reusable components

- **`FeaturedAppCard.tsx`** — large carousel card for Home's featured-apps row; links to `/app/:id`.
- **`AppTile.tsx`** — compact grid card (icon, name, price, rating) used by Home's category rows and Explore's grid; links to `/app/:id`, takes a required `from` prop for the destination breadcrumb.
- **`WideAppCard.tsx`** — wider card reused on `NewsArticle` and `MyPlans`; reads `useSubscriptions()`/`getSubscriptionStatus()` itself and renders whichever of three states applies (rating row + "Subscribe now", "Renews {date}" + outline "Launch", or "Expired {date}" + solid "Renew now") without the parent page computing anything. Exports `OUTLINE_PILL_CLASSNAME` so other places needing that same muted/bordered pill style (e.g. MyPlans' "Explore more" link) stay visually consistent.
- **`NewsCard.tsx`** — article teaser card (hero gradient, category badge, title, date) used on Home's News row and the full `News` list; links to `/news/:id`.
- **`CategoryBadge.tsx`** — small pill that looks up a category's display label from `categories.ts` by id.
- **`FilterChip.tsx`** — generic toggle-able pill button; powers both `News.tsx`'s category chips and `ExploreFilterSheet`'s category/price options.
- **`ExploreFilterSheet.tsx`** — bottom-sheet modal for Explore's category + price-scheme filters, with local draft state and Apply/Clear all actions.
- **`RatingStars.tsx`** — 0–5 star rating display (including halves) via a dimmed background row and a percentage-width-clipped filled row layered on top.
- **`SectionHeader.tsx`** — title + accent underline + "View all" button, used for Home/Explore section headings (the "View all" button currently always renders even without an `onViewAll` handler — see the known gaps above).
- **`SubscriptionConfirmationModal.tsx`** — centered confirm dialog shared by `ServiceDetails` and `WideAppCard`'s Subscribe/Renew flows; a `mode: "subscribe" | "renew"` prop swaps the body copy.
- **`icons.tsx`** — all inline SVG icons (search, user, star, the four nav icons, filter, chevron-left, close) as `SVGProps<SVGSVGElement>`-spreading components.
- **`layout/Header.tsx`, `layout/BottomNav.tsx`, `layout/AppLayout.tsx`** — the shared mobile-width shell; `AppLayout` also decides when to hide `Header` (see Routing above).
