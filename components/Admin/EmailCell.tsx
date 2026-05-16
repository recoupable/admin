"use client";

import { useDisplayEmail } from "@/lib/hide/useDisplayEmail";

interface EmailCellProps {
  getValue: () => string | null;
}

export default function EmailCell({ getValue }: EmailCellProps) {
  const displayEmail = useDisplayEmail(getValue());
  if (!displayEmail) return <span className="text-gray-400 italic">No email</span>;
  return <span>{displayEmail}</span>;
}
