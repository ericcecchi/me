import React from 'react';
import { cn } from '../lib/classnames';
import { MainNav } from './main-nav';

export function Page({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('max-w-3xl mx-auto px-4 pb-12', className)}>
      <MainNav />
      <main {...props} />
    </div>
  );
}

export default Page;
