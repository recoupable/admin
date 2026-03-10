"use client";

import LoginButton from "@/components/Login/LoginButton";
import AdminDashboard from "@/components/Home/AdminDashboard";
import HomePageSkeleton from "@/components/Home/HomePageSkeleton";
import { usePrivy } from "@privy-io/react-auth";
import { useIsAdmin } from "@/hooks/useIsAdmin";

export default function HomePage() {
  const { ready, authenticated } = usePrivy();
  const { isAdmin, isLoading } = useIsAdmin();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-lg font-semibold">Recoup Admin</h1>
        <LoginButton />
      </header>
      <main className="flex flex-1 items-center justify-center">
        <HomeContent
          ready={ready}
          authenticated={authenticated}
          isAdmin={isAdmin}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

interface HomeContentProps {
  ready: boolean;
  authenticated: boolean;
  isAdmin: boolean | null;
  isLoading: boolean;
}

function HomeContent({ ready, authenticated, isAdmin, isLoading }: HomeContentProps) {
  if (!ready || isLoading) {
    return <HomePageSkeleton />;
  }

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-lg text-muted-foreground">
          Sign in to manage the Recoup platform.
        </p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Access Denied</h2>
        <p className="text-muted-foreground">
          Your account does not have admin access.
        </p>
      </div>
    );
  }

  return <AdminDashboard />;
}
