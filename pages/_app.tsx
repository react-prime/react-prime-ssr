import * as i from 'types';
import React from 'react';
import App, { AppInitialProps, AppProps, AppContext } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { RouterContextProvider } from 'hooks';
import { GlobalStyling } from 'styles';
import theme from 'styles/theme';

class NextApp extends App<Props> {
  static getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
    let pageProps = {};

    // Execute the component's getInitialProps
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10" />
          <link rel="manifest" href="/_next/static/manifest.json" />
          <link rel="icon" sizes="192x192" href="/_next/static/favicon.ico" />
        </Head>
        <GlobalStyling />
        <RouterContextProvider>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </RouterContextProvider>
      </>
    );
  }
}

type Props = AppInitialProps & AppProps & {
  reduxStore: i.Store;
}

export default NextApp;
