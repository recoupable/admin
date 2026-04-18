import { API_BASE_URL } from "@/lib/consts";
import type { AdminPeriod } from "@/types/admin";
import type { AgentSignupsResponse } from "@/types/agentSignups";

export async function fetchAgentSignups(
  accessToken: string,
  period: AdminPeriod,
): Promise<AgentSignupsResponse> {
  const url = new URL(`${API_BASE_URL}/api/admins/agent-signups`);
  url.searchParams.set("period", period);

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? body.message ?? `HTTP ${res.status}`);
  }

  return res.json();
}
