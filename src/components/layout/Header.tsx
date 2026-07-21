import logo from "@/assets/mosaic-logo.svg";
import searchIcon from "@/assets/icons/search.svg";
import profileIcon from "@/assets/icons/profile.svg";

// The exported icon assets bake in the full pill (background, border, drop
// shadow) at 58x58 with a 9px transparent shadow bleed around a 40x40 visual
// pill, so each button is laid out as a 40x40 box with the image absolutely
// centered and overflowing — this keeps flex `gap` measuring from the visual
// pill edge, matching Figma spacing, instead of the asset's padded bounds.
const ICON_BUTTON_CLASSNAME = "relative h-10 w-10 shrink-0";
const ICON_IMAGE_CLASSNAME = "absolute -inset-[9px] h-[58px] w-[58px]";

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
    <header className="flex items-center gap-3 px-6 py-[27px]">
      <div className="flex flex-1 flex-col gap-1">
        <img src={logo} alt="mosAIc" className="h-[21px] w-[108px]" />
        <p className="text-sm text-accent-dark">Your AI world, connected.</p>
      </div>
      <button type="button" aria-label="Search" className={ICON_BUTTON_CLASSNAME}>
        <img src={searchIcon} alt="" className={ICON_IMAGE_CLASSNAME} />
      </button>
      <button type="button" aria-label="Profile" className={ICON_BUTTON_CLASSNAME}>
        <img src={profileIcon} alt="" className={ICON_IMAGE_CLASSNAME} />
      </button>
    </header>
  );
}
