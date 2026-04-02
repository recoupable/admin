export default function PieChartSkeleton() {
  return (
    <div className="mb-6 rounded-lg border p-4">
      <div className="mb-4 h-4 w-28 animate-pulse rounded bg-muted" />
      <div className="flex items-center justify-center h-[250px]">
        <div className="h-[180px] w-[180px] animate-pulse rounded-full bg-muted" />
      </div>
    </div>
  );
}
