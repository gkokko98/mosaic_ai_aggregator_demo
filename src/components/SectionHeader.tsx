interface SectionHeaderProps {
  title: string;
  onViewAll?: () => void;
}

export function SectionHeader({ title, onViewAll }: SectionHeaderProps) {
  return (
    <div className="mb-3 flex items-end justify-between">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        <span className="mt-1.5 block h-1 w-8 rounded-full bg-accent" />
      </div>
      <button type="button" className="text-sm font-medium text-accent" onClick={onViewAll}>
        View all
      </button>
    </div>
  );
}
