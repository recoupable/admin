"use client";

import AccountRepoLink from "@/components/SandboxOrgs/AccountRepoLink";
import type { AccountRepo } from "@/types/sandbox";

interface AccountReposListProps {
  repos: AccountRepo[];
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
