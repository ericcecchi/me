import React from 'react';
import { cn } from '../lib/classnames';

export function Anchor({ className, ...props }: React.ComponentProps<'a'>) {
  return (
    <a className={cn('text-primary-500 underline', className)} {...props} />
  );
}
