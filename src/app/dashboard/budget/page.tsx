import { BudgetProgress } from "@/components/dashboard/BudgetProgress";
import { mockBudget } from "@/data/mockData";
import { PieChart, ListChecks, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import dynamic from 'next/dynamic';

const CategoryChart = dynamic(() => import('@/components/dashboard/CategoryChart').then(mod => mod.CategoryChart), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-background-secondary animate-pulse rounded-xl" />
});

export default function Page() {
  const totalAllocated = mockBudget.reduce((acc, curr) => acc + curr.allocated, 0);
  const totalSpent = mockBudget.reduce((acc, curr) => acc + curr.spent, 0);
  const remaining = totalAllocated - totalSpent;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-syne font-bold text-text-primary">Budget Management</h1>
          <p className="text-text-secondary mt-1">Track your spending limits and allocations.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} /> Create Budget
        </Button>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background-secondary border border-border-tertiary rounded-xl p-6">
          <p className="text-text-secondary text-sm">Total Budget</p>
          <p className="text-2xl font-syne font-bold text-text-primary mt-1">${totalAllocated.toLocaleString()}</p>
        </div>
        <div className="bg-background-secondary border border-border-tertiary rounded-xl p-6">
          <p className="text-text-secondary text-sm">Total Spent</p>
          <p className="text-2xl font-syne font-bold text-text-primary mt-1">${totalSpent.toLocaleString()}</p>
        </div>
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
          <p className="text-accent text-sm font-medium">Remaining</p>
          <p className="text-2xl font-syne font-bold text-accent mt-1">${remaining.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-text-primary mb-2">
            <ListChecks size={20} className="text-accent" />
            <h2 className="text-xl font-syne font-bold">Category Details</h2>
          </div>
          <BudgetProgress budgets={mockBudget} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-text-primary mb-2">
            <PieChart size={20} className="text-accent" />
            <h2 className="text-xl font-syne font-bold">Spending Distribution</h2>
          </div>
          <CategoryChart data={mockBudget} />
        </div>
      </div>
    </div>
  );
}