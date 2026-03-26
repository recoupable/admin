import type { SlackTag } from "@/types/coding-agent";

export interface TagsByDateEntry {
  date: string;
  count: number;
  pull_request_count: number;
  merged_pr_count: number;
}

/**
 * Aggregates Slack tags and their associated pull requests by UTC date (YYYY-MM-DD) for charting.
 *
 * @param tags - Array of SlackTag objects
 * @param mergedPrUrls - Optional set of merged PR URLs for merged count tracking
 * @returns Array of { date, count, pull_request_count, merged_pr_count } sorted ascending by date
 */
export function getTagsByDate(tags: SlackTag[], mergedPrUrls?: Set<string>): TagsByDateEntry[] {
  const counts: Record<string, { count: number; pull_request_count: number; merged_pr_count: number }> = {};

  for (const tag of tags) {
    const date = tag.timestamp.slice(0, 10); // "YYYY-MM-DD"
    if (!counts[date]) counts[date] = { count: 0, pull_request_count: 0, merged_pr_count: 0 };
    counts[date].count += 1;
    counts[date].pull_request_count += (tag.pull_requests?.length ?? 0) > 0 ? 1 : 0;
    if (mergedPrUrls) {
      counts[date].merged_pr_count += tag.pull_requests?.some((pr) => mergedPrUrls.has(pr)) ? 1 : 0;
    }
  }

  return Object.entries(counts)
    .map(([date, { count, pull_request_count, merged_pr_count }]) => ({
      date,
      count,
      pull_request_count,
      merged_pr_count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
