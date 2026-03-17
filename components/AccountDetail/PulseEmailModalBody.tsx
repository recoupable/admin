import type { PulseEmail } from "@/lib/recoup/fetchAccountPulseEmails";

interface PulseEmailModalBodyProps {
  email: PulseEmail | null;
  isLoading: boolean;
  error: Error | null;
}

export default function PulseEmailModalBody({ email, isLoading, error }: PulseEmailModalBodyProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-gray-500 dark:text-gray-400">
        Loading email…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-red-500">
        Failed to load email: {error.message}
      </div>
    );
  }

  if (!email) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-gray-500 dark:text-gray-400">
        No email found for this run.
      </div>
    );
  }

  if (email.html) {
    return (
      <iframe
        srcDoc={email.html}
        title="Email preview"
        sandbox="allow-same-origin"
        className="w-full border-0"
        style={{ minHeight: "500px" }}
      />
    );
  }

  return (
    <div className="px-6 py-8 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
      (No HTML content — email may have been text-only)
    </div>
  );
}
