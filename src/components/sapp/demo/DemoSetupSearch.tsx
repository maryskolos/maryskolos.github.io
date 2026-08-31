interface DemoSetupSearchProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export function DemoSetupSearch({
  value,
  onChange,
  placeholder = 'Search…',
  readOnly = false,
}: DemoSetupSearchProps) {
  if (readOnly) {
    return (
      <div className="sapp-demo-search-wrap">
        <svg
          className="sapp-demo-search-icon"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <div className="sapp-demo-search sapp-demo-search--static">{placeholder}</div>
      </div>
    );
  }

  return (
    <div className="sapp-demo-search-wrap">
      <svg
        className="sapp-demo-search-icon"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        type="search"
        className="sapp-demo-search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  );
}
