"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/Sandboxes/PageBreadcrumb";
import ApiDocsLink from "@/components/ApiDocs/ApiDocsLink";
import { useAgentSignups } from "@/hooks/useAgentSignups";
import AgentSignupsTable from "@/components/AgentSignups/AgentSignupsTable";
import AgentSignupsStats from "@/components/AgentSignups/AgentSignupsStats";
import PeriodSelector from "@/components/Admin/PeriodSelector";
import AdminLineChart from "@/components/Admin/AdminLineChart";
import AdminPieChart from "@/components/Admin/AdminPieChart";
import TableSkeleton from "@/components/Sandboxes/TableSkeleton";
import ChartSkeleton from "@/components/PrivyLogins/ChartSkeleton";
import { getSignupsByDate } from "@/lib/agent-signups/getSignupsByDate";
import { getSignupsByEmail } from "@/lib/agent-signups/getSignupsByEmail";
import type { AdminPeriod } from "@/types/admin";

export default function AgentSignupsPage() {
  const [period, setPeriod] = useState<AdminPeriod>("all");
  const { data, isLoading, error } = useAgentSignups(period);

  const signupsByDate = data ? getSignupsByDate(data.signups) : [];
  const signupsByEmail = data ? getSignupsByEmail(data.signups) : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <PageBreadcrumb current="Agent Sign-Ups" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Agent Sign-Ups
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            API key sign-ups from AI agents, grouped by time period.
          </p>
        </div>
        <ApiDocsLink path="admins/agent-signups" />
      </div>

      <div className="mb-6 flex items-center gap-4">
        <PeriodSelector period={period} onPeriodChange={setPeriod} />
        {data && <AgentSignupsStats data={data} />}
      </div>

      {isLoading && (
        <>
          <ChartSkeleton />
          <TableSkeleton columns={["Email", "Key Name", "Created At"]} />
        </>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error instanceof Error ? error.message : "Failed to load agent sign-ups"}
        </div>
      )}

      {!isLoading && !error && data && data.signups.length === 0 && (
        <div className="flex items-center justify-center py-12 text-sm text-gray-400">
          No agent sign-ups found for this period.
        </div>
      )}

      {!isLoading && !error && data && data.signups.length > 0 && (
        <>
          <AdminLineChart
            title="Agent Sign-Ups Over Time"
            data={signupsByDate.map((d) => ({ date: d.date, count: d.count }))}
            label="Sign-Ups"
          />
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <AdminPieChart title="Sign-Ups by Email" data={signupsByEmail} />
          </div>
          <AgentSignupsTable signups={data.signups} />
        </>
      )}
    </main>
  );
}
