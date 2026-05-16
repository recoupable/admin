"use client";

import { useState } from "react";
import CreditsEventsTable from "./CreditsEventsTable";
import PaginationControls from "./PaginationControls";
import { useCreditsEvents } from "@/hooks/useCreditsEvents";
import type { CreditsPeriod } from "@/types/credits";

interface CreditsRowEventsProps {
  accountId: string;
  period: CreditsPeriod;
}

const EVENTS_LIMIT = 100;

export default function CreditsRowEvents({ accountId, period }: CreditsRowEventsProps) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useCreditsEvents({
    accountId,
    period,
    page,
    limit: EVENTS_LIMIT,
    enabled: true,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-6 text-sm text-gray-500">
        Loading events…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
        {error instanceof Error ? error.message : "Failed to load events"}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div>
      <CreditsEventsTable events={data.events} />
      <PaginationControls
        page={data.page}
        limit={data.limit}
        totalCount={data.total_count}
        onPageChange={setPage}
        isLoading={isFetching}
      />
    </div>
  );
}
