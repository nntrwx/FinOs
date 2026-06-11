import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'income' | 'expense' | 'accent';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-background-primary text-text-secondary',
    income: 'bg-green-500/10 text-[#4ADE80]',
    expense: 'bg-red-500/10 text-[#F87171]',
    accent: 'bg-accent/10 text-accent',
  };

  return (
    <span className={`px-2 py-1 rounded text-[11px] font-semibold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
