import type { ContentSlackTag } from "@/types/contentSlack";
import type { PieChartSlice } from "@/components/Admin/AdminPieChart";

/**
 * Aggregates content slack tags by user_name for pie chart display.
 * Returns slices sorted descending by count.
 */
export function getTagsByUser(tags: ContentSlackTag[]): PieChartSlice[] {
  const counts = new Map<string, number>();

  for (const tag of tags) {
    const name = tag.user_name || "Unknown";
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}
