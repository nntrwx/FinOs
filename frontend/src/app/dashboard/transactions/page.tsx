import { TransactionList } from "../../../components/dashboard/TransactionList";
import { mockTransactions } from "../../../data/mockData";
import { Search, Filter, Download } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { CustomSelect } from "../../../components/dashboard/CustomSelect";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-syne font-bold text-text-primary">Transactions</h1>
          <p className="text-text-secondary mt-1">Review and manage your financial activity.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2">
            <Download size={16} /> Export
          </Button>
          <Button className="flex items-center gap-2">
            + Add Transaction
          </Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full bg-background-secondary border border-border-tertiary rounded-lg py-2.5 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="secondary" className="flex-1 md:flex-none flex items-center gap-2 justify-center h-[42px]">
            <Filter size={16} /> Filter
          </Button>
          <CustomSelect options={["Last 30 Days", "Last 3 Months", "This Year"]} />
        </div>
      </div>

      <TransactionList transactions={mockTransactions} />
    </div>
  );
}