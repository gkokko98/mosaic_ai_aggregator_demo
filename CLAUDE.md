# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

mosAIc ("Your AI world, connected.") is a front-end-only React app — a marketplace/hub for AI-powered apps across categories (AI Tools, Health, Education, Kids). There is no backend: all content is served from a mock data layer in `src/data/`.

Design source of truth is a Figma file: https://www.figma.com/design/3w572EHRed5lUQQHde0fAI/AI-Super-App--mosAIc-. Reference screenshots are saved in `design_screenshots/`. Only the homepage has been designed so far — `Explore` and `My Plans` pages are placeholders pending design.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`tsc -b`) then production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run oxlint

There is no test runner configured yet.

## Architecture

**Stack**: React 19 + TypeScript, Vite, Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`), React Router v7, mock data only (no fetch/API layer).

**Design tokens** live in `src/index.css` under `@theme` — colors (`--color-app-bg`, `--color-surface`, `--color-accent`, `--color-star`, `--color-text-primary/secondary`), and `--font-sans` (Sora, loaded via `@fontsource/sora`). These generate Tailwind utilities directly (e.g. `--color-accent` → `bg-accent`/`text-accent`). **The exact hex values are approximated from screenshots, not sampled from Figma** — refine them against Figma's Inspect panel as real values become available, in one place (`src/index.css`), rather than hardcoding colors in components.

A custom `scrollbar-none` utility is defined via `@utility` in the same file for the horizontal-scroll card rows.

**Routing** (`src/App.tsx`): a single `AppLayout` route wraps all pages with `<Outlet />`. Routes: `/` (Home), `/explore`, `/news`, `/my-plans`. The layout (`src/components/layout/AppLayout.tsx`) constrains content to `max-w-md` (mobile-first — the Figma designs are phone-width; wider viewports get a centered mobile-width column rather than a distinct desktop layout).

**Mock data** (`src/data/`): `types.ts` defines `App`, `NewsItem`, `Category`. `categories.ts` is the list of categories driving section rendering — `Home.tsx` maps over `categories` and filters `apps` by `category.id`, so **adding a new category to `categories.ts` automatically gets a new section on the homepage** as long as some app/news item references it. `apps.ts` and `news.ts` are the content arrays.

Since there are no real image assets yet, `App.image`/`NewsItem.image` hold CSS gradient strings (used directly as `backgroundImage` inline styles) rather than image URLs — swap these for real asset paths per-item as artwork becomes available, no component changes needed.

**Components** (`src/components/`): `AppCard.tsx` exports two variants — `FeaturedAppCard` (large carousel card) and `AppTile` (compact grid card). `NewsCard` takes an optional `className` to resize it between the homepage's horizontal-scroll row and the full-width `News` page list. `CategoryBadge` looks up the display label from `categories.ts` by id. `RatingStars` renders a 0–5 rating (including halves) via a percentage-width overlay of filled stars on top of dimmed ones. Layout-only pieces (`Header`, `BottomNav`, `AppLayout`) live under `components/layout/`.

`src/hooks/useCarouselIndex.ts` tracks the active dot for a horizontally-scrolling snap carousel from `scrollLeft`/`scrollWidth` — used by the featured-apps carousel on Home.

Path alias `@/*` → `src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).
