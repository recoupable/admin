import LoginButton from "@/components/Login/LoginButton";
import HomeContent from "@/components/Home/HomeContent";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-lg font-semibold">Recoup Admin</h1>
        <LoginButton />
      </header>
      <main className="flex flex-1 items-center justify-center">
        <HomeContent />
      </main>
    </div>
  );
}
