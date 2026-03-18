import SandboxesTableContainer from "@/components/Sandboxes/SandboxesTableContainer";
import ApiDocsLink from "@/components/ApiDocs/ApiDocsLink";
import PageBreadcrumb from "@/components/Sandboxes/PageBreadcrumb";

export default function SandboxesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <PageBreadcrumb current="Sandboxes" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Sandboxes
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            All accounts and their sandbox usage.
          </p>
        </div>
        <ApiDocsLink path="admins/sandboxes" />
      </div>
      <SandboxesTableContainer />
    </main>
  );
}
