import LoginButton from "@/components/Login/LoginButton";

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <h1 className="text-lg font-semibold">Recoup Admin</h1>
      <LoginButton />
    </header>
  );
}
