"use client";

import type { TaskRun } from "@/types/sandbox";
import { getStatusBadgeColor } from "@/lib/tasks/getStatusBadgeColor";
import { formatRunDuration } from "@/lib/tasks/formatRunDuration";

interface TaskRunsTableProps {
  runs: TaskRun[];
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
              <td className="px-4 py-3">
                <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${getStatusBadgeColor(run.status)}`}>
                  {run.status}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {run.startedAt
                  ? new Date(run.startedAt).toLocaleString()
                  : new Date(run.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {formatRunDuration(run)}
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
