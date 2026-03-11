import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Recoup Admin</h1>
        <p className="text-lg text-gray-500">
          Admin dashboard for the Recoup platform.
        </p>
        <nav className="flex gap-4">
          <Link
            href="/sandboxes"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            View Sandboxes →
          </Link>
        </nav>
      </main>
    </div>
  );
}
