import OrgsTableContainer from "@/components/Orgs/OrgsTableContainer";

export default function OrgsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Org Repos
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          All organisation-level repositories and their statistics.
        </p>
      </div>
      <OrgsTableContainer />
    </main>
  );
}
