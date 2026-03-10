"use client";

import { usePrivy } from "@privy-io/react-auth";

export default function LoginButton() {
  const { login, logout, authenticated, user } = usePrivy();

  if (authenticated) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">
          {user?.email?.address ?? "Signed in"}
        </span>
        <button
          onClick={logout}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className="rounded-md bg-[#003199] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#002577]"
    >
      Sign In
    </button>
  );
}
