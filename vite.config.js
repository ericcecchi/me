import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import { vercelPreset } from '@vercel/remix/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import mdx from '@mdx-js/rollup';
import remarkCodeTitles from 'remark-code-titles';
import remarkCapitalize from 'remark-capitalize';
import remarkSmartypants from 'remark-smartypants';
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

installGlobals();

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [
        remarkCodeTitles,
        remarkCapitalize,
        remarkSmartypants,
        remarkGfm,
      ],
      rehypePlugins: [rehypeAutolinkHeadings],
      jsxImportSource: "react",
      providerImportSource: "@mdx-js/react",
    }),
    remix({ presets: [vercelPreset()] }),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    include: ['@mdx-js/react'],
  },
});
