import Link from "next/link";

export default function SandboxesNavButton() {
  return (
    <Link
      href="/sandboxes"
      className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
    >
      View Sandboxes →
    </Link>
  );
}
