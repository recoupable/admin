"use client";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { AccountSandboxRow } from "@/types/sandbox";

const columns: ColumnDef<AccountSandboxRow>[] = [
  {
    accessorKey: "account_email",
    header: "Account Email",
    cell: ({ row }) =>
      row.getValue("account_email") ?? (
        <span className="text-muted-foreground">{row.original.account_id}</span>
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

interface SandboxesTableProps {
  accounts: AccountSandboxRow[];
}

/**
 * Renders a shadcn Data Table of accounts and their sandbox statistics.
 * Supports interactive column sorting for Total Sandboxes and Last Created.
 * Default sort: Last Created descending (most recent first).
 *
 * @param accounts - Array of account sandbox rows from the admin API
 */
export default function SandboxesTable({ accounts }: SandboxesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "last_created_at", desc: true },
  ]);

  const table = useReactTable({
    data: accounts,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
