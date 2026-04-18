import type { AgentSignup } from "@/types/agentSignups";

export interface SignupsByDateEntry {
  date: string;
  count: number;
}

/**
 * Aggregates agent sign-ups by UTC date (YYYY-MM-DD) for charting.
 */
export function getSignupsByDate(signups: AgentSignup[]): SignupsByDateEntry[] {
  const counts: Record<string, number> = {};

  for (const signup of signups) {
    const date = signup.created_at.slice(0, 10);
    counts[date] = (counts[date] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
