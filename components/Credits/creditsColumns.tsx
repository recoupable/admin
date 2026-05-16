import { type ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/SandboxOrgs/SortableHeader";
import type { CreditsRollupRow } from "@/types/credits";
import EmailCell from "./EmailCell";
import ExpandToggleCell from "./ExpandToggleCell";

interface CreditsColumnsArgs {
  isExpanded: (accountId: string) => boolean;
  onToggle: (accountId: string) => void;
}

export function buildCreditsColumns({
  isExpanded,
  onToggle,
}: CreditsColumnsArgs): ColumnDef<CreditsRollupRow>[] {
  return [
    {
      id: "expand",
      header: "",
      cell: ({ row }) => (
        <ExpandToggleCell
          expanded={isExpanded(row.original.account_id)}
          onToggle={() => onToggle(row.original.account_id)}
        />
      ),
      enableSorting: false,
    },
    {
      id: "account_email",
      accessorFn: (row) => row.account_email ?? "",
      header: ({ column }) => <SortableHeader column={column} label="Email" />,
      cell: ({ row }) => <EmailCell email={row.original.account_email} />,
      sortingFn: "alphanumeric",
    },
    {
      id: "account_name",
      accessorFn: (row) => row.account_name?.trim() ?? "",
      header: ({ column }) => <SortableHeader column={column} label="Name" />,
      cell: ({ row }) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {row.original.account_name?.trim() || "—"}
        </span>
      ),
      sortingFn: "alphanumeric",
    },
    {
      id: "total_credits_deducted_cents",
      accessorKey: "total_credits_deducted_cents",
      header: ({ column }) => <SortableHeader column={column} label="Total credits (¢)" />,
      cell: ({ row }) => (
        <span className="font-mono tabular-nums">
          {row.original.total_credits_deducted_cents.toLocaleString()}
        </span>
      ),
      sortingFn: "basic",
    },
    {
      id: "event_count",
      accessorKey: "event_count",
      header: ({ column }) => <SortableHeader column={column} label="Events" />,
      cell: ({ row }) => (
        <span className="font-mono tabular-nums text-gray-600 dark:text-gray-400">
          {row.original.event_count.toLocaleString()}
        </span>
      ),
      sortingFn: "basic",
    },
  ];
}
