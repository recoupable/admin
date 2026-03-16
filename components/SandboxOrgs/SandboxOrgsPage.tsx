import SandboxOrgsTableContainer from "@/components/SandboxOrgs/SandboxOrgsTableContainer";

export default function SandboxOrgsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Org Repo Commits
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Commits per org sub-module across all sandboxes, ordered by activity.
          </p>
        </div>
        <a
          href="https://developers.recoupable.com/api-reference/admins/sandboxes-orgs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          API Docs ↗
        </a>
      </div>
      <SandboxOrgsTableContainer />
    </main>
  );
}
