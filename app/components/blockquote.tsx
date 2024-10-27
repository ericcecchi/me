import React from 'react';
import { cn } from '~/lib/classnames';

export function Blockquote({
  children,
  className,
  ...props
}: React.ComponentProps<'blockquote'>) {
  return (
    <blockquote
      className={cn(
        'leading-relaxed border-l-4 border-secondary-500 pl-6 py-2 my-6',
        className,
      )}
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
