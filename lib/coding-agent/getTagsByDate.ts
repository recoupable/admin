import type { SlackTag } from "@/types/coding-agent";

interface TagsByDateEntry {
  date: string;
  count: number;
}

/**
 * Aggregates Slack tags by UTC date (YYYY-MM-DD) for charting.
 *
 * @param tags - Array of SlackTag objects
 * @returns Array of { date, count } sorted ascending by date
 */
export function getTagsByDate(tags: SlackTag[]): TagsByDateEntry[] {
  const counts: Record<string, number> = {};

  for (const tag of tags) {
    const date = tag.timestamp.slice(0, 10); // "YYYY-MM-DD"
    counts[date] = (counts[date] ?? 0) + 1;
  }

  return Object.entries(counts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
