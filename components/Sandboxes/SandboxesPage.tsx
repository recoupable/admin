import SandboxesTableContainer from "@/components/Sandboxes/SandboxesTableContainer";

export default function SandboxesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Sandboxes
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            All accounts and their sandbox usage.
          </p>
        </div>
        <a
          href="https://developers.recoupable.com/api-reference/admins/sandboxes"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          API Docs ↗
        </a>
      </div>
      <SandboxesTableContainer />
    </main>
  );
}
