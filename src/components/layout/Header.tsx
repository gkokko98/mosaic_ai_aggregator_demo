import { SearchIcon, UserIcon } from "../icons";

/**
 * Generic top header with the mosAIc wordmark and Search/Profile icon
 * buttons, shown on every page except ServiceDetails and NewsArticle (which
 * render their own hero + back button instead — see AppLayout).
 *
 * Current gap: the Search and Profile buttons below are non-functional —
 * neither has an onClick handler yet, so they're purely decorative for now.
 */
export function Header() {
  return (
    <header className="flex items-center justify-between px-4 pb-6 pt-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          mos<span className="text-accent">Ai</span>c
        </h1>
        <p className="text-sm text-accent">Your AI world, connected.</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Search"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-text-primary"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Profile"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-text-primary"
        >
          <UserIcon className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
