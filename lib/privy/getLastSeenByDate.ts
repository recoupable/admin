import type { PrivyUser } from "@/types/privy";
import { getLastSeen } from "@/lib/privy/getLastSeen";

export type LastSeenDataPoint = {
  date: string;
  count: number;
};

/**
 * Groups users by their last seen date and returns counts per day,
 * sorted chronologically. Users without a last seen date are excluded.
 */
export function getLastSeenByDate(users: PrivyUser[]): LastSeenDataPoint[] {
  const counts = new Map<string, number>();

  for (const user of users) {
    const lastSeen = getLastSeen(user);
    if (lastSeen === null) continue;

    const date = new Date(lastSeen * 1000).toISOString().split("T")[0];
    counts.set(date, (counts.get(date) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));
}
