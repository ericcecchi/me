import React from 'react';
import { cn } from '~/lib/classnames';

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('rounded-lg p-6 bg-slate-100 dark:bg-slate-900', className)}
      {...props}
    />
  );
}
