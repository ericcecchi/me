import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import '../styles/index.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/vdz0bbb.css" />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
