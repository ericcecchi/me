import React from 'react';
import { cn } from '~/lib/classnames';
import { MainNav } from './main-nav';

export function Page({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('max-w-3xl mx-auto px-4 pb-12', className)}>
      <MainNav />
      <main {...props} />
      <footer className="mt-16 text-sm text-slate-500 dark:text-slate-400">
        <p>
          What this site collects: anonymous page-view counts and page-speed
          measurements through Vercel Analytics and Speed Insights, which are
          not tied to you or your IP address. Fonts load from Google Fonts,
          which sees your IP address when they do. I don’t collect names or
          emails.
        </p>
      </footer>
    </div>
  );
}

export default Page;
