import { Anchor } from './anchor';
import { ComponentProps } from 'react';
import { Blockquote } from './blockquote';
import { Interwebz } from '~/images/interwebz';
import { InterwebzNoSteps } from '~/images/interwebz-no-steps';

export const MDXComponents = {
  Interwebz,
  InterwebzNoSteps,
  a: Anchor,
  p: (props: ComponentProps<'p'>) => (
    <p
      className="sm:text-lg leading-relaxed mb-6 last-of-type:mb-0"
      {...props}
    />
  ),
  img: (props: ComponentProps<'img'>) => <img className="my-8" {...props} />,
  h1: (props: ComponentProps<'h1'>) => (
    <h1 className="text-3xl font-bold mt-12 mb-6" {...props} />
  ),
  h2: (props: ComponentProps<'h2'>) => (
    <h2 className="text-2xl font-bold mt-12 mb-6" {...props} />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <h3 className="text-xl font-bold mt-6 mb-2" {...props} />
  ),
  h4: (props: ComponentProps<'h4'>) => (
    <h4 className="text-lg font-bold mt-6 mb-2" {...props} />
  ),
  h5: (props: ComponentProps<'h5'>) => (
    <h5 className="text-base font-bold mt-6 mb-2" {...props} />
  ),
  h6: (props: ComponentProps<'h6'>) => (
    <h6 className="text-sm font-bold mt-6 mb-2" {...props} />
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul className="list-disc pl-8 mb-6 leading-relaxed" {...props} />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol className="list-decimal pl-8 mb-6 leading-relaxed" {...props} />
  ),
  li: (props: ComponentProps<'li'>) => (
    <li className="sm:text-lg mb-2" {...props} />
  ),
  blockquote: Blockquote,
  pre: (props: ComponentProps<'pre'>) => (
    <pre
      className="text-slate-100 bg-slate-800 p-4 rounded my-6 overflow-auto"
      {...props}
    />
  ),
  code: (props: ComponentProps<'code'>) => (
    <code
      className="text-sm text-slate-100 bg-slate-800 p-1 rounded"
      {...props}
    />
  ),
  inlineCode: (props: ComponentProps<'code'>) => (
    <code
      className="text-sm text-slate-100 bg-slate-800 dark:bg-slate-200 dark:text-slate-900 p-1 rounded"
      {...props}
    />
  ),
  table: (props: ComponentProps<'table'>) => (
    <table className="border-collapse w-full my-6" {...props} />
  ),
  th: (props: ComponentProps<'th'>) => <th className="border p-2" {...props} />,
  td: (props: ComponentProps<'td'>) => <td className="border p-2" {...props} />,
  tr: (props: ComponentProps<'tr'>) => (
    <tr
      className="odd:bg-slate-100 even:bg-slate-50 dark:odd:bg-slate-800 dark:even:bg-slate-700"
      {...props}
    />
  ),
  thead: (props: ComponentProps<'thead'>) => (
    <thead className="bg-white dark:bg-slate-900" {...props} />
  ),
  tbody: (props: ComponentProps<'tbody'>) => <tbody {...props} />,
  strong: (props: ComponentProps<'strong'>) => (
    <strong className="font-semibold" {...props} />
  ),
  hr: (props: ComponentProps<'hr'>) => (
    <hr className="my-12 border-slate-500 border-dashed" {...props} />
  ),
};
