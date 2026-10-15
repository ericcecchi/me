import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { Analytics } from '@vercel/analytics/react';
import { ReactNode } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/remix';
import { LinksFunction } from '@vercel/remix';
import stylesheet from './global.css?url';
// The body text font. Preloaded so text paints in Fira Mono without waiting on
// the stylesheet; the other weights and subsets load as the page needs them.
import firaMono400 from './fonts/fira-mono-400-latin.woff2?url';

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    href: firaMono400,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  { rel: 'stylesheet', href: stylesheet },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#a855f7" />
        <Meta />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <Links />
      </head>
      <body className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        {children}
        <ScrollRestoration />
        <Scripts />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
