import React from 'react';
import App from 'next/app';
import { DefaultSeo } from 'next-seo';
import { Theme } from '../components/Theme';

import SEO from '../next-seo.config';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Theme>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </Theme>
    );
  }
}

export default MyApp;
