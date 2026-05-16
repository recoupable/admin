"use client";

import { Fragment, useMemo, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buildCreditsColumns } from "./creditsColumns";
import CreditsRowEvents from "./CreditsRowEvents";
import type { CreditsPeriod, CreditsRollupRow } from "@/types/credits";

interface CreditsTableProps {
  rows: CreditsRollupRow[];
  period: CreditsPeriod;
}

export default function CreditsTable({ rows, period }: CreditsTableProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const columns = useMemo(
    () =>
      buildCreditsColumns({
        isExpanded: (accountId) => expanded.has(accountId),
        onToggle: (accountId) => {
          setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(accountId)) {
              next.delete(accountId);
            } else {
              next.add(accountId);
            }
            return next;
          });
        },
      }),
    [expanded],
  );

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => {
              const accountId = row.original.account_id;
              const isExpanded = expanded.has(accountId);
              return (
                <Fragment key={row.id}>
                  <TableRow data-state={isExpanded ? "expanded" : undefined}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {isExpanded && (
                    <TableRow className="bg-gray-50/60 hover:bg-gray-50/60 dark:bg-gray-900/40 dark:hover:bg-gray-900/40">
                      <TableCell colSpan={columns.length} className="p-0">
                        <div className="px-4 py-4">
                          <CreditsRowEvents accountId={accountId} period={period} />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })
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
