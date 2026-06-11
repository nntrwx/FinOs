import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`bg-background-secondary border border-border-tertiary rounded-xl p-6 ${className}`}>
      {title && <h3 className="font-syne font-bold text-xl mb-4 text-text-primary">{title}</h3>}
      {children}
    </div>
  );
}
