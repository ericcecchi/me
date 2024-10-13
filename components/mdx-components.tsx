import { Anchor } from './anchor';
import React from 'react';

export const MDXComponents = {
  a: Anchor,
  p: (props: React.ComponentProps<'p'>) => (
    <p className="sm:text-lg leading-relaxed mb-6" {...props} />
  ),
  h1: (props: React.ComponentProps<'h1'>) => (
    <h1 className="text-3xl font-bold mt-6 mb-2" {...props} />
  ),
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 className="text-2xl font-bold mt-6 mb-2" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="text-xl font-bold mt-6 mb-2" {...props} />
  ),
  h4: (props: React.ComponentProps<'h4'>) => (
    <h4 className="text-lg font-bold mt-6 mb-2" {...props} />
  ),
  h5: (props: React.ComponentProps<'h5'>) => (
    <h5 className="text-base font-bold mt-6 mb-2" {...props} />
  ),
  h6: (props: React.ComponentProps<'h6'>) => (
    <h6 className="text-sm font-bold mt-6 mb-2" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="list-disc pl-6 mb-6" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="list-decimal pl-6 mb-6" {...props} />
  ),
  li: (props: React.ComponentProps<'li'>) => (
    <li className="sm:text-lg mb-2" {...props} />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-4 pl-4" {...props} />
  ),
  pre: (props: React.ComponentProps<'pre'>) => (
    <pre
      className="text-slate-100 bg-slate-800 dark:bg-slate-200 dark:text-slate-900 p-4 rounded"
      {...props}
    />
  ),
  code: (props: React.ComponentProps<'code'>) => (
    <code
      className="text-sm text-slate-100 bg-slate-800 dark:bg-slate-200 dark:text-slate-900 p-1 rounded"
      {...props}
    />
  ),
  inlineCode: (props: React.ComponentProps<'code'>) => (
    <code
      className="text-sm text-slate-100 bg-slate-800 dark:bg-slate-200 dark:text-slate-900 p-1 rounded"
      {...props}
    />
  ),
  table: (props: React.ComponentProps<'table'>) => (
    <table className="border-collapse w-full my-6" {...props} />
  ),
  th: (props: React.ComponentProps<'th'>) => (
    <th className="border p-2" {...props} />
  ),
  td: (props: React.ComponentProps<'td'>) => (
    <td className="border p-2" {...props} />
  ),
  tr: (props: React.ComponentProps<'tr'>) => (
    <tr className="odd:bg-slate-800 even:bg-slate-700" {...props} />
  ),
  thead: (props: React.ComponentProps<'thead'>) => (
    <thead className="bg-slate-900" {...props} />
  ),
  tbody: (props: React.ComponentProps<'tbody'>) => <tbody {...props} />,
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong className="font-semibold" {...props} />
  ),
  hr: (props: React.ComponentProps<'hr'>) => <hr className="my-6" {...props} />,
};
