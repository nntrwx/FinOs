import Auth from "../../components/Auth";

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-background-primary flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md rounded-2xl border border-border-tertiary/20 bg-background-secondary/80 backdrop-blur-xl p-8 text-text-primary shadow-2xl relative z-10">
        <Auth />
      </div>
    </main>
  );
}