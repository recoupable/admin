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
    <div
      className={`h-4 animate-pulse rounded bg-muted ${className}`}
    />
  );
}

const SKELETON_ROWS = 8;
const COLUMNS = ["Repo", "Total Commits", "Recent Commits", "Latest Commit", "Account Repos"];

export default function SandboxOrgsTableSkeleton() {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {COLUMNS.map((col) => (
              <TableHead key={col}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: SKELETON_ROWS }, (_, i) => (
            <TableRow key={i}>
              <TableCell><SkeletonBar className="w-32" /></TableCell>
              <TableCell><SkeletonBar className="w-16" /></TableCell>
              <TableCell>
                <div className="space-y-1.5">
                  <SkeletonBar className="w-48" />
                  <SkeletonBar className="w-40" />
                  <SkeletonBar className="w-36" />
                </div>
              </TableCell>
              <TableCell><SkeletonBar className="w-28" /></TableCell>
              <TableCell><SkeletonBar className="w-20" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
