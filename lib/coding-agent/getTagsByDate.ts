import type { SlackTag } from "@/types/coding-agent";

export interface TagsByDateEntry {
  date: string;
  count: number;
  pull_request_count: number;
}

/**
 * Aggregates Slack tags and their associated pull requests by UTC date (YYYY-MM-DD) for charting.
 *
 * @param tags - Array of SlackTag objects
 * @returns Array of { date, count, pull_request_count } sorted ascending by date
 */
export function getTagsByDate(tags: SlackTag[]): TagsByDateEntry[] {
  const counts: Record<string, { count: number; pull_request_count: number }> = {};

  for (const tag of tags) {
    const date = tag.timestamp.slice(0, 10); // "YYYY-MM-DD"
    if (!counts[date]) counts[date] = { count: 0, pull_request_count: 0 };
    counts[date].count += 1;
    counts[date].pull_request_count += (tag.pull_requests?.length ?? 0) > 0 ? 1 : 0;
  }

  return Object.entries(counts)
    .map(([date, { count, pull_request_count }]) => ({ date, count, pull_request_count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
