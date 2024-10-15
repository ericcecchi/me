import React from 'react';
import { cn } from '../lib/classnames';

export function Blockquote({
  children,
  className,
  ...props
}: React.ComponentProps<'blockquote'>) {
  return (
    <blockquote
      className={cn('border-l-4 border-slate-800 pl-4 py-4 my-4', className)}
      {...props}
    >
      {children}
    </blockquote>
  );
}

export function Cite({
  children,
  className,
  ...props
}: React.ComponentProps<'cite'>) {
  return (
    <cite
      className={cn('block mt-2 text-sm font-semibold', className)}
      {...props}
    >
      — {children}
    </cite>
  );
}
