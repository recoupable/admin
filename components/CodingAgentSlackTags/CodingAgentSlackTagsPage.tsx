"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/Sandboxes/PageBreadcrumb";
import ApiDocsLink from "@/components/ApiDocs/ApiDocsLink";
import { useSlackTags } from "@/hooks/useSlackTags";
import SlackTagsTable from "./SlackTagsTable";
import SlackTagsChart from "./SlackTagsChart";
import PrivyPeriodSelector from "@/components/PrivyLogins/PrivyPeriodSelector";
import TableSkeleton from "@/components/Sandboxes/TableSkeleton";
import ChartSkeleton from "@/components/PrivyLogins/ChartSkeleton";
import type { SlackTagsPeriod } from "@/types/coding-agent";
import type { PrivyLoginsPeriod } from "@/types/privy";

export default function CodingAgentSlackTagsPage() {
  const [period, setPeriod] = useState<SlackTagsPeriod>("all");
  const { data, isLoading, error } = useSlackTags(period);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <PageBreadcrumb current="Coding Agent Tags" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Coding Agent Slack Tags
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Slack mentions of the Recoup Coding Agent, pulled directly from the Slack API.
          </p>
        </div>
        <ApiDocsLink path="admins/coding-agent-slack-tags" />
      </div>

      <div className="mb-6 flex items-center gap-4">
        <PrivyPeriodSelector
          period={period as PrivyLoginsPeriod}
          onPeriodChange={(p) => setPeriod(p as SlackTagsPeriod)}
        />
        {data && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-gray-100">{data.total}</span>{" "}
            {data.total === 1 ? "tag" : "tags"} found
          </div>
        )}
      </div>

      {isLoading && (
        <>
          <ChartSkeleton />
          <TableSkeleton columns={["Tagged By", "Prompt", "Channel", "Timestamp"]} />
        </>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error instanceof Error ? error.message : "Failed to load Slack tags"}
        </div>
      )}

      {!isLoading && !error && data && data.tags.length === 0 && (
        <div className="flex items-center justify-center py-12 text-sm text-gray-400">
          No tags found for this period.
        </div>
      )}

      {!isLoading && !error && data && data.tags.length > 0 && (
        <>
          <SlackTagsChart tags={data.tags} />
          <SlackTagsTable tags={data.tags} />
        </>
      )}
    </main>
  );
}
