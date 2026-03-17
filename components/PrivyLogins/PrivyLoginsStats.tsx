import type { PrivyLoginsResponse } from "@/types/privy";

interface PrivyLoginsStatsProps {
  data: PrivyLoginsResponse;
}

export default function PrivyLoginsStats({ data }: PrivyLoginsStatsProps) {
  return (
    <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
      <span>
        <span className="font-semibold text-gray-900 dark:text-gray-100">{data.total_new}</span> new
      </span>
      <span>
        <span className="font-semibold text-gray-900 dark:text-gray-100">{data.total_active}</span> active
      </span>
      <span>
        <span className="font-semibold text-gray-900 dark:text-gray-100">{data.total}</span> total
      </span>
    </div>
  );
}
