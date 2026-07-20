/** Props for {@link SectionHeader}. */
interface SectionHeaderProps {
  /** Heading text for the section (e.g. a category label, "News"). */
  title: string;
  /**
   * Handler for the "View all" button. Optional because not every section
   * has a dedicated listing page to link out to yet.
   */
  onViewAll?: () => void;
}

/**
 * Title + accent underline + "View all" button, used to head off each
 * horizontal-scroll row/section on Home and Explore. Purely presentational.
 */
export function SectionHeader({ title, onViewAll }: SectionHeaderProps) {
  return (
    <div className="mb-3 flex items-end justify-between">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        <span className="mt-1.5 block h-1 w-8 rounded-full bg-accent" />
      </div>
      {/* Known gap (flagged in CLAUDE.md): this renders unconditionally even
          when no onViewAll is passed, so some sections show a dead "View
          all" button. Left as-is here — fixing it is deferred to the
          design-fidelity pass. */}
      <button type="button" className="text-sm font-medium text-accent" onClick={onViewAll}>
        View all
      </button>
    </div>
  );
}
