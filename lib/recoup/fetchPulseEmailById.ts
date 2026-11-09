import { requestAdminJson } from "@/lib/recoup/requestAdminJson";
import { API_BASE_URL } from "@/lib/consts";
import type { PulseEmail } from "./fetchAccountPulseEmails";

/**
 * Fetches a single Resend email by ID from GET /api/admins/emails?email_id=<id>.
 *
 * @param accessToken - Privy access token
 * @param emailId - The Resend email ID
 * @returns The email object or null if not found
 */
export async function fetchPulseEmailById(
  accessToken: string,
  emailId: string,
): Promise<PulseEmail | null> {
  const url = new URL(`${API_BASE_URL}/api/admins/emails`);
  url.searchParams.set("email_id", emailId);

  const data = await requestAdminJson<{ emails?: PulseEmail[] }>(
    url.toString(),
    accessToken,
  );
  return data.emails?.[0] ?? null;
}
