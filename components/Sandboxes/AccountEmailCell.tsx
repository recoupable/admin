"use client";

import Link from "next/link";
import { useHide } from "@/providers/HideProvider";
import { maskEmail } from "@/lib/hide/maskEmail";

interface AccountEmailCellProps {
  email: string | null;
  accountId: string;
}

export default function AccountEmailCell({ email, accountId }: AccountEmailCellProps) {
  const { isHidden } = useHide();
  const displayEmail = email
    ? isHidden
      ? maskEmail(email)
      : email
    : null;
  return (
    <Link
      href={`/accounts/${accountId}`}
      className="text-[#345A5D] hover:underline font-medium"
      title={`View task runs for ${displayEmail ?? accountId}`}
    >
      {displayEmail ?? (
        <span className="font-mono text-xs text-gray-500">{accountId}</span>
      )}
    </Link>
  );
}
