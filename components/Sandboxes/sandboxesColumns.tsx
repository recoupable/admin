import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useHide } from "@/providers/HideProvider";
import { maskEmail } from "@/lib/maskEmail";
import type { AccountSandboxRow } from "@/types/sandbox";

function AccountEmailCell({
  email,
  accountId,
}: {
  email: string | null;
  accountId: string;
}) {
  const { isHidden } = useHide();
  const displayEmail = email
    ? isHidden
      ? maskEmail(email)
      : email
    : null;
  return (
    <Link
      href={`/accounts/${accountId}`}
      className="text-[#345A5D] hover:underline font-medium"
      title={`View task runs for ${email ?? accountId}`}
    >
      {displayEmail ?? (
        <span className="font-mono text-xs text-gray-500">{accountId}</span>
      )}
    </Link>
  );
}

export const sandboxesColumns: ColumnDef<AccountSandboxRow>[] = [
  {
    accessorKey: "account_email",
    header: "Account Email",
    cell: ({ row }) => (
      <AccountEmailCell
        email={row.getValue<string | null>("account_email")}
        accountId={row.original.account_id}
      />
    ),
  },
  {
    accessorKey: "total_sandboxes",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3 h-8 px-3"
      >
        Total Sandboxes
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
    accessorKey: "last_created_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3 h-8 px-3"
      >
        Last Created
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
      new Date(row.getValue<string>("last_created_at")).toLocaleString(),
    sortingFn: "datetime",
  },
];
