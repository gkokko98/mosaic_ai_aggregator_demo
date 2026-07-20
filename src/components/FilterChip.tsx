/** Props for {@link FilterChip}. */
interface FilterChipProps {
  /** The text displayed on the pill — the filter option's display name. */
  label: string;
  /** Whether this option is currently selected, so the chip can render its accent-filled state instead of its default muted one. */
  active: boolean;
  /** Called when the chip is clicked; the parent owns the actual selection/toggle logic since what "selecting" means differs per filter (single vs. multi-select). */
  onClick: () => void;
}

/**
 * Generic toggleable pill button with no built-in notion of what it's
 * filtering — it just reflects `active` and reports clicks. Kept dumb and
 * reusable on purpose: both News's category chips and ExploreFilterSheet's
 * category/price options render the same chip, so the two features can't
 * visually drift apart even though their selection semantics differ.
 */
export function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition-colors ${
        active ? "bg-accent text-app-bg" : "bg-surface text-text-secondary"
      }`}
    >
      {label}
    </button>
  );
}
