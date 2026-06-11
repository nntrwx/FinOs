import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-accent/90 backdrop-blur-md text-background-primary hover:bg-accent border border-accent/20 shadow-[0_0_20px_rgba(159,211,86,0.3)] hover:shadow-[0_0_30px_rgba(159,211,86,0.5)]',
    secondary: 'bg-white/5 backdrop-blur-xl text-text-primary border border-white/10 hover:bg-white/10 hover:border-white/20 shadow-xl',
    outline: 'bg-transparent border border-border-tertiary text-text-secondary hover:text-text-primary hover:border-text-primary',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button 
      className={`rounded-lg font-medium transition-all active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
