"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import AdminDashboard from "@/components/Home/AdminDashboard";
import HomePageSkeleton from "@/components/Home/HomePageSkeleton";

export default function HomeContent() {
  const { ready, authenticated } = usePrivy();
  const { data: isAdmin, isLoading } = useIsAdmin();

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

  return (
    <div className="w-full px-6 py-8">
      <AdminDashboard />
    </div>
  );
}
