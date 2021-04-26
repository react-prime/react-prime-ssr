import * as i from 'types';
import React from 'react';
import type { AppInitialProps, AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { RouterContextProvider } from 'hooks';
import { GlobalStyling } from 'styles';
import theme from 'styles/theme';

const App: React.VFC<Props> = ({ Component, pageProps }) => {
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

type Props = AppInitialProps & AppProps & {
  reduxStore: i.Store;
};

export default App;
