import React from 'react';
import { Card } from '../ui/Card';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  prefix?: string;
}

export function SummaryCard({ title, amount, icon: Icon, trend, prefix = '$' }: SummaryCardProps) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-background-primary rounded-lg border border-border-tertiary">
          <Icon size={20} className="text-accent" />
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trend.isPositive ? 'text-[#4ADE80]' : 'text-[#F87171]'}`}>
            {trend.isPositive ? '+' : '-'}{trend.value}%
          </span>
        )}
      </div>
      <div>
        <p className="text-text-secondary text-sm font-medium">{title}</p>
        <h2 className="text-text-primary text-3xl font-syne font-bold mt-1">
          {prefix}{amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </h2>
      </div>
    </Card>
  );
}
