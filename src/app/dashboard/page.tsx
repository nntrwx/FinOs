import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { mockTransactions, mockMonthlyStats, spendingHistory, mockBudget } from "@/data/mockData";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import dynamic from 'next/dynamic';

// Dynamic imports for charts to improve performance (lazy loading)
const SpendingChart = dynamic(() => import('@/components/dashboard/SpendingChart').then(mod => mod.SpendingChart), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-background-secondary animate-pulse rounded-xl" />
});

const CategoryChart = dynamic(() => import('@/components/dashboard/CategoryChart').then(mod => mod.CategoryChart), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-background-secondary animate-pulse rounded-xl" />
});

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-syne font-bold text-text-primary">Dashboard Overview</h1>
        <p className="text-text-secondary mt-1">Welcome back, here&apos;s what&apos;s happening with your money.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard 
          title="Total Balance" 
          amount={mockMonthlyStats.savings} 
          icon={Wallet} 
          trend={{ value: 12, isPositive: true }}
        />
        <SummaryCard 
          title="Monthly Income" 
          amount={mockMonthlyStats.income} 
          icon={TrendingUp} 
          trend={{ value: 8, isPositive: true }}
        />
        <SummaryCard 
          title="Monthly Expenses" 
          amount={mockMonthlyStats.expenses} 
          icon={TrendingDown} 
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingChart data={spendingHistory} />
        <CategoryChart data={mockBudget} />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionList transactions={mockTransactions} limit={5} />
        </div>
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 flex flex-col justify-center items-center text-center gap-4">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-background-primary">
            <TrendingUp size={32} />
          </div>
          <div>
            <h3 className="text-xl font-syne font-bold text-text-primary">Smart Tip</h3>
            <p className="text-text-secondary text-sm mt-2">
              You&apos;ve spent 15% less on Entertainment this month. Keep it up to reach your &apos;New Laptop&apos; goal faster!
            </p>
          </div>
          <Link 
            href="/dashboard/goals"
            className="w-full py-3 bg-accent text-background-primary rounded-lg font-bold hover:bg-accent/90 transition-all text-center block"
          >
            View Savings Goals
          </Link>
        </div>
      </div>
    </div>
  );
}