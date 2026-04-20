import { API_BASE_URL } from "@/lib/consts";
import type { SlackTagsPeriod, SlackTagsResponse } from "@/types/coding-agent";

/**
 * Fetches Slack tagging analytics for the Recoup Coding Agent from GET /api/admins/coding/slack.
 * Authenticates using the caller's Privy access token (admin Bearer auth).
 *
 * @param accessToken - Privy access token from getAccessToken()
 * @param period - Time period: "all", "daily", "weekly", or "monthly"
 * @param tag - Optional Slack user ID to filter results
 * @returns SlackTagsResponse with total count and list of tag events
 */
export async function fetchSlackTags(
  accessToken: string,
  period: SlackTagsPeriod,
  tag?: string,
): Promise<SlackTagsResponse> {
  const url = new URL(`${API_BASE_URL}/api/admins/coding/slack`);
  url.searchParams.set("period", period);
  if (tag) url.searchParams.set("tag", tag);

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? body.message ?? `HTTP ${res.status}`);
  }

  return res.json();
}
