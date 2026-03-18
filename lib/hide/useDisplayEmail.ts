"use client";

import { useHide } from "@/providers/HideProvider";
import { maskEmail } from "@/lib/hide/maskEmail";

/**
 * Returns the email formatted for display — masked when hide mode is active.
 */
export function useDisplayEmail(email: string | null): string | null {
  const { isHidden } = useHide();
  if (!email) return null;
  return isHidden ? maskEmail(email) : email;
}
