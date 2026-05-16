"use client";

import TableSkeleton from "@/components/Sandboxes/TableSkeleton";
import CreditsTable from "./CreditsTable";
import PaginationControls from "./PaginationControls";
import { useCreditsRollup } from "@/hooks/useCreditsRollup";
import type { CreditsPeriod } from "@/types/credits";

interface CreditsTableContainerProps {
  period: CreditsPeriod;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const ROLLUP_COLUMNS = ["", "Email", "Name", "Total credits (¢)", "Events"];

export default function CreditsTableContainer({
  period,
  page,
  limit,
  onPageChange,
}: CreditsTableContainerProps) {
  const { data, isLoading, isFetching, error } = useCreditsRollup({ period, page, limit });

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

  return (
    <div>
      <CreditsTable rows={data.rows} period={period} />
      <PaginationControls
        page={data.page}
        limit={data.limit}
        totalCount={data.total_count}
        onPageChange={onPageChange}
        isLoading={isFetching}
      />
    </div>
  );
}
