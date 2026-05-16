"use client";

interface ExpandToggleCellProps {
  expanded: boolean;
  onToggle: () => void;
}

export default function ExpandToggleCell({ expanded, onToggle }: ExpandToggleCellProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-label={expanded ? "Collapse events" : "Expand events"}
      className="flex h-6 w-6 items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100"
    >
      <span
        className={`inline-block transition-transform ${expanded ? "rotate-90" : ""}`}
        aria-hidden="true"
      >
        ▶
      </span>
    </button>
  );
}
