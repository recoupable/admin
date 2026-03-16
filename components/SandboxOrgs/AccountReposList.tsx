import Link from "next/link";
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
      {repos.map(({ account_id, email }) => {
        const displayLabel = email ?? account_id;
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
      })}
    </ul>
  );
}
