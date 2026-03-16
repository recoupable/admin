import Link from "next/link";
import SandboxOrgsTableContainer from "@/components/SandboxOrgs/SandboxOrgsTableContainer";
import ApiDocsLink from "@/components/ApiDocsLink";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function SandboxOrgsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <Breadcrumb className="mb-3">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Org Repo Commits</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
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
