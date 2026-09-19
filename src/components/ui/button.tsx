import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'emerald' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-foreground text-background hover:bg-white shadow-sm hover:shadow-md',
      secondary:
        'bg-surface-2 text-foreground hover:bg-surface-3 border border-border',
      outline:
        'border border-border bg-transparent hover:bg-surface-2 text-foreground hover:border-border-hover',
      ghost:
        'bg-transparent hover:bg-surface-2/60 text-muted hover:text-foreground',
      emerald:
        'bg-emerald text-background font-semibold hover:bg-emerald-light shadow-md shadow-emerald/20',
      accent:
        'bg-accent text-white font-semibold hover:bg-accent-light shadow-md shadow-accent/20 hover:shadow-accent/30',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2.5',
      icon: 'h-9 w-9 p-0',
    };

    return (
      <button
        ref={ref}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
