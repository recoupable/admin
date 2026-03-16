import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OrgRepoRow } from "@/types/sandbox";

export const sandboxOrgsColumns: ColumnDef<OrgRepoRow>[] = [
  {
    accessorKey: "repo_name",
    header: "Repo",
    cell: ({ row }) => (
      <a
        href={row.original.repo_url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-blue-600 hover:underline dark:text-blue-400"
      >
        {row.getValue("repo_name")}
      </a>
    ),
  },
  {
    accessorKey: "total_commits",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3 h-8 px-3"
      >
        Total Commits
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-1 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-1 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-1 h-4 w-4 text-muted-foreground" />
        )}
      </Button>
    ),
  },
  {
    accessorKey: "latest_commit_messages",
    header: "Recent Commits",
    cell: ({ row }) => {
      const messages: string[] = row.getValue("latest_commit_messages") ?? [];
      if (messages.length === 0) {
        return <span className="text-muted-foreground">—</span>;
      }
      return (
        <ol className="list-decimal list-inside space-y-0.5 text-sm">
          {messages.map((msg, i) => (
            <li key={i} className="truncate max-w-xs" title={msg}>
              {msg}
            </li>
          ))}
        </ol>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "latest_committed_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3 h-8 px-3"
      >
        Latest Commit
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-1 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-1 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-1 h-4 w-4 text-muted-foreground" />
        )}
      </Button>
    ),
    cell: ({ row }) =>
      new Date(row.getValue<string>("latest_committed_at")).toLocaleString(),
    sortingFn: "datetime",
  },
  {
    accessorKey: "account_repos",
    header: "Accounts",
    cell: ({ row }) => {
      const repos: string[] = row.getValue("account_repos") ?? [];
      return repos.length;
    },
    enableSorting: false,
  },
];
