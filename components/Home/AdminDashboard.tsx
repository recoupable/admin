import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      <p className="text-lg text-muted-foreground">
        Welcome back. You have admin access.
      </p>
      <nav className="flex gap-4">
        <Link
          href="/sandboxes"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          View Sandboxes →
        </Link>
      </nav>
    </div>
  );
}
