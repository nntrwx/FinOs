import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background-primary selection:bg-accent selection:text-background-primary">
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}