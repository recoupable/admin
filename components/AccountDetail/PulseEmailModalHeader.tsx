import type { PulseEmail } from "@/lib/recoup/fetchAccountPulseEmails";

interface PulseEmailModalHeaderProps {
  email: PulseEmail | null;
  runId: string;
  onClose: () => void;
}

export default function PulseEmailModalHeader({ email, runId, onClose }: PulseEmailModalHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
          Pulse Email Preview
        </p>
        {email ? (
          <>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
              {email.subject ?? "(no subject)"}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              To: {email.to.join(", ")} &middot;{" "}
              {new Date(email.created_at).toLocaleString()}
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{runId}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Close"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
