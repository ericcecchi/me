import { DefaultSeo } from 'next-seo';
import './global.css';

import SEO from '../next-seo.config.mjs';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}
