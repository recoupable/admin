import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OrgRepoRow } from "@/types/org";

export const orgsColumns: ColumnDef<OrgRepoRow>[] = [
  {
    accessorKey: "repo_name",
    header: "Repository",
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
    header: "Latest Commits",
    cell: ({ row }) => {
      const messages = row.getValue<string[]>("latest_commit_messages");
      return (
        <ul className="space-y-0.5 text-xs text-gray-600 dark:text-gray-400">
          {messages.map((msg, i) => (
            <li key={i} className="truncate max-w-xs" title={msg}>
              {msg}
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "earliest_committed_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3 h-8 px-3"
      >
        First Commit
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
      new Date(row.getValue<string>("earliest_committed_at")).toLocaleString(),
    sortingFn: "datetime",
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
    accessorKey: "account_repo_count",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3 h-8 px-3"
      >
        Account Repos
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
];
