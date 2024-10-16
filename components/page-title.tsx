import React from 'react';
import { cn } from '../lib/classnames';

export function PageTitle({
  className,
  ...props
}: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h1
      className={cn('sm:text-4xl text-3xl font-bold mt-12 mb-4 text-pretty', className)}
      {...props}
    />
  );
}
