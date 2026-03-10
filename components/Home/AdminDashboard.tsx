import AccountsTable from "@/components/Accounts/AccountsTable";

export default function AdminDashboard() {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Accounts with Sandboxes</h2>
        <p className="text-sm text-muted-foreground">
          All accounts that have created sandboxes on the platform.
        </p>
      </div>
      <AccountsTable />
    </div>
  );
}
