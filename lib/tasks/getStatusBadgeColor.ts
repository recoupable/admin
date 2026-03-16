const STATUS_COLORS: Record<string, string> = {
  COMPLETED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  FAILED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  EXECUTING: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  QUEUED: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  WAITING_FOR_DEPLOY: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  CANCELED: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  CRASHED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const DEFAULT_COLOR = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";

export function getStatusBadgeColor(status: string): string {
  return STATUS_COLORS[status] ?? DEFAULT_COLOR;
}
