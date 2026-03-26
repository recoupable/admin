import type { ContentSlackPeriod } from "@/types/contentSlack";

const PERIODS: { value: ContentSlackPeriod; label: string }[] = [
  { value: "all", label: "All Time" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

interface ContentSlackPeriodSelectorProps {
  period: ContentSlackPeriod;
  onPeriodChange: (period: ContentSlackPeriod) => void;
}

export default function ContentSlackPeriodSelector({
  period,
  onPeriodChange,
}: ContentSlackPeriodSelectorProps) {
  return (
    <div className="flex rounded-lg border bg-white dark:bg-gray-900 overflow-hidden">
      {PERIODS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onPeriodChange(value)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            period === value
              ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
