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
      {repos.map(({ account_id, email, repo_url }) => {
        const repoName = repo_url.split("/").pop() ?? repo_url;
        const displayLabel = email ?? account_id;
        return (
          <li key={account_id} className="flex flex-col gap-0.5">
            <Link
              href={`/accounts/${account_id}`}
              className="text-[#345A5D] hover:underline font-medium truncate block max-w-xs"
              title={`View task runs for ${displayLabel}`}
            >
              {displayLabel}
            </Link>
            <a
              href={repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:underline dark:text-gray-500 truncate block max-w-xs text-xs"
              title={repo_url}
            >
              {repoName}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
