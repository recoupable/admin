"use client";

import Link from "next/link";
import { useDisplayEmail } from "@/lib/hide/useDisplayEmail";
import type { AccountRepo } from "@/types/sandbox";

interface AccountReposListProps {
  repos: AccountRepo[];
}

function AccountRepoLink({ account_id, email }: AccountRepo) {
  const displayEmail = useDisplayEmail(email ?? null);
  const displayLabel = displayEmail ?? account_id;
  return (
    <li key={account_id}>
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

export function AccountReposList({ repos }: AccountReposListProps) {
  if (repos.length === 0) {
    return <span className="text-muted-foreground">—</span>;
  }
  return (
    <ul className="space-y-1 text-sm">
      {repos.map((repo) => (
        <AccountRepoLink key={repo.account_id} {...repo} />
      ))}
    </ul>
  );
}
