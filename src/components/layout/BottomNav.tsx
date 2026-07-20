import { NavLink } from "react-router-dom";
import { ExploreIcon, HomeIcon, NewsIcon, PlansIcon } from "../icons";

/**
 * The four bottom tabs, in display order. Kept as a data array (rather than
 * four hand-written `NavLink`s) so adding/reordering a tab is a one-line
 * change. `end: true` on Home is required because `/` is a prefix of every
 * other route — without exact matching, `NavLink`'s active-state styling
 * would treat Home as "active" while on Explore/News/My Plans too.
 */
const items = [
  { to: "/", label: "Home", icon: HomeIcon, end: true },
  { to: "/explore", label: "Explore", icon: ExploreIcon, end: false },
  { to: "/news", label: "News", icon: NewsIcon, end: false },
  { to: "/my-plans", label: "My Plans", icon: PlansIcon, end: false },
];

/** Sticky bottom tab bar (Home/Explore/News/My Plans), rendered on every page via AppLayout. */
export function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-10 flex justify-around border-t border-white/5 bg-app-bg/95 px-2 py-2 backdrop-blur">
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-medium ${
              isActive ? "text-accent" : "text-text-secondary"
            }`
          }
        >
          <Icon className="h-5 w-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
