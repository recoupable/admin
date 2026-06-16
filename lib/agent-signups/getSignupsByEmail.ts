import type { AgentSignup } from "@/types/agentSignups";

export interface SignupsByEmailEntry {
  name: string;
  value: number;
}

/**
 * Aggregates agent sign-ups by email address for pie chart display.
 */
export function getSignupsByEmail(signups: AgentSignup[]): SignupsByEmailEntry[] {
  const counts: Record<string, number> = {};

  for (const signup of signups) {
    const key = signup.email || "Unknown";
    counts[key] = (counts[key] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}
