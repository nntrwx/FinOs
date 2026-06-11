import React from 'react';
import { Card } from '../ui/Card';
import { Budget } from '../../data/mockData';

interface BudgetProgressProps {
  budgets: Budget[];
}

export function BudgetProgress({ budgets }: BudgetProgressProps) {
  return (
    <Card title="Budget Allocation" className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        {budgets.map((budget) => {
          const percentage = Math.min((budget.spent / budget.allocated) * 100, 100);
          const isOverBudget = budget.spent > budget.allocated;

          return (
            <div key={budget.category} className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-text-primary">{budget.category}</span>
                <span className="text-text-secondary">
                  <span className={isOverBudget ? 'text-[#F87171]' : 'text-text-primary'}>
                    ${budget.spent.toLocaleString()}
                  </span>
                  {' / '}${budget.allocated.toLocaleString()}
                </span>
              </div>
              <div className="w-full h-2 bg-background-primary rounded-full overflow-hidden border border-border-tertiary/20">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${isOverBudget ? 'bg-[#F87171]' : 'bg-accent'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
