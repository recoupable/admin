import SandboxesTableContainer from "@/components/SandboxesTable/SandboxesTableContainer";

export const metadata = {
  title: "Sandboxes — Recoup Admin",
  description: "View all accounts and their sandbox usage.",
};

/**
 * /sandboxes — Admin page showing a table of accounts with sandbox stats:
 * account name, total sandboxes created, and last created timestamp.
 */
export default function SandboxesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Sandboxes
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          All accounts and their sandbox usage.
        </p>
      </div>
      <SandboxesTableContainer />
    </main>
  );
}
