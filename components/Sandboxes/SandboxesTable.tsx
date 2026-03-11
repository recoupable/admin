"use client";

import { useState } from "react";
import type { AccountSandboxRow } from "@/types/sandbox";

type SortKey = "total_sandboxes" | "last_created_at";
type SortDir = "asc" | "desc";

interface SandboxesTableProps {
  accounts: AccountSandboxRow[];
}

/**
 * Renders a table of accounts and their sandbox statistics.
 * Supports interactive column sorting for Total Sandboxes and Last Created.
 * Default sort: Last Created descending (most recent first).
 *
 * @param accounts - Array of account sandbox rows from the admin API
 */
export default function SandboxesTable({ accounts }: SandboxesTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("last_created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir(d => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const sorted = [...accounts].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "total_sandboxes") {
      cmp = a.total_sandboxes - b.total_sandboxes;
    } else {
      cmp =
        new Date(a.last_created_at).getTime() -
        new Date(b.last_created_at).getTime();
    }
    return sortDir === "desc" ? -cmp : cmp;
  });

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) {
      return <span className="ml-1 text-gray-300 dark:text-gray-600">↕</span>;
    }
    return (
      <span className="ml-1 text-gray-700 dark:text-gray-300">
        {sortDir === "desc" ? "↓" : "↑"}
      </span>
    );
  }

  const thClass =
    "px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400";
  const btnClass =
    "flex items-center gap-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors";

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className={thClass}>
              Account Email
            </th>
            <th scope="col" className={thClass}>
              <button
                type="button"
                className={btnClass}
                onClick={() => handleSort("total_sandboxes")}
                aria-label="Sort by total sandboxes"
              >
                Total Sandboxes
                <SortIcon col="total_sandboxes" />
              </button>
            </th>
            <th scope="col" className={thClass}>
              <button
                type="button"
                className={btnClass}
                onClick={() => handleSort("last_created_at")}
                aria-label="Sort by last created"
              >
                Last Created
                <SortIcon col="last_created_at" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {sorted.map(row => (
            <tr
              key={row.account_id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                {row.account_email ?? (
                  <span className="text-gray-400 dark:text-gray-500">
                    {row.account_id}
                  </span>
                )}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                {row.total_sandboxes}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {new Date(row.last_created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
