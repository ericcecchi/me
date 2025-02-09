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

export const links: LinksFunction = () => [
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        {children}
        <ScrollRestoration />
        <Scripts />
        <Analytics />
        <script
          async
          src="https://analytics.ericcecchi.com/tracker.js"
          data-ackee-server="https://analytics.ericcecchi.com"
          data-ackee-domain-id="5345d057-3ae1-4d23-8989-4bcef5a2df15"
        />
        <SpeedInsights />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
