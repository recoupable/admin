"use client";

import type { TaskRun } from "@/types/sandbox";

interface TaskRunsTableProps {
  runs: TaskRun[];
}

function statusBadge(status: string) {
  const colors: Record<string, string> = {
    COMPLETED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    FAILED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    EXECUTING: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    QUEUED: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    WAITING_FOR_DEPLOY: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    CANCELED: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    CRASHED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };
  const cls = colors[status] ?? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
}

function duration(run: TaskRun): string {
  if (!run.startedAt) return "—";
  const end = run.finishedAt ? new Date(run.finishedAt) : new Date();
  const ms = end.getTime() - new Date(run.startedAt).getTime();
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.floor(ms / 60_000)}m ${Math.floor((ms % 60_000) / 1000)}s`;
}

export default function TaskRunsTable({ runs }: TaskRunsTableProps) {
  if (runs.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
        No task runs found for this account.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Task</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Status</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Started</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Duration</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Run ID</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {runs.map((run) => (
            <tr key={run.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                {run.taskIdentifier}
              </td>
              <td className="px-4 py-3">{statusBadge(run.status)}</td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {run.startedAt
                  ? new Date(run.startedAt).toLocaleString()
                  : new Date(run.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {duration(run)}
              </td>
              <td className="px-4 py-3 text-gray-400 dark:text-gray-500 font-mono text-xs">
                {run.id}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
