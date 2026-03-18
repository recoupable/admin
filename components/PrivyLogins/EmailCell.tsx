"use client";

import { useHide } from "@/providers/HideProvider";
import { maskEmail } from "@/lib/maskEmail";

interface EmailCellProps {
  getValue: () => string | null;
}

export default function EmailCell({ getValue }: EmailCellProps) {
  const { isHidden } = useHide();
  const email = getValue();
  if (!email) return <span className="text-gray-400 italic">No email</span>;
  return <span>{isHidden ? maskEmail(email) : email}</span>;
}
