import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";
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
        rel="noreferrer"
        className="flex items-center gap-1 font-medium hover:underline"
      >
        {row.getValue("repo_name")}
        <ExternalLink className="h-3 w-3 text-muted-foreground" />
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
        Commits
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
    accessorKey: "latest_5_commit_messages",
    header: "Latest 5 Commits",
    cell: ({ row }) => {
      const messages = row.getValue<string[]>("latest_5_commit_messages");
      return (
        <ul className="space-y-0.5 text-xs">
          {messages.map((msg, i) => (
            <li key={i} className="truncate max-w-xs text-muted-foreground" title={msg}>
              {msg}
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "earliest_commit_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3 h-8 px-3"
      >
        Earliest Commit
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-1 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-1 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-1 h-4 w-4 text-muted-foreground" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const val = row.getValue<string>("earliest_commit_at");
      return val ? new Date(val).toLocaleString() : "—";
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "latest_commit_at",
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
    cell: ({ row }) => {
      const val = row.getValue<string>("latest_commit_at");
      return val ? new Date(val).toLocaleString() : "—";
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "account_repos_with_submodule",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3 h-8 px-3"
      >
        Submodule Installs
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
