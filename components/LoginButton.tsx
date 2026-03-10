"use client";

import { usePrivy } from "@privy-io/react-auth";

export default function LoginButton() {
  const { login, logout, authenticated, user } = usePrivy();

  if (authenticated) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          {user?.email?.address ?? "Signed in"}
        </span>
        <button
          onClick={logout}
          className="inline-flex items-center justify-center rounded-xl border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      Sign In
    </button>
  );
}
