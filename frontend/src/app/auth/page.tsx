import Auth from "../../components/Auth";

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-background-primary flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md rounded-2xl border border-border-tertiary/20 bg-[#342E37]/90 backdrop-blur-md p-8 text-text-primary shadow-2xl">
        <Auth />
      </div>
    </main>
  );
}