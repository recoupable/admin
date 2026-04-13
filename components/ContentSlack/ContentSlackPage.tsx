"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/Sandboxes/PageBreadcrumb";
import ApiDocsLink from "@/components/ApiDocs/ApiDocsLink";
import { useContentSlackTags } from "@/hooks/useContentSlackTags";
import ContentSlackTable from "@/components/ContentSlack/ContentSlackTable";
import ContentSlackStats from "@/components/ContentSlack/ContentSlackStats";
import PeriodSelector from "@/components/Admin/PeriodSelector";
import AdminLineChart from "@/components/Admin/AdminLineChart";
import TableSkeleton from "@/components/Sandboxes/TableSkeleton";
import ChartSkeleton from "@/components/PrivyLogins/ChartSkeleton";
import { getTagsByDate } from "@/lib/coding-agent/getTagsByDate";
import type { AdminPeriod } from "@/types/admin";

export default function ContentSlackPage() {
  const [period, setPeriod] = useState<AdminPeriod>("all");
  const { data, isLoading, error } = useContentSlackTags(period);

  const tagsByDate = data
    ? getTagsByDate(
        data.tags.map((t) => ({
          ...t,
          pull_requests: t.video_links,
        })),
      )
    : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <PageBreadcrumb current="Content Agent" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Content Agent Usage
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Slack tags to the Content Agent, grouped by time period.
          </p>
        </div>
        <ApiDocsLink path="admins/content-slack-tags" />
      </div>

      <div className="mb-6 flex items-center gap-4">
        <PeriodSelector period={period} onPeriodChange={setPeriod} />
        {data && <ContentSlackStats data={data} />}
      </div>

      {isLoading && (
        <>
          <ChartSkeleton />
          <TableSkeleton columns={["User", "Timestamp", "Prompt", "Videos"]} />
        </>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error instanceof Error ? error.message : "Failed to load Content Agent tags"}
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
            title="Tags & Videos Over Time"
            data={tagsByDate.map((d) => ({ date: d.date, count: d.count }))}
            label="Tags"
            secondLine={{
              data: tagsByDate.map((d) => ({ date: d.date, count: d.pull_request_count })),
              label: "Tags with Videos",
            }}
          />
          <ContentSlackTable tags={data.tags} />
        </>
      )}
    </main>
  );
}
