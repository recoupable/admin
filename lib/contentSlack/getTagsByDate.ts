import type { ContentSlackTag } from "@/types/contentSlack";

export type TagsByDatePoint = {
  date: string;
  count: number;
};

export function getTagsByDate(tags: ContentSlackTag[]): TagsByDatePoint[] {
  const counts = new Map<string, number>();

  for (const tag of tags) {
    const date = new Date(tag.timestamp).toISOString().split("T")[0];
    counts.set(date, (counts.get(date) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));
}
