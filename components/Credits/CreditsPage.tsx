"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/Sandboxes/PageBreadcrumb";
import ApiDocsLink from "@/components/ApiDocs/ApiDocsLink";
import PeriodSelector from "@/components/Admin/PeriodSelector";
import CreditsTableContainer from "./CreditsTableContainer";
import type { AdminPeriod } from "@/types/admin";

export default function CreditsPage() {
  const [period, setPeriod] = useState<AdminPeriod>("monthly");

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <PageBreadcrumb current="Credits" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Credits
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Per-account credit usage. Expand a row to drill into individual usage events.
          </p>
        </div>
        <ApiDocsLink path="admins/credits-rollup" />
      </div>

      <div className="mb-4 flex items-center gap-4">
        <PeriodSelector period={period} onPeriodChange={setPeriod} />
      </div>

      <CreditsTableContainer period={period} />
    </main>
  );
}
