import { API_BASE_URL } from "@/lib/consts";
import type { SlackTagOptionsResponse } from "@/types/coding-agent";

/**
 * Fetches the distinct set of Slack users who have tagged the Recoup Coding Agent.
 * Used to populate filter chips in the admin coding page.
 *
 * @param accessToken - Privy access token from getAccessToken()
 * @returns SlackTagOptionsResponse with unique tag options
 */
export async function fetchSlackTagOptions(accessToken: string): Promise<SlackTagOptionsResponse> {
  const url = `${API_BASE_URL}/api/admins/coding-agent/slack-tags`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? body.message ?? `HTTP ${res.status}`);
  }

  return res.json();
}
