"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/Sandboxes/PageBreadcrumb";
import ApiDocsLink from "@/components/ApiDocs/ApiDocsLink";
import { useSlackTags } from "@/hooks/useSlackTags";
import { useCodingPrStatus } from "@/hooks/useCodingPrStatus";
import SlackTagsTable from "./SlackTagsTable";
import AdminLineChart from "@/components/Admin/AdminLineChart";
import { getTagsByDate } from "@/lib/coding-agent/getTagsByDate";
import PeriodSelector from "@/components/Admin/PeriodSelector";
import TableSkeleton from "@/components/Sandboxes/TableSkeleton";
import ChartSkeleton from "@/components/PrivyLogins/ChartSkeleton";
import type { AdminPeriod } from "@/types/admin";

export default function CodingAgentSlackTagsPage() {
  const [period, setPeriod] = useState<AdminPeriod>("all");
  const { data, isLoading, error } = useSlackTags(period);
  const { data: mergedPrUrls } = useCodingPrStatus(data?.tags);

  const tagsByDate = data ? getTagsByDate(data.tags, mergedPrUrls) : [];
  const totalMergedPrs = mergedPrUrls?.size ?? 0;

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
        <PeriodSelector period={period} onPeriodChange={setPeriod} />
        {data && (
          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{data.total}</span>{" "}
              {data.total === 1 ? "tag" : "tags"}
            </span>
            <span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{data.tags_with_pull_requests}</span>{" "}
              with PRs
            </span>
            <span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{data.total_pull_requests}</span>{" "}
              total PRs
            </span>
            <span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{totalMergedPrs}</span>{" "}
              merged PRs
            </span>
          </div>
        )}
      </div>

      {isLoading && (
        <>
          <ChartSkeleton />
          <TableSkeleton columns={["Tagged By", "Prompt", "Channel", "Pull Requests", "Timestamp"]} />
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
          <AdminLineChart
            title="Tags & Pull Requests Over Time"
            data={tagsByDate.map((d) => ({ date: d.date, count: d.count }))}
            label="Tags"
            secondLine={{
              data: tagsByDate.map((d) => ({ date: d.date, count: d.pull_request_count })),
              label: "Tags with PRs",
            }}
            thirdLine={
              mergedPrUrls
                ? {
                    data: tagsByDate.map((d) => ({ date: d.date, count: d.merged_pr_count })),
                    label: "PRs Merged",
                    color: "#22863a",
                  }
                : undefined
            }
          />
          <SlackTagsTable tags={data.tags} mergedPrUrls={mergedPrUrls} />
        </>
      )}
    </main>
  );
}
