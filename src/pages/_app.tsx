import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { RouterContextProvider } from 'hooks';
import { GlobalStyling } from 'styles';
import theme from 'styles/theme';
import { wrapper } from 'store';

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
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
};

export default wrapper.withRedux(App);
