import React from 'react';
import { cn } from '../lib/classnames';

export const Card: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn('rounded-lg p-6 bg-slate-100 dark:bg-slate-900', className)}
      {...props}
    />
  );
};
