import AdminDashboard from "@/components/Home/AdminDashboard";
import HomePageSkeleton from "@/components/Home/HomePageSkeleton";

interface HomeContentProps {
  ready: boolean;
  authenticated: boolean;
  isAdmin: boolean | undefined;
  isLoading: boolean;
}

export default function HomeContent({ ready, authenticated, isAdmin, isLoading }: HomeContentProps) {
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
