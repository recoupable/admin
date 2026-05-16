import { type ColumnDef } from "@tanstack/react-table";
import type { CreditsRollupRow } from "@/types/credits";
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
    },
    {
      id: "account_email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-sm text-gray-900 dark:text-gray-100">
          {row.original.account_email ?? "—"}
        </span>
      ),
    },
    {
      id: "account_name",
      header: "Name",
      cell: ({ row }) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {row.original.account_name?.trim() || "—"}
        </span>
      ),
    },
    {
      id: "total_credits_deducted_cents",
      header: "Total credits (¢)",
      cell: ({ row }) => (
        <span className="font-mono tabular-nums">
          {row.original.total_credits_deducted_cents.toLocaleString()}
        </span>
      ),
    },
    {
      id: "event_count",
      header: "Events",
      cell: ({ row }) => (
        <span className="font-mono tabular-nums text-gray-600 dark:text-gray-400">
          {row.original.event_count.toLocaleString()}
        </span>
      ),
    },
  ];
}
