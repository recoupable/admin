"use client";

import { Button } from "@/components/ui/button";

const PAGER_BUTTON_CLASSES =
  "h-8 rounded-md border border-gray-200 px-3 text-sm dark:border-gray-700";

interface PaginationControlsProps {
  page: number;
  limit: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function PaginationControls({
  page,
  limit,
  totalCount,
  onPageChange,
  isLoading,
}: PaginationControlsProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const startRow = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const endRow = Math.min(page * limit, totalCount);

  return (
    <div className="flex items-center justify-between gap-4 px-1 py-3 text-sm">
      <div className="text-gray-600 dark:text-gray-400">
        {totalCount === 0 ? (
          "0 results"
        ) : (
          <>
            Showing <span className="font-medium">{startRow.toLocaleString()}</span>–
            <span className="font-medium">{endRow.toLocaleString()}</span> of{" "}
            <span className="font-medium">{totalCount.toLocaleString()}</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className={PAGER_BUTTON_CLASSES}
          disabled={page <= 1 || isLoading}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <span className="text-gray-600 dark:text-gray-400">
          Page <span className="font-medium">{page}</span> of {totalPages.toLocaleString()}
        </span>
        <Button
          variant="ghost"
          className={PAGER_BUTTON_CLASSES}
          disabled={page >= totalPages || isLoading}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
