import { requestAdminJson } from "@/lib/recoup/requestAdminJson";
import { API_BASE_URL } from "@/lib/consts";
import type { AdminPeriod } from "@/types/admin";
import type { ContentSlackResponse } from "@/types/contentSlack";

export async function fetchContentSlackTags(
  accessToken: string,
  period: AdminPeriod,
): Promise<ContentSlackResponse> {
  const url = new URL(`${API_BASE_URL}/api/admins/content/slack`);
  url.searchParams.set("period", period);

  return requestAdminJson<ContentSlackResponse>(url.toString(), accessToken);
}
