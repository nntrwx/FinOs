import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Transaction } from '../../data/mockData';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  limit?: number;
}

export function TransactionList({ transactions, limit }: TransactionListProps) {
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions;

  return (
    <Card title="Recent Transactions" className="flex flex-col gap-4">
      <div className="flex flex-col divide-y divide-border-tertiary/30">
        {displayTransactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${tx.type === 'income' ? 'bg-[#4ADE80]/10' : 'bg-[#F87171]/10'}`}>
                {tx.type === 'income' ? (
                  <ArrowUpRight size={16} className="text-[#4ADE80]" />
                ) : (
                  <ArrowDownRight size={16} className="text-[#F87171]" />
                )}
              </div>
              <div>
                <p className="text-text-primary text-sm font-medium">{tx.title}</p>
                <p className="text-text-secondary text-xs">{tx.date}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className={`text-sm font-bold ${tx.type === 'income' ? 'text-[#4ADE80]' : 'text-text-primary'}`}>
                {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
              </p>
              <Badge variant="default">{tx.category}</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
