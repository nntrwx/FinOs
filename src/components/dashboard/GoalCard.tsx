import React from 'react';
import { Card } from '../ui/Card';
import { Goal } from '@/data/mockData';
import { Target } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
  const percentage = Math.min((goal.current / goal.target) * 100, 100);

  return (
    <Card className="flex flex-col gap-6 relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
          <Target size={24} className="text-accent" />
        </div>
        <div className="text-right">
          <p className="text-accent font-syne font-bold text-2xl">{Math.round(percentage)}%</p>
          <p className="text-text-secondary text-[10px] uppercase tracking-widest">Completed</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-text-primary font-syne font-bold text-xl">{goal.name}</h3>
        <p className="text-text-secondary text-sm mt-1">
          Target: ${goal.target.toLocaleString()}
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between items-end">
          <span className="text-text-primary font-bold text-lg">${goal.current.toLocaleString()}</span>
          <span className="text-text-secondary text-xs pb-1">Saved</span>
        </div>
        <div className="w-full h-2 bg-background-primary rounded-full overflow-hidden border border-border-tertiary/20">
          <div 
            className="h-full bg-accent transition-all duration-700 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
        <Target size={120} strokeWidth={1} />
      </div>
    </Card>
  );
}
