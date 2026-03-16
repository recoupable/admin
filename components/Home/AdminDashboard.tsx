import NavButton from "@/components/Home/NavButton";
import ApiDocsLink from "@/components/ApiDocsLink";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      <p className="text-lg text-muted-foreground">
        Welcome back. You have admin access.
      </p>
      <nav className="flex gap-4">
        <NavButton href="/sandboxes" label="View Sandboxes" />
        <NavButton href="/sandboxes/orgs" label="View Org Commits" />
      </nav>
      <ApiDocsLink path="admins/check" />
    </div>
  );
}
