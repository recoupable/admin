"use client";

import { useAccountTaskRuns } from "@/hooks/useAccountTaskRuns";
import AccountBreadcrumb from "./AccountBreadcrumb";
import TaskRunsTable from "./TaskRunsTable";
import TableSkeleton from "@/components/Sandboxes/TableSkeleton";

const TASK_RUN_COLUMNS = ["Task", "Status", "Started", "Duration", "Run ID"];

interface AccountDetailPageProps {
  accountId: string;
}

export default function AccountDetailPage({ accountId }: AccountDetailPageProps) {
  const { data: runs, isLoading, error } = useAccountTaskRuns(accountId);

  const pulseRuns = runs?.filter(r => r.taskIdentifier === "send-pulse-task") ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <AccountBreadcrumb accountId={accountId} />

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Account Task Runs
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-mono">{accountId}</p>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Pulse Runs
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Recent Pulse email tasks for this account (tagged with account:{accountId})
            </p>
          </div>
          {!isLoading && runs && (
            <span className="text-sm text-gray-400">
              {pulseRuns.length} pulse run{pulseRuns.length !== 1 ? "s" : ""} · {runs.length} total
            </span>
          )}
        </div>

        {isLoading && <TableSkeleton columns={TASK_RUN_COLUMNS} />}

        {error && (
          <div className="py-8 text-center text-sm text-red-500">
            Failed to load task runs: {error instanceof Error ? error.message : "Unknown error"}
          </div>
        )}

        {!isLoading && !error && <TaskRunsTable runs={pulseRuns} />}

        {!isLoading && !error && runs && runs.length > pulseRuns.length && (
          <details className="mt-6">
            <summary className="cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              All task runs ({runs.length})
            </summary>
            <div className="mt-3">
              <TaskRunsTable runs={runs} />
            </div>
          </details>
        )}
      </section>
    </main>
  );
}
