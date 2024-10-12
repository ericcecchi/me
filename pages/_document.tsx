import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#a855f7" />
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
      </Head>
      <body className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Main />
        <NextScript />
        <script
          async
          src="https://analytics.ericcecchi.com/tracker.js"
          data-ackee-server="https://analytics.ericcecchi.com"
          data-ackee-domain-id="5345d057-3ae1-4d23-8989-4bcef5a2df15"
        />
      </body>
    </Html>
  );
}
