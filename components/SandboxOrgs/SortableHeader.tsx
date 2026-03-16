import { type Column } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SortableHeaderProps<T> {
  column: Column<T>;
  label: string;
}

export function SortableHeader<T>({ column, label }: SortableHeaderProps<T>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="-ml-3 h-8 px-3"
    >
      {label}
      {column.getIsSorted() === "asc" ? (
        <ArrowUp className="ml-1 h-4 w-4" />
      ) : column.getIsSorted() === "desc" ? (
        <ArrowDown className="ml-1 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-1 h-4 w-4 text-muted-foreground" />
      )}
    </Button>
  );
}
