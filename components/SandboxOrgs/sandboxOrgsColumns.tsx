import { type ColumnDef } from "@tanstack/react-table";
import type { OrgRepoRow } from "@/types/sandbox";
import { SortableHeader } from "./SortableHeader";
import { RepoNameCell } from "./RepoNameCell";
import { CommitMessagesList } from "./CommitMessagesList";
import { AccountReposList } from "./AccountReposList";

export const sandboxOrgsColumns: ColumnDef<OrgRepoRow>[] = [
  {
    accessorKey: "repo_name",
    header: "Repo",
    cell: ({ row }) => (
      <RepoNameCell
        name={row.getValue("repo_name")}
        url={row.original.repo_url}
      />
    ),
  },
  {
    accessorKey: "total_commits",
    header: ({ column }) => (
      <SortableHeader column={column} label="Total Commits" />
    ),
  },
  {
    accessorKey: "latest_commit_messages",
    header: "Recent Commits",
    cell: ({ row }) => (
      <CommitMessagesList
        messages={row.getValue("latest_commit_messages") ?? []}
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "latest_committed_at",
    header: ({ column }) => (
      <SortableHeader column={column} label="Latest Commit" />
    ),
    cell: ({ row }) =>
      new Date(row.getValue<string>("latest_committed_at")).toLocaleString(),
    sortingFn: "datetime",
  },
  {
    accessorKey: "account_repos",
    header: ({ column }) => (
      <SortableHeader column={column} label="Account Repos" />
    ),
    sortingFn: (rowA, rowB) => {
      const a = (rowA.getValue<string[]>("account_repos") ?? []).length;
      const b = (rowB.getValue<string[]>("account_repos") ?? []).length;
      return a - b;
    },
    cell: ({ row }) => (
      <AccountReposList repos={row.getValue("account_repos") ?? []} />
    ),
  },
];
