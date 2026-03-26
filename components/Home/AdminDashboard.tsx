import NavButton from "@/components/Home/NavButton";
import ApiDocsLink from "@/components/ApiDocs/ApiDocsLink";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      <p className="text-lg text-muted-foreground">
        Welcome back. You have admin access. <ApiDocsLink path="admins/check" />
      </p>
      <nav className="flex gap-4">
        <NavButton href="/sandboxes" label="View Sandboxes" />
        <NavButton href="/sandboxes/orgs" label="View Org Commits" />
        <NavButton href="/privy" label="View Privy Logins" />
        <NavButton href="/content" label="View Content Agent" />
      </nav>
    </div>
  );
}
