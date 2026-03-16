"use client";

import { usePulseEmails } from "@/hooks/usePulseEmails";
import type { TaskRun } from "@/types/sandbox";
import type { PulseEmail } from "@/lib/recoup/fetchAccountPulseEmails";

interface PulseEmailModalProps {
  accountId: string;
  run: TaskRun;
  onClose: () => void;
}

/**
 * Finds the email most likely sent during a given task run by matching
 * the email's created_at against the run's startedAt/finishedAt window.
 * Falls back to the most recent email if no match is found.
 */
function findEmailForRun(emails: PulseEmail[], run: TaskRun): PulseEmail | null {
  if (emails.length === 0) return null;

  const start = run.startedAt ? new Date(run.startedAt).getTime() : null;
  const end = run.finishedAt ? new Date(run.finishedAt).getTime() : null;

  if (start && end) {
    // Add a 5-minute buffer on each side to account for clock skew
    const buffer = 5 * 60 * 1000;
    const match = emails.find((e) => {
      const t = new Date(e.created_at).getTime();
      return t >= start - buffer && t <= end + buffer;
    });
    if (match) return match;
  }

  // Fallback: most recent email
  return emails[0];
}

export default function PulseEmailModal({ accountId, run, onClose }: PulseEmailModalProps) {
  const { data: emails, isLoading, error } = usePulseEmails(accountId, true);

  const email = emails ? findEmailForRun(emails, run) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-3xl max-h-[90vh] rounded-xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
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
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{run.id}</p>
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

        {/* Body */}
        <div className="flex-1 overflow-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-20 text-sm text-gray-500 dark:text-gray-400">
              Loading email…
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-20 text-sm text-red-500">
              Failed to load email: {error instanceof Error ? error.message : "Unknown error"}
            </div>
          )}

          {!isLoading && !error && !email && (
            <div className="flex items-center justify-center py-20 text-sm text-gray-500 dark:text-gray-400">
              No email found for this run.
            </div>
          )}

          {!isLoading && !error && email?.html && (
            <iframe
              srcDoc={email.html}
              title="Email preview"
              sandbox="allow-same-origin"
              className="w-full border-0"
              style={{ minHeight: "500px" }}
            />
          )}

          {!isLoading && !error && email && !email.html && (
            <div className="px-6 py-8 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
              (No HTML content — email may have been text-only)
            </div>
          )}
        </div>

        {/* Footer: Resend email ID */}
        {email && (
          <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <p className="text-xs text-gray-400 font-mono">Resend ID: {email.id}</p>
          </div>
        )}
      </div>
    </div>
  );
}
