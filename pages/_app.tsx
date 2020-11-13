import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import App from 'next/app';
import Head from 'next/head';
import theme from '../theme';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/vdz0bbb.css" />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default MyApp;
