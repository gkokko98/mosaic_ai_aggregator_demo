import { SearchIcon, UserIcon } from "../icons";

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
