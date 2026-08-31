import { forwardRef } from 'react';

function ChipCheck() {
  return (
    <svg
      className="sapp-chip-check"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

interface SetupOptionChipProps {
  emoji: string;
  label: string;
  selected?: boolean;
  highlighted?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
}

export const SetupOptionChip = forwardRef<HTMLButtonElement, SetupOptionChipProps>(
  function SetupOptionChip(
    { emoji, label, selected = false, highlighted = false, readOnly = false, onClick },
    ref
  ) {
    const className = `sapp-chip sapp-chip--row ${selected ? 'selected' : ''} ${
      highlighted ? 'sapp-chip--highlight' : ''
    }`;

    if (readOnly) {
      return (
        <div className={className} aria-hidden="true">
          <span className="sapp-chip-emoji">{emoji}</span>
          <span className="sapp-chip-label">{label}</span>
          {selected && <ChipCheck />}
        </div>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={className}
        aria-pressed={selected}
        onClick={onClick}
      >
        <span className="sapp-chip-emoji">{emoji}</span>
        <span className="sapp-chip-label">{label}</span>
        {selected && <ChipCheck />}
      </button>
    );
  }
);
