import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'emerald' | 'cyan' | 'secondary' | 'outline' | 'accent';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const base =
    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors';

  const variants = {
    default: 'bg-surface-2 text-muted border border-border',
    secondary: 'bg-surface-3 text-foreground',
    emerald: 'bg-emerald/10 text-emerald-light border border-emerald/20',
    cyan: 'bg-cyan/10 text-cyan-light border border-cyan/20',
    accent: 'bg-accent/10 text-accent-light border border-accent/20',
    outline: 'border border-border text-muted',
  };

  return <div className={twMerge(clsx(base, variants[variant], className))} {...props} />;
}
