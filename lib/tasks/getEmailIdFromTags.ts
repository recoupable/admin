/**
 * Extracts the Resend email ID from a task run's tags.
 * Looks for tags matching the pattern "email:<emailId>".
 *
 * @param tags - Array of tag strings from the task run
 * @returns The Resend email ID or null if not found
 */
export function getEmailIdFromTags(tags: string[]): string | null {
  const emailTag = tags.find((t) => t.startsWith("email:"));
  return emailTag ? emailTag.slice("email:".length) : null;
}
