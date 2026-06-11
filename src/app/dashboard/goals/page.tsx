import { GoalCard } from "@/components/dashboard/GoalCard";
import { mockGoals } from "@/data/mockData";
import { Target, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-syne font-bold text-text-primary">Savings Goals</h1>
          <p className="text-text-secondary mt-1">Visualize and track your progress toward big dreams.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} /> New Goal
        </Button>
      </header>

      {/* Summary Stat */}
      <div className="bg-background-secondary border border-border-tertiary rounded-xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center text-accent shrink-0">
          <Target size={40} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-syne font-bold text-text-primary">Almost there!</h2>
          <p className="text-text-secondary mt-1 max-w-xl">
            You&apos;ve saved a total of $6,500 across all your goals. You&apos;re 45% of the way to achieving your &apos;New Laptop&apos; target. Keep going!
          </p>
        </div>
        <div className="flex flex-col gap-1 items-center md:items-end">
          <span className="text-text-secondary text-sm uppercase tracking-widest">Total Saved</span>
          <span className="text-4xl font-syne font-bold text-accent">$6,500</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
}