import LoginButton from "@/components/LoginButton";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-lg font-semibold">Recoup Admin</h1>
        <LoginButton />
      </header>
      <main className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Admin Dashboard
          </h2>
          <p className="text-lg text-gray-500">
            Sign in to manage the Recoup platform.
          </p>
        </div>
      </main>
    </div>
  );
}
