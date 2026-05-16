"use client";

import TableSkeleton from "@/components/Sandboxes/TableSkeleton";
import CreditsTable from "./CreditsTable";
import { useCreditsRollup } from "@/hooks/useCreditsRollup";
import type { CreditsPeriod } from "@/types/credits";

interface CreditsTableContainerProps {
  period: CreditsPeriod;
}

const ROLLUP_COLUMNS = ["", "Email", "Name", "Total credits (¢)", "Events"];

export default function CreditsTableContainer({ period }: CreditsTableContainerProps) {
  const { data, isLoading, error } = useCreditsRollup(period);

  if (isLoading) {
    return <TableSkeleton columns={ROLLUP_COLUMNS} />;
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
        {error instanceof Error ? error.message : "Failed to load credits rollup"}
      </div>
    );
  }

  if (!data) return null;

  if (data.rows.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-gray-400">
        No accounts with credit usage for this period.
      </div>
    );
  }

  return <CreditsTable rows={data.rows} period={period} />;
}
