import React from 'react';
import { cn } from '../lib/classnames';

export function PageTitle({
  className,
  ...props
}: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h1 className={cn('text-4xl font-bold mt-12 mb-4', className)} {...props} />
  );
}
