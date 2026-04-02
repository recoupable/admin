import type { ContentSlackTag } from "@/types/contentSlack";
import type { PieChartSlice } from "@/components/Admin/AdminPieChart";

/**
 * Aggregates content slack tags by prompt (template) for pie chart display.
 * Returns slices sorted descending by count.
 */
export function getTagsByTemplate(tags: ContentSlackTag[]): PieChartSlice[] {
  const counts = new Map<string, number>();

  for (const tag of tags) {
    const template = tag.prompt || "No Template";
    counts.set(template, (counts.get(template) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}
