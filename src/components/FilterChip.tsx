interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

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
