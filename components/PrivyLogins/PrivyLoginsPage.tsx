"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/Sandboxes/PageBreadcrumb";
import ApiDocsLink from "@/components/ApiDocsLink";
import { usePrivyLogins } from "@/hooks/usePrivyLogins";
import PrivyLoginsTable from "@/components/PrivyLogins/PrivyLoginsTable";
import type { PrivyLoginsPeriod } from "@/types/privy";

const PERIODS: { value: PrivyLoginsPeriod; label: string }[] = [
  { value: "all", label: "All Time" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

export default function PrivyLoginsPage() {
  const [period, setPeriod] = useState<PrivyLoginsPeriod>("all");
  const { data, isLoading, error } = usePrivyLogins(period);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <PageBreadcrumb current="Privy Logins" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Privy Logins
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            User sign-ins via Privy, grouped by time period.
          </p>
        </div>
        <ApiDocsLink path="admins/privy" />
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex rounded-lg border bg-white dark:bg-gray-900 overflow-hidden">
          {PERIODS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setPeriod(value)}
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

        {data && (
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
        )}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12 text-sm text-gray-400">
          Loading logins…
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error instanceof Error ? error.message : "Failed to load Privy logins"}
        </div>
      )}

      {!isLoading && !error && data && data.logins.length === 0 && (
        <div className="flex items-center justify-center py-12 text-sm text-gray-400">
          No logins found for this period.
        </div>
      )}

      {!isLoading && !error && data && data.logins.length > 0 && (
        <PrivyLoginsTable logins={data.logins} />
      )}
    </main>
  );
}
