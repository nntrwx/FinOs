export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  title: string;
}

export interface MonthlyStats {
  income: number;
  expenses: number;
  savings: number;
}

export interface Budget {
  category: string;
  allocated: number;
  spent: number;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
}

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2024-03-10', amount: 2500, category: 'Salary', type: 'income', title: 'Monthly Salary' },
  { id: '2', date: '2024-03-11', amount: 45.50, category: 'Food', type: 'expense', title: 'Grocery Shopping' },
  { id: '3', date: '2024-03-12', amount: 120, category: 'Utilities', type: 'expense', title: 'Electricity Bill' },
  { id: '4', date: '2024-03-12', amount: 15.99, category: 'Entertainment', type: 'expense', title: 'Netflix Subscription' },
  { id: '5', date: '2024-03-13', amount: 350, category: 'Freelance', type: 'income', title: 'Logo Design Project' },
  { id: '6', date: '2024-03-14', amount: 60, category: 'Transport', type: 'expense', title: 'Gas Station' },
  { id: '7', date: '2024-03-15', amount: 25, category: 'Food', type: 'expense', title: 'Lunch at Cafe' },
];

export const mockMonthlyStats: MonthlyStats = {
  income: 2850.00,
  expenses: 266.49,
  savings: 2583.51,
};

export const mockBudget: Budget[] = [
  { category: 'Food', allocated: 500, spent: 70.50 },
  { category: 'Transport', allocated: 200, spent: 60 },
  { category: 'Utilities', allocated: 300, spent: 120 },
  { category: 'Entertainment', allocated: 150, spent: 15.99 },
  { category: 'Shopping', allocated: 400, spent: 0 },
];

export const mockGoals: Goal[] = [
  { id: '1', name: 'New Laptop', target: 2500, current: 1200 },
  { id: '2', name: 'Emergency Fund', target: 10000, current: 4500 },
  { id: '3', name: 'Vacation', target: 3000, current: 800 },
];

export const spendingHistory = [
  { name: 'Mon', amount: 45 },
  { name: 'Tue', amount: 52 },
  { name: 'Wed', amount: 38 },
  { name: 'Thu', amount: 65 },
  { name: 'Fri', amount: 48 },
  { name: 'Sat', amount: 70 },
  { name: 'Sun', amount: 20 },
];
