import { NavLink } from "react-router-dom";
import homeActive from "@/assets/icons/nav/home-active.svg";
import homeInactive from "@/assets/icons/nav/home-inactive.svg";
import exploreActive from "@/assets/icons/nav/explore-active.svg";
import exploreInactive from "@/assets/icons/nav/explore-inactive.svg";
import newsActive from "@/assets/icons/nav/news-active.svg";
import newsInactive from "@/assets/icons/nav/news-inactive.svg";
import myPlansActive from "@/assets/icons/nav/my-plans-active.svg";
import myPlansInactive from "@/assets/icons/nav/my-plans-inactive.svg";

/**
 * The four bottom tabs, in display order. Kept as a data array (rather than
 * four hand-written `NavLink`s) so adding/reordering a tab is a one-line
 * change. `end: true` on Home is required because `/` is a prefix of every
 * other route — without exact matching, `NavLink`'s active-state styling
 * would treat Home as "active" while on Explore/News/My Plans too.
 */
const items = [
  { to: "/", label: "Home", activeIcon: homeActive, inactiveIcon: homeInactive, end: true },
  { to: "/explore", label: "Explore", activeIcon: exploreActive, inactiveIcon: exploreInactive, end: false },
  { to: "/news", label: "News", activeIcon: newsActive, inactiveIcon: newsInactive, end: false },
  { to: "/my-plans", label: "My Plans", activeIcon: myPlansActive, inactiveIcon: myPlansInactive, end: false },
];

/** Sticky bottom tab bar (Home/Explore/News/My Plans), rendered on every page via AppLayout. */
export function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-10 flex justify-between rounded-t-2xl border-t border-nav-border bg-nav-bg px-6 shadow-[0px_0px_10px_3px_rgba(15,16,21,0.6)]">
      {items.map(({ to, label, activeIcon, inactiveIcon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `relative flex h-[72px] w-14 flex-col items-center justify-center gap-1 text-xs ${
              isActive ? "text-accent" : "text-text-primary"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <img src={isActive ? activeIcon : inactiveIcon} alt="" className="h-6 w-6" />
              <span className={isActive ? "font-bold" : "font-normal"}>{label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 h-1 w-8 -translate-x-1/2 bg-accent" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
