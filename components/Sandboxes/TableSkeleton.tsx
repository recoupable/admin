import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function SkeletonBar({ className = "" }: { className?: string }) {
  return (
    <div className={`h-4 animate-pulse rounded bg-muted ${className}`} />
  );
}

interface TableSkeletonProps {
  columns: string[];
  rows?: number;
}

export default function TableSkeleton({ columns, rows = 8 }: TableSkeletonProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }, (_, i) => (
            <TableRow key={i}>
              {columns.map((col) => (
                <TableCell key={col}>
                  <SkeletonBar className="w-24" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
