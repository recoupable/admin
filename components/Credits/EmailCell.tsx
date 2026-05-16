"use client";

import { useDisplayEmail } from "@/lib/hide/useDisplayEmail";

interface EmailCellProps {
  email: string | null;
}

export default function EmailCell({ email }: EmailCellProps) {
  const displayEmail = useDisplayEmail(email);
  return (
    <span className="text-sm text-gray-900 dark:text-gray-100">{displayEmail ?? "—"}</span>
  );
}
