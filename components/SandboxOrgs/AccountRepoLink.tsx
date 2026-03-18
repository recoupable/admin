"use client";

import Link from "next/link";
import { useDisplayEmail } from "@/lib/hide/useDisplayEmail";
import type { AccountRepo } from "@/types/sandbox";

export default function AccountRepoLink({ account_id, email }: AccountRepo) {
  const displayEmail = useDisplayEmail(email ?? null);
  const displayLabel = displayEmail ?? account_id;
  return (
    <li>
      <Link
        href={`/accounts/${account_id}`}
        className="text-[#345A5D] hover:underline font-medium truncate block max-w-xs"
        title={`View task runs for ${displayLabel}`}
      >
        {displayLabel}
      </Link>
    </li>
  );
}
