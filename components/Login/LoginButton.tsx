"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { HideToggle } from "@/components/HideToggle";
import { useDisplayEmail } from "@/lib/hide/useDisplayEmail";
import LoginButtonSkeleton from "./LoginButtonSkeleton";

export default function LoginButton() {
  const { login, logout, authenticated, ready, user } = usePrivy();
  const displayEmail = useDisplayEmail(user?.email?.address ?? null);

  if (!ready) {
    return <LoginButtonSkeleton />;
  }

  if (authenticated) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          {displayEmail ?? "Signed in"}
        </span>
        <HideToggle />
        <Button variant="ghost" onClick={logout}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={login}>
      Sign In
    </Button>
  );
}
