import * as i from 'types';
import React from 'react';
import App, { AppInitialProps, AppProps, AppContext } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { RouterContextProvider } from 'hooks';
import { withReduxStore } from 'services';
import { theme, GlobalStyling } from 'styles';

class NextApp extends App<Props> {
  static async getInitialProps({ ctx, Component }: AppContext) {
    let pageProps = {};

    // Execute component's getInitialProps first
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <>
        <Head>
          <link rel="manifest" href="/_next/static/manifest.json" />
          <link rel="icon" sizes="192x192" href="/_next/static/favicon.ico" />
        </Head>

        <GlobalStyling />
        <RouterContextProvider>
          <ThemeProvider theme={theme}>
            <Provider store={reduxStore}>
              <Component {...pageProps} />
            </Provider>
          </ThemeProvider>
        </RouterContextProvider>
      </>
    );
  }
}

type Props = AppInitialProps & AppProps & {
  reduxStore: i.Store;
}

export default withReduxStore(NextApp);
