"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/Sandboxes/PageBreadcrumb";
import ApiDocsLink from "@/components/ApiDocsLink";
import { usePrivyLogins } from "@/hooks/usePrivyLogins";
import PrivyLoginsTable from "@/components/PrivyLogins/PrivyLoginsTable";
import PrivyPeriodSelector from "@/components/PrivyLogins/PrivyPeriodSelector";
import PrivyLoginsStats from "@/components/PrivyLogins/PrivyLoginsStats";
import type { PrivyLoginsPeriod } from "@/types/privy";

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
        <PrivyPeriodSelector period={period} onPeriodChange={setPeriod} />
        {data && <PrivyLoginsStats data={data} />}
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
