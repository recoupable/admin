import SandboxOrgsTableContainer from "@/components/SandboxOrgs/SandboxOrgsTableContainer";
import ApiDocsLink from "@/components/ApiDocs/ApiDocsLink";
import PageBreadcrumb from "@/components/Sandboxes/PageBreadcrumb";

export default function SandboxOrgsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <PageBreadcrumb current="Org Repo Commits" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Org Repo Commits
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Commits per org sub-module across all sandboxes, ordered by activity.
          </p>
        </div>
        <ApiDocsLink path="admins/sandboxes-orgs" />
      </div>
      <SandboxOrgsTableContainer />
    </main>
  );
}
