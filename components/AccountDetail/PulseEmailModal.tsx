"use client";

import { usePulseEmail } from "@/hooks/usePulseEmail";
import { getEmailIdFromTags } from "@/lib/tasks/getEmailIdFromTags";
import type { TaskRun } from "@/types/sandbox";
import PulseEmailModalHeader from "./PulseEmailModalHeader";
import PulseEmailModalBody from "./PulseEmailModalBody";

interface PulseEmailModalProps {
  run: TaskRun;
  onClose: () => void;
}

export default function PulseEmailModal({ run, onClose }: PulseEmailModalProps) {
  const emailId = getEmailIdFromTags(run.tags);
  const { data: email, isLoading, error } = usePulseEmail(emailId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-3xl max-h-[90vh] rounded-xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <PulseEmailModalHeader
          email={email ?? null}
          runId={run.id}
          onClose={onClose}
        />

        <div className="flex-1 overflow-auto">
          <PulseEmailModalBody
            email={email ?? null}
            isLoading={isLoading}
            error={error as Error | null}
          />
        </div>

        {email && (
          <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <p className="text-xs text-gray-400 font-mono">Resend ID: {email.id}</p>
          </div>
        )}
      </div>
    </div>
  );
}
